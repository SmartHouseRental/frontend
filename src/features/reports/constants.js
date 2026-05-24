export const reportQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

export const reportKeys = {
  all: ['reports'],
  ownerLists: () => [...reportKeys.all, 'owner', 'list'],
  ownerList: (filters) => [...reportKeys.ownerLists(), filters],
  ownerDetail: (id) => [...reportKeys.all, 'owner', 'detail', id],
};

export const REPORT_STATUS_LABELS = {
  open: 'Open',
  in_review: 'Under Review',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
};

export const REPORT_STATUS_COLORS = {
  open: 'bg-amber-100 text-amber-700',
  in_review: 'bg-blue-100 text-blue-700',
  resolved: 'bg-emerald-100 text-emerald-700',
  dismissed: 'bg-slate-100 text-slate-600',
};

/** Frontend report categories (backend accepts free-text `category`, no enum). */
export const REPORT_CATEGORIES = [
  { value: 'false_advertising', label: 'False advertising' },
  { value: 'fraud', label: 'Fraud or scam' },
  { value: 'inappropriate_behavior', label: 'Inappropriate behavior' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'spam', label: 'Spam' },
  { value: 'other', label: 'Other' },
];

export const REPORT_DESCRIPTION_MIN = 10;
export const REPORT_DESCRIPTION_MAX = 2000;

/** Backend: memoryUpload.array('images', 10), 10 MB per file */
export const REPORT_IMAGES_MAX = 10;
export const REPORT_IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const REPORT_IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';
export const REPORT_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
