'use client';
// ── Sidebar (TaxGPT Structural Inspiration with #8489B7 Accent) ───────────────────

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ClearDataButton from './ClearDataButton';

const NAV_ITEMS = [
  {
    href: '/',
    label: 'Analyze Input',
    desc: 'Income & Investment details',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    href: '/results',
    label: 'Tax Guidance',
    desc: 'Deductions & Scheme eligibility',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    href: '/simulator',
    label: 'Scenario Simulator',
    desc: 'Live old vs new regime',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    href: '/chat',
    label: 'Tax Q&A Copilot',
    desc: 'Grounded tax rules chat',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Sidebar Navigation"
      style={{
        width: 250,
        minWidth: 250,
        background: '#0B2239',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 60,
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: '#8489B7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'Onest, sans-serif',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: '#F9F7EE',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              ConsulTax
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                color: '#8489B7',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Tax Intelligence Copilot
            </div>
          </div>
        </Link>
      </div>

      {/* Main Navigation Group */}
      <div style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            color: '#8489B7',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0 8px 8px',
            fontFamily: 'Onest, sans-serif',
          }}
        >
          Workspace Tools
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  background: isActive ? '#8489B7' : 'transparent',
                  borderLeft: isActive ? '3px solid #8489B7' : '3px solid transparent',
                  color: isActive ? '#FFFFFF' : '#8489B7',
                  fontFamily: 'Onest, sans-serif',
                  transition: 'all 0.15s ease-in-out',
                }}
              >
                <div style={{ color: isActive ? '#FFFFFF' : '#8489B7' }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.855rem', fontWeight: isActive ? 700 : 500, lineHeight: 1.3 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: isActive ? '#FFFFFF' : '#8489B7' }}>
                    {item.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls / Session Privacy */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8489B7', fontFamily: 'Onest, sans-serif' }}>
              Ephemeral Session Mode
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.7rem', color: '#8489B7', lineHeight: 1.4 }}>
            Zero persistent data storage. Session purges on tab closure.
          </p>
        </div>

        {/* Clear Data Button */}
        <ClearDataButton compact />
      </div>
    </aside>
  );
}
