import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { reportsApi } from '../api';
import { getReportErrorMessage } from '../utils/reportErrors';
import { markTargetReported } from '../utils/reportStorage';
import { buildReportDescription } from '../utils/buildReportDescription';

export function useSubmitReport() {
  return useMutation({
    mutationFn: async ({ targetType, targetId, category, categoryLabel, optionalNote, imageFiles }) => {
      const description = buildReportDescription(
        categoryLabel || category,
        optionalNote,
        imageFiles?.length > 0,
      );

      const response = await reportsApi.submitReport({
        targetType,
        targetId,
        category,
        description,
        imageFiles: imageFiles || [],
      });

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
