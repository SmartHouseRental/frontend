import { keepPreviousData, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/apiErrors';
import { paymentsApi } from '../api';
import { paymentKeys, paymentQueryDefaults } from '../constants';
import {
  normalizeOwnerPayment,
  unwrapPaymentsList,
  unwrapPaymentSummary,
} from '../utils';

export const useOwnerPayments = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: paymentKeys.list(filters),
    queryFn: async () => {
      const response = await paymentsApi.list(filters);
      const { payments, pagination } = unwrapPaymentsList(response);
      return {
        items: payments.map(normalizeOwnerPayment).filter(Boolean),
        pagination,
      };
    },
    staleTime: paymentQueryDefaults.staleTime,
    gcTime: paymentQueryDefaults.gcTime,
    placeholderData: keepPreviousData,
    ...options,
  });
};

export const useOwnerPaymentSummary = (options = {}) => {
  return useQuery({
    queryKey: paymentKeys.summary(),
    queryFn: async () => {
      const response = await paymentsApi.getSummary();
      return unwrapPaymentSummary(response);
    },
    staleTime: paymentQueryDefaults.staleTime,
    gcTime: paymentQueryDefaults.gcTime,
    ...options,
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId) => paymentsApi.confirm(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
      toast.success('Payment confirmed');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to confirm payment'));
    },
  });
};

export const useExportOwnerPayments = () => {
  return useMutation({
    mutationFn: (params) => paymentsApi.export(params),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `owner_payments_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Payments exported successfully');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to export payments'));
    },
  });
};

export const useViewPaymentProof = () => {
  return useMutation({
    mutationFn: (paymentId) => paymentsApi.getProof(paymentId),
    onSuccess: (response) => {
      const proofUrl = response?.data?.proofUrl ?? response?.proofUrl;
      if (proofUrl) {
        window.open(proofUrl, '_blank', 'noopener,noreferrer');
      } else {
        toast.info('No payment proof uploaded yet');
      }
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to load payment proof'));
    },
  });
};
