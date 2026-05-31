import { Card } from '@/components/ui/card';
import { MailCheck, Mail, CircleUserRound, MoveLeft, ShieldBan, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import UserDetailTabs from '@/features/user-managment/components/UserDetailTab';

import { useNavigate, useParams } from 'react-router';
import {
  useAdminResolveVerification,
  useAdminUpdateUserStatus,
  useAdminUpdateUserVerification,
  useAdminUser,
} from '@/features/admin/hooks/useAdmin';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import { getUserStatusMeta, getVerificationStateMeta } from '@/features/admin/mappers';

function UserDetailPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: user, isLoading, isError, refetch } = useAdminUser(id);
  const updateStatus = useAdminUpdateUserStatus();
  const updateVerification = useAdminUpdateUserVerification();
  const resolveVerification = useAdminResolveVerification();

  if (isLoading) {
    return (
      <div>
        <TableSkeleton rows={4} columns={2} showHeader={false} />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div>
        <ErrorState title={t('adminUserDetail.errors.failedToLoadUser', { defaultValue: 'Failed to load user' })} onRetry={refetch} />
      </div>
    );
  }

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email;
  const statusMeta = getUserStatusMeta(user.status);
  const verificationMeta = getVerificationStateMeta(user.verificationState);
  const isVerified = user.verificationState === 'verified';
  const roleLabel = t(`adminUserDetail.roles.${user.role}`, { defaultValue: user.role });
  const statusLabel = t(`adminUserDetail.statuses.${user.status}`, { defaultValue: statusMeta.label });
  const verificationLabel = t(`adminUserDetail.verificationStates.${user.verificationState}`, {
    defaultValue: verificationMeta.label,
  });
  const emailLabel = user.emailVerified ? t('adminUserDetail.verified') : t('adminUserDetail.notVerified');

  const handleToggleVerification = () => {
    const latestDoc = user.verificationDocs?.[0];
    if (latestDoc?.id) {
      resolveVerification.mutate({
        id: latestDoc.id,
        status: isVerified ? 'pending' : 'approved',
      });
      return;
    }

    updateVerification.mutate({
      id: user.id,
      verificationState: isVerified ? 'pending' : 'verified',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-primary/10 rounded-lg p-2 transition-colors"
        >
          <MoveLeft className="text-primary" />
        </button>
        <h1 className="text-primary text-xl font-bold tracking-tight">{t('adminUserDetail.adminControlPanel')}</h1>
      </div>

      <div className="mx-auto mt-5 max-w-400">
        <Card className="border-primary/10 mb-10 p-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative">
                <img
                  className="border-primary/10 h-32 w-32 rounded-full border-4 object-cover"
                  data-alt="User profile portrait"
                  src={user.image || 'https://via.placeholder.com/128'}
                />
                <div className="absolute right-1 bottom-1 h-6 w-6 rounded-full border-4 border-white bg-green-500 dark:border-zinc-900"></div>
              </div>
              <div className="text-center md:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <h2 className="text-primary text-3xl font-extrabold">{fullName}</h2>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${verificationMeta.style}`}>
                    <BadgeCheck /> {verificationLabel}
                  </span>
                  <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-bold">
                    {roleLabel}
                  </span>
                </div>
                <div className="text-primary/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <span>
                      <CircleUserRound size={16} />
                    </span>
                    {t('adminUserDetail.account')}: <span className="ml-0.5 font-bold text-green-600">{statusLabel}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[18px]">
                      <MailCheck size={16} />
                    </span>
                    {t('adminUserDetail.email')}: <span className="ml-0.5 font-bold text-green-600">{emailLabel}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-3 lg:w-auto">
              <Button
                className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 inline-flex flex-1 items-center justify-center rounded-lg border px-5 py-2.5 font-bold transition-all lg:flex-none"
                onClick={handleToggleVerification}
              >
                <ShieldCheck />
                {isVerified ? t('adminUserDetail.unverify') : t('adminUserDetail.verify')}
              </Button>
              <Button
                className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 inline-flex flex-1 items-center justify-center rounded-lg border px-5 py-2.5 font-bold transition-all lg:flex-none"
                onClick={() =>
                  updateStatus.mutate({
                    id: user.id,
                    status: user.status === 'suspended' ? 'active' : 'suspended',
                  })
                }
              >
                <ShieldBan /> {t('adminUserDetail.suspend')}
              </Button>
              <Button className="bg-primary shadow-primary/20 inline-flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 font-bold text-white shadow-lg transition-all hover:brightness-110 lg:flex-none">
                <span className="mr-2">
                  <Mail size={19} />
                </span>
                {t('adminUserDetail.sendNotification')}
              </Button>
            </div>
          </div>
        </Card>

        <div className="">
          <UserDetailTabs user={user} t={t} />
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
