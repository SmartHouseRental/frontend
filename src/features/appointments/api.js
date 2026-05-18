import { apiClient } from '@/lib/apiClient';

export const appointmentsApi = {
  getAppointments: async (params = {}) => {
    const { data } = await apiClient.get('/appointments', { params });
    return data;
  },

  updateAppointmentStatus: async (appointmentId, status) => {
    const { data } = await apiClient.patch(`/appointments/${appointmentId}/status`, { status });
    return data;
  },
};
