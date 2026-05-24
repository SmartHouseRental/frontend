import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useSearchParams } from 'react-router';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { Loader2 } from 'lucide-react';

import { PersonalInfoForm } from '@/features/profile/components/PersonalInfoForm';
import { VerificationForm } from '@/features/profile/components/VerificationForm';
import { PaymentDetailsForm } from '@/features/profile/components/PaymentDetailsForm';
import { NotificationSettingsForm } from '@/features/profile/components/NotificationSettingsForm';
import { SecurityForm } from '@/features/profile/components/SecurityForm';

function ProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'profile';

  const { data: profileResponse, isLoading } = useProfile();
  const profile = profileResponse?.data;

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    navigate(`?${params.toString()}`, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <div>
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
          Profile & Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal info, security, and preferences.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        defaultValue="profile"
        className="w-full"
      >
        <TabsList className="bg-muted/50">
          <TabsTrigger value="profile">Personal Info</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="payment">Payment Details</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
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
