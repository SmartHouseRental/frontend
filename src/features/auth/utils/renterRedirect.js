const RENTER_DEFAULT_PATH = '/renter/appointments';

const AUTH_ONLY_PATHS = new Set([
  '/login',
  '/signup',
  '/verify-otp',
  '/forgot-password',
  '/reset-password',
  '/preferences',
]);

/**
 * Resolve post-login destination for renters from ProtectedRoute state or default dashboard.
 */
export function getRenterLoginRedirect(locationState) {
  const from = locationState?.from;

  if (from?.pathname) {
    const path = `${from.pathname}${from.search || ''}${from.hash || ''}`;

    if (!AUTH_ONLY_PATHS.has(from.pathname) && path !== '/welcome') {
      return path;
    }
  }

  return RENTER_DEFAULT_PATH;
}
