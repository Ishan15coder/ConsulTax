'use client';
// ── Separate Navigation Bar (Routes Only) ────────────────────
// User Directive: "nav bar should consist of the only navigation routes"
// Uses Onest font for nav routes with #8489B7 active background & #FFFFFF text.

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ROUTES = [
  { href: '/', label: 'Analyze Input' },
  { href: '/results', label: 'Tax Guidance' },
  { href: '/simulator', label: 'Scenario Simulator' },
  { href: '/chat', label: 'Tax Q&A Assistant' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="routes-navbar" aria-label="Navigation Routes Only">
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 24px',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {NAV_ROUTES.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                fontFamily: 'Onest, sans-serif',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                color: isActive ? '#FFFFFF' : '#8489B7',
                background: isActive ? '#8489B7' : 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
