'use client';
// ── DisclaimerBanner (Yellow Dropdown Notice with Cut/Dismiss Button) ──
// Requirements:
// - Yellow notice background (#FEF08A)
// - Expandable dropdown details
// - Cut button to dismiss/hide the notice banner
// - §8 Compliance preserved

import { useState } from 'react';

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="yellow-notice-banner" role="banner" aria-label="Tax Notice Disclaimer">
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {/* Notice Summary Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
          <span style={{ fontSize: '1rem', flexShrink: 0 }}>⚠️</span>
          <span style={{ color: '#713F12', fontWeight: 600 }}>
            Tax Planning Notice: Automated guidance under Indian Tax Rules (FY 2024-25). Not a certified CA filing.
          </span>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            style={{
              background: 'rgba(113, 63, 18, 0.1)',
              border: '1px solid rgba(113, 63, 18, 0.25)',
              color: '#713F12',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            {expanded ? '▲ Hide Details' : '▼ View Full Disclaimer'}
          </button>
        </div>

        {/* Cut / Close Button */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Cut notice banner"
          title="Cut / Dismiss notice"
          style={{
            background: '#713F12',
            color: '#FEF08A',
            border: 'none',
            borderRadius: 4,
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontFamily: 'IBM Plex Sans, sans-serif',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
        >
          <span>✕</span>

        </button>
      </div>

      {/* Expandable Dropdown Content Drawer */}
      {expanded && (
        <div
          style={{
            maxWidth: 1240,
            margin: '10px auto 0',
            paddingTop: 10,
            borderTop: '1px solid rgba(113, 63, 18, 0.2)',
            fontSize: '0.8rem',
            color: '#854D0E',
            lineHeight: 1.5,
          }}
        >
          <p style={{ margin: '0 0 6px' }}>
            ConsulTax is a self-service tax planning and guidance engine. It calculates tax liabilities and evaluates Section 80C, 80D, 80CCD(1B), 10(13A), and 24(b) deductions strictly using deterministic rules.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Session Storage:</strong> All user inputs remain in ephemeral browser session storage and are never persisted to external databases.
          </p>
        </div>
      )}
    </div>
  );
}
