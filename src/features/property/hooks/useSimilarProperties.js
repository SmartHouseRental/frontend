import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { propertyKeys } from './useProperty';

export const useSimilarProperties = (id) => {
  return useQuery({
    queryKey: [...propertyKeys.detail(id), 'similar'],
    queryFn: () => axiosInstance.get(`/api/v1/properties/${id}/similar`),
    enabled: !!id,
    select: (response) => response.data,
  });
};
