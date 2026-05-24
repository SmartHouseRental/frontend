import { useQuery } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from './useProperty';

export const useSimilarProperties = (id, options = {}) => {
  const limit = options.limit ?? 12;

  return useQuery({
    queryKey: [...propertyKeys.detail(id), 'similar', { limit }],
    queryFn: () => propertyApi.getSimilarProperties(id, { limit }),
    enabled: !!id,
    select: (response) => (Array.isArray(response?.data) ? response.data : []),
    staleTime: 60 * 1000,
  });
};
