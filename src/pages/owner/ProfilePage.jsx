import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useSearchParams } from 'react-router';
import ErrorState from '@/components/ErrorState';
import { getApiErrorMessage } from '@/lib/apiErrors';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PersonalInfoForm } from '@/features/profile/components/PersonalInfoForm';
import { VerificationForm } from '@/features/profile/components/VerificationForm';
import { PaymentDetailsForm } from '@/features/profile/components/PaymentDetailsForm';
import { NotificationSettingsForm } from '@/features/profile/components/NotificationSettingsForm';
import { SecurityForm } from '@/features/profile/components/SecurityForm';

function ProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'profile';
  const { t } = useTranslation();
  const pageTitle = t('owner.profile.title');
  const pageSubtitle = t('owner.profile.subtitle');

  const { data: profileResponse, isLoading, isError, error, refetch } = useProfile();
  const profile = profileResponse?.data;

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    navigate(`?${params.toString()}`, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-sm text-muted-foreground">{t('owner.profile.loading')}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="scrollbar-hide h-screen overflow-y-auto p-8">
        <ErrorState
          title={t('owner.profile.failed')}
          message={getApiErrorMessage(error, t('owner.profile.unableToLoad'))}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <div>
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-muted-foreground mt-1">
          {pageSubtitle}
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        defaultValue="profile"
        className="w-full"
      >
        <TabsList className="bg-muted/50">
          <TabsTrigger value="profile">{t('owner.profile.personalInfo')}</TabsTrigger>
          <TabsTrigger value="verification">{t('owner.profile.verification')}</TabsTrigger>
          <TabsTrigger value="payment">{t('owner.profile.paymentDetails')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('owner.profile.notifications')}</TabsTrigger>
          <TabsTrigger value="security">{t('owner.profile.security')}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <PersonalInfoForm profile={profile} />
        </TabsContent>

        <TabsContent value="verification" className="mt-6 space-y-6">
          <VerificationForm profile={profile} />
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-6">
          <PaymentDetailsForm bankDetails={profile?.bankDetails} />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <NotificationSettingsForm profile={profile} />
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <SecurityForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
