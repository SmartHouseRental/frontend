import { getLocalizedText } from '@/lib/utils/i18n';

/** Form select values (must match propertyFormSchema enum). */
export const PROPERTY_TYPE_OPTIONS = [
  { value: 'VILLA', label: 'Villa' },
  { value: 'APARTMENT', label: 'Apartment' },
  { value: 'CONDO', label: 'Condo' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'HOUSE', label: 'House' },
  { value: 'SHARED_ROOM', label: 'Shared Room' },
  { value: 'SERVICED_APARTMENT', label: 'Serviced Apartment' },
  { value: 'PENTHOUSE', label: 'Penthouse' },
];

const CATEGORY_LABEL_TO_ENUM = {
  villa: 'VILLA',
  apartment: 'APARTMENT',
  condo: 'CONDO',
  studio: 'STUDIO',
  house: 'HOUSE',
  penthouse: 'PENTHOUSE',
  'shared room': 'SHARED_ROOM',
  'serviced apartment': 'SERVICED_APARTMENT',
};

const ENUM_VALUES = new Set(PROPERTY_TYPE_OPTIONS.map((t) => t.value));

const FURNISHING_FROM_API = {
  furnished: 'Fully Furnished',
  'semi-furnished': 'Semi-Furnished',
  unfurnished: 'Unfurnished',
  'fully furnished': 'Fully Furnished',
  'semi furnished': 'Semi-Furnished',
};

const AREA_UNIT_FROM_API = {
  sqm: 'm²',
  'm²': 'm²',
  'sq ft': 'sq ft',
  'km²': 'km²',
};

/**
 * Maps API category ({ en, am } or label) to form enum value.
 */
export function categoryToFormValue(category) {
  if (!category) return 'APARTMENT';

  const en =
    typeof category === 'string'
      ? category
      : getLocalizedText(category, 'en');

  const trimmed = en.trim();
  if (!trimmed) return 'APARTMENT';

  const asEnum = trimmed.toUpperCase().replace(/[\s-]+/g, '_');
  if (ENUM_VALUES.has(asEnum)) return asEnum;

  return CATEGORY_LABEL_TO_ENUM[trimmed.toLowerCase()] || 'APARTMENT';
}

/**
 * Amenity chips use English strings; API returns { en, am }[].
 */
export function amenitiesToFormValues(amenities) {
  if (!Array.isArray(amenities)) return [];

  return amenities
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      if (item && typeof item === 'object') {
        return (item.en || item.am || '').trim();
      }
      return '';
    })
    .filter(Boolean);
}

/**
 * API furnishingStatus → form Select value.
 */
export function furnishingToFormValue(furnishingStatus) {
  if (!furnishingStatus || typeof furnishingStatus !== 'string') return undefined;

  const key = furnishingStatus.trim().toLowerCase();
  if (FURNISHING_FROM_API[key]) return FURNISHING_FROM_API[key];

  if (['Fully Furnished', 'Semi-Furnished', 'Unfurnished'].includes(furnishingStatus)) {
    return furnishingStatus;
  }

  return undefined;
}

/**
 * API area.unit (e.g. sqm) → form unit (e.g. m²).
 */
export function areaUnitToFormValue(unit) {
  if (!unit || typeof unit !== 'string') return 'm²';
  return AREA_UNIT_FROM_API[unit.trim().toLowerCase()] || unit;
}
