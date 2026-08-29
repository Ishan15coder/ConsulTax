'use client';
// ── ConfidenceBadge ──────────────────────────────────────────
// Professional status indicator — restrained, unambiguous.
// No flashy badges. Reads like audit/compliance software.

import type { Confidence } from '@/lib/types';

interface Props {
  confidence: Confidence;
}

const CONFIG = {
  confirmed: {
    label: 'Rule Confirmed',
    className: 'badge badge-confirmed',
    tooltip:
      'This suggestion was validated by the deterministic rules engine. The AI-generated explanation aligns with the rule output.',
  },
  flagged: {
    label: 'Needs Verification',
    className: 'badge badge-flagged',
    tooltip:
      'Additional data may be required, or a discrepancy was detected between the rules engine and AI explanation. Verify manually before acting.',
  },
} as const;

export default function ConfidenceBadge({ confidence }: Props) {
  const cfg = CONFIG[confidence];

  return (
    <div className="tooltip-wrap">
      <span className={cfg.className} aria-label={`Confidence status: ${cfg.label}`}>
        {cfg.label}
      </span>
      <div className="tooltip-content" role="tooltip">
        {cfg.tooltip}
      </div>
    </div>
  );
}
