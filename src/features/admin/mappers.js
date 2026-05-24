const UI_STATUS_STYLES = {
  success: 'bg-emerald-100 text-emerald-700',
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
  neutral: 'bg-slate-100 text-slate-600',
};

const PROPERTY_STATUS_MAP = {
  AVAILABLE: { label: 'Available', style: UI_STATUS_STYLES.success },
  PENDING: { label: 'Pending', style: UI_STATUS_STYLES.warning },
  RENTED: { label: 'Rented', style: UI_STATUS_STYLES.info },
  UNAVAILABLE: { label: 'Unavailable', style: UI_STATUS_STYLES.danger },
  MAINTENANCE: { label: 'Maintenance', style: UI_STATUS_STYLES.warning },
  RESTRICTED: { label: 'Restricted', style: UI_STATUS_STYLES.danger },
};

const AGREEMENT_STATUS_MAP = {
  draft: { label: 'Draft', style: UI_STATUS_STYLES.neutral },
  sent: { label: 'Sent', style: UI_STATUS_STYLES.info },
  payment_pending: { label: 'Payment Pending', style: UI_STATUS_STYLES.warning },
  completed: { label: 'Completed', style: UI_STATUS_STYLES.success },
  rejected: { label: 'Rejected', style: UI_STATUS_STYLES.danger },
  cancelled: { label: 'Cancelled', style: UI_STATUS_STYLES.danger },
  terminated: { label: 'Terminated', style: UI_STATUS_STYLES.danger },
  expired: { label: 'Expired', style: UI_STATUS_STYLES.neutral },
};

const REPORT_STATUS_MAP = {
  open: { label: 'Open', style: UI_STATUS_STYLES.warning },
  in_review: { label: 'In Review', style: UI_STATUS_STYLES.info },
  resolved: { label: 'Resolved', style: UI_STATUS_STYLES.success },
  dismissed: { label: 'Dismissed', style: UI_STATUS_STYLES.neutral },
};

const REVIEW_STATUS_MAP = {
  published: { label: 'Published', style: UI_STATUS_STYLES.success },
  flagged: { label: 'Flagged', style: UI_STATUS_STYLES.warning },
  removed: { label: 'Removed', style: UI_STATUS_STYLES.danger },
};

const USER_STATUS_MAP = {
  active: { label: 'Active', style: UI_STATUS_STYLES.success },
  suspended: { label: 'Suspended', style: UI_STATUS_STYLES.danger },
  pending: { label: 'Pending', style: UI_STATUS_STYLES.warning },
};

const VERIFICATION_STATE_MAP = {
  verified: { label: 'Verified', style: UI_STATUS_STYLES.success },
  pending: { label: 'Pending', style: UI_STATUS_STYLES.warning },
  rejected: { label: 'Rejected', style: UI_STATUS_STYLES.danger },
  resubmit: { label: 'Resubmit', style: UI_STATUS_STYLES.info },
};

const DEFAULT_STATUS_META = { label: 'Unknown', style: UI_STATUS_STYLES.neutral };

export function getPropertyStatusMeta(status) {
  return PROPERTY_STATUS_MAP[status] || DEFAULT_STATUS_META;
}

export function getAgreementStatusMeta(status) {
  return AGREEMENT_STATUS_MAP[status] || DEFAULT_STATUS_META;
}

export function getReportStatusMeta(status) {
  return REPORT_STATUS_MAP[status] || DEFAULT_STATUS_META;
}

export function getReviewStatusMeta(status) {
  return REVIEW_STATUS_MAP[status] || DEFAULT_STATUS_META;
}

export function getUserStatusMeta(status) {
  return USER_STATUS_MAP[status] || DEFAULT_STATUS_META;
}

export function getVerificationStateMeta(state) {
  return VERIFICATION_STATE_MAP[state] || DEFAULT_STATUS_META;
}

export function formatLocalizedText(value, fallback = '') {
  if (value == null || value === '') return fallback;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'object') {
    if (value.en != null && value.en !== '') return String(value.en);
    if (value.am != null && value.am !== '') return String(value.am);
    const firstString = Object.values(value).find((item) => typeof item === 'string' && item);
    return firstString ? String(firstString) : fallback;
  }
  return fallback;
}

/** Safe string for JSX — never returns objects */
export function toDisplayString(value, fallback = '') {
  return formatLocalizedText(value, fallback);
}

/** Stable React list keys from entity id or index */
export function getAdminItemKey(item, index = 0, prefix = '') {
  const rawId = item?.id ?? item?._id ?? item?.uuid;
  if (rawId != null && typeof rawId !== 'object') {
    const key = String(rawId);
    return prefix ? `${prefix}-${key}` : key;
  }
  return prefix ? `${prefix}-${index}` : `idx-${index}`;
}

export function formatPersonName(user) {
  if (!user) return 'Unknown';
  const name = `${user.first_name || ''} ${user.last_name || ''}`.trim();
  return name || user.email || user.id || 'Unknown';
}

/** Property category JSON → display string */
export function formatPropertyCategory(category) {
  if (!category) return 'Property';
  if (typeof category === 'string') return category;
  if (typeof category === 'object') {
    return (
      formatLocalizedText(category.type, '') ||
      formatLocalizedText(category, 'Property')
    );
  }
  return 'Property';
}

/** Property price JSON `{ value, currency }` or localized → display string */
export function formatPropertyPrice(price, fallback = '-') {
  if (price == null) return fallback;
  if (typeof price === 'number') return `${price.toLocaleString()} ETB`;
  if (typeof price === 'string') return price;
  if (typeof price === 'object') {
    if (price.value != null && price.value !== '') {
      const currency = price.currency || 'ETB';
      const amount = Number(price.value);
      return Number.isFinite(amount)
        ? `${amount.toLocaleString()} ${currency}`
        : `${price.value} ${currency}`;
    }
    return formatLocalizedText(price, fallback);
  }
  return fallback;
}
