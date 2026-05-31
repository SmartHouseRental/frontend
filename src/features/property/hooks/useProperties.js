import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from './useProperty';

export const useProperties = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: propertyKeys.list(filters),
    queryFn: () => propertyApi.getProperties(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
};
