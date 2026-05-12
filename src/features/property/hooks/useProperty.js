import { useQuery } from '@tanstack/react-query';
import { propertyApi } from '../api';

export const propertyKeys = {
  all: ['properties'],
  lists: () => [...propertyKeys.all, 'list'],
  list: (filters) => [...propertyKeys.lists(), filters],
  details: () => [...propertyKeys.all, 'detail'],
  detail: (id) => [...propertyKeys.details(), id],
};

export const useProperty = (id) => {
  return useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: () => propertyApi.getProperty(id),
    enabled: !!id,
    select: (response) => response.data, // Extract the property data from the envelope
  });
};
