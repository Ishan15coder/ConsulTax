'use client';
// ── DeductionCard ─────────────────────────────────────────────
// Renders an eligible deduction item (Section 80C, 80D, HRA, NPS).
// Requirement §6: Silently return null if reason is empty string.

import type { Deduction } from '@/lib/types';
import { formatINR } from '@/lib/calculations';

interface Props {
  deduction: Deduction;
}

export default function DeductionCard({ deduction }: Props) {
  // Requirement §6: MUST silently return null if reason is empty string
  if (!deduction.reason || deduction.reason.trim() === '') {
    return null;
  }

  const isConfirmed = deduction.confidence === 'confirmed';

  return (
    <div
      className="tax-card"
      style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        borderLeft: `4px solid ${isConfirmed ? '#8489B7' : '#F59E0B'}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#F8FAFC' }}>
              {deduction.title}
            </h4>
            <span className="rule-id-code">{deduction.ruleId}</span>
          </div>
        </div>

        <span className={isConfirmed ? 'badge badge-confirmed' : 'badge badge-flagged'}>
          {isConfirmed ? '✓ Confirmed' : '⚠ Flagged'}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 10,
          background: '#0E1D2F',
          padding: '10px 14px',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: '#8489B7', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Eligible Amount
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#8489B7' }}>
            {formatINR(deduction.amount)}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', color: '#8489B7', lineHeight: 1.5, background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: 4 }}>
        <strong style={{ color: '#F8FAFC' }}>Rule Explanation:</strong> {deduction.reason}
      </div>
    </div>
  );
}
