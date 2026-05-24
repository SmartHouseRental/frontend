import { getLocalizedText } from '@/lib/utils/i18n';

export function formatPropertyTitle(title, lang = 'en') {
  if (!title) return 'Property';
  if (typeof title === 'string') return title;
  return getLocalizedText(title, lang) || 'Property';
}

export function formatReviewDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getReviewerInitial(name) {
  if (!name || name === 'Anonymous') return '?';
  return name.trim().charAt(0).toUpperCase();
}
