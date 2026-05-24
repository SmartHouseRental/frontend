import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api';
import { adminKeys, adminQueryDefaults } from '../constants';

export const useAdminProperties = (params = {}, options = {}) => {
  return useQuery({
    queryKey: adminKeys.properties(params),
    queryFn: () => adminApi.getProperties(params),
    staleTime: adminQueryDefaults.staleTime,
    gcTime: adminQueryDefaults.gcTime,
    ...options,
  });
};
