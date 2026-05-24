import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api';
import { userKeys } from '../constants';
import { toast } from 'sonner';

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userApi.updateUserStatus,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
            toast.success('User status updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update user status');
        },
    });
};
