export const renterQueryDefaults = {
  staleTime: 60 * 1000,
  gcTime: 5 * 60 * 1000,
};

export const renterKeys = {
  all: ['renter'],
  agreements: (filters = {}) => [...renterKeys.all, 'agreements', filters],
  agreement: (id) => [...renterKeys.all, 'agreement', id],
  depositStatus: (id) => [...renterKeys.all, 'deposit-status', id],
  agreementPayments: (id) => [...renterKeys.all, 'agreement-payments', id],
  reviews: () => [...renterKeys.all, 'reviews'],
  profile: () => [...renterKeys.all, 'profile'],
  preferences: () => [...renterKeys.all, 'preferences'],
};
