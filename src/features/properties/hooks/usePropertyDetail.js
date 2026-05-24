import { useQuery } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from '../constants';

const detailQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

/** Only use on property detail/edit routes with a valid id. */
export const usePropertyDetail = (propertyId, options = {}) => {
  return useQuery({
    queryKey: propertyKeys.detail(propertyId),
    queryFn: () => propertyApi.getPropertyById(propertyId),
    enabled: !!propertyId,
    staleTime: detailQueryDefaults.staleTime,
    gcTime: detailQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};
