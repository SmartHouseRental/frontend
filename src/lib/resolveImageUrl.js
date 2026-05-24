import { apiClient } from '@/lib/apiClient';

export const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/400x300?text=No+Image';

function getAssetBaseUrl() {
  const configUrl =
    apiClient.defaults.baseURL || import.meta.env.VITE_API_URL || '';
  return configUrl.replace(/\/api\/v1\/?$/, '');
}

/**
 * Turn API-relative or partial image paths into absolute URLs.
 * Leaves blob/data URLs and absolute http(s) URLs unchanged.
 */
export function resolveImageUrl(url) {
  if (url == null || url === '') return null;

  const trimmed = String(url).trim();
  if (!trimmed) return null;

  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    /^https?:\/\//i.test(trimmed)
  ) {
    return trimmed;
  }

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  const base = getAssetBaseUrl();
  if (!base) return trimmed;

  if (trimmed.startsWith('/')) {
    return `${base}${trimmed}`;
  }

  return `${base}/${trimmed}`;
}

export function getPropertyImageUrl(property) {
  const raw =
    property?.image ??
    (Array.isArray(property?.images) ? property.images[0] : null);
  return resolveImageUrl(raw) || PLACEHOLDER_IMAGE;
}
