export function getUserApiErrorMessage(error, fallback = 'Something went wrong.') {
  if (!error) return fallback;

  if (!error.response) {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return 'Network error. Check your connection and try again.';
    }
    return error.message || fallback;
  }

  const { status, data } = error.response;

  if (status === 401) {
    return data?.message || 'Unable to load this profile.';
  }

  if (status === 404) {
    return data?.message || 'Owner profile not found.';
  }

  if (data?.message) return data.message;

  if (status >= 500) return 'Server error. Please try again later.';

  return fallback;
}
