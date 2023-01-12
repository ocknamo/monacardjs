/**
 * TODO: Use libraries instead of proprietary implementations.
 * Escape html characters.
 * '&' to '&amp;'
 * '<' to '&lt;'
 * '>' to '&gt;'
 * '"' to '&quot;'
 * `'` to '&#039;'
 * @param text User input text.
 * @returns Escaped text.
 */
export function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll(`'`, '&#039;');
}
