import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { toast } from 'sonner';

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: authApi.forgotPassword,
        onSuccess: (data) => {
            toast.success(data?.message || 'A password reset code has been sent.');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to send reset code');
        },
    });
};
