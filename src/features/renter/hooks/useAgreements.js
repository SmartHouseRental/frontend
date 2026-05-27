import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';
import { agreementsApi } from '../agreements/api';
import { paymentsApi } from '../payments/api';
import { renterKeys } from '../constants';
import {
  extractAgreementList,
  extractAgreementDetail,
  extractDepositCheckout,
  extractDepositStatus,
} from '../agreements/agreementMappers';
import { getApiErrorMessage } from '../utils/apiErrors';

export { renterKeys };

function invalidateAgreementQueries(queryClient, id) {
  queryClient.invalidateQueries({ queryKey: [...renterKeys.all, 'agreements'] });
  if (id) {
    queryClient.invalidateQueries({ queryKey: renterKeys.agreement(id) });
    queryClient.invalidateQueries({ queryKey: renterKeys.depositStatus(id) });
    queryClient.invalidateQueries({ queryKey: renterKeys.agreementPayments(id) });
  }
  queryClient.invalidateQueries({ queryKey: [...renterKeys.all, 'payments'] });
}

export const useAgreements = (filters = {}) => {
  return useQuery({
    queryKey: renterKeys.agreements(filters),
    queryFn: async () => {
      const response = await agreementsApi.list(filters);
      return extractAgreementList(response);
    },
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });
};

export const useAgreement = (id) => {
  return useQuery({
    queryKey: renterKeys.agreement(id),
    queryFn: async () => {
      const response = await agreementsApi.getById(id);
      return extractAgreementDetail(response);
    },
    enabled: !!id,
    staleTime: 15 * 1000,
  });
};

export const useDepositStatus = (id, options = {}) => {
  return useQuery({
    queryKey: renterKeys.depositStatus(id),
    queryFn: async () => {
      const response = await agreementsApi.getDepositStatus(id);
      return extractDepositStatus(response);
    },
    enabled: !!id && (options.enabled !== false),
    refetchInterval: options.poll ? 5000 : false,
    staleTime: 5 * 1000,
  });
};

export const useAcceptAgreement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => agreementsApi.accept(id),
    onSuccess: (_, id) => {
      invalidateAgreementQueries(queryClient, id);
      toast.success('Offer accepted. You can now pay the security deposit.');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to accept offer'));
    },
  });
};

export const useRejectAgreement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }) => agreementsApi.reject(id, { reason }),
    onSuccess: (_, { id }) => {
      invalidateAgreementQueries(queryClient, id);
      toast.success('Offer declined');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to decline offer'));
    },
  });
};

export const useCancelAgreement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }) => agreementsApi.cancel(id, { reason }),
    onSuccess: (_, { id }) => {
      invalidateAgreementQueries(queryClient, id);
      toast.success('Agreement cancelled');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to cancel agreement'));
    },
  });
};

export const useInitiateDeposit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => agreementsApi.initiateDeposit(id),
    onSuccess: (response, id) => {
      invalidateAgreementQueries(queryClient, id);
      const checkout = extractDepositCheckout(response);
      if (checkout?.checkoutUrl) {
        window.location.href = checkout.checkoutUrl;
      } else {
        toast.error('Checkout URL was not returned. Please try again.');
      }
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to start deposit payment'));
    },
  });
};

export const useVerifyChapaPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (txRef) => paymentsApi.verifyChapa(txRef),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: renterKeys.all });
      const data = response?.data ?? response;
      if (data?.agreement?.id) {
        invalidateAgreementQueries(queryClient, data.agreement.id);
      }
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Payment verification failed'));
    },
  });
};
