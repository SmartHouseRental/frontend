import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';

export const useDocuments = () => {
    return useQuery({
        queryKey: profileKeys.documents(),
        queryFn: profileApi.getDocuments,
    });
};
