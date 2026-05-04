import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { toast } from 'sonner';

export const useResetPassword = () => {
    return useMutation({
        mutationFn: authApi.resetPassword,
        onSuccess: (data) => {
            toast.success(data?.message || 'Password has been reset successfully.');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to reset password');
        },
    });
};
