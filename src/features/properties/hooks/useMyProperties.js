import { useQuery } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from '../constants';

export const useMyProperties = () => {
  return useQuery({
    queryKey: propertyKeys.myProperties(),
    queryFn: propertyApi.getMyProperties,
  });
};

export const usePropertyAnalytics = () => {
  return useQuery({
    queryKey: propertyKeys.analytics(),
    queryFn: propertyApi.getAnalytics,
  });
};
