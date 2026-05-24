/** Backend AgreementStatus values */
export const AGREEMENT_STATUSES = [
  'draft',
  'sent',
  'payment_pending',
  'completed',
  'rejected',
  'cancelled',
  'terminated',
  'expired',
];

export const AGREEMENT_STATUS_LABELS = {
  draft: 'Draft',
  sent: 'Sent',
  payment_pending: 'Payment Pending',
  completed: 'Completed',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
  terminated: 'Terminated',
  expired: 'Expired',
};

export const AGREEMENT_FILTER_TABS = [
  { value: 'all', label: 'All' },
  { value: 'sent', label: 'Offers' },
  { value: 'payment_pending', label: 'Awaiting Payment' },
  { value: 'completed', label: 'Active' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'expired', label: 'Expired' },
];

export const PAYMENT_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  success: 'Paid',
  failed: 'Failed',
  expired: 'Expired',
};

export const PAYMENT_PURPOSE_LABELS = {
  security_deposit: 'Security Deposit',
  monthly_rent: 'Monthly Rent',
};
