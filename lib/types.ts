// ============================================================
// ConsulTax — Shared Types (API Contract §6)
// ============================================================

export type Confidence = 'confirmed' | 'flagged';

export interface Deduction {
  title: string;
  ruleId: string;
  reason: string;          // plain-language — MUST be non-empty to render
  amount: number;
  confidence: Confidence;
}

export interface Scheme {
  title: string;
  ruleId: string;
  reason: string;          // plain-language — MUST be non-empty to render
  confidence: Confidence;
}

export interface AnalyzeResponse {
  deductions: Deduction[];
  schemes: Scheme[];
  warnings: string[];
}

// ── Document Input ───────────────────────────────────────────
export interface DocumentInput {
  // Income
  grossSalary: number;
  hra: number;
  rentPaid: number;
  otherIncome: number;
  // Investments / Deductions
  section80C: number;       // PF, ELSS, LIC, PPF, etc.
  section80D: number;       // Medical insurance premium
  nps80CCD: number;         // NPS contribution (80CCD(1B))
  homeLoanInterest: number; // 24(b)
  homeLoanPrincipal: number; // 80C component
  // Personal
  city: 'metro' | 'non-metro';
  age: number;
  regime: 'old' | 'new';
}

export interface AnalyzeRequest {
  document: DocumentInput;
  sessionId: string;
}

// ── Simulator ────────────────────────────────────────────────
export interface SimulatorInputs {
  grossSalary: number;
  section80C: number;
  section80D: number;
  nps80CCD: number;
  homeLoanInterest: number;
  regime: 'old' | 'new';
}

export interface TaxBreakdown {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate87A: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
}

// ── Chat ─────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  outOfScope?: boolean;
}
