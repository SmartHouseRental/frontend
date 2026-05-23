import {
  toDisplayString,
  formatPersonName,
  formatPropertyCategory,
  formatPropertyPrice,
  formatLocalizedText,
} from './mappers';
import { asArray, unwrapAdminPayload, normalizeAdminList } from './adminResponse';

export function sanitizeImageUrls(images) {
  return asArray(images)
    .map((img) => {
      if (typeof img === 'string') return img;
      if (img && typeof img === 'object') {
        return img.url || img.src || img.path || img.imageUrl || null;
      }
      return null;
    })
    .filter(Boolean);
}

export function sanitizePropertyEntity(property) {
  if (!property || typeof property !== 'object') return property;
  return {
    ...property,
    images: sanitizeImageUrls(property.images),
    categoryType: formatPropertyCategory(property.category),
    displayTitle: formatLocalizedText(property.title, 'Property'),
    displayDescription: formatLocalizedText(property.description, ''),
    displayAddress: formatLocalizedText(property.address || property.location, ''),
    displayLocation: formatLocalizedText(property.location, ''),
    displayPrice: formatPropertyPrice(property.price, '-'),
    displayArea: formatLocalizedText(property.area, ''),
    owner: property.owner
      ? {
          ...property.owner,
          displayName: formatPersonName(property.owner),
        }
      : property.owner,
  };
}

export function sanitizeReportEntity(report) {
  if (!report || typeof report !== 'object') return report;
  return {
    ...report,
    category: toDisplayString(report.category, 'Other'),
    description: toDisplayString(report.description, ''),
  };
}

export function sanitizeReviewEntity(review) {
  if (!review || typeof review !== 'object') return review;
  return {
    ...review,
    comment: toDisplayString(review.comment, ''),
  };
}

export function sanitizeNotificationEntity(notification) {
  if (!notification || typeof notification !== 'object') return notification;
  return {
    ...notification,
    title: toDisplayString(notification.title, 'Notification'),
    body: toDisplayString(notification.body, ''),
  };
}

export function sanitizeAgreementEntity(agreement) {
  if (!agreement || typeof agreement !== 'object') return agreement;
  return {
    ...agreement,
    property: agreement.property ? sanitizePropertyEntity(agreement.property) : agreement.property,
  };
}

export function sanitizePendingVerificationEntity(owner) {
  if (!owner || typeof owner !== 'object') return owner;
  return {
    ...owner,
    name: toDisplayString(owner.name, 'Unknown'),
    documents: asArray(owner.documents).map((doc, index) =>
      typeof doc === 'string' ? doc : toDisplayString(doc, `doc-${index}`)
    ),
  };
}

export function sanitizeOverviewPayload(data) {
  if (!data || typeof data !== 'object') {
    return {
      lastUpdated: null,
      stats: {},
      userGrowth: { range: 'monthly', labels: [], currentPeriod: [], previousPeriod: [] },
      recentActivity: [],
      recentProperties: [],
      listingsByArea: [],
      paymentPerformance: {},
    };
  }

  return {
    ...data,
    paymentPerformance: data.paymentPerformance
      ? {
          ...data.paymentPerformance,
          label: toDisplayString(data.paymentPerformance.label, 'On Time Collection'),
        }
      : {},
    userGrowth: {
      ...data.userGrowth,
      labels: asArray(data.userGrowth?.labels).map((label, index) =>
        toDisplayString(label, `Period ${index + 1}`)
      ),
      currentPeriod: asArray(data.userGrowth?.currentPeriod),
      previousPeriod: asArray(data.userGrowth?.previousPeriod),
    },
    recentActivity: asArray(data.recentActivity).map((item, index) => ({
      ...item,
      id: item?.id ?? `activity-${index}`,
      text: toDisplayString(item?.text, ''),
      detail: toDisplayString(item?.detail, ''),
      time: toDisplayString(item?.time, ''),
    })),
    recentProperties: asArray(data.recentProperties).map((item, index) => ({
      ...item,
      id: item?.id ?? `property-${index}`,
      name: toDisplayString(item?.name ?? item?.title, 'Untitled Property'),
      location: toDisplayString(item?.location ?? item?.address, 'N/A'),
      owner: toDisplayString(item?.owner, 'Unknown'),
      status: toDisplayString(item?.status, ''),
      statusLabel: toDisplayString(item?.statusLabel ?? item?.status, ''),
    })),
    listingsByArea: asArray(data.listingsByArea).map((item, index) => {
      const area = toDisplayString(item?.area, 'Unknown');
      return {
        ...item,
        area,
        areaKey: `${area}-${index}`,
      };
    }),
  };
}

export function normalizeAdminOverview(response) {
  const data = unwrapAdminPayload(response);
  return sanitizeOverviewPayload(data);
}

export function mapAdminList(response, mapItem) {
  const { items, meta } = normalizeAdminList(response);
  return {
    items: typeof mapItem === 'function' ? items.map(mapItem) : items,
    meta,
  };
}

/** Safe list extraction for pages that apply client-side filters */
export function getAdminListItems(data) {
  return Array.isArray(data?.items) ? data.items : [];
}
