// ============================================================
// ConsulTax — Session Management (§7)
// Session identifier generated client-side, stored in
// sessionStorage only — never persisted beyond the browser tab.
// ============================================================

const SESSION_KEY = 'consultax_session_id';

/**
 * Returns the current session ID from sessionStorage,
 * creating one if it doesn't exist.
 * Safe to call server-side (returns '' during SSR).
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/**
 * Clears all ConsulTax data from sessionStorage.
 * Called by the "Clear my data" control (§8 — non-negotiable).
 * There is no database step — nothing is written permanently.
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.clear();
  // Generate a fresh session ID so requests can continue
  sessionStorage.setItem(SESSION_KEY, crypto.randomUUID());
}

/**
 * Stores a value scoped to the current session.
 */
export function setSessionItem(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(`consultax_${key}`, JSON.stringify(value));
}

/**
 * Retrieves a value stored for the current session.
 */
export function getSessionItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(`consultax_${key}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
