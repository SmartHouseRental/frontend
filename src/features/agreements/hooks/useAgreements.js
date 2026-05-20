import { useQuery } from '@tanstack/react-query';
import { agreementsApi } from '../api';

const agreementsQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

/** Only use on Agreements page. */
export const useOwnerAgreements = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['owner-agreements', params],
    queryFn: () => agreementsApi.getOwnerAgreements(params),
    staleTime: agreementsQueryDefaults.staleTime,
    gcTime: agreementsQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};

/** Only use on Agreement detail page. */
export const useAgreementDetail = (agreementId, options = {}) => {
  return useQuery({
    queryKey: ['agreement', agreementId],
    queryFn: () => agreementsApi.getAgreementDetail(agreementId),
    enabled: !!agreementId,
    staleTime: agreementsQueryDefaults.staleTime,
    gcTime: agreementsQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};

/** Only use on Agreement detail page. */
export const useAgreementPayments = (agreementId, options = {}) => {
  return useQuery({
    queryKey: ['agreement-payments', agreementId],
    queryFn: () => agreementsApi.getAgreementPayments(agreementId),
    enabled: !!agreementId,
    staleTime: agreementsQueryDefaults.staleTime,
    gcTime: agreementsQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};
