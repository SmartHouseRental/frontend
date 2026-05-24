/**
 * Pick a localized string from API fields shaped as { en, am } or plain strings.
 * Falls back: requested locale → en → am → first string value.
 */
export function getLocalizedField(field, locale = 'en') {
  if (field == null || field === '') return '';

  if (typeof field === 'string') return field;

  if (typeof field === 'object') {
    const primary = field[locale];
    if (typeof primary === 'string' && primary.trim()) return primary;

    const en = field.en;
    if (typeof en === 'string' && en.trim()) return en;

    const am = field.am;
    if (typeof am === 'string' && am.trim()) return am;

    const fallback = Object.values(field).find(
      (v) => typeof v === 'string' && v.trim(),
    );
    return fallback || '';
  }

  return String(field);
}
