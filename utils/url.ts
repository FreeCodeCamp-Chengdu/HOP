/**
 * Ensure the redirect target stays on the same origin.
 * Rejects any value that contains a scheme or starts with "//".
 */
export const sanitizeCallback = (raw: string) => (/^\/(?!\/)/.test(raw) ? raw : '/');
