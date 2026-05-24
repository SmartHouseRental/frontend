import StatusBadge from '@/components/StatusBadge';
import { AGREEMENT_STATUS_STYLES, getAgreementStatusLabel } from '../utils';

export function AgreementStatusBadge({ agreement, className = '' }) {
  const label = getAgreementStatusLabel(agreement);
  const statusKey = agreement?.status;
  const styleMap = Object.fromEntries(
    Object.entries(AGREEMENT_STATUS_STYLES).map(([key, cls]) => [
      getAgreementStatusLabel({ status: key }),
      cls,
    ])
  );

  if (statusKey && AGREEMENT_STATUS_STYLES[statusKey]) {
    styleMap[label] = AGREEMENT_STATUS_STYLES[statusKey];
  }

  return <StatusBadge status={label} statusMap={styleMap} className={className} />;
}
