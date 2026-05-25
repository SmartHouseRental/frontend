import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import VerificationBanner from '@/components/VerificationBanner';
import { useOwnerVerificationState } from '@/features/owner/hooks/useOwnerVerificationState';
import { useNavigate } from 'react-router';
import PageHeader from '@/components/PageHeader';
import { PropertyForm } from '@/features/properties/components/PropertyForm';
import { useTranslation } from 'react-i18next';

function AddPropertyPage() {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();
  
  const { verificationState, isVerified, hasDocuments, docStatus } = useOwnerVerificationState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerified) {
      setShowVerificationModal(true);
    }
  }, [isVerified]);

  const handleSuccess = () => {
    // Automatically redirect to my properties page after successful creation
    navigate('/owner/properties');
  };

  const handleCancel = () => {
    navigate('/owner/properties');
  };

  if (isSubmitted) {
    return (
      <div className="scrollbar-hide h-screen overflow-y-auto p-8">
        <div className="animate-in fade-in-0 flex flex-col items-center justify-center py-24 duration-500">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-foreground text-2xl font-extrabold">{t('owner.addProperty.successTitle')}</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-center">
            {t('owner.addProperty.successDesc')}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
            >
              {t('owner.addProperty.addAnother')}
            </Button>
            <Button onClick={() => navigate('/owner/properties')}>
              {t('owner.addProperty.viewMyProperties')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Verification Required Modal
  if (showVerificationModal && !isVerified) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="space-y-6 pt-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 mx-auto">
              <ShieldAlert size={32} className="text-amber-500" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-foreground text-xl font-extrabold">{t('owner.addProperty.verificationRequired')}</h3>
              <p className="text-muted-foreground text-sm">
                {hasDocuments ? (
                  <>
                    {docStatus === 'under_review' ? t('owner.addProperty.docStatusUnderReview') : docStatus === 'rejected' ? t('owner.addProperty.docStatusRejected') : t('owner.addProperty.docStatusProcessed')}
                  </>
                ) : (
                  <>
                    {t('owner.addProperty.needUpload')}
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setShowVerificationModal(false);
                  navigate('/owner/profile?tab=verification');
                }}
                className="w-full"
              >
                {hasDocuments ? t('owner.addProperty.viewVerificationStatus') : t('owner.addProperty.uploadDocuments')} <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowVerificationModal(false);
                  navigate('/owner/properties');
                }}
                className="w-full"
              >
                {t('owner.addProperty.goToDashboard')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <VerificationBanner verificationState={verificationState} />
      <PageHeader
        title={t('owner.addProperty.addNewProperty')}
        description={t('owner.addProperty.listNewProperty')}
        backLink="/owner/properties"
      />
      <PropertyForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}

export default AddPropertyPage;
