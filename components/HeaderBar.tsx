'use client';
// ── HeaderBar (Main Workspace Top Bar with #8489B7 Accent) ───────────────────────
// Contextual header bar inspired by TaxGPT's workspace inspector header.

import { usePathname } from 'next/navigation';

const PAGE_TITLES: { [key: string]: { title: string; subtitle: string } } = {
  '/': {
    title: 'Tax Document Analysis & Input',
    subtitle: 'Evaluate salary, deductions & allowances under Indian Tax Rules',
  },
  '/results': {
    title: 'Tax Guidance & Exemption Summary',
    subtitle: 'Verified deduction breakdown & scheme eligibility overview',
  },
  '/simulator': {
    title: 'What-If Scenario Simulator',
    subtitle: 'Real-time tax liability comparison (Old vs. New Regime)',
  },
  '/chat': {
    title: 'Grounded Tax Q&A Copilot',
    subtitle: 'Ask questions scoped strictly to vetted tax rules',
  },
};

export default function HeaderBar() {
  const pathname = usePathname();
  const current = PAGE_TITLES[pathname] || PAGE_TITLES['/'];

  return (
    <header
      style={{
        height: 52,
        background: '#0D1F33',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Active Page Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#FFFFFF',
            background: '#8489B7',
            padding: '2px 8px',
            borderRadius: 4,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontFamily: 'Onest, sans-serif',
          }}
        >
          FY 2024-25
        </span>
        <div>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F8FAFC', fontFamily: 'Onest, sans-serif' }}>
            {current.title}
          </span>
          <span style={{ fontSize: '0.78rem', color: '#8489B7', marginLeft: 8, display: 'inline-block' }}>
            · {current.subtitle}
          </span>
        </div>
      </div>

      {/* Compliance / Status Indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: '#8489B7',
            background: 'rgba(132, 137, 183, 0.15)',
            border: '1px solid rgba(132, 137, 183, 0.3)',
            padding: '2px 8px',
            borderRadius: 4,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'Onest, sans-serif',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Rules Engine Grounded
        </span>
      </div>
    </header>
  );
}
