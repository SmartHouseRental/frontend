import { useQuery } from '@tanstack/react-query';
import { ownerApi } from '../api';
import { ownerKeys, ownerQueryDefaults } from '../constants';

/**
 * Fetches aggregated owner dashboard data. Only call from the Overview page.
 */
export const useOwnerOverview = (range = 'monthly', options = {}) => {
  return useQuery({
    queryKey: ownerKeys.overview(range),
    queryFn: () => ownerApi.getOverview({ range }),
    staleTime: ownerQueryDefaults.staleTime,
    gcTime: ownerQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};
