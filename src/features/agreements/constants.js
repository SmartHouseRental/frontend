export const agreementQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

export const agreementKeys = {
  all: ['agreements'],
  ownerLists: () => [...agreementKeys.all, 'owner', 'list'],
  ownerList: (filters) => [...agreementKeys.ownerLists(), filters],
  details: () => [...agreementKeys.all, 'detail'],
  detail: (id) => [...agreementKeys.details(), id],
  payments: (id) => [...agreementKeys.all, 'payments', id],
};

export const AGREEMENT_STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'payment_pending', label: 'Payment pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'terminated', label: 'Terminated' },
  { value: 'expired', label: 'Expired' },
];
