/**
 * Normalize axios/API errors for chat actions.
 */
export function getChatErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
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

  if (status === 404) {
    return data?.message || 'Conversation not found.';
  }

  if (data?.message) {
    return data.message;
  }

  if (status >= 500) {
    return 'Server error. Please try again later.';
  }

  return fallback;
}
