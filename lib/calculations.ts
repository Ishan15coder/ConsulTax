// ============================================================
// ConsulTax — Client-Side What-If Calculation Engine (§3 Extended)
// Runs entirely in the browser — zero round-trip, zero data sent.
// FY 2024-25 Indian Income Tax slabs.
// ============================================================

import type { SimulatorInputs, TaxBreakdown } from './types';

// ── Old Regime Slabs ─────────────────────────────────────────
const OLD_REGIME_SLABS = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 0.05 },
  { upTo: 1000000, rate: 0.2 },
  { upTo: Infinity, rate: 0.3 },
];

// ── New Regime Slabs (FY 2024-25) ────────────────────────────
const NEW_REGIME_SLABS = [
  { upTo: 300000, rate: 0 },
  { upTo: 700000, rate: 0.05 },
  { upTo: 1000000, rate: 0.1 },
  { upTo: 1200000, rate: 0.15 },
  { upTo: 1500000, rate: 0.2 },
  { upTo: Infinity, rate: 0.3 },
];

function computeSlabTax(
  taxableIncome: number,
  slabs: typeof OLD_REGIME_SLABS
): number {
  let tax = 0;
  let prev = 0;
  for (const slab of slabs) {
    if (taxableIncome <= prev) break;
    const chunk = Math.min(taxableIncome, slab.upTo) - prev;
    tax += chunk * slab.rate;
    prev = slab.upTo;
  }
  return Math.round(tax);
}

function getSurcharge(taxableIncome: number, tax: number): number {
  if (taxableIncome > 50000000) return Math.round(tax * 0.37);
  if (taxableIncome > 20000000) return Math.round(tax * 0.25);
  if (taxableIncome > 10000000) return Math.round(tax * 0.15);
  if (taxableIncome > 5000000) return Math.round(tax * 0.1);
  return 0;
}

/**
 * Calculates full tax breakdown for old or new regime.
 * All inputs are in INR.
 */
export function calculateTax(inputs: SimulatorInputs): TaxBreakdown {
  const { grossSalary, section80C, section80D, nps80CCD, homeLoanInterest, regime } = inputs;

  // ── Standard deduction (available in both regimes post-budget) ──
  const standardDeduction = 75000;

  // ── Old Regime Deductions ────────────────────────────────────
  let totalDeductions = standardDeduction;
  if (regime === 'old') {
    const cap80C = Math.min(section80C, 150000);
    const cap80D = Math.min(section80D, 25000);
    const capNPS = Math.min(nps80CCD, 50000);
    const capHLI = Math.min(homeLoanInterest, 200000);
    totalDeductions = standardDeduction + cap80C + cap80D + capNPS + capHLI;
  }

  const taxableIncome = Math.max(0, grossSalary - totalDeductions);

  // ── Tax Computation ──────────────────────────────────────────
  const slabs = regime === 'old' ? OLD_REGIME_SLABS : NEW_REGIME_SLABS;
  let taxBeforeRebate = computeSlabTax(taxableIncome, slabs);

  // ── 87A Rebate ───────────────────────────────────────────────
  // Old: ≤ 5L income → full rebate up to ₹12,500
  // New: ≤ 7L income → full rebate up to ₹25,000
  let rebate87A = 0;
  if (regime === 'old' && taxableIncome <= 500000) {
    rebate87A = Math.min(taxBeforeRebate, 12500);
  } else if (regime === 'new' && taxableIncome <= 700000) {
    rebate87A = Math.min(taxBeforeRebate, 25000);
  }

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate87A);
  const surcharge = getSurcharge(taxableIncome, taxAfterRebate);
  const cess = Math.round((taxAfterRebate + surcharge) * 0.04);
  const totalTax = taxAfterRebate + surcharge + cess;
  const effectiveRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0;

  return {
    grossIncome: grossSalary,
    totalDeductions,
    taxableIncome,
    taxBeforeRebate,
    rebate87A,
    surcharge,
    cess,
    totalTax,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
  };
}

/**
 * Compares old and new regime, returns both breakdowns.
 */
export function compareRegimes(inputs: Omit<SimulatorInputs, 'regime'>) {
  const oldRegime = calculateTax({ ...inputs, regime: 'old' });
  const newRegime = calculateTax({ ...inputs, regime: 'new' });
  const betterRegime: 'old' | 'new' =
    oldRegime.totalTax <= newRegime.totalTax ? 'old' : 'new';
  const savings = Math.abs(oldRegime.totalTax - newRegime.totalTax);
  return { oldRegime, newRegime, betterRegime, savings };
}

/**
 * Formats a number as Indian currency string.
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a ruleId like "SECTION_80C_LIMIT" into
 * "Section 80C Limit" for display in ExplanationPanel.
 */
export function formatRuleId(ruleId: string): string {
  return ruleId
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
