import { getLocalizedField } from '@/lib/i18n/getLocalizedField';

/** Normalize API property fields for listing cards (Featured, Near Me, Similar). */

export function getPropertyCardFields(property, locale = 'en') {
  const title =
    getLocalizedField(property.title, locale) || 'Property Details';

  const address =
    getLocalizedField(property.address, locale) ||
    property.location ||
    'Addis Ababa, Ethiopia';

  const priceValue =
    property.price && typeof property.price === 'object'
      ? property.price.value
      : property.price;

  const priceCurrency =
    property.price && typeof property.price === 'object'
      ? property.price.currency || 'ETB'
      : 'ETB';

  const areaValue =
    property.area && typeof property.area === 'object'
      ? property.area.value
      : property.area;

  const category = getLocalizedField(property.category, locale);

  const type =
    getLocalizedField(property.type, locale) || category;

  const image =
    property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';

  return {
    title,
    address,
    priceValue,
    priceCurrency,
    areaValue,
    type,
    image,
  };
}
