import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api';
import { adminKeys, adminQueryDefaults } from '../constants';

export const useAdminOverview = (range = 'monthly', options = {}) => {
    return useQuery({
        queryKey: adminKeys.overview(range),
        queryFn: () => adminApi.getOverview({ range }),
        staleTime: adminQueryDefaults.staleTime,
        gcTime: adminQueryDefaults.gcTime,
        refetchOnMount: false,
        ...options,
    });
};
