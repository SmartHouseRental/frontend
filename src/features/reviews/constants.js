export const reviewQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

export const reviewKeys = {
  all: ['reviews'],
  ownerLists: () => [...reviewKeys.all, 'owner', 'list'],
  ownerList: (filters) => [...reviewKeys.ownerLists(), filters],
  ownerStats: () => [...reviewKeys.all, 'owner', 'stats'],
};
