import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { toast } from 'sonner';

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: authApi.verifyEmail,
        onSuccess: () => {
            toast.success('Email verified successfully');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Verification failed');
        },
    });
};

export const useResendVerificationCode = () => {
    return useMutation({
        mutationFn: authApi.resendVerificationCode,
        onSuccess: () => {
            toast.success('Verification code resent');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to resend code');
        },
    });
};
