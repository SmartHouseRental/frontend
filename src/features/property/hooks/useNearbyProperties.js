import { useQuery } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { propertyKeys } from './useProperty';

const DEFAULT_RADIUS_KM = 10;

export function useNearbyProperties({
  lat,
  lng,
  radius = DEFAULT_RADIUS_KM,
  limit = 6,
  status = 'available',
  enabled = true,
} = {}) {
  const hasCoords =
    enabled &&
    lat != null &&
    lng != null &&
    Number.isFinite(Number(lat)) &&
    Number.isFinite(Number(lng));

  return useQuery({
    queryKey: propertyKeys.nearby({ lat, lng, radius, limit, status }),
    queryFn: () =>
      propertyApi.getNearbyProperties({
        lat,
        lng,
        radius,
        limit,
        status,
      }),
    enabled: hasCoords,
    staleTime: 60 * 1000,
    select: (response) => ({
      properties: Array.isArray(response?.data) ? response.data : [],
      meta: response?.meta ?? null,
    }),
  });
}

export { DEFAULT_RADIUS_KM };
