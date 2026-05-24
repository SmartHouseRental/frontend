/**
 * Normalizes admin API responses from axios (response.data after interceptor).
 * Ensures list views always receive arrays and detail views receive safe objects.
 */

const DEFAULT_META = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 1,
};

/**
 * Unwrap axios + API envelope to inner payload.
 * Handles: axios { data: { status, data } }, { status, data }, or raw payload.
 */
export function unwrapAdminPayload(response) {
  if (response == null || response === undefined) return null;

  let body = response;

  // Axios response: { data: { status, data }, status: 200, ... }
  if (
    body &&
    typeof body === 'object' &&
    body.data !== undefined &&
    typeof body.data === 'object' &&
    !Array.isArray(body.data) &&
    ('status' in body.data || 'data' in body.data)
  ) {
    body = body.data;
  }

  if (body && typeof body === 'object' && body.status === 'success' && body.data !== undefined) {
    return body.data;
  }

  if (
    body &&
    typeof body === 'object' &&
    !Array.isArray(body) &&
    body.data !== undefined &&
    (body.items !== undefined || body.meta !== undefined || Array.isArray(body.data))
  ) {
    return body.data;
  }

  return body;
}

/**
 * Always returns an array (never throws on .map/.filter).
 */
export function asArray(value) {
  if (value == null || value === undefined) return [];
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.data?.items)) return value.data.items;
  if (Array.isArray(value?.data?.data)) return value.data.data;
  if (Array.isArray(value?.results)) return value.results;
  if (Array.isArray(value?.records)) return value.records;
  return [];
}

/**
 * Paginated list: { items: [], meta: {} }
 */
export function normalizeAdminList(response, options = {}) {
  const payload = unwrapAdminPayload(response);
  const defaultMeta = { ...DEFAULT_META, ...options.defaultMeta };

  if (!payload) {
    return { items: [], meta: { ...defaultMeta } };
  }

  const items = asArray(
    payload.items ??
      payload.data ??
      payload.results ??
      payload.records ??
      payload.list ??
      payload
  );

  const metaSource = payload.meta ?? payload.pagination ?? payload.pageInfo ?? {};
  const meta = {
    page: Number(metaSource.page ?? defaultMeta.page) || 1,
    limit: Number(metaSource.limit ?? defaultMeta.limit) || 20,
    total: Number(metaSource.total ?? items.length) || 0,
    totalPages: Number(metaSource.totalPages ?? defaultMeta.totalPages) || 1,
  };

  return { items, meta };
}

/**
 * Single entity or object payload
 */
export function normalizeAdminObject(response) {
  const payload = unwrapAdminPayload(response);
  if (payload == null) return null;
  if (typeof payload !== 'object' || Array.isArray(payload)) return null;
  return payload;
}

/**
 * Notifications list shape: { data: items[], meta } or { items, meta }
 */
export function normalizeAdminNotifications(response) {
  return normalizeAdminList(response);
}

/**
 * User documents may be array or wrapped
 */
export function normalizeAdminDocuments(response) {
  return asArray(unwrapAdminPayload(response));
}