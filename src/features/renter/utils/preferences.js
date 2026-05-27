import { z } from 'zod';

export const DEFAULT_AMENITIES = [
  'Backup Generator',
  'Parking',
  'WiFi / Broadband',
  'Security',
  'Balcony',
  'Elevator',
  'Gym',
];

export const PROPERTY_TYPE_OPTIONS = [
  { label: 'Villa', value: 'VILLA' },
  { label: 'Apartment', value: 'APARTMENT' },
  { label: 'Condominium', value: 'CONDO' },
  { label: 'Studio', value: 'STUDIO' },
  { label: 'House', value: 'HOUSE' },
  { label: 'Shared Room', value: 'SHARED_ROOM' },
  { label: 'Serviced Apartment', value: 'SERVICED_APARTMENT' },
  { label: 'Penthouse', value: 'PENTHOUSE' },
];

export const BEDROOM_OPTIONS = [
  { label: '1', value: 1, detail: 'Studio / 1-bed' },
  { label: '2', value: 2, detail: 'Ideal for couples' },
  { label: '3', value: 3, detail: 'For small families' },
  { label: '4+', value: 4, detail: 'Large family / villa' },
];

export const FURNISHING_OPTIONS = [
  { label: 'Fully Furnished', value: 'furnished', detail: 'Move in with just your bags' },
  { label: 'Semi-Furnished', value: 'semi-furnished', detail: 'Major furniture is there' },
  { label: 'Unfurnished', value: 'unfurnished', detail: 'Blank canvas - decorate your way' },
];

export const DEFAULT_RENTER_PREFERENCES = {
  budget: [15000, 80000],
  bedrooms: 2,
  preferredLocations: [],
  preferredType: '',
  amenities: [],
  furnishStatus: '',
};

export const renterPreferenceFormSchema = z.object({
  budget: z
    .tuple([z.number().nonnegative(), z.number().nonnegative()])
    .refine(([min, max]) => min <= max, 'Minimum budget must be less than maximum budget'),
  bedrooms: z.number().int().nonnegative({ message: 'Choose a bedroom preference' }),
  preferredLocations: z
    .array(
      z.object({
        name: z.string().min(1),
        lat: z.number(),
        lng: z.number(),
      })
    )
    .min(1, 'Choose at least one preferred location'),
  preferredType: z
    .string()
    .min(1, 'Choose a preferred property type')
    .refine(
      (value) => PROPERTY_TYPE_OPTIONS.some((option) => option.value === value),
      'Choose a valid property type'
    ),
  amenities: z.array(z.string()).default([]),
  furnishStatus: z
    .string()
    .min(1, 'Choose a furnishing preference')
    .refine(
      (value) => FURNISHING_OPTIONS.some((option) => option.value === value),
      'Choose a valid furnishing preference'
    ),
});

export function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label || value || 'Not set';
}

export function normalizeLocation(location) {
  return {
    name: location.name || location.address || '',
    lat: Number(location.lat),
    lng: Number(location.lng ?? location.lon),
  };
}

function normalizeLocalizedValue(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.en || '';
}

export function preferenceFormValuesFromApi(preferences) {
  if (!preferences) return DEFAULT_RENTER_PREFERENCES;

  return {
    budget: [
      preferences.budget?.min ?? DEFAULT_RENTER_PREFERENCES.budget[0],
      preferences.budget?.max ?? DEFAULT_RENTER_PREFERENCES.budget[1],
    ],
    bedrooms: preferences.bedrooms ?? DEFAULT_RENTER_PREFERENCES.bedrooms,
    preferredLocations: (preferences.preferredLocations || [])
      .map(normalizeLocation)
      .filter((location) => location.name && Number.isFinite(location.lat) && Number.isFinite(location.lng)),
    preferredType: normalizeLocalizedValue(preferences.preferredType),
    amenities: preferences.amenities || [],
    furnishStatus: normalizeLocalizedValue(preferences.furnishStatus),
  };
}

export function buildPreferencePayload(values) {
  return {
    budget: {
      min: values.budget[0],
      max: values.budget[1],
      currency: 'ETB',
    },
    bedrooms: values.bedrooms,
    preferredLocations: values.preferredLocations.map((location) => ({
      address: location.name,
      lat: location.lat,
      lng: location.lng,
    })),
    preferredType: values.preferredType,
    amenities: values.amenities,
    furnishStatus: values.furnishStatus,
  };
}
