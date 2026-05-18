import { apiClient } from '@/lib/apiClient';

export const agreementsApi = {
  getOwnerAgreements: async (params = {}) => {
    const { data } = await apiClient.get('/owner/agreements', { params });
    return data;
  },

  getAgreementDetail: async (agreementId) => {
    const { data } = await apiClient.get(`/agreements/${agreementId}`);
    return data;
  },

  getAgreementPayments: async (agreementId) => {
    const { data } = await apiClient.get(`/agreements/${agreementId}/payments`);
    return data;
  },
};
