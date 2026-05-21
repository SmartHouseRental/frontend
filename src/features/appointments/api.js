import { apiClient } from '@/lib/apiClient';

export const appointmentsApi = {
  getAppointments: async (params = {}) => {
    const { data } = await apiClient.get('/appointments', { params });
    return data;
  },

  /** Owner list — uses /appointments (role-scoped). Prefer over /owner/appointments until backend is redeployed. */
  getOwnerAppointments: async (params = {}) => {
    const { data } = await apiClient.get('/appointments', { params });
    return data;
  },

  getAppointment: async (id) => {
    const { data } = await apiClient.get(`/appointments/${id}`);
    return data;
  },

  bookAppointment: async (payload) => {
    const { data } = await apiClient.post('/appointments', payload);
    return data;
  },

  updateAppointmentStatus: async (appointmentId, status) => {
    const { data } = await apiClient.patch(`/appointments/${appointmentId}`, { status });
    return data;
  },

  updateAppointmentNote: async (appointmentId, note) => {
    const { data } = await apiClient.patch(`/appointments/${appointmentId}/note`, { note });
    return data;
  },

  deleteAppointment: async (appointmentId) => {
    const { data } = await apiClient.delete(`/appointments/${appointmentId}`);
    return data;
  },
};
