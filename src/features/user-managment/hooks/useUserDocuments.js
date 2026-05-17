import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';
import { userKeys } from '../constants';

export const useUserDocuments = (userId) => {
    return useQuery({
        queryKey: [...userKeys.detail(userId), 'documents'],
        queryFn: () => userApi.getUserDocuments(userId),
        enabled: !!userId,
    });
};
