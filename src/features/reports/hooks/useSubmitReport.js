import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { reportsApi } from '../api';
import { getReportErrorMessage } from '../utils/reportErrors';
import { markTargetReported } from '../utils/reportStorage';

export function useSubmitReport() {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await reportsApi.submitReport(payload);
      return response?.data ?? response;
    },
    onSuccess: (_, variables) => {
      markTargetReported(variables.targetType, variables.targetId);
      toast.success('Report submitted. Our team will review it shortly.');
    },
    onError: (error) => {
      toast.error(getReportErrorMessage(error));
    },
  });
}
