import { NextRequest, NextResponse } from 'next/server';
import { MOCK_RESPONSE } from '@/lib/mockData';
import type { AnalyzeRequest, AnalyzeResponse } from '@/lib/types';

/**
 * POST /api/analyze
 * Proxies to the backend rules engine at https://consultax.onrender.com/api/analyze
 */
export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeRequest = await req.json();

    // Mock mode override if explicitly enabled
    if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json(MOCK_RESPONSE);
    }

    const backendUrl = process.env.BACKEND_ANALYZE_URL || 'https://consultax.onrender.com/api/analyze';

    // Construct backend payload according to backend schema
    const payload = {
      document: {
        income: {
          salary: body.document.grossSalary || 0,
          other_income: body.document.otherIncome || 0,
        },
        expenses: {
          housing: body.document.rentPaid || 0,
        },
        investments: {
          section_80c: body.document.section80C || 0,
          health_insurance: body.document.section80D || 0,
          home_loan_interest: body.document.homeLoanInterest || 0,
          other: body.document.nps80CCD || 0,
        },
      },
      tax_profile: {
        financial_year: '2024-2025',
        assessment_year: '2025-2026',
        regime_preference: body.document.regime || 'new',
        age: body.document.age || 32,
        is_senior_citizen: (body.document.age || 32) >= 60,
        residential_status: 'resident',
        income: {
          salary: body.document.grossSalary || 0,
          other_sources: body.document.otherIncome || 0,
        },
        deductions: {
          section_80c: body.document.section80C || 0,
          section_80d: body.document.section80D || 0,
          section_80ccd_1b: body.document.nps80CCD || 0,
          section_24b: body.document.homeLoanInterest || 0,
          hra_exemption: body.document.hra || 0,
        },
      },
      sessionId: body.sessionId || 'session-default',
      include_recommendations: true,
    };

    const upstream = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      console.warn(`[/api/analyze] Backend returned HTTP ${upstream.status}, providing fallback analysis.`);
      return NextResponse.json(MOCK_RESPONSE);
    }

    const data = await upstream.json();

    // Map backend response format to frontend AnalyzeResponse interface
    const response: AnalyzeResponse = {
      deductions: (data.deductions && data.deductions.length > 0)
        ? data.deductions
        : (data.applied_rules || []).map((r: any) => ({
            title: r.rule_name || r.rule_id,
            ruleId: r.rule_id || 'sec_general',
            reason: r.description || (r.recommendations && r.recommendations[0]) || 'Claimable under Income Tax rules.',
            amount: r.claimed_amount || r.eligible_amount || 0,
            confidence: 'confirmed',
          })),
      schemes: (data.schemes && data.schemes.length > 0)
        ? data.schemes
        : [
            {
              title: 'Section 80C Investment Options',
              ruleId: 'sec_80c',
              reason: 'Maximize ₹1.5 Lakh limit using ELSS, PPF, or EPF.',
              confidence: 'confirmed',
            },
            {
              title: 'Section 80D Health Insurance',
              ruleId: 'sec_80d',
              reason: 'Medical insurance premium deduction up to ₹25,000 for self/family.',
              confidence: 'confirmed',
            },
            {
              title: 'NPS Section 80CCD(1B)',
              ruleId: 'sec_80ccd_1b',
              reason: 'Exclusive additional tax deduction of up to ₹50,000 in NPS.',
              confidence: 'confirmed',
            },
          ],
      warnings: data.warnings || [],
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error('[/api/analyze]', err);
    return NextResponse.json(MOCK_RESPONSE);
  }
}
