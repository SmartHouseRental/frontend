/** API-aligned filter helpers for GET /api/v1/properties */

export const DEFAULT_LIST_LIMIT = 12;
export const DEFAULT_STATUS = 'AVAILABLE';

export const PROPERTY_CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Condominium', label: 'Condominium' },
  { value: 'Service Apartment', label: 'Service Apartment' },
  { value: 'Private Compound', label: 'Private Compound' },
];

export const BEDROOM_OPTIONS = ['1', '2', '3', '4'];
export const BATHROOM_OPTIONS = ['1', '2', '3'];

/** Slider range in thousands ETB (5k – 200k) */
export const PRICE_MIN_THOUSANDS = 5;
export const PRICE_MAX_THOUSANDS = 200;
export const PRICE_SLIDER_STEP_THOUSANDS = 5;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Listings', sortBy: 'createdAt', order: 'desc' },
  { value: 'low', label: 'Price: Low to High', sortBy: 'price', order: 'asc' },
  { value: 'high', label: 'Price: High to Low', sortBy: 'price', order: 'desc' },
  { value: 'views', label: 'Most Viewed', sortBy: 'viewCount', order: 'desc' },
];

const FILTER_PARAM_KEYS = ['category', 'minPrice', 'maxPrice', 'bedrooms', 'bathrooms'];

function parsePositiveInt(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseOptionalInt(value) {
  if (value === null || value === undefined || value === '') return undefined;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function parseOptionalNumber(value) {
  if (value === null || value === undefined || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export function getSortOption(sortValue) {
  return SORT_OPTIONS.find((o) => o.value === sortValue) || SORT_OPTIONS[0];
}

/** Read explore/search filter state from URL search params */
export function parseExploreFilters(searchParams) {
  const sortValue = searchParams.get('sort') || 'newest';
  const sortOption = getSortOption(sortValue);
  const minPrice = parseOptionalNumber(searchParams.get('minPrice'));
  const maxPrice = parseOptionalNumber(searchParams.get('maxPrice'));

  return {
    page: parsePositiveInt(searchParams.get('page'), 1),
    limit: Math.min(50, parsePositiveInt(searchParams.get('limit'), DEFAULT_LIST_LIMIT)),
    category: searchParams.get('category') || '',
    minPrice,
    maxPrice,
    minPriceThousands: minPrice ? Math.round(minPrice / 1000) : PRICE_MIN_THOUSANDS,
    maxPriceThousands: maxPrice ? Math.round(maxPrice / 1000) : PRICE_MAX_THOUSANDS,
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    sort: sortValue,
    sortBy: sortOption.sortBy,
    order: sortOption.order,
    status: DEFAULT_STATUS,
    q: searchParams.get('q') || '',
  };
}

/** Map UI/URL filter state to GET /properties query params */
export function buildApiParams(filters) {
  const params = {
    page: filters.page,
    limit: filters.limit,
    status: filters.status,
    sortBy: filters.sortBy,
    order: filters.order,
  };

  if (filters.category) params.category = filters.category;
  if (filters.minPrice != null) params.minPrice = filters.minPrice;
  if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;

  const bedrooms = parseOptionalInt(filters.bedrooms);
  if (bedrooms) params.bedrooms = bedrooms;

  const bathrooms = parseOptionalInt(filters.bathrooms);
  if (bathrooms) params.bathrooms = bathrooms;

  return params;
}

/** Merge filter patch into URL search params (resets page when filters change) */
export function applyFilterPatch(prev, patch, { resetPage = true } = {}) {
  const next = new URLSearchParams(prev);

  FILTER_PARAM_KEYS.forEach((key) => {
    if (!(key in patch)) return;
    const value = patch[key];
    if (value === '' || value === null || value === undefined) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }
  });

  if ('sort' in patch) {
    const value = patch.sort;
    if (!value || value === 'newest') {
      next.delete('sort');
    } else {
      next.set('sort', value);
    }
  }

  if ('page' in patch) {
    const page = patch.page;
    if (!page || page <= 1) next.delete('page');
    else next.set('page', String(page));
  }

  if (resetPage && FILTER_PARAM_KEYS.some((key) => key in patch)) {
    next.delete('page');
  }

  return next;
}

export function clearFilterParams(prev) {
  const next = new URLSearchParams(prev);
  FILTER_PARAM_KEYS.forEach((key) => next.delete(key));
  next.delete('page');
  return next;
}

/** Labels for active filter chips */
export function getActiveFilterChips(filters) {
  const chips = [];

  if (filters.q) {
    chips.push({ id: 'q', label: 'Search', value: filters.q });
  }
  if (filters.category) {
    chips.push({
      id: 'category',
      label: 'Type',
      value: PROPERTY_CATEGORY_OPTIONS.find((o) => o.value === filters.category)?.label || filters.category,
    });
  }
  if (filters.minPrice != null || filters.maxPrice != null) {
    const min = filters.minPrice != null ? `${filters.minPrice.toLocaleString()} ETB` : 'Any';
    const max = filters.maxPrice != null ? `${filters.maxPrice.toLocaleString()} ETB` : 'Any';
    chips.push({ id: 'price', label: 'Budget', value: `${min} – ${max}` });
  }
  if (filters.bedrooms) {
    chips.push({ id: 'bedrooms', label: 'Bedrooms', value: filters.bedrooms });
  }
  if (filters.bathrooms) {
    chips.push({ id: 'bathrooms', label: 'Bathrooms', value: filters.bathrooms });
  }

  return chips;
}

/** Draft shape used inside FilterSidebar before Apply */
export function filtersToDraft(filters) {
  return {
    category: filters.category || 'all',
    minPriceThousands: filters.minPriceThousands,
    maxPriceThousands: filters.maxPriceThousands,
    bedrooms: filters.bedrooms || '',
    bathrooms: filters.bathrooms || '',
  };
}

export function draftToFilterPatch(draft) {
  const minThousands = Math.min(draft.minPriceThousands, draft.maxPriceThousands);
  const maxThousands = Math.max(draft.minPriceThousands, draft.maxPriceThousands);
  const atMin = minThousands <= PRICE_MIN_THOUSANDS;
  const atMax = maxThousands >= PRICE_MAX_THOUSANDS;

  return {
    category: draft.category && draft.category !== 'all' ? draft.category : '',
    minPrice: atMin ? '' : minThousands * 1000,
    maxPrice: atMax ? '' : maxThousands * 1000,
    bedrooms: draft.bedrooms || '',
    bathrooms: draft.bathrooms || '',
  };
}
