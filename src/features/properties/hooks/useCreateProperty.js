import { useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from '../constants';
import { toast } from 'sonner';

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyApi.createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.myProperties() });
      toast.success('Property published successfully!');
    },
    onError: (error) => {
      // Handle different error types from backend
      let errorMessage = 'Failed to publish property';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Handle specific error messages from backend
        if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
          errorMessage = 'Unauthorized. Please login to create a property.';
        }
        
        // Handle 500 Internal server error
        if (error.response?.status === 500) {
          errorMessage = errorData.error || 'Server error. Please try again later.';
        }
        
        // Handle validation errors
        if (errorData.errors) {
          errorMessage = Object.values(errorData.errors).join(', ');
        }
      }
      
      toast.error(errorMessage);
    },
  });
};
