import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api';
import { authKeys } from '../constants';
import { getToken } from '../utils';

export const useAuth = () => {
    const token = getToken();

    const query = useQuery({
        queryKey: authKeys.me(),
        queryFn: authApi.getMe,
        enabled: !!token,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const user = query.data?.data?.user || query.data?.user || (query.data?.id || query.data?.role ? query.data : null);

    return {
        ...query,
        user: user || null,
        isAuthenticated: !!user,
    };
};
