import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';
import { toast } from 'sonner';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileApi.updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.details() });
            toast.success('Profile updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        },
    });
};
