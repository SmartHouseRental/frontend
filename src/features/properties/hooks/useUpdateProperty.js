import { useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from '../constants';
import { toast } from 'sonner';

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, formData }) => propertyApi.updateProperty(propertyId, formData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.myProperties() });
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.propertyId) });
      toast.success('Property updated successfully');
    },
    onError: (error) => {
      let errorMessage = 'Failed to update property';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        if (error.response?.status === 401) {
          errorMessage = 'Unauthorized. Please login to update the property.';
        }
        
        if (error.response?.status === 500) {
          errorMessage = errorData.error || 'Server error. Please try again later.';
        }
        
        if (errorData.errors) {
          errorMessage = Object.values(errorData.errors).join(', ');
        }
      }
      
      toast.error(errorMessage);
    },
  });
};
