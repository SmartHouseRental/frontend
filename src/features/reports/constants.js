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
