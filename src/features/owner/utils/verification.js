export function resolveVerificationState(profile, verification, docStatus, hasDocuments) {
  if (profile?.isVerified || docStatus === 'approved' || docStatus === 'verified') {
    return 'verified';
  }
  if (!hasDocuments) {
    return 'pending_documents';
  }
  if (docStatus === 'under_review') return 'under_review';
  if (docStatus === 'rejected') return 'rejected';
  if (docStatus === 'resubmit') return 'resubmit';
  return 'under_review';
}

export function verificationStateFromOverview(overview) {
  if (!overview) return 'pending_documents';

  const verification = overview.verification;
  const profile = overview.profile;
  const docStatus = verification?.overallStatus || verification?.status;
  const hasDocuments = verification?.hasDocuments ?? false;

  return resolveVerificationState(profile, verification, docStatus, hasDocuments);
}

export function verificationStateFromProfileAndDocuments(profile, documents) {
  const docStatus = documents?.overallStatus || documents?.status;
  const hasDocuments =
    (documents?.uploadedFiles?.length ?? 0) > 0 || Boolean(docStatus);

  return resolveVerificationState(profile, null, docStatus, hasDocuments);
}
