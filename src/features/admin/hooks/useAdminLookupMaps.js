import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api';
import { adminKeys } from './useAdmin';
import { mapAdminList } from '../adminSanitize';
import { formatLocalizedText, formatPersonName } from '../mappers';
import { normalizeAdminObject } from '../adminResponse';

const LOOKUP_QUERY = { page: 1, limit: 100 };

function buildUserMap(items = []) {
  return items.reduce((acc, user) => {
    acc[user.id] = formatPersonName(user);
    return acc;
  }, {});
}

function buildPropertyMap(items = []) {
  return items.reduce((acc, property) => {
    acc[property.id] = formatLocalizedText(property.title, 'Untitled Property');
    return acc;
  }, {});
}

export function useAdminLookupMaps() {
  const usersQuery = useQuery({
    queryKey: adminKeys.users(LOOKUP_QUERY),
    queryFn: () => adminApi.getUsers(LOOKUP_QUERY),
    select: (response) => mapAdminList(response).items,
    staleTime: 5 * 60 * 1000,
  });

  const propertiesQuery = useQuery({
    queryKey: adminKeys.properties(LOOKUP_QUERY),
    queryFn: () => adminApi.getProperties(LOOKUP_QUERY),
    select: (response) => mapAdminList(response).items,
    staleTime: 5 * 60 * 1000,
  });

  const userMap = useMemo(() => buildUserMap(usersQuery.data), [usersQuery.data]);
  const propertyMap = useMemo(() => buildPropertyMap(propertiesQuery.data), [propertiesQuery.data]);

  return {
    isLoading: usersQuery.isLoading || propertiesQuery.isLoading,
    getUserName: (id, fallback = 'Unknown user') =>
      id ? userMap[id] || fallback : fallback,
    getPropertyTitle: (id, fallback = 'Unknown property') =>
      id ? propertyMap[id] || fallback : fallback,
  };
}

export function useAdminResolvedUser(userId) {
  return useQuery({
    queryKey: adminKeys.user(userId),
    queryFn: () => adminApi.getUserById(userId),
    enabled: !!userId,
    select: (response) => {
      const user = normalizeAdminObject(response);
      if (!user) return null;
      return { ...user, displayName: formatPersonName(user) };
    },
  });
}

export function useAdminResolvedProperty(propertyId) {
  return useQuery({
    queryKey: adminKeys.property(propertyId),
    queryFn: () => adminApi.getPropertyById(propertyId),
    enabled: !!propertyId,
    select: (response) => normalizeAdminObject(response),
  });
}

export function useAdminReportTarget(report) {
  const targetType = report?.targetType;
  const targetId = report?.targetId;

  const propertyQuery = useAdminResolvedProperty(
    targetType === 'property' ? targetId : undefined
  );
  const userQuery = useAdminResolvedUser(targetType === 'user' ? targetId : undefined);

  if (targetType === 'property' && propertyQuery.data) {
    return {
      label: formatLocalizedText(propertyQuery.data.title, 'Property'),
      sublabel: formatLocalizedText(
        propertyQuery.data.address || propertyQuery.data.location,
        ''
      ),
      navigateTo: `/admin/properties/${targetId}`,
      isLoading: propertyQuery.isLoading,
    };
  }

  if (targetType === 'user' && userQuery.data) {
    return {
      label: userQuery.data.displayName,
      sublabel: userQuery.data.email || '',
      navigateTo: `/admin/users/${targetId}`,
      isLoading: userQuery.isLoading,
    };
  }

  if (targetType === 'agreement') {
    return {
      label: `Agreement #${String(targetId || '').slice(0, 8)}`,
      sublabel: 'Rental agreement',
      navigateTo: targetId ? `/admin/agreements/${targetId}` : null,
      isLoading: false,
    };
  }

  return {
    label: report?.category || 'Report target',
    sublabel: targetId ? `ID: ${targetId}` : '',
    navigateTo: null,
    isLoading: false,
  };
}
