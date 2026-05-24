/** Shared TanStack Query options for owner dashboard */
export const ownerQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

export const ownerKeys = {
  all: ['owner'],
  overview: (range = 'monthly') => [...ownerKeys.all, 'overview', range],
};

export function isOwnerOverviewPath(pathname) {
  return pathname === '/owner' || pathname === '/owner/overview';
}
