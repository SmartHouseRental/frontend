import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { appointmentsApi } from '../api';
import { appointmentKeys, appointmentQueryDefaults } from '../constants';

export const useOwnerAppointments = (params = {}, options = {}) => {
  return useQuery({
    queryKey: appointmentKeys.ownerList(params),
    queryFn: () => appointmentsApi.getOwnerAppointments(params),
    staleTime: appointmentQueryDefaults.staleTime,
    gcTime: appointmentQueryDefaults.gcTime,
    refetchOnMount: 'always',
    ...options,
  });
};

export const useAppointments = (params = {}, options = {}) => {
  return useQuery({
    queryKey: appointmentKeys.list(params),
    queryFn: () => appointmentsApi.getAppointments(params),
    staleTime: appointmentQueryDefaults.staleTime,
    gcTime: appointmentQueryDefaults.gcTime,
    ...options,
  });
};

export const useAppointment = (id, options = {}) => {
  return useQuery({
    queryKey: appointmentKeys.detail(id),
    queryFn: () => appointmentsApi.getAppointment(id),
    enabled: Boolean(id),
    staleTime: appointmentQueryDefaults.staleTime,
    ...options,
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => appointmentsApi.bookAppointment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
      toast.success('Visit request sent. The owner will review it shortly.');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to book visit';
      toast.error(message);
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, status }) =>
      appointmentsApi.updateAppointmentStatus(appointmentId, status),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
      const labels = {
        ACCEPTED: 'Appointment confirmed',
        REJECTED: 'Appointment rejected',
        CANCELLED: 'Appointment cancelled',
      };
      toast.success(labels[status] || 'Appointment updated');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to update appointment';
      toast.error(message);
    },
  });
};

export const useUpdateAppointmentNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, note }) =>
      appointmentsApi.updateAppointmentNote(appointmentId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
      toast.success('Note saved');
    },
    onError: () => {
      toast.error('Failed to save note');
    },
  });
};
