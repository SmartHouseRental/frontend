import { useMutation } from '@tanstack/react-query';
import { profileApi } from '../api';
import { toast } from 'sonner';

export const useChangePassword = () => {
    return useMutation({
        mutationFn: profileApi.changePassword,
        onSuccess: () => {
            toast.success('Password changed successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to change password');
        },
    });
};
