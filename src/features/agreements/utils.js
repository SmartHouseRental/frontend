import { getLocalizedText } from '@/lib/utils/i18n';

export const AGREEMENT_STATUS_STYLES = {
  draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  sent: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  payment_pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
  cancelled: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  terminated: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  expired: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500',
};

export const PAYMENT_STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  success: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-rose-100 text-rose-700',
  expired: 'bg-slate-100 text-slate-600',
};

export const PAYMENT_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  success: 'Paid',
  failed: 'Failed',
  expired: 'Expired',
};

/** Backend: { status, message, data: { items, meta } } */
export function unwrapOwnerAgreementsList(response) {
  if (response?.status === 'error') {
    throw new Error(response?.message || 'Failed to load agreements');
  }
  return {
    items: response?.data?.items ?? [],
    meta: response?.data?.meta ?? { page: 1, limit: 20, total: 0 },
    warnings: response?.data?.warnings ?? [],
    partial: response?.data?.partial ?? false,
  };
}

/** Backend: { status, message, data: { agreement } } */
export function unwrapAgreementDetail(response) {
  if (response?.status === 'error') {
    throw new Error(response?.message || 'Failed to load agreement');
  }
  return response?.data?.agreement ?? null;
}

export function unwrapAgreementPayments(response) {
  if (response?.status === 'error') {
    throw new Error(response?.message || 'Failed to load payments');
  }
  const data = response?.data;
  return Array.isArray(data) ? data : [];
}

export function getRenterDisplayName(renter) {
  if (!renter) return 'Unknown renter';
  const name = [renter.first_name, renter.last_name].filter(Boolean).join(' ');
  return name || renter.email || 'Renter';
}

export function getRenterInitials(renter) {
  const name = getRenterDisplayName(renter);
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function getPropertyImage(property, lang = 'en') {
  const snapshot = property?.termsSnapshot;
  const images = property?.images ?? snapshot?.images;
  if (!images?.length) return null;
  const first = images[0];
  return typeof first === 'string' ? first : first?.url ?? null;
}

export function getAgreementStatusLabel(agreement) {
  if (agreement?.statusLabel) return agreement.statusLabel;
  const map = {
    draft: 'Draft',
    sent: 'Sent',
    payment_pending: 'Payment Pending',
    completed: 'Completed',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
    terminated: 'Terminated',
    expired: 'Expired',
  };
  return map[agreement?.status] ?? agreement?.status ?? 'Unknown';
}

export function formatCurrency(amount, currency = 'ETB') {
  if (amount == null || Number.isNaN(Number(amount))) return '—';
  const n = Number(amount);
  return `${n.toLocaleString()} ${currency}`;
}

export function formatDateRange(startDate, endDate, locale = 'en-US') {
  if (!startDate || !endDate) return '—';
  const opts = { month: 'short', day: 'numeric', year: 'numeric' };
  return `${new Date(startDate).toLocaleDateString(locale, opts)} – ${new Date(endDate).toLocaleDateString(locale, opts)}`;
}

export function formatShortDate(date, locale = 'en-US') {
  if (!date) return '—';
  return new Date(date).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getDepositDisplay(agreement) {
  if (agreement?.depositAmountEtb != null) {
    return formatCurrency(agreement.depositAmountEtb, 'ETB');
  }
  const orig = agreement?.depositOriginal;
  if (orig?.value != null) {
    return formatCurrency(orig.value, orig.currency || 'ETB');
  }
  const snap = agreement?.termsSnapshot?.leaseTerms?.secureDeposit;
  if (snap?.value != null) {
    return formatCurrency(snap.value, snap.currency || 'ETB');
  }
  return '—';
}

export function getTermsFromAgreement(agreement, lang = 'en') {
  const snap = agreement?.termsSnapshot;
  return {
    title: getLocalizedText(snap?.title ?? agreement?.property?.title, lang),
    address: getLocalizedText(snap?.address ?? agreement?.property?.address, lang),
    conditions: getLocalizedText(snap?.leaseTerms?.conditions, lang),
    monthlyRent: agreement?.monthlyRent,
    currency: agreement?.currency || 'ETB',
    leaseTerms: snap?.leaseTerms ?? null,
  };
}

export function findSecurityDepositPayment(payments) {
  if (!Array.isArray(payments)) return null;
  return (
    payments.find((p) => p.purpose === 'security_deposit') ??
    payments[0] ??
    null
  );
}

export function toDatetimeLocalValue(date) {
  const d = date instanceof Date ? date : new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function datetimeLocalToIso(value) {
  if (!value) return undefined;
  return new Date(value).toISOString();
}
