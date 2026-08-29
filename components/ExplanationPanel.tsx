'use client';
// ── ExplanationPanel (Darkish Theme Audit Panel with #8489B7 Accent) ─────────
// "Show why" — structured audit panel explaining rule triggers.

import { useState } from 'react';
import { formatRuleId } from '@/lib/calculations';

interface Props {
  ruleId: string;
  reason: string;
}

export default function ExplanationPanel({ ruleId, reason }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          background: 'transparent',
          border: 'none',
          color: '#8489B7',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '2px 0',
          fontFamily: 'Onest, sans-serif',
          transition: 'color 0.15s',
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        {open ? 'Hide explanation' : 'Show explanation'}
      </button>

      {open && (
        <div
          style={{
            marginTop: 10,
            padding: '12px 14px',
            background: '#0E1D2F',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
          }}
        >
          {/* Rule reference row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: '#8489B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Rule Reference
            </span>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: '#F8FAFC',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.08)',
                padding: '2px 7px',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {ruleId}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#8489B7' }}>
              {formatRuleId(ruleId)}
            </span>
          </div>

          {/* Plain-language reason */}
          <p
            style={{
              margin: 0,
              fontSize: '0.855rem',
              color: '#8489B7',
              lineHeight: 1.65,
            }}
          >
            {reason}
          </p>
        </div>
      )}
    </div>
  );
}
