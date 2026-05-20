import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';

const documentsQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

export const useDocuments = (options = {}) => {
  return useQuery({
    queryKey: profileKeys.documents(),
    queryFn: profileApi.getDocuments,
    staleTime: documentsQueryDefaults.staleTime,
    gcTime: documentsQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};
