import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitsApi } from '../api';
import { toast } from 'sonner';

export const visitKeys = {
  all: ['visits'],
  appointments: (filters = {}) => [...visitKeys.all, 'appointments', filters],
};

export const useAppointments = (filters = {}) => {
  return useQuery({
    queryKey: visitKeys.appointments(filters),
    queryFn: () => visitsApi.getAppointments(filters),
    select: (response) => response.data,
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => visitsApi.bookAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: visitKeys.appointments() });
      toast.success('Appointment Scheduled');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to book appointment');
    }
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => visitsApi.updateAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: visitKeys.appointments() });
      toast.success('Appointment Status Updated');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update status');
    }
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
