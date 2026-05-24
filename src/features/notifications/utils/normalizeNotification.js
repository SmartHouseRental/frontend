/**
 * Maps backend NotificationType (+ payload hints) to UI tab categories.
 * Backend enum: MESSAGE_NEW, APPOINTMENT_BOOKED, APPOINTMENT_UPDATED,
 * PAYMENT_RECEIVED, PAYMENT_CONFIRMED
 */
export const NOTIFICATION_TABS = [
  { value: 'all', label: 'All' },
  { value: 'appointment', label: 'Appointments' },
  { value: 'agreement', label: 'Agreements' },
  { value: 'payment', label: 'Payments' },
  { value: 'message', label: 'Messages' },
  { value: 'system', label: 'System' },
];

const TYPE_TO_CATEGORY = {
  MESSAGE_NEW: 'message',
  APPOINTMENT_BOOKED: 'appointment',
  APPOINTMENT_UPDATED: 'appointment',
  PAYMENT_RECEIVED: 'payment',
  PAYMENT_CONFIRMED: 'payment',
};

function formatRelativeTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  if (diffMs < 0) return 'Just now';

  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function resolveCategory(notification) {
  const payload = notification.payload || {};
  const type = notification.type;

  if (payload.agreementId || payload.agreementPropertyId) {
    return 'agreement';
  }
  if (payload.reportId || payload.reportCategory) {
    return 'report';
  }
  if (payload.verificationState || type === 'SYSTEM' || notification.entityType === 'system') {
    return 'system';
  }

  return TYPE_TO_CATEGORY[type] || 'system';
}

export function normalizeNotification(raw) {
  if (!raw) return null;

  const read = raw.read !== undefined ? Boolean(raw.read) : Boolean(raw.readAt);
  const body = raw.body ?? raw.desc ?? '';

  return {
    id: raw.id,
    type: raw.type,
    category: resolveCategory(raw),
    title: raw.title ?? 'Notification',
    body,
    desc: body,
    read,
    readAt: raw.readAt ?? null,
    createdAt: raw.createdAt,
    time: formatRelativeTime(raw.createdAt),
    payload: raw.payload ?? null,
  };
}

export function filterByCategory(notifications, tab) {
  if (tab === 'all') return notifications;
  if (tab === 'report') {
    return notifications.filter((n) => n.category === 'report');
  }
  return notifications.filter((n) => n.category === tab);
}
