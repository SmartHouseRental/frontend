export const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
};

export const appointmentQueryDefaults = {
  staleTime: 2 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

export const appointmentKeys = {
  all: ['appointments'],
  lists: () => [...appointmentKeys.all, 'list'],
  list: (params) => [...appointmentKeys.lists(), params],
  ownerLists: () => [...appointmentKeys.all, 'owner', 'list'],
  ownerList: (params) => [...appointmentKeys.ownerLists(), params],
  details: () => [...appointmentKeys.all, 'detail'],
  detail: (id) => [...appointmentKeys.details(), id],
};
