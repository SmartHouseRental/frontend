import { apiClient } from '@/lib/apiClient';

export const ownerApi = {
  getOverview: async (params = {}) => {
    const { data } = await apiClient.get('/owner/overview', { params });
    return data;
  },
};
