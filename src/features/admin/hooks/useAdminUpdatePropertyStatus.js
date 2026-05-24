import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi } from '../api';
import { adminKeys } from '../constants';

export const useAdminUpdatePropertyStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.updatePropertyStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.properties() });
      toast.success('Property status updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update property status');
    },
  });
};
