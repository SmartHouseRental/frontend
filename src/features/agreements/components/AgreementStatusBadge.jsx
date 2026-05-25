import StatusBadge from '@/components/StatusBadge';
import { AGREEMENT_STATUS_STYLES, getAgreementStatusLabel } from '../utils';
import { useTranslation } from 'react-i18next';

export function AgreementStatusBadge({ agreement, className = '' }) {
  const { t } = useTranslation();
  const statusKey = agreement?.status;
  const label = statusKey
    ? t(`owner.agreements.statuses.${statusKey}`, {
        defaultValue: getAgreementStatusLabel(agreement),
      })
    : getAgreementStatusLabel(agreement);
  const styleMap = Object.fromEntries(
    Object.entries(AGREEMENT_STATUS_STYLES).map(([key, cls]) => [
      t(`owner.agreements.statuses.${key}`, {
        defaultValue: getAgreementStatusLabel({ status: key }),
      }),
      cls,
    ])
  );

  if (statusKey && AGREEMENT_STATUS_STYLES[statusKey]) {
    styleMap[label] = AGREEMENT_STATUS_STYLES[statusKey];
  }

  return <StatusBadge status={label} statusMap={styleMap} className={className} />;
}
