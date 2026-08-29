'use client';
// ── WarningBanner ────────────────────────────────────────────
// Professional notice panel for warnings[] from the API.

interface Props {
  warnings: string[];
}

export default function WarningBanner({ warnings }: Props) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div
      role="alert"
      aria-label="Important notices"
      style={{
        background: '#FFFBEB',
        border: '1px solid #F6D860',
        borderLeft: '3px solid #B7791F',
        borderRadius: 6,
        padding: '12px 16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          marginBottom: 8,
          color: '#B7791F',
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Notices
      </div>
      <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {warnings.map((w, i) => (
          <li key={i} style={{ fontSize: '0.855rem', color: '#78350F', lineHeight: 1.55 }}>
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
