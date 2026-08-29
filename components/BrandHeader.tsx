'use client';
// ── BrandHeader (Separated Logo & Website Name Top Bar) ────────
// Separates the logo, name ("ConsulTax"), and login/logout authentication controls.

import Link from 'next/link';
import AuthButton from './AuthButton';

export default function BrandHeader() {
  return (
    <header className="brand-header-bar" aria-label="Website Header">
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        {/* Separated Logo & Name */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 6,
              background: '#8489B7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(132, 137, 183, 0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'Onest, sans-serif',
                fontWeight: 800,
                fontSize: '1.35rem',
                color: '#F9F7EE',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              ConsulTax
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: '#8489B7',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Income Tax Guidance &amp; Calculator · FY 2024-25
            </div>
          </div>
        </Link>

        {/* Header Right Actions: Login / Logout Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Login / Logout Control */}
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
