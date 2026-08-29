'use client';
// ── ClearDataButton (TaxBuddy Light Navigation Style) ───────
// §8 Non-negotiable: 1-click reachable from every screen.

import { useState } from 'react';
import { clearSession } from '@/lib/session';

interface Props {
  compact?: boolean;
  onCleared?: () => void;
}

export default function ClearDataButton({ compact = false, onCleared }: Props) {
  const [toast, setToast] = useState(false);

  function handleClear() {
    clearSession();
    onCleared?.();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        id="clear-data-btn"
        onClick={handleClear}
        aria-label="Clear all my session data"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: compact ? '6px 12px' : '8px 16px',
          background: '#FFFFFF',
          color: '#475569',
          border: '1px solid #CBD5E1',
          borderRadius: 6,
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#DC2626';
          (e.currentTarget as HTMLButtonElement).style.color = '#DC2626';
          (e.currentTarget as HTMLButtonElement).style.background = '#FEF2F2';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#CBD5E1';
          (e.currentTarget as HTMLButtonElement).style.color = '#475569';
          (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF';
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
        Clear session data
      </button>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: '#0F172A',
            border: '1px solid #334155',
            borderRadius: 6,
            padding: '6px 12px',
            fontSize: '0.78rem',
            color: '#A7F3D0',
            whiteSpace: 'nowrap',
            zIndex: 200,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          ✓ Session data purged cleanly
        </div>
      )}
    </div>
  );
}
