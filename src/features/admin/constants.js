/** Shared TanStack Query options for admin dashboard */
export const adminQueryDefaults = {
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
};

export const adminKeys = {
    all: ['admin'],
    overview: (range = 'monthly') => [...adminKeys.all, 'overview', range],
};
