// Non-technical users often type "mybusiness.com" instead of
// "https://mybusiness.com" — browsers' native URL validation rejects
// that, and a bare domain without a protocol renders as a broken relative
// link if saved as-is. This fixes both: called after we've already
// switched form fields to type="text" (so the browser doesn't block
// submission), then normalized here before it's saved.
export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
