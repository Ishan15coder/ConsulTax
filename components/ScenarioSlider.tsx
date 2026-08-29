'use client';
// ── ScenarioSlider (Darkish Theme Interactive Slider with #8489B7 Fill) ──

import { formatINR } from '@/lib/calculations';

interface Props {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  hint?: string;
  currency?: boolean;
}

export default function ScenarioSlider({
  id,
  label,
  value,
  min,
  max,
  step = 1000,
  onChange,
  hint,
  currency = true,
}: Props) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <label
          htmlFor={id}
          style={{
            fontSize: '0.82rem',
            fontWeight: 500,
            color: '#F8FAFC',
            fontFamily: 'Onest, sans-serif',
          }}
        >
          {label}
          {hint && (
            <span style={{ marginLeft: 6, fontSize: '0.72rem', color: '#8489B7', fontWeight: 400 }}>
              {hint}
            </span>
          )}
        </label>
        <span
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#8489B7',
            fontFamily: 'Onest, sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          {currency ? formatINR(value) : value.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Track with #8489B7 fill */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: 4,
            width: `${pct}%`,
            background: '#8489B7',
            borderRadius: 100,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: 'relative', zIndex: 2, background: 'transparent' }}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#8489B7' }}>
        <span>{currency ? formatINR(min) : min.toLocaleString('en-IN')}</span>
        <span>{currency ? formatINR(max) : max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}
