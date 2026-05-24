import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useVerifyChapaPayment } from '@/features/renter/hooks/useAgreements';
import { toast } from 'sonner';

export default function AgreementPaymentReturnPage() {
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
          toast.success('Security deposit paid successfully. Your lease is now active.');
        } else if (data?.failed || urlStatus === 'failed' || payment?.status === 'failed') {
          setPhase('failed');
        } else if (data?.pending || payment?.status === 'pending' || payment?.status === 'processing') {
          setPhase('pending');
        } else if (urlStatus === 'success') {
          setPhase('success');
          toast.success('Payment received. Your agreement may take a moment to update.');
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
      <Card className="max-w-md w-full border-slate-200 shadow-lg">
        <CardContent className="pt-10 pb-8 px-8 text-center space-y-6">
          {phase === 'verifying' && (
            <>
              <Loader2 className="h-14 w-14 animate-spin text-primary mx-auto" />
              <h1 className="text-xl font-bold">Confirming your payment</h1>
              <p className="text-muted-foreground text-sm">
                Please wait while we verify your transaction with Chapa…
              </p>
            </>
          )}

          {phase === 'success' && (
            <>
              <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
              <h1 className="text-xl font-bold text-emerald-900">Payment successful</h1>
              <p className="text-muted-foreground text-sm">
                Your security deposit has been received and your rental agreement is active.
              </p>
              <Button className="w-full font-bold" onClick={() => navigate(detailPath)}>
                View agreement
              </Button>
            </>
          )}

          {phase === 'pending' && (
            <>
              <AlertCircle className="h-14 w-14 text-amber-500 mx-auto" />
              <h1 className="text-xl font-bold">Payment processing</h1>
              <p className="text-muted-foreground text-sm">
                Your payment is still being confirmed. Check your agreement in a few minutes
                or contact support if this persists.
              </p>
              <Button className="w-full font-bold" onClick={() => navigate(detailPath)}>
                View agreement
              </Button>
            </>
          )}

          {phase === 'failed' && (
            <>
              <XCircle className="h-14 w-14 text-destructive mx-auto" />
              <h1 className="text-xl font-bold text-destructive">Payment not completed</h1>
              <p className="text-muted-foreground text-sm">
                {txRef
                  ? 'We could not confirm your payment. You can try paying the deposit again from your agreement.'
                  : 'No transaction reference was provided.'}
              </p>
              <Button
                className="w-full font-bold"
                onClick={() => navigate(agreementId ? detailPath : '/renter/agreements')}
              >
                {agreementId ? 'Back to agreement' : 'My agreements'}
              </Button>
            </>
          )}

          {phase === 'error' && !txRef && (
            <>
              <XCircle className="h-14 w-14 text-destructive mx-auto" />
              <h1 className="text-xl font-bold">Invalid return link</h1>
              <p className="text-muted-foreground text-sm">
                Missing payment reference. Return to your agreements to continue.
              </p>
              <Link to="/renter/agreements">
                <Button className="w-full font-bold mt-4">My agreements</Button>
              </Link>
            </>
          )}

          {phase !== 'verifying' && phase !== 'error' && (
            <Link
              to="/renter/agreements"
              className="text-sm text-muted-foreground hover:text-primary inline-block"
            >
              All agreements
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
