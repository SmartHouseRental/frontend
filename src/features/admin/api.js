import { apiClient } from '@/lib/apiClient';

export const adminApi = {
    getOverview: async (params = {}) => {
        const { data } = await apiClient.get('/admin/overview', { params });
        return data;
    },
    getProperties: async (params = {}) => {
        const { data } = await apiClient.get('/admin/properties', { params });
        return data;
    },
    updatePropertyStatus: async ({ propertyId, status }) => {
        const { data } = await apiClient.patch(`/admin/properties/${propertyId}`, { status });
        return data;
    },
};
