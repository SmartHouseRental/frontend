import { House, Calendar, Star, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { getUserStatusMeta, getVerificationStateMeta } from '@/features/admin/mappers';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function OverviewTab({ user }) {
  const { t } = useTranslation();

  if (!user) return null;

  const statusMeta = getUserStatusMeta(user.status);
  const verificationMeta = getVerificationStateMeta(user.verificationState);
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email;
  const roleLabel = t(`adminUserDetail.roles.${user.role}`, { defaultValue: user.role || '—' });
  const statusLabel = t(`adminUserDetail.statuses.${user.status}`, { defaultValue: statusMeta.label });
  const verificationLabel = t(`adminUserDetail.verificationStates.${user.verificationState}`, {
    defaultValue: verificationMeta.label,
  });
  const emailStatusLabel = user.emailVerified
    ? t('adminUserDetail.overview.emailVerified')
    : t('adminUserDetail.overview.emailNotVerified');

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <House />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">{t('adminUserDetail.overview.role')}</span>
          </div>
          <h3 className="text-primary text-3xl font-black capitalize">{roleLabel}</h3>
          <p className="text-primary/60 text-sm font-medium">{t('adminUserDetail.overview.platformRole')}</p>
        </Card>
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <Calendar />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">{t('adminUserDetail.overview.account')}</span>
          </div>
          <h3 className="text-primary text-2xl font-black">{statusLabel}</h3>
          <p className="text-primary/60 text-sm font-medium">
            {t('adminUserDetail.overview.memberSince', { date: formatDate(user.createdAt) })}
          </p>
        </Card>
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-lg bg-yellow-400/10 p-2 text-yellow-600">
              <Star />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">{t('adminUserDetail.overview.verification')}</span>
          </div>
          <h3 className="text-primary text-2xl font-black">{verificationLabel}</h3>
          <p className="text-primary/60 text-sm font-medium">{emailStatusLabel}</p>
        </Card>
      </div>

      <Card className="border-primary/10 gap-0 overflow-hidden py-0">
        <div className="bg-primary/5 border-primary/10 border-b px-6 py-4">
          <h3 className="text-primary flex items-center gap-2 font-bold">
            <Info className="text-[18px]" />
            {t('adminUserDetail.overview.personalDetails')}
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 p-8 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              {t('adminUserDetail.overview.fullName')}
            </label>
            <p className="text-primary font-bold">{fullName}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              {t('adminUserDetail.overview.emailAddress')}
            </label>
            <p className="text-primary font-bold">{user.email || '—'}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              {t('adminUserDetail.overview.phoneNumber')}
            </label>
            <p className="text-primary font-bold">{user.phone || '—'}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              {t('adminUserDetail.overview.userId')}
            </label>
            <p className="text-primary font-mono text-sm font-bold">{user.id}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              {t('adminUserDetail.overview.registrationDate')}
            </label>
            <p className="text-primary font-bold">{formatDate(user.createdAt)}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              {t('adminUserDetail.overview.lastUpdated')}
            </label>
            <p className="text-primary font-bold">{formatDate(user.updatedAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OverviewTab;
