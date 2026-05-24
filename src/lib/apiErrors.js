/**
 * Extract a user-facing message from an API error (axios or fetch-shaped).
 */
export function getApiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (error?.userMessage && typeof error.userMessage === 'string') {
    return error.userMessage;
  }
  const data = error?.response?.data;
  if (typeof data === 'string' && data.trim()) return data.trim();
  if (data?.message && typeof data.message === 'string') {
    return data.message.replace(/^Database error:\s*/i, '').trim() || fallback;
  }
  if (error?.message && typeof error.message === 'string') return error.message;
  return fallback;
}

export function isSchemaSyncError(error) {
  const message = getApiErrorMessage(error, '').toLowerCase();
  return (
    message.includes('paymentstatus') ||
    message.includes('schema is out of sync') ||
    message.includes('database schema') ||
    message.includes('does not exist')
  );
}

export function isNotFoundError(error) {
  return error?.response?.status === 404;
}

export function isUnauthorizedError(error) {
  return error?.response?.status === 401;
}
