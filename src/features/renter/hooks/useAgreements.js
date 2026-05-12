import { useQuery } from '@tanstack/react-query';
import { renterApi } from '../api';

export const renterKeys = {
  all: ['renter'],
  agreements: () => [...renterKeys.all, 'agreements'],
  agreement: (id) => [...renterKeys.agreements(), id],
  reviews: () => [...renterKeys.all, 'reviews'],
  profile: () => [...renterKeys.all, 'profile'],
};

export const useAgreement = (id) => {
  return useQuery({
    queryKey: renterKeys.agreement(id),
    queryFn: () => renterApi.getAgreement(id),
    enabled: !!id,
    select: (response) => response.data,
  });
};

export const useAgreements = () => {
  return useQuery({
    queryKey: renterKeys.agreements(),
    queryFn: () => renterApi.getAgreements(),
    select: (response) => response.data,
  });
};
