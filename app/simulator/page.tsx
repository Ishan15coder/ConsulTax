'use client';
// ── What-If Simulator Page (Darkish Professional Simulator with #CFCEED Accent) ──

import { useState } from 'react';
import ScenarioSlider from '@/components/ScenarioSlider';
import RegimeComparison from '@/components/RegimeComparison';
import { compareRegimes, formatINR } from '@/lib/calculations';
import type { SimulatorInputs } from '@/lib/types';

const DEFAULTS: Omit<SimulatorInputs, 'regime'> = {
  grossSalary: 1200000,
  section80C: 120000,
  section80D: 18000,
  nps80CCD: 35000,
  homeLoanInterest: 0,
};

export default function SimulatorPage() {
  const [inputs, setInputs] = useState<Omit<SimulatorInputs, 'regime'>>(DEFAULTS);

  function set(key: keyof Omit<SimulatorInputs, 'regime'>, value: number) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const { oldRegime, newRegime, betterRegime, savings } = compareRegimes(inputs);

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '36px 24px 72px' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 10px',
            background: 'rgba(207, 206, 237, 0.15)',
            border: '1px solid rgba(207, 206, 237, 0.3)',
            borderRadius: 4,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#CFCEED',
            marginBottom: 10,
            fontFamily: 'Onest, sans-serif',
          }}
        >
          <span>Client-Side Computation</span>
          <span>·</span>
          <span>FY 2024-25 Slabs</span>
        </div>
        <h1 style={{ margin: '0 0 6px', fontSize: '1.75rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em', fontFamily: 'Onest, sans-serif' }}>
          Old vs. New Tax Regime Simulator
        </h1>
        <p style={{ margin: 0, color: '#CFCEED', fontSize: '0.95rem', maxWidth: 620 }}>
          Adjust your annual salary and deduction investments to calculate exact tax liability and discover which tax regime saves you more money.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 24, alignItems: 'start' }}>

        {/* Left Slider Input Controls Card */}
        <div className="tax-card" style={{ padding: '20px' }}>
          <div style={{ paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 2px', fontSize: '1rem', color: '#F8FAFC', fontFamily: 'Onest, sans-serif' }}>
              Adjust Inputs
            </h3>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#CFCEED' }}>
              Drag sliders to update income &amp; deductions
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <ScenarioSlider
              id="sim-salary"
              label="Gross Annual Salary"
              value={inputs.grossSalary}
              min={300000}
              max={10000000}
              step={50000}
              onChange={(v) => set('grossSalary', v)}
            />

            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 16, fontFamily: 'Onest, sans-serif' }}>
                Old Regime Deductions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <ScenarioSlider
                  id="sim-80c"
                  label="Section 80C Investments"
                  value={inputs.section80C}
                  min={0}
                  max={150000}
                  step={5000}
                  hint="PF, PPF, ELSS (Max ₹1.5L)"
                  onChange={(v) => set('section80C', v)}
                />
                <ScenarioSlider
                  id="sim-80d"
                  label="Section 80D Health Insurance"
                  value={inputs.section80D}
                  min={0}
                  max={100000}
                  step={1000}
                  hint="Mediclaim (Max ₹25k)"
                  onChange={(v) => set('section80D', v)}
                />
                <ScenarioSlider
                  id="sim-nps"
                  label="NPS 80CCD(1B)"
                  value={inputs.nps80CCD}
                  min={0}
                  max={50000}
                  step={1000}
                  hint="Addl. NPS (Max ₹50k)"
                  onChange={(v) => set('nps80CCD', v)}
                />
                <ScenarioSlider
                  id="sim-hli"
                  label="Home Loan Interest Sec 24(b)"
                  value={inputs.homeLoanInterest}
                  min={0}
                  max={200000}
                  step={5000}
                  hint="Max ₹2,00,000"
                  onChange={(v) => set('homeLoanInterest', v)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Tax Computation & Regime Comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Savings Highlight Box */}
          <div
            style={{
              background: 'rgba(207, 206, 237, 0.12)',
              border: '1px solid rgba(207, 206, 237, 0.3)',
              borderLeft: '5px solid #CFCEED',
              borderRadius: 8,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#CFCEED', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'Onest, sans-serif' }}>
                Recommended Tax Regime
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC', margin: '2px 0 4px', fontFamily: 'Onest, sans-serif' }}>
                {betterRegime === 'old' ? 'Old Tax Regime' : 'New Tax Regime'}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#CFCEED' }}>
                Saves you <strong style={{ color: '#10B981' }}>{formatINR(savings)}</strong> in total tax liability compared to the {betterRegime === 'old' ? 'New Regime' : 'Old Regime'}.
              </div>
            </div>

            <div
              style={{
                background: '#0E1D2F',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '10px 16px',
                borderRadius: 6,
                textAlign: 'right',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#CFCEED' }}>Net Tax Savings</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', fontFamily: 'Onest, sans-serif' }}>
                {formatINR(savings)}
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
            }}
          >
            <div className="tax-card" style={{ padding: '16px 20px', borderTop: `4px solid ${betterRegime === 'old' ? '#10B981' : 'rgba(255,255,255,0.1)'}` }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#CFCEED', textTransform: 'uppercase', marginBottom: 4 }}>
                Old Regime Total Tax
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: betterRegime === 'old' ? '#10B981' : '#F8FAFC', fontFamily: 'Onest, sans-serif' }}>
                {formatINR(oldRegime.totalTax)}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#CFCEED', marginTop: 2 }}>
                {oldRegime.effectiveRate}% effective tax rate
              </div>
            </div>

            <div className="tax-card" style={{ padding: '16px 20px', borderTop: `4px solid ${betterRegime === 'new' ? '#10B981' : 'rgba(255,255,255,0.1)'}` }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#CFCEED', textTransform: 'uppercase', marginBottom: 4 }}>
                New Regime Total Tax
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: betterRegime === 'new' ? '#10B981' : '#F8FAFC', fontFamily: 'Onest, sans-serif' }}>
                {formatINR(newRegime.totalTax)}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#CFCEED', marginTop: 2 }}>
                {newRegime.effectiveRate}% effective tax rate
              </div>
            </div>
          </div>

          {/* Full Side-by-side Regime Breakdown */}
          <RegimeComparison
            oldRegime={oldRegime}
            newRegime={newRegime}
            betterRegime={betterRegime}
            savings={savings}
          />
        </div>

      </div>
    </div>
  );
}
