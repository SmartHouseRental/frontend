import { AGREEMENT_STATUS_LABELS, PAYMENT_PURPOSE_LABELS, PAYMENT_STATUS_LABELS } from './constants';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';

export function getLocalizedStr(field) {
  if (!field) return '';
  if (typeof field === 'object') return field.en || field.am || '';
  return String(field);
}

export function unwrapApiData(response) {
  if (!response) return null;
  return response.data ?? response;
}

export function formatOwnerName(owner) {
  if (!owner) return 'Property Owner';
  const name = `${owner.first_name || ''} ${owner.last_name || ''}`.trim();
  return name || 'Property Owner';
}

export function formatMoney(amount, currency = 'ETB') {
  if (amount == null || Number.isNaN(Number(amount))) return '—';
  const num = Number(amount);
  const formatted = new Intl.NumberFormat('en-ET', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
  return `${formatted} ${currency}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString();
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
}

export function getPropertyImage(property) {
  const img = property?.images?.[0];
  return img || PLACEHOLDER_IMAGE;
}

export function normalizePayment(payment) {
  if (!payment) return null;
  return {
    ...payment,
    purposeLabel: PAYMENT_PURPOSE_LABELS[payment.purpose] || payment.purpose,
    statusLabel: PAYMENT_STATUS_LABELS[payment.status] || payment.status,
    displayAmount: formatMoney(payment.amountEtb ?? payment.amount, 'ETB'),
  };
}

export function normalizeAgreement(raw) {
  if (!raw) return null;

  const property = raw.property || {};
  const owner = raw.owner || {};
  const payments = Array.isArray(raw.payments)
    ? raw.payments.map(normalizePayment).filter(Boolean)
    : [];

  const status = raw.status;
  const statusLabel =
    raw.statusLabel || AGREEMENT_STATUS_LABELS[status] || status;

  return {
    ...raw,
    status,
    statusLabel,
    propertyTitle: getLocalizedStr(property.title) || 'Property',
    propertyAddress:
      getLocalizedStr(property.address) ||
      getLocalizedStr(property.location) ||
      'Address not available',
    propertyImage: getPropertyImage(property),
    ownerName: formatOwnerName(owner),
    ownerId: owner.id || raw.ownerId,
    monthlyRentFormatted: formatMoney(raw.monthlyRent, raw.currency || 'ETB'),
    depositFormatted: formatMoney(raw.depositAmountEtb, 'ETB'),
    startDateFormatted: formatDate(raw.startDate),
    endDateFormatted: formatDate(raw.endDate),
    offerExpiresFormatted: formatDate(raw.offerExpiresAt),
    sentAtFormatted: formatDateTime(raw.sentAt),
    activatedAtFormatted: formatDateTime(raw.activatedAt),
    payments,
    canAccept: status === 'sent',
    canReject: status === 'sent',
    canPayDeposit: status === 'payment_pending',
    canCancel: ['sent', 'payment_pending'].includes(status),
    isOfferExpired:
      status === 'expired' ||
      (raw.offerExpiresAt &&
        ['sent', 'payment_pending'].includes(status) &&
        new Date(raw.offerExpiresAt) < new Date()),
  };
}

export function extractAgreementList(response) {
  const data = unwrapApiData(response);
  const items = data?.items ?? [];
  const meta = data?.meta ?? { page: 1, limit: 20, total: items.length };
  return {
    items: items.map(normalizeAgreement).filter(Boolean),
    meta,
  };
}

export function extractAgreementDetail(response) {
  const data = unwrapApiData(response);
  const agreement = data?.agreement ?? data;
  return normalizeAgreement(agreement);
}

export function extractDepositCheckout(response) {
  return unwrapApiData(response);
}

export function extractDepositStatus(response) {
  const data = unwrapApiData(response);
  if (!data) return null;
  const { payment, agreementStatus, ...rest } = data;
  return {
    ...normalizeAgreement(rest),
    agreementStatus: agreementStatus || rest.status,
    payment: payment ? normalizePayment(payment) : null,
  };
}
