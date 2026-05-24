/**
 * Normalize axios/API errors for renter dashboard actions.
 */
export function getApiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error) return fallback;

  if (!error.response) {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return 'Network error. Check your connection and try again.';
    }
    return error.message || fallback;
  }

  const { status, data } = error.response;

  if (status === 401) {
    return data?.message || 'Your session has expired. Please sign in again.';
  }

  if (status === 403) {
    return data?.message || 'You do not have permission to perform this action.';
  }

  if (status === 400 && data?.errors) {
    const fieldMessages = Object.entries(data.errors)
      .flatMap(([, msgs]) => (Array.isArray(msgs) ? msgs : [msgs]))
      .filter(Boolean);
    if (fieldMessages.length > 0) {
      return fieldMessages.join(' ');
    }
  }

  if (data?.message) {
    return data.message;
  }

  if (status >= 500) {
    return 'Server error. Please try again later.';
  }

  return fallback;
}
