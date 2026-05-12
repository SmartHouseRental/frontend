import { useQuery } from '@tanstack/react-query';
import { renterApi } from '../api';
import { renterKeys } from './useAgreements';

export const useReviews = () => {
  return useQuery({
    queryKey: renterKeys.reviews(),
    queryFn: () => renterApi.getReviews(),
    select: (response) => response.data,
  });
};
