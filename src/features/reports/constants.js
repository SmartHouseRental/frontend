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
