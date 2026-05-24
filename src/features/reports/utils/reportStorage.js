const PREFIX = 'shr_report_submitted_';

function storageKey(targetType, targetId) {
  return `${PREFIX}${targetType}_${targetId}`;
}

export function hasReportedTarget(targetType, targetId) {
  if (!targetType || !targetId) return false;
  try {
    return sessionStorage.getItem(storageKey(targetType, targetId)) === '1';
  } catch {
    return false;
  }
}

export function markTargetReported(targetType, targetId) {
  if (!targetType || !targetId) return;
  try {
    sessionStorage.setItem(storageKey(targetType, targetId), '1');
  } catch {
    // ignore quota / private mode
  }
}
