'use client';
// ── DocumentInputForm (Darkish Form Workflow with #8489B7 Secondary Accent) ───

import { useState } from 'react';
import type { DocumentInput } from '@/lib/types';

interface Props {
  onSubmit: (doc: DocumentInput) => void;
  loading?: boolean;
}

interface FormErrors { [key: string]: string; }

const INITIAL_VALUES: DocumentInput = {
  grossSalary: 1200000,
  hra: 240000,
  rentPaid: 180000,
  otherIncome: 0,
  section80C: 120000,
  section80D: 18000,
  nps80CCD: 35000,
  homeLoanInterest: 0,
  homeLoanPrincipal: 0,
  city: 'metro',
  age: 32,
  regime: 'new',
};

function validateForm(values: DocumentInput): FormErrors {
  const errors: FormErrors = {};
  if (!values.grossSalary || values.grossSalary <= 0)
    errors.grossSalary = 'Gross salary must be greater than ₹0';
  if (values.hra < 0) errors.hra = 'HRA cannot be negative';
  if (values.rentPaid < 0) errors.rentPaid = 'Rent paid cannot be negative';
  if (values.section80C < 0 || values.section80C > 500000)
    errors.section80C = 'Must be between ₹0 and ₹5,00,000';
  if (values.section80D < 0 || values.section80D > 100000)
    errors.section80D = 'Must be between ₹0 and ₹1,00,000';
  if (values.nps80CCD < 0 || values.nps80CCD > 500000)
    errors.nps80CCD = 'Must be between ₹0 and ₹5,00,000';
  if (values.age < 18 || values.age > 120)
    errors.age = 'Age must be between 18 and 120';
  return errors;
}

function CurrencyField({
  label, id, value, onChange, hint, error, placeholder = '0',
}: {
  label: string; id: string; value: number; onChange: (val: number) => void; hint?: string; error?: string; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="input-label">{label}</label>
      <div className="currency-input-wrap">
        <span className="currency-prefix">₹</span>
        <input
          id={id}
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={placeholder}
          className={`input-field${error ? ' error' : ''}`}
        />
      </div>
      {hint && !error && (
        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#8489B7' }}>{hint}</p>
      )}
      {error && (
        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#EF4444', fontWeight: 500 }}>{error}</p>
      )}
    </div>
  );
}

export default function DocumentInputForm({ onSubmit, loading = false }: Props) {
  const [values, setValues] = useState<DocumentInput>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);

  function set(key: keyof DocumentInput, val: string | number) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const errs = validateForm(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(values);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Section 1: Income */}
        <div className="tax-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div
              style={{
                width: 26, height: 26, borderRadius: '50%', background: '#8489B7',
                color: '#FFFFFF', fontWeight: 800, fontSize: '0.8rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              1
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#F8FAFC' }}>Annual Income &amp; Allowances</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#8489B7' }}>Enter salary received per Form 16 / Pay Slip</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
            <CurrencyField
              label="Gross Annual Salary"
              id="grossSalary"
              value={values.grossSalary}
              onChange={(val) => set('grossSalary', val)}
              hint="Total salary before deductions"
              error={touched ? errors.grossSalary : undefined}
            />
            <CurrencyField
              label="HRA Received"
              id="hra"
              value={values.hra}
              onChange={(val) => set('hra', val)}
              hint="House Rent Allowance from employer"
              error={touched ? errors.hra : undefined}
            />
            <CurrencyField
              label="Annual Rent Paid"
              id="rentPaid"
              value={values.rentPaid}
              onChange={(val) => set('rentPaid', val)}
              hint="Actual rent paid for accommodation"
              error={touched ? errors.rentPaid : undefined}
            />
            <CurrencyField
              label="Other Income"
              id="otherIncome"
              value={values.otherIncome}
              onChange={(val) => set('otherIncome', val)}
              hint="FD Interest, Dividends, Freelance"
              error={touched ? errors.otherIncome : undefined}
            />
          </div>
        </div>

        {/* Section 2: Investments */}
        <div className="tax-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div
              style={{
                width: 26, height: 26, borderRadius: '50%', background: '#8489B7',
                color: '#FFFFFF', fontWeight: 800, fontSize: '0.8rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              2
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#F8FAFC' }}>Tax-Saving Deductions &amp; Investments</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#8489B7' }}>Deductions claimable under Old Tax Regime</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
            <CurrencyField
              label="Section 80C Investments"
              id="section80C"
              value={values.section80C}
              onChange={(val) => set('section80C', val)}
              hint="EPF, PPF, ELSS, LIC (Max ₹1.5L)"
              error={touched ? errors.section80C : undefined}
            />
            <CurrencyField
              label="Section 80D Health Insurance"
              id="section80D"
              value={values.section80D}
              onChange={(val) => set('section80D', val)}
              hint="Self & Family Mediclaim (Max ₹25k)"
              error={touched ? errors.section80D : undefined}
            />
            <CurrencyField
              label="NPS u/s 80CCD(1B)"
              id="nps80CCD"
              value={values.nps80CCD}
              onChange={(val) => set('nps80CCD', val)}
              hint="Additional NPS limit (Max ₹50k)"
              error={touched ? errors.nps80CCD : undefined}
            />
            <CurrencyField
              label="Home Loan Interest Sec 24(b)"
              id="homeLoanInterest"
              value={values.homeLoanInterest}
              onChange={(val) => set('homeLoanInterest', val)}
              hint="Self-occupied property (Max ₹2L)"
              error={touched ? errors.homeLoanInterest : undefined}
            />
          </div>
        </div>

        {/* Section 3: Parameters */}
        <div className="tax-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div
              style={{
                width: 26, height: 26, borderRadius: '50%', background: '#8489B7',
                color: '#FFFFFF', fontWeight: 800, fontSize: '0.8rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              3
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#F8FAFC' }}>Filing Category &amp; City</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#8489B7' }}>Determines HRA exemption rates and tax slabs</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
            <div>
              <label htmlFor="age" className="input-label">Age Group</label>
              <input
                id="age"
                type="number"
                min={18}
                max={120}
                value={values.age}
                onChange={(e) => set('age', Number(e.target.value))}
                className="input-field"
              />
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#8489B7' }}>Below 60 (Normal) / Senior Citizen</p>
            </div>

            <div>
              <label htmlFor="city" className="input-label">City Type for HRA</label>
              <select
                id="city"
                className="input-field"
                value={values.city}
                onChange={(e) => set('city', e.target.value as 'metro' | 'non-metro')}
              >
                <option value="metro">Metro (Delhi, Mumbai, Chennai, Kolkata)</option>
                <option value="non-metro">Non-Metro City</option>
              </select>
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#8489B7' }}>50% salary exemption for metro</p>
            </div>

            <div>
              <label htmlFor="regime" className="input-label">Default Tax Regime</label>
              <select
                id="regime"
                className="input-field"
                value={values.regime}
                onChange={(e) => set('regime', e.target.value as 'old' | 'new')}
              >
                <option value="new">New Tax Regime (FY 2024-25 Default)</option>
                <option value="old">Old Tax Regime (With Deductions)</option>
              </select>
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#8489B7' }}>We will compute both and recommend the best</p>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, paddingTop: 6 }}>
          <button
            id="analyze-submit-btn"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ padding: '12px 28px', fontSize: '0.95rem' }}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Computing Tax Liability...
              </>
            ) : (
              <>
                Calculate Tax &amp; Get Guidance →
              </>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#8489B7' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8489B7" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Session-scoped · Zero server storage
          </div>
        </div>

      </div>
    </form>
  );
}
