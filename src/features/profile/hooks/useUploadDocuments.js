import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';
import { toast } from 'sonner';

export const useUploadDocuments = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileApi.uploadDocuments,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.documents() });
            queryClient.invalidateQueries({ queryKey: profileKeys.details() });
            toast.success('Documents uploaded successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to upload documents');
        },
    });
};
