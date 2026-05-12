import axiosInstance from '@/lib/axios';

export const visitsApi = {
  getAppointments: () => axiosInstance.get('/api/v1/appointments'),
  bookAppointment: (data) => axiosInstance.post('/api/v1/appointments', data),
  deleteAppointment: (id) => axiosInstance.delete(`/api/v1/appointments/${id}`),
};
