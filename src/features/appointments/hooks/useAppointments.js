import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentsApi } from '../api';
import { toast } from 'sonner';

const appointmentsQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

/** Only use on Appointments page. */
export const useAppointments = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['appointments', params],
    queryFn: () => appointmentsApi.getAppointments(params),
    staleTime: appointmentsQueryDefaults.staleTime,
    gcTime: appointmentsQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
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
