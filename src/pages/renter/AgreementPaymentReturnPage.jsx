import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useVerifyChapaPayment } from '@/features/renter/hooks/useAgreements';
import { toast } from 'sonner';

export default function AgreementPaymentReturnPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const txRef = searchParams.get('tx_ref') || searchParams.get('txRef') || '';
  const urlStatus = searchParams.get('status') || '';

  const verifyMutation = useVerifyChapaPayment();
  const [phase, setPhase] = useState('verifying');
  const [agreementId, setAgreementId] = useState(null);

  useEffect(() => {
    if (!txRef) {
      setPhase('error');
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const response = await verifyMutation.mutateAsync(txRef);
        if (cancelled) return;

        const data = response?.data ?? response;
        const agreement = data?.agreement;
        const payment = data?.payment;

        if (agreement?.id) setAgreementId(agreement.id);

        if (payment?.status === 'success' || agreement?.status === 'completed') {
          setPhase('success');
          toast.success(t('renter.paymentReturn.successDescription'));
        } else if (data?.failed || urlStatus === 'failed' || payment?.status === 'failed') {
          setPhase('failed');
        } else if (data?.pending || payment?.status === 'pending' || payment?.status === 'processing') {
          setPhase('pending');
        } else if (urlStatus === 'success') {
          setPhase('success');
          toast.success(t('renter.paymentReturn.successDescription'));
        } else {
          setPhase('pending');
        }
      } catch {
        if (cancelled) return;
        if (urlStatus === 'success') {
          setPhase('pending');
        } else {
          setPhase('failed');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txRef]);

  const detailPath = agreementId
    ? `/renter/agreements/${agreementId}`
    : '/renter/agreements';

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardContent className="pt-10 pb-8 px-8 text-center space-y-6">
          {phase === 'verifying' && (
            <>
              <Loader2 className="h-14 w-14 animate-spin text-primary mx-auto" />
              <h1 className="text-xl font-bold">{t('renter.paymentReturn.verifyingTitle')}</h1>
              <p className="text-muted-foreground text-sm">
                {t('renter.paymentReturn.verifyingDescription')}
              </p>
            </>
          )}

          {phase === 'success' && (
            <>
              <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
              <h1 className="text-xl font-bold text-emerald-900">{t('renter.paymentReturn.successTitle')}</h1>
              <p className="text-muted-foreground text-sm">
                {t('renter.paymentReturn.successDescription')}
              </p>
              <Button className="w-full font-bold" onClick={() => navigate(detailPath)}>
                {t('renter.paymentReturn.viewAgreement')}
              </Button>
            </>
          )}

          {phase === 'pending' && (
            <>
              <AlertCircle className="h-14 w-14 text-amber-500 mx-auto" />
              <h1 className="text-xl font-bold">{t('renter.paymentReturn.pendingTitle')}</h1>
              <p className="text-muted-foreground text-sm">
                {t('renter.paymentReturn.pendingDescription')}
              </p>
              <Button className="w-full font-bold" onClick={() => navigate(detailPath)}>
                {t('renter.paymentReturn.viewAgreement')}
              </Button>
            </>
          )}

          {phase === 'failed' && (
            <>
              <XCircle className="h-14 w-14 text-destructive mx-auto" />
              <h1 className="text-xl font-bold text-destructive">{t('renter.paymentReturn.failedTitle')}</h1>
              <p className="text-muted-foreground text-sm">
                {txRef ? t('renter.paymentReturn.failedDescription') : t('renter.paymentReturn.failedMissingRef')}
              </p>
              <Button
                className="w-full font-bold"
                onClick={() => navigate(agreementId ? detailPath : '/renter/agreements')}
              >
                {agreementId ? t('renter.paymentReturn.backToAgreement') : t('renter.paymentReturn.myAgreements')}
              </Button>
            </>
          )}

          {phase === 'error' && !txRef && (
            <>
              <XCircle className="h-14 w-14 text-destructive mx-auto" />
              <h1 className="text-xl font-bold">{t('renter.paymentReturn.invalidTitle')}</h1>
              <p className="text-muted-foreground text-sm">
                {t('renter.paymentReturn.invalidDescription')}
              </p>
              <Link to="/renter/agreements">
                <Button className="w-full font-bold mt-4">{t('renter.paymentReturn.myAgreements')}</Button>
              </Link>
            </>
          )}

          {phase !== 'verifying' && phase !== 'error' && (
            <Link
              to="/renter/agreements"
              className="text-sm text-muted-foreground hover:text-primary inline-block"
            >
              {t('renter.paymentReturn.allAgreements')}
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
