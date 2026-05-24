import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api';
import { setToken } from '../utils';
import { authKeys } from '../constants';
import { toast } from 'sonner';

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            if (data?.data?.accessToken) {
                setToken(data.data.accessToken);
            }
            queryClient.setQueryData(authKeys.me(), data.data.user);
            toast.success('Account created successfully');
        },
        onError: (error) => {
            const message = error?.response?.data?.message || error?.response?.data?.error || 'Registration failed';
            toast.error(message);
        },
    });
};
