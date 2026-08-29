'use client';
// ── AuthButton (Login / Logout Control with #8489B7 styling) ──
// Replaces Clear Session Data button with an interactive Login / Logout control.

import { useState, useEffect } from 'react';
import { clearSession } from '@/lib/session';

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('filer@consultax.in');

  useEffect(() => {
    const status = sessionStorage.getItem('is_logged_in');
    if (status === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem('is_logged_in', 'true');
    sessionStorage.setItem('user_email', emailInput);
    setIsLoggedIn(true);
    setShowModal(false);
  }

  function handleLogout() {
    clearSession();
    sessionStorage.removeItem('is_logged_in');
    sessionStorage.removeItem('user_email');
    setIsLoggedIn(false);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {isLoggedIn ? (
        /* Logged In View: User Avatar + Logout Button */
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 20,
              padding: '3px 10px 3px 6px',
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#8489B7',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Onest, sans-serif',
              }}
            >
              TA
            </div>
            <span style={{ fontSize: '0.78rem', color: '#F9F7EE', fontWeight: 500 }}>
              {sessionStorage.getItem('user_email') || 'filer@consultax.in'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: '6px 14px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#FCA5A5',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 6,
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Onest, sans-serif',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#DC2626';
              (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239, 68, 68, 0.15)';
              (e.currentTarget as HTMLButtonElement).style.color = '#FCA5A5';
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      ) : (
        /* Logged Out View: Login Button */
        <button
          id="login-btn"
          onClick={() => setShowModal(true)}
          style={{
            padding: '7px 18px',
            background: '#8489B7',
            color: '#FFFFFF',
            border: '1px solid #8489B7',
            borderRadius: 6,
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Onest, sans-serif',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 2px 6px rgba(132, 137, 183, 0.25)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#989CD0';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#989CD0';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#8489B7';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#8489B7';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Login
        </button>
      )}

      {/* Login Modal Popup */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            className="tax-card"
            style={{
              width: '100%',
              maxWidth: 380,
              padding: '24px',
              background: '#122338',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#F9F7EE', fontFamily: 'Onest, sans-serif' }}>
                Tax Filer Login
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#8489B7', fontSize: '1.1rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label" htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="input-field"
                  placeholder="filer@consultax.in"
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="input-label" htmlFor="login-pass">Password</label>
                <input
                  id="login-pass"
                  type="password"
                  required
                  defaultValue="••••••••"
                  className="input-field"
                  placeholder="Password"
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Sign In →
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
