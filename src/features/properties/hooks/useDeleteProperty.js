import { useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from '../constants';
import { toast } from 'sonner';

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyApi.deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.myProperties() });
      toast.success('Property deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete property');
    },
  });
};
