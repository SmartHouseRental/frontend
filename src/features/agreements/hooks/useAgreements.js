import { useQuery } from '@tanstack/react-query';
import { agreementsApi } from '../api';

export const useOwnerAgreements = (params = {}) => {
  return useQuery({
    queryKey: ['owner-agreements', params],
    queryFn: () => agreementsApi.getOwnerAgreements(params),
  });
};

export const useAgreementDetail = (agreementId) => {
  return useQuery({
    queryKey: ['agreement', agreementId],
    queryFn: () => agreementsApi.getAgreementDetail(agreementId),
    enabled: !!agreementId,
  });
};

export const useAgreementPayments = (agreementId) => {
  return useQuery({
    queryKey: ['agreement-payments', agreementId],
    queryFn: () => agreementsApi.getAgreementPayments(agreementId),
    enabled: !!agreementId,
  });
};
