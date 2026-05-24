import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api';

export const ownerProfileKeys = {
  all: ['ownerProfile'],
  detail: (id) => [...ownerProfileKeys.all, id],
};

function unwrapOwnerProfile(response) {
  if (!response) return null;
  // GET /api/v1/users/:id — public, no auth required
  if (response.owner) return response;
  return response.data ?? response;
}

export function useOwnerProfile(ownerId) {
  return useQuery({
    queryKey: ownerProfileKeys.detail(ownerId),
    queryFn: async () => {
      const response = await usersApi.getOwnerProfile(ownerId);
      return unwrapOwnerProfile(response);
    },
    enabled: Boolean(ownerId),
    staleTime: 60 * 1000,
    retry: (failureCount, error) => {
      const status = error?.response?.status;
      if (status === 404 || status === 400) return false;
      return failureCount < 2;
    },
  });
}

export function formatListingPrice(price) {
  if (price == null || price === '') return '—';
  if (typeof price === 'number') {
    return `ETB ${price.toLocaleString()}`;
  }
  return String(price);
}

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=Property';

export function mapListingToPropertyCard(listing, ratingAverage = 0) {
  return {
    id: listing.id,
    title: listing.title || 'Property',
    location: listing.location || 'Addis Ababa',
    price: formatListingPrice(listing.price),
    image: listing.image || PLACEHOLDER_IMAGE,
    beds: listing.bedrooms ?? '—',
    baths: listing.bathrooms ?? '—',
    size: listing.area ? `${listing.area} sqm` : '—',
    rating: Number(ratingAverage).toFixed(1),
    status: 'Available',
  };
}
