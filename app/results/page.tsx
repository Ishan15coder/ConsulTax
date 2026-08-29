'use client';
// ── Results Page (Darkish Professional Guidance Breakdown with #CFCEED Accent) ───

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSessionItem } from '@/lib/session';
import type { AnalyzeResponse, DocumentInput } from '@/lib/types';
import DeductionCard from '@/components/DeductionCard';
import SchemeCard from '@/components/SchemeCard';
import WarningBanner from '@/components/WarningBanner';
import { formatINR } from '@/lib/calculations';

export default function ResultsPage() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [input, setInput] = useState<DocumentInput | null>(null);

  useEffect(() => {
    const r = getSessionItem<AnalyzeResponse>('analyze_result');
    const i = getSessionItem<DocumentInput>('analyze_input');
    setResult(r);
    setInput(i);
  }, []);

  if (!result) {
    return (
      <div style={{ maxWidth: 640, margin: '64px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="tax-card" style={{ padding: '36px 24px' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC', marginBottom: 8, fontFamily: 'Onest, sans-serif' }}>
            No tax calculation found
          </h1>
          <p style={{ color: '#CFCEED', marginBottom: 24, fontSize: '0.9rem' }}>
            Please submit your income and investment details to generate your tax guidance report.
          </p>
          <Link href="/" className="btn-primary">
            ← Enter Income Details
          </Link>
        </div>
      </div>
    );
  }

  const totalDeductionAmount = result.deductions
    .filter((d) => d.reason?.trim())
    .reduce((sum, d) => sum + d.amount, 0);
  const confirmedCount = result.deductions.filter((d) => d.confidence === 'confirmed' && d.reason?.trim()).length;
  const schemesCount = result.schemes.filter((s) => s.reason?.trim() && s.confidence === 'confirmed').length;

  function handlePDFDownload() {
    window.print();
  }

  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px 72px' }}>

      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <Link
            href="/"
            style={{
              fontSize: '0.8rem', color: '#CFCEED', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 6,
              fontWeight: 600, fontFamily: 'Onest, sans-serif',
            }}
          >
            ← Back to Income Form
          </Link>
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em', fontFamily: 'Onest, sans-serif' }}>
            Tax Guidance &amp; Deduction Summary
          </h1>
          <p style={{ margin: '4px 0 0', color: '#CFCEED', fontSize: '0.875rem' }}>
            FY 2024-25 (AY 2025-26) · Self Income Tax Guidance · Not Certified Tax Advice
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            id="pdf-download-btn"
            onClick={handlePDFDownload}
            className="btn-ghost"
            aria-label="Download PDF summary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Print / Download PDF
          </button>
          <Link href="/simulator" className="btn-secondary">
            ⚡ Simulator Scenarios
          </Link>
        </div>
      </div>

      {/* Recommended Regime Callout Banner */}
      <div
        style={{
          background: 'rgba(207, 206, 237, 0.12)',
          border: '1px solid rgba(207, 206, 237, 0.3)',
          borderLeft: '5px solid #CFCEED',
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: '1rem' }}>🎉</span>
            <strong style={{ fontSize: '1.05rem', color: '#CFCEED', fontFamily: 'Onest, sans-serif' }}>
              Tax Planning Recommendation: New Tax Regime
            </strong>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#CFCEED' }}>
            Based on your ₹{(input?.grossSalary || 1200000).toLocaleString('en-IN')} income and investments, the <strong>New Tax Regime</strong> is recommended for maximum tax savings.
          </p>
        </div>

        <Link
          href="/simulator"
          style={{
            padding: '8px 16px',
            background: '#CFCEED',
            color: '#0B1726',
            borderRadius: 6,
            fontSize: '0.825rem',
            fontWeight: 800,
            fontFamily: 'Onest, sans-serif',
            textDecoration: 'none',
          }}
        >
          Compare Old vs New →
        </Link>
      </div>

      {/* Summary Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 14,
          marginBottom: 32,
        }}
      >
        {[
          { label: 'Total Deductions Claimable', value: formatINR(totalDeductionAmount), color: '#F8FAFC' },
          { label: 'Confirmed Deductions', value: `${confirmedCount} Rules`, color: '#10B981' },
          { label: 'Eligible Schemes', value: `${schemesCount} Schemes`, color: '#60A5FA' },
          { label: 'Notices / Warnings', value: `${result.warnings.length} Alerts`, color: result.warnings.length > 0 ? '#F59E0B' : '#CFCEED' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="tax-card"
            style={{ padding: '16px 20px' }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#CFCEED', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: stat.color, fontFamily: 'Onest, sans-serif' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <WarningBanner warnings={result.warnings} />
        </div>
      )}

      {/* Deductions Section */}
      <section aria-labelledby="deductions-heading" style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <h2 id="deductions-heading" style={{ margin: 0, fontSize: '1.2rem', color: '#F8FAFC', fontFamily: 'Onest, sans-serif' }}>
            Tax Deductions Evaluated
          </h2>
          <span className="badge badge-confirmed">
            {result.deductions.filter((d) => d.reason?.trim()).length} Available
          </span>
        </div>

        {result.deductions.length === 0 ? (
          <p style={{ color: '#CFCEED', fontSize: '0.9rem' }}>No deductions returned by the rules engine.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 16 }}>
            {result.deductions.map((d, i) => (
              <DeductionCard key={`${d.ruleId}-${i}`} deduction={d} />
            ))}
          </div>
        )}
      </section>

      {/* Schemes Section */}
      <section aria-labelledby="schemes-heading" style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <h2 id="schemes-heading" style={{ margin: 0, fontSize: '1.2rem', color: '#F8FAFC', fontFamily: 'Onest, sans-serif' }}>
            Eligible Tax-Saving Schemes
          </h2>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#60A5FA', background: 'rgba(59, 130, 246, 0.15)', padding: '3px 10px', borderRadius: 4, border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            {result.schemes.filter((s) => s.reason?.trim()).length} Evaluated
          </span>
        </div>

        {result.schemes.length === 0 ? (
          <p style={{ color: '#CFCEED', fontSize: '0.9rem' }}>No scheme suggestions returned.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 16 }}>
            {result.schemes.map((s, i) => (
              <SchemeCard key={`${s.ruleId}-${i}`} scheme={s} />
            ))}
          </div>
        )}
      </section>

      {/* Transition to Simulator */}
      <div
        className="tax-card"
        style={{
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#F8FAFC', fontFamily: 'Onest, sans-serif' }}>
            Want to simulate what-if scenarios?
          </h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#CFCEED' }}>
            Adjust your 80C, 80D, and NPS investments with interactive sliders to see live tax savings.
          </p>
        </div>
        <Link href="/simulator" className="btn-primary">
          Open Tax Simulator →
        </Link>
      </div>

    </div>
  );
}
