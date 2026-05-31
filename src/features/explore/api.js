import axiosInstance from '@/lib/axios';

export const exploreApi = {
  /** GET /api/v1/search — semantic property search */
  semanticSearch: (params) => axiosInstance.get('/api/v1/search', { params }),
};
