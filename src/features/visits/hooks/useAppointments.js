import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitsApi } from '../api';
import { toast } from 'sonner';

export const visitKeys = {
  all: ['visits'],
  appointments: (filters = {}) => [...visitKeys.all, 'appointments', filters],
};

const getLocalizedStr = (field) => {
  if (!field) return '';
  if (typeof field === 'object') return field.en || field.am || '';
  return String(field);
};

const normalizeAppointments = (response) => {
  if (!response) return [];
  
  let appointments = null;
  
  if (Array.isArray(response)) {
    appointments = response;
  } else if (response.data && Array.isArray(response.data.appointments)) {
    appointments = response.data.appointments;
  } else if (Array.isArray(response.appointments)) {
    appointments = response.appointments;
  } else if (response.data?.data && Array.isArray(response.data.data.appointments)) {
    appointments = response.data.data.appointments;
  } else if (response.appointments?.items && Array.isArray(response.appointments.items)) {
    appointments = response.appointments.items;
  } else if (response.data && Array.isArray(response.data)) {
    appointments = response.data;
  }
  
  if (!appointments) return [];

  return appointments.map((apt) => {
    const property = apt?.property;
    const propertyTitle = getLocalizedStr(property?.title) || 'Property Details';
    const propertyAddress = getLocalizedStr(property?.address) || getLocalizedStr(property?.location) || 'Address not available';
    const propertyCity = getLocalizedStr(property?.city) || '';
    const propertySubCity = getLocalizedStr(property?.subCity) || '';
    const propertyDescription = getLocalizedStr(property?.description) || '';

    return {
      ...apt,
      propertyTitle,
      propertyAddress,
      propertyCity,
      propertySubCity,
      propertyDescription,
      status: apt?.status || 'PENDING',
    };
  });
};

export const useAppointments = (filters = {}) => {
  return useQuery({
    queryKey: visitKeys.appointments(filters),
    queryFn: async () => {
      try {
        return await visitsApi.getRenterAppointments();
      } catch (err) {
        if (err.response?.status === 404) {
          return await visitsApi.getAppointments(filters);
        }
        throw err;
      }
    },
    select: normalizeAppointments,
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
    mutationFn: async (id) => {
      try {
        return await visitsApi.cancelAppointment(id);
      } catch (err) {
        if (err.response?.status === 404) {
          return await visitsApi.deleteAppointment(id);
        }
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: visitKeys.appointments() });
      toast.success('Appointment Cancelled');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to cancel appointment');
    }
  });
};
