import { useQuery } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from '../constants';

export const usePropertyDetail = (propertyId) => {
  return useQuery({
    queryKey: propertyKeys.detail(propertyId),
    queryFn: () => propertyApi.getPropertyById(propertyId),
    enabled: !!propertyId,
  });
};
