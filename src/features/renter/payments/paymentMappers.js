import { getLocalizedStr } from '../agreements/agreementMappers';
import { PAYMENT_PURPOSE_LABELS, PAYMENT_STATUS_LABELS } from '../agreements/constants';

export function unwrapPaymentsData(response) {
  if (!response) return { payments: [], pagination: { page: 1, limit: 6, total: 0, totalPages: 0 } };
  const data = response.data ?? response;
  const payments = data.payments ?? [];
  const pagination = data.pagination ?? {
    page: 1,
    limit: payments.length,
    total: payments.length,
    totalPages: 1,
  };
  return { payments, pagination };
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

export function normalizePaymentRow(payment) {
  if (!payment) return null;

  const propertyTitle = getLocalizedStr(payment.agreement?.property?.title) || 'Property';
  const renter = payment.agreement?.renter;
  const renterName = renter
    ? `${renter.first_name || ''} ${renter.last_name || ''}`.trim()
    : '';

  return {
    ...payment,
    propertyTitle,
    renterName,
    purposeLabel: PAYMENT_PURPOSE_LABELS[payment.purpose] || payment.purpose,
    statusLabel: PAYMENT_STATUS_LABELS[payment.status] || payment.status,
    displayAmount: formatMoney(payment.amountEtb ?? payment.amount, 'ETB'),
    agreementId: payment.agreementId,
  };
}
