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

  createOwnerAgreement: async (payload) => {
    const { data } = await apiClient.post('/owner/agreements', payload);
    return data;
  },

  updateDraftAgreement: async (agreementId, payload) => {
    const { data } = await apiClient.patch(`/owner/agreements/${agreementId}`, payload);
    return data;
  },

  sendAgreement: async (agreementId, payload = {}) => {
    const { data } = await apiClient.post(`/owner/agreements/${agreementId}/send`, payload);
    return data;
  },

  cancelAgreement: async (agreementId, payload = {}) => {
    const { data } = await apiClient.post(`/owner/agreements/${agreementId}/cancel`, payload);
    return data;
  },

  terminateAgreement: async (agreementId, payload = {}) => {
    const { data } = await apiClient.post(`/agreements/${agreementId}/terminate`, payload);
    return data;
  },
};
