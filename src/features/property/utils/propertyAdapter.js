// Normalizes API property responses to a consistent format
// Handles localized fields ({en, am}) and field name mappings

export const adaptProperty = (property, lang = 'en') => {
  if (!property) return null;

  // Helper to extract localized value
  const getLocalized = (field, fallback = '') => {
    if (typeof field === 'object' && field !== null) {
      return field[lang] || field['en'] || fallback;
    }
    return field || fallback;
  };

  return {
    id: property.id,
    title: getLocalized(property.title, 'Property'),
    description: getLocalized(property.description, ''),
    address: getLocalized(property.address, ''),
    category: getLocalized(property.category, ''),

    // Dimensions
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area?.value || 0,
    areaUnit: property.area?.unit || 'sqm',

    // Location & Media
    location: property.location, // {lat, lng}
    images: property.images || [],
    video: property.video || null,
    videos: property.videos || [], // For recommendations endpoint

    // Price & Terms
    price: property.price?.value || 0,
    currency: property.price?.currency || 'ETB',
    furnishingStatus: property.furnishingStatus || '',
    amenities: property.amenities || [],

    // Lease Terms
    leaseTerms: property.leaseTerms || {},
    availableFrom: property.availableFrom,
    minDuration: property.leaseTerms?.minDuration,

    // Stats & Metadata
    viewCount: property.viewCount || 0,
    status: property.status,
    isVerified: property.isVerified || false,
    owner: property.owner || property.ownerId, // Handle both cases

    // Timestamps - Handle both updateAt (API typo) and updatedAt
    createdAt: property.createdAt,
    updatedAt: property.updateAt || property.updatedAt,

    // Raw data for cases where we need full response
    _raw: property,
  };
};

// Adapt array of properties
export const adaptProperties = (properties, lang = 'en') => {
  if (!Array.isArray(properties)) return [];
  return properties.map(p => adaptProperty(p, lang));
};

// Extract from API envelope
export const extractPropertyData = (response) => {
  if (!response) return null;
  // Handle wrapper structure {data: property} or direct property
  return response.data || response;
};

export const extractPropertiesData = (response) => {
  if (!response) return [];
  // Handle wrapper structure {data: [properties]} or direct array
  if (Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  return [];
};
