import type { Metadata } from 'next';
import './globals.css';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import BrandHeader from '@/components/BrandHeader';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'ConsulTax — Tax Guidance & Income Tax Assistant',
  description:
    'Calculate your income tax, compare Old vs New tax regime, and discover Section 80C, HRA, and NPS deductions with explainable rules engine guidance.',
  keywords: ['tax guidance', 'tax deductions', 'tax saving schemes', 'India income tax', '80C', 'NPS'],
  robots: 'index, follow',
  openGraph: {
    title: 'ConsulTax — Tax Guidance & Income Tax Assistant',
    description: 'Explainable income tax guidance & regime comparison for FY 2024-25.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-page)' }}>
          {/* Yellow Dropdown Disclaimer Notice Banner with Cut/Dismiss Button */}
          <DisclaimerBanner />

          {/* Separated Website Logo & Name Header */}
          <BrandHeader />

          {/* Navigation Bar (Consists STRICTLY of Navigation Routes ONLY) */}
          <NavBar />

          {/* Main Content Workspace */}
          <main style={{ flex: 1, paddingBottom: 60 }}>{children}</main>

          {/* Clean Footer */}
          <footer
            style={{
              background: '#08121E',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '20px 24px',
              fontSize: '0.8rem',
              color: '#94A3B8',
            }}
          >
            <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <strong style={{ color: '#F8FAFC' }}>ConsulTax</strong> · FY 2024-25 Income Tax Assistant
              </div>
              <div>
                Privacy First · Grounded Rules Engine Guidance
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
