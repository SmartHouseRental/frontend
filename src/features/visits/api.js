import axiosInstance from '@/lib/axios';

export const visitsApi = {
  getAppointments: (params) => axiosInstance.get('/api/v1/appointments', { params }),
  getRenterAppointments: () => axiosInstance.get('/api/v1/appointments/me'),
  bookAppointment: (data) => axiosInstance.post('/api/v1/appointments', data),
  updateAppointmentStatus: (id, status) => axiosInstance.patch(`/api/v1/appointments/${id}/status`, { status }),
  updateAppointmentNote: (id, note) => axiosInstance.patch(`/api/v1/appointments/${id}/note`, { note }),
  deleteAppointment: (id) => axiosInstance.delete(`/api/v1/appointments/${id}`),
  cancelAppointment: (id) => axiosInstance.patch(`/api/v1/appointments/${id}/cancel`),
};
