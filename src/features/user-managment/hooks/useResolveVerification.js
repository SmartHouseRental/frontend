import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api';
import { userKeys } from '../constants';
import { toast } from 'sonner';

export const useResolveVerification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userApi.resolveVerification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
            toast.success('Document verification resolved successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to resolve verification status');
        },
    });
};
