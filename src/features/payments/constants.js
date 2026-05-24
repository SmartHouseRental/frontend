export const paymentQueryDefaults = {
  staleTime: 30 * 1000,
  gcTime: 5 * 60 * 1000,
};

export const paymentKeys = {
  all: ['payments'],
  lists: () => [...paymentKeys.all, 'list'],
  list: (filters) => [...paymentKeys.lists(), filters],
  summary: () => [...paymentKeys.all, 'summary'],
};

export const OWNER_PAYMENT_STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'success', label: 'Confirmed' },
  { value: 'pending', label: 'Pending' },
];
