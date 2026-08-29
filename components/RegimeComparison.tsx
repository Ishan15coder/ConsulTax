'use client';
// ── RegimeComparison (Side-by-side Old vs New Tax Regime) ────
// Clean table comparison with #8489B7 accent styling.

import type { TaxBreakdown } from '@/lib/types';
import { formatINR } from '@/lib/calculations';

interface Props {
  oldRegime: TaxBreakdown;
  newRegime: TaxBreakdown;
  betterRegime: 'old' | 'new';
  savings: number;
}

export default function RegimeComparison({
  oldRegime,
  newRegime,
  betterRegime,
  savings,
}: Props) {
  return (
    <div className="tax-card" style={{ padding: '24px' }}>
      <div style={{ paddingBottom: 16, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '1.15rem', color: '#F8FAFC' }}>
          Detailed Slab Breakdown &amp; Comparison
        </h3>
        <p style={{ margin: 0, fontSize: '0.82rem', color: '#8489B7' }}>
          Computed under FY 2024-25 Income Tax Slabs &amp; Rules
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Old Regime Card */}
        <div
          style={{
            padding: '16px 18px',
            borderRadius: 8,
            background: betterRegime === 'old' ? 'rgba(132, 137, 183, 0.12)' : '#0E1D2F',
            border: `1px solid ${betterRegime === 'old' ? '#8489B7' : 'rgba(255,255,255,0.1)'}`,
            borderTop: `3px solid ${betterRegime === 'old' ? '#8489B7' : 'rgba(255,255,255,0.15)'}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>Old Tax Regime</span>
            {betterRegime === 'old' && (
              <span className="badge badge-confirmed">Recommended</span>
            )}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: betterRegime === 'old' ? '#8489B7' : '#F8FAFC' }}>
            {formatINR(oldRegime.totalTax)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#8489B7', marginTop: 2 }}>
            Effective Rate: {oldRegime.effectiveRate}%
          </div>
        </div>

        {/* New Regime Card */}
        <div
          style={{
            padding: '16px 18px',
            borderRadius: 8,
            background: betterRegime === 'new' ? 'rgba(132, 137, 183, 0.12)' : '#0E1D2F',
            border: `1px solid ${betterRegime === 'new' ? '#8489B7' : 'rgba(255,255,255,0.1)'}`,
            borderTop: `3px solid ${betterRegime === 'new' ? '#8489B7' : 'rgba(255,255,255,0.15)'}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>New Tax Regime</span>
            {betterRegime === 'new' && (
              <span className="badge badge-confirmed">Recommended</span>
            )}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: betterRegime === 'new' ? '#8489B7' : '#F8FAFC' }}>
            {formatINR(newRegime.totalTax)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#8489B7', marginTop: 2 }}>
            Effective Rate: {newRegime.effectiveRate}%
          </div>
        </div>
      </div>

      {/* Comparison Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', color: '#8489B7', fontWeight: 600 }}>Component</th>
              <th style={{ padding: '10px 12px', color: '#8489B7', fontWeight: 600, textAlign: 'right' }}>Old Regime</th>
              <th style={{ padding: '10px 12px', color: '#8489B7', fontWeight: 600, textAlign: 'right' }}>New Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <td style={{ padding: '10px 12px', color: '#F8FAFC' }}>Gross Total Income</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F8FAFC' }}>{formatINR(oldRegime.taxableIncome + oldRegime.totalDeductions)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F8FAFC' }}>{formatINR(newRegime.taxableIncome + newRegime.totalDeductions)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <td style={{ padding: '10px 12px', color: '#F8FAFC' }}>Total Exemptions &amp; Deductions</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#8489B7', fontWeight: 600 }}>- {formatINR(oldRegime.totalDeductions)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#8489B7', fontWeight: 600 }}>- {formatINR(newRegime.totalDeductions)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <td style={{ padding: '10px 12px', color: '#F8FAFC', fontWeight: 700 }}>Net Taxable Income</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F8FAFC', fontWeight: 700 }}>{formatINR(oldRegime.taxableIncome)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F8FAFC', fontWeight: 700 }}>{formatINR(newRegime.taxableIncome)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <td style={{ padding: '10px 12px', color: '#F8FAFC' }}>Base Income Tax</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F8FAFC' }}>{formatINR(oldRegime.taxBeforeRebate)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F8FAFC' }}>{formatINR(newRegime.taxBeforeRebate)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <td style={{ padding: '10px 12px', color: '#F8FAFC' }}>Sec 87A Rebate</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#8489B7' }}>- {formatINR(oldRegime.rebate87A)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#8489B7' }}>- {formatINR(newRegime.rebate87A)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <td style={{ padding: '10px 12px', color: '#F8FAFC' }}>Health &amp; Education Cess (4%)</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F8FAFC' }}>{formatINR(oldRegime.cess)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F8FAFC' }}>{formatINR(newRegime.cess)}</td>
            </tr>
            <tr style={{ background: '#0E1D2F' }}>
              <td style={{ padding: '12px 12px', color: '#F8FAFC', fontWeight: 800, fontSize: '0.95rem' }}>Net Tax Payable</td>
              <td style={{ padding: '12px 12px', textAlign: 'right', color: betterRegime === 'old' ? '#8489B7' : '#F8FAFC', fontWeight: 800, fontSize: '1rem' }}>{formatINR(oldRegime.totalTax)}</td>
              <td style={{ padding: '12px 12px', textAlign: 'right', color: betterRegime === 'new' ? '#8489B7' : '#F8FAFC', fontWeight: 800, fontSize: '1rem' }}>{formatINR(newRegime.totalTax)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: '14px 18px',
          background: 'rgba(132, 137, 183, 0.12)',
          borderLeft: '4px solid #8489B7',
          borderRadius: 6,
          fontSize: '0.85rem',
          color: '#8489B7',
        }}
      >
        <strong style={{ color: '#F8FAFC' }}>Regime Recommendation:</strong> The{' '}
        <strong style={{ color: '#8489B7' }}>
          {betterRegime === 'old' ? 'Old Tax Regime' : 'New Tax Regime'}
        </strong>{' '}
        results in lower overall tax liability by <strong style={{ color: '#8489B7' }}>{formatINR(savings)}</strong>.
      </div>
    </div>
  );
}
