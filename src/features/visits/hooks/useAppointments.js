import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitsApi } from '../api';
import { toast } from 'sonner';

export const visitKeys = {
  all: ['visits'],
  appointments: () => [...visitKeys.all, 'appointments'],
};

export const useAppointments = () => {
  return useQuery({
    queryKey: visitKeys.appointments(),
    queryFn: () => visitsApi.getAppointments(),
    select: (response) => response.data,
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => visitsApi.deleteAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: visitKeys.appointments() });
      toast.success('Appointment Cancelled');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to cancel appointment');
    }
  });
};
