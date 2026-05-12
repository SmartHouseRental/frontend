import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api';
import { removeToken } from '../utils';
import { authKeys } from '../constants';
import { toast } from 'sonner';

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            removeToken();
            queryClient.removeQueries({ queryKey: authKeys.all });
            toast.success('Logged out successfully');
        },
        onError: () => {
            removeToken();
            queryClient.removeQueries({ queryKey: authKeys.all });
        },
    });
};
