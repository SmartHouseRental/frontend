/** Normalize API property fields for listing cards (Featured, Near Me, Similar). */

export function getPropertyCardFields(property) {
  const title =
    property.title && typeof property.title === 'object'
      ? property.title.en || property.title.am
      : property.title || 'Property Details';

  const address =
    property.address && typeof property.address === 'object'
      ? property.address.en || property.address.am
      : property.address || property.location || 'Addis Ababa, Ethiopia';

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

  const category =
    property.category && typeof property.category === 'object'
      ? property.category.en || property.category.am
      : property.category;

  const type =
    property.type && typeof property.type === 'object'
      ? property.type.en || property.type.am
      : property.type || category;

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
