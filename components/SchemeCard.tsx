'use client';
// ── SchemeCard ────────────────────────────────────────────────
// Renders a recommended tax-saving scheme (ELSS, NPS, Mediclaim, PPF).
// Requirement §6: Silently return null if reason is empty string.

import type { Scheme } from '@/lib/types';

interface Props {
  scheme: Scheme;
}

export default function SchemeCard({ scheme }: Props) {
  // Requirement §6: MUST silently return null if reason is empty string
  if (!scheme.reason || scheme.reason.trim() === '') {
    return null;
  }

  const isConfirmed = scheme.confidence === 'confirmed';

  return (
    <div
      className="tax-card"
      style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        borderTop: `3px solid ${isConfirmed ? '#8489B7' : '#F59E0B'}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#F8FAFC' }}>
              {scheme.title}
            </h4>
            <span className="rule-id-code">{scheme.ruleId}</span>
          </div>
        </div>

        <span className={isConfirmed ? 'badge badge-confirmed' : 'badge badge-flagged'}>
          {isConfirmed ? 'Eligible' : 'Conditional'}
        </span>
      </div>

      <div style={{ fontSize: '0.8rem', color: '#8489B7', lineHeight: 1.5, background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: 4 }}>
        <strong style={{ color: '#F8FAFC' }}>Vetted Rule Basis:</strong> {scheme.reason}
      </div>
    </div>
  );
}
