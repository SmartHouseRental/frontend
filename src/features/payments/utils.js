import { getLocalizedText } from '@/lib/utils/i18n';
import { PAYMENT_STATUS_LABELS } from '@/features/agreements/utils';

export function unwrapPaymentsList(response) {
  if (response?.status === 'error') {
    throw new Error(response?.message || 'Failed to load payments');
  }

  const data = response?.data ?? response;
  const payments = data?.payments ?? [];
  const pagination = data?.pagination ?? {
    page: 1,
    limit: payments.length || 6,
    total: payments.length,
    totalPages: 1,
  };

  return { payments, pagination };
}

export function unwrapPaymentSummary(response) {
  if (response?.status === 'error') {
    throw new Error(response?.message || 'Failed to load payment summary');
  }
  return response?.data ?? { totalReceived: 0, pendingAmount: 0, thisMonth: 0 };
}

export function normalizeOwnerPayment(payment) {
  if (!payment) return null;

  const propertyTitle = getLocalizedText(payment.agreement?.property?.title) || 'Property';
  const renter = payment.agreement?.renter;
  const renterName = renter
    ? `${renter.first_name || ''} ${renter.last_name || ''}`.trim() || 'Renter'
    : 'Renter';

  return {
    id: payment.id,
    agreementId: payment.agreementId,
    propertyTitle,
    renterName,
    amount: payment.amountEtb ?? payment.amount,
    currency: payment.currency || 'ETB',
    status: payment.status,
    statusLabel:
      payment.status === 'success'
        ? 'Confirmed'
        : PAYMENT_STATUS_LABELS[payment.status] || payment.status,
    provider: payment.provider,
    purpose: payment.purpose,
    proofUrl: payment.proofUrl,
    createdAt: payment.createdAt,
    confirmedAt: payment.confirmedAt,
    paidAt: payment.paidAt,
  };
}

export function canOwnerConfirmPayment(payment) {
  if (!payment) return false;
  if (payment.status === 'success') return false;
  if (payment.provider === 'chapa' && payment.purpose === 'security_deposit') return false;
  return ['pending', 'processing'].includes(payment.status);
}

export function isPendingConfirmationStatus(status) {
  return status === 'pending' || status === 'processing';
}
