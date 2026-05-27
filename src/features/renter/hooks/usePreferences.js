import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { renterApi } from '../api';
import { renterKeys, renterQueryDefaults } from '../constants';
import { getApiErrorMessage } from '../utils/apiErrors';
import { buildPreferencePayload } from '../utils/preferences';

function unwrapApiData(response) {
  return response?.data ?? response;
}

export const useRenterPreferences = (options = {}) => {
  return useQuery({
    queryKey: renterKeys.preferences(),
    queryFn: async () => {
      const response = await renterApi.getPreferences();
      return unwrapApiData(response);
    },
    staleTime: renterQueryDefaults.staleTime,
    gcTime: renterQueryDefaults.gcTime,
    ...options,
  });
};

export const useUpdateRenterPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values) => {
      const response = await renterApi.updatePreferences(buildPreferencePayload(values));
      return unwrapApiData(response);
    },
    onSuccess: (preferences) => {
      queryClient.setQueryData(renterKeys.preferences(), preferences);
      queryClient.invalidateQueries({ queryKey: renterKeys.preferences() });
      toast.success('Preferences saved successfully');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to save preferences'));
    },
  });
};
