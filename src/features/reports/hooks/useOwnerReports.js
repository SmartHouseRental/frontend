import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/apiErrors';
import { reportsApi } from '../api';
import { reportKeys, reportQueryDefaults } from '../constants';

export const useOwnerReports = (params = {}, options = {}) => {
  return useQuery({
    queryKey: reportKeys.ownerList(params),
    queryFn: () => reportsApi.getOwnerReports(params),
    staleTime: reportQueryDefaults.staleTime,
    gcTime: reportQueryDefaults.gcTime,
    ...options,
  });
};

export const useSubmitOwnerReportResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, response }) => reportsApi.submitOwnerResponse(reportId, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.ownerLists() });
      toast.success('Response submitted successfully');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to submit response'));
    },
  });
};
