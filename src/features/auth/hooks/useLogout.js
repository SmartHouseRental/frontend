import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api';
import { removeToken } from '../utils';
import { authKeys } from '../constants';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            removeToken();
            queryClient.removeQueries({ queryKey: authKeys.all });
            toast.success('Logged out successfully');
            navigate('/', { replace: true });
        },
        onError: () => {
            removeToken();
            queryClient.removeQueries({ queryKey: authKeys.all });
            navigate('/', { replace: true });
        },
    });
};
