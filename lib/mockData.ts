// ============================================================
// ConsulTax — Mock Data (frontend-independent dev)
// Covers both `confirmed` and `flagged` confidence states.
// Enable via NEXT_PUBLIC_USE_MOCK=true in .env.local
// ============================================================

import type { AnalyzeResponse } from './types';

export const MOCK_RESPONSE: AnalyzeResponse = {
  deductions: [
    {
      title: 'Section 80C — Investments',
      ruleId: 'SECTION_80C_LIMIT',
      reason:
        'Your total 80C investments (PF + ELSS + LIC) of ₹1,20,000 qualify for deduction. The maximum limit under Section 80C is ₹1,50,000. You have ₹30,000 of unused capacity.',
      amount: 120000,
      confidence: 'confirmed',
    },
    {
      title: 'Section 80D — Health Insurance',
      ruleId: 'SECTION_80D_SELF_FAMILY',
      reason:
        'Medical insurance premium of ₹18,000 paid for self and family qualifies under Section 80D. The applicable limit for individuals below 60 is ₹25,000.',
      amount: 18000,
      confidence: 'confirmed',
    },
    {
      title: 'HRA Exemption',
      ruleId: 'HRA_METRO_EXEMPTION',
      reason:
        'HRA exemption calculated as the least of: (a) actual HRA received ₹2,40,000, (b) 50% of basic for metro city ₹3,00,000, (c) rent paid minus 10% of basic ₹1,80,000. Exempt amount: ₹1,80,000.',
      amount: 180000,
      confidence: 'confirmed',
    },
    {
      title: 'Section 80CCD(1B) — NPS',
      ruleId: 'NPS_ADDITIONAL_DEDUCTION',
      reason:
        'Additional NPS contribution of ₹35,000 qualifies under Section 80CCD(1B), over and above the 80C limit. Maximum additional deduction is ₹50,000.',
      amount: 35000,
      confidence: 'confirmed',
    },
    {
      title: 'Home Loan Interest — Section 24(b)',
      ruleId: 'HOME_LOAN_INTEREST_24B',
      reason:
        'Home loan interest of ₹2,20,000 is partially deductible. The limit under Section 24(b) for a self-occupied property is ₹2,00,000. Excess ₹20,000 is not deductible.',
      amount: 200000,
      confidence: 'flagged',
    },
    {
      title: 'Standard Deduction',
      ruleId: 'STANDARD_DEDUCTION_SALARIED',
      reason:
        'A flat standard deduction of ₹75,000 is available to all salaried individuals under the new tax regime for FY 2024-25, as per the Union Budget 2024 amendment.',
      amount: 75000,
      confidence: 'confirmed',
    },
  ],
  schemes: [
    {
      title: 'Public Provident Fund (PPF)',
      ruleId: 'PPF_ELIGIBILITY',
      reason:
        'You are eligible for PPF. Contributions up to ₹1.5 lakh per year qualify under Section 80C. Interest earned and maturity proceeds are fully tax-free (EEE status).',
      confidence: 'confirmed',
    },
    {
      title: 'Equity Linked Saving Scheme (ELSS)',
      ruleId: 'ELSS_ELIGIBILITY',
      reason:
        'ELSS mutual funds are eligible under Section 80C with a 3-year lock-in. Long-term capital gains above ₹1 lakh are taxed at 10%. Suitable given your income level and tax bracket.',
      confidence: 'confirmed',
    },
    {
      title: 'Sukanya Samriddhi Yojana (SSY)',
      ruleId: 'SSY_ELIGIBILITY',
      reason:
        'Eligibility could not be fully verified — SSY requires a girl child account holder below age 10. The rules engine could not confirm the dependent details from your document. Please verify manually.',
      confidence: 'flagged',
    },
    {
      title: 'National Pension System (NPS)',
      ruleId: 'NPS_TIER1_ELIGIBILITY',
      reason:
        'NPS Tier I contributions are eligible. You can claim up to ₹50,000 additional deduction under 80CCD(1B) beyond your existing 80C investments, reducing taxable income further.',
      confidence: 'confirmed',
    },
    {
      title: 'Senior Citizens Savings Scheme (SCSS)',
      ruleId: 'SCSS_AGE_ELIGIBILITY',
      reason:
        'Not currently eligible — SCSS requires the account holder to be 60 years or above (or 55+ on superannuation). Your provided age does not meet this threshold.',
      confidence: 'flagged',
    },
  ],
  warnings: [
    'Section 24(b) home loan interest has been capped at ₹2,00,000. Your declared interest of ₹2,20,000 exceeds the self-occupied property limit.',
    'Your current 80C investments are ₹30,000 below the maximum limit. Consider additional PPF or ELSS contributions before fiscal year end.',
  ],
};

export const MOCK_CHAT_RESPONSES: Record<string, string> = {
  default:
    'Based on the vetted scheme corpus, here is what I can tell you: This question relates to general tax scheme eligibility. Please consult the relevant sections of the Income Tax Act or a qualified tax professional for personalised advice.',
  '80c':
    'Section 80C allows deductions up to ₹1,50,000 per financial year. Eligible investments include: PF/EPF, PPF, ELSS mutual funds, LIC premium, 5-year tax-saving FD, Sukanya Samriddhi, NSC, and home loan principal repayment.',
  hra:
    'HRA exemption is calculated as the minimum of: (a) Actual HRA received, (b) 50% of basic salary (metro) or 40% (non-metro), (c) Actual rent paid minus 10% of basic salary. Only available under the old regime.',
  nps:
    'NPS contributions qualify under 80CCD(1) within the 80C limit, and additionally under 80CCD(1B) for up to ₹50,000 — giving a potential total deduction of ₹2,00,000 combining both sections.',
};
