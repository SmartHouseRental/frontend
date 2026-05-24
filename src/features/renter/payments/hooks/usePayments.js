import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';
import { paymentsApi } from '../api';
import { normalizePaymentRow, unwrapPaymentsData } from '../paymentMappers';
import { renterKeys } from '../../hooks/useAgreements';
import { getApiErrorMessage } from '../../utils/apiErrors';

export const paymentKeys = {
  all: [...renterKeys.all, 'payments'],
  list: (filters = {}) => [...paymentKeys.all, 'list', filters],
};

export const useRenterPayments = (filters = {}) => {
  return useQuery({
    queryKey: paymentKeys.list(filters),
    queryFn: async () => {
      const response = await paymentsApi.list(filters);
      const { payments, pagination } = unwrapPaymentsData(response);
      return {
        items: payments.map(normalizePaymentRow).filter(Boolean),
        pagination,
      };
    },
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });
};

export const useUploadPaymentProof = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ paymentId, file }) => paymentsApi.uploadProof(paymentId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
      queryClient.invalidateQueries({ queryKey: renterKeys.all });
      toast.success('Payment proof uploaded');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to upload proof'));
    },
  });
};
