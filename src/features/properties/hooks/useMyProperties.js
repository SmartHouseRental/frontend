import { useQuery } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from '../constants';

const propertyQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

/** Only use on My Properties (and pages that explicitly need the full list). */
export const useMyProperties = (options = {}) => {
  return useQuery({
    queryKey: propertyKeys.myProperties(),
    queryFn: propertyApi.getMyProperties,
    staleTime: propertyQueryDefaults.staleTime,
    gcTime: propertyQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};

/** Only use on Analytics page. */
export const usePropertyAnalytics = (options = {}) => {
  const { enabled = true, ...rest } = options;
  return useQuery({
    queryKey: propertyKeys.analytics(),
    queryFn: propertyApi.getAnalytics,
    staleTime: propertyQueryDefaults.staleTime,
    gcTime: propertyQueryDefaults.gcTime,
    refetchOnMount: false,
    enabled,
    ...rest,
  });
};
