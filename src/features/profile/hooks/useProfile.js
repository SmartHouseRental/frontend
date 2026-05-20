import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';

const profileQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

export const useProfile = (options = {}) => {
  return useQuery({
    queryKey: profileKeys.details(),
    queryFn: profileApi.getProfile,
    staleTime: profileQueryDefaults.staleTime,
    gcTime: profileQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};
