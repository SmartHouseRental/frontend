/**
 * Whether the current viewer may see/use "Report Owner" for a given profile.
 * Renters and guests only; never owners/admins viewing another user.
 */
export function canRenterReportOwner(viewer, profileUserId) {
  if (!profileUserId) return false;

  const viewerId = viewer?.id;
  if (viewerId && viewerId === profileUserId) return false;

  const role = viewer?.role?.toLowerCase();
  if (role === 'owner' || role === 'admin') return false;

  return true;
}

/**
 * Profile is an owner/host when opened via real API id or known dummy owner/agent.
 */
export function isReportableHostProfile({ routeId, matchedUser, profileFromState }) {
  if (!routeId) return false;

  const role =
    profileFromState?.role?.toLowerCase() ||
    matchedUser?.role?.toLowerCase();

  if (role === 'renter') return false;

  // Real owner ids from API are not in dummy data — treat as host profile
  if (!matchedUser && routeId) return true;

  return role === 'owner' || role === 'agent';
}
