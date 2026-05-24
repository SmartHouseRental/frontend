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
            queryClient.clear();
            toast.success('Logged out successfully');
            navigate('/login', { replace: true });
        },
        onError: () => {
            removeToken();
            queryClient.clear();
            navigate('/login', { replace: true });
        },
    });
};
