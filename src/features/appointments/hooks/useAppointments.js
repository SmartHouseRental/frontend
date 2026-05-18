import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentsApi } from '../api';
import { toast } from 'sonner';

export const useAppointments = (params = {}) => {
  return useQuery({
    queryKey: ['appointments', params],
    queryFn: () => appointmentsApi.getAppointments(params),
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, status }) => 
      appointmentsApi.updateAppointmentStatus(appointmentId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment status updated');
    },
    onError: () => {
      toast.error('Failed to update appointment status');
    },
  });
};
