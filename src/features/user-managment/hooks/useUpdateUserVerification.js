import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api';
import { userKeys } from '../constants';
import { toast } from 'sonner';

export const useUpdateUserVerification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userApi.updateUserVerification,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
            toast.success('User verification state updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update verification state');
        },
    });
};
