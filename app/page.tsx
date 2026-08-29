'use client';
// ── Landing Page / Document Input (Left/Right Hero Layout with #8489B7 Secondary Accent) ──

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DocumentInputForm from '@/components/DocumentInputForm';
import { getSessionId, setSessionItem } from '@/lib/session';
import type { DocumentInput, AnalyzeResponse } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(doc: DocumentInput) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: doc, sessionId: getSessionId() }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: AnalyzeResponse = await res.json();
      setSessionItem('analyze_result', data);
      setSessionItem('analyze_input', doc);
      router.push('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 24px 72px' }}>

      {/* TaxGPT Bifurcated Split Hero Section (Left / Right Layout) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 40,
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN: Hero Copy + Value Props + Stepper */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 14px',
              background: 'rgba(132, 137, 183, 0.15)',
              border: '1px solid rgba(132, 137, 183, 0.3)',
              borderRadius: 20,
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#8489B7',
              marginBottom: 20,
              fontFamily: 'Onest, sans-serif',
            }}
          >
            <span>FY 2024-25 (AY 2025-26)</span>
            <span>·</span>
            <span>Standard Deduction ₹75,000</span>
          </div>

          {/* Headline: Onest 64px max #F9F7EE */}
          <h1
            style={{
              margin: '0 0 20px',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              color: '#F9F7EE',
              fontFamily: 'Onest, sans-serif',
              letterSpacing: '-0.025em',
              lineHeight: 1.12,
            }}
          >
            AI tax assistant for tax professionals and businesses
          </h1>

          {/* Subtext: 16px system-ui #8489B7 secondary color */}
          <p
            style={{
              margin: '0 0 28px',
              fontSize: '16px',
              color: '#8489B7',
              lineHeight: 1.65,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Cut down tax research time by 99% with your personalized AI tax assistant. Get answers to complex tax questions, analyze deductions, compare Old vs New tax regime, and optimize Section 80C, 80D &amp; HRA exemptions.
          </p>

          {/* Feature Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {[
              'Built-in hallucination control',
              'Every answer cited with exact Income Tax Rule ID',
              'Authoritative Indian Tax Act rules corpus only',
              'Instant Old vs. New Regime tax comparison',
            ].map((feature) => (
              <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#10B981', fontWeight: 800, fontSize: '0.95rem' }}>✓</span>
                <span style={{ fontSize: '0.9rem', color: '#F9F7EE', fontWeight: 500, fontFamily: 'Onest, sans-serif' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Stepper Cards Stacked on Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {[
              { step: '01', title: 'Income & Salary Inputs', desc: 'Gross salary, HRA allowance & rent details' },
              { step: '02', title: 'Tax Deductions & Exemptions', desc: 'Section 80C, 80D, NPS 80CCD & Home Loan' },
              { step: '03', title: 'Instant Regime Recommendation', desc: 'Side-by-side Old vs New tax savings report' },
            ].map((s, idx) => (
              <div
                key={s.step}
                className="tax-card"
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  borderLeft: idx === 0 ? '4px solid #8489B7' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: idx === 0 ? '#8489B7' : 'rgba(255,255,255,0.06)',
                    color: idx === 0 ? '#FFFFFF' : '#8489B7',
                    fontWeight: 800, fontSize: '0.8rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: 'Onest, sans-serif',
                  }}
                >
                  {s.step}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F9F7EE', fontFamily: 'Onest, sans-serif' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#8489B7' }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Trust Card */}
          <div className="tax-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: '0.9rem' }}>🛡</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F9F7EE', fontFamily: 'Onest, sans-serif' }}>
                100% Private &amp; Ephemeral
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#8489B7', lineHeight: 1.5 }}>
              Your tax inputs are computed locally in ephemeral memory and automatically purged when you close the tab.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Document & Income Input Workspace Form */}
        <div>
          {error && (
            <div
              role="alert"
              style={{
                marginBottom: 20,
                padding: '12px 16px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderLeft: '4px solid #EF4444',
                borderRadius: 6,
                color: '#FCA5A5',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              ⚠ {error}
            </div>
          )}

          <DocumentInputForm onSubmit={handleSubmit} loading={loading} />
        </div>

      </div>

    </div>
  );
}
