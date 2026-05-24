import { resolveImageUrl } from '@/lib/resolveImageUrl';

export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'am', label: 'Amharic' },
  { value: 'or', label: 'Oromo' },
  { value: 'ti', label: 'Tigrinya' },
];

export const NOTIFICATION_FIELDS = [
  { key: 'appointments', label: 'Appointments' },
  { key: 'agreements', label: 'Agreements' },
  { key: 'payments', label: 'Payments' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'reports', label: 'Reports' },
  { key: 'system', label: 'System updates' },
];

const DEFAULT_NOTIFICATIONS = {
  appointments: true,
  agreements: true,
  payments: true,
  reviews: false,
  reports: true,
  system: false,
};

const LEGACY_LANGUAGE_MAP = {
  english: 'en',
  amharic: 'am',
  oromo: 'or',
  tigrinya: 'ti',
};

export function normalizeLanguage(value) {
  if (!value) return 'en';
  const lower = String(value).toLowerCase();
  return LEGACY_LANGUAGE_MAP[lower] || lower;
}

export function languageLabel(code) {
  return LANGUAGE_OPTIONS.find((o) => o.value === code)?.label || code;
}

/** Map GET /api/v1/profile `data` to UI-friendly shape */
export function profileFromApi(data) {
  if (!data) return null;

  const firstName = data.firstName ?? data.first_name ?? '';
  const lastName = data.lastName ?? data.last_name ?? '';

  return {
    id: data.id,
    firstName,
    lastName,
    email: data.email ?? '',
    phone: data.phone ?? '',
    bio: data.bio ?? '',
    location: data.location ?? '',
    image: resolveImageUrl(data.image ?? data.avatar ?? '') ?? '',
    language: normalizeLanguage(data.language || data.preferredLanguage),
    emailVerified: Boolean(data.emailVerified),
    role: data.role,
    notificationPreferences: {
      ...DEFAULT_NOTIFICATIONS,
      ...(data.notificationPreferences || {}),
    },
  };
}

/** Merge PATCH /profile response into cached GET /profile payload */
export function mergeRawProfilePatch(raw, patch) {
  if (!raw || !patch) return raw;

  const parts = (patch.fullName || '').trim().split(/\s+/).filter(Boolean);

  return {
    ...raw,
    firstName: parts[0] ?? raw.firstName,
    lastName: parts.length > 1 ? parts.slice(1).join(' ') : raw.lastName,
    phone: patch.phone ?? raw.phone,
    location: patch.location ?? raw.location,
    bio: patch.bio ?? raw.bio,
    image: resolveImageUrl(patch.image ?? raw.image) ?? raw.image,
  };
}

export function buildPersonalInfoFormData({ firstName, lastName, phone, bio, avatarFile }) {
  const fd = new FormData();
  const fullName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  if (fullName.length >= 2) {
    fd.append('fullName', fullName);
  }
  if (phone?.trim()) {
    fd.append('phone', phone.trim());
  }
  if (bio !== undefined && bio !== null) {
    fd.append('bio', bio);
  }
  if (avatarFile) {
    fd.append('image', avatarFile);
  }

  return fd;
}

export function buildLocationFormData(location) {
  const fd = new FormData();
  fd.append('location', location ?? '');
  return fd;
}
