import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  FileText,
  User,
  MapPin,
  ChevronLeft,
  Loader2,
  AlertCircle,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Link, useParams } from 'react-router';
import {
  useAgreement,
  useAcceptAgreement,
  useRejectAgreement,
  useCancelAgreement,
  useInitiateDeposit,
  useDepositStatus,
  renterKeys,
} from '../hooks/useAgreements';
import { AgreementStatusBadge, PaymentStatusBadge } from '../agreements/statusBadge';
import SafeImage from '@/components/SafeImage';
function ActionPanel({ agreement, id }) {
  const acceptMutation = useAcceptAgreement();
  const rejectMutation = useRejectAgreement();
  const cancelMutation = useCancelAgreement();
  const depositMutation = useInitiateDeposit();

  const [showReject, setShowReject] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [reason, setReason] = useState('');

  const isBusy =
    acceptMutation.isPending ||
    rejectMutation.isPending ||
    cancelMutation.isPending ||
    depositMutation.isPending;

  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(id);
    } catch {
      /* toast in hook */
    }
  };

  const handleReject = async () => {
    try {
      await rejectMutation.mutateAsync({ id, reason: reason.trim() || undefined });
      setShowReject(false);
      setReason('');
    } catch {
      /* toast in hook */
    }
  };

  const handleCancel = async () => {
    try {
      await cancelMutation.mutateAsync({ id, reason: reason.trim() || undefined });
      setShowCancel(false);
      setReason('');
    } catch {
      /* toast in hook */
    }
  };

  const handlePayDeposit = async () => {
    try {
      await depositMutation.mutateAsync(id);
    } catch {
      /* toast in hook */
    }
  };

  if (agreement.status === 'completed') {
    return (
      <Card className="border-emerald-200 bg-emerald-50/50">
        <CardContent className="pt-6 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-900">Lease active</p>
            <p className="text-sm text-emerald-800/80 mt-1">
              Your security deposit was received
              {agreement.activatedAtFormatted !== '—'
                ? ` on ${agreement.activatedAtFormatted}`
                : ''}
              . This property is now rented under your agreement.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (['rejected', 'cancelled', 'terminated', 'expired'].includes(agreement.status)) {
    return (
      <Card className="border-slate-200 bg-slate-50/80">
        <CardContent className="pt-6 flex items-start gap-3">
          <Ban className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Agreement {agreement.statusLabel}</p>
            {agreement.cancellationReason && (
              <p className="text-sm text-muted-foreground mt-1">
                Reason: {agreement.cancellationReason}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {agreement.isOfferExpired && agreement.status === 'sent' && (
          <p className="text-sm text-amber-700 font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            This offer has expired.
          </p>
        )}

        {agreement.canAccept && !agreement.isOfferExpired && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="font-bold flex-1"
              onClick={handleAccept}
              disabled={isBusy}
            >
              {acceptMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              Accept offer
            </Button>
            <Button
              variant="outline"
              className="font-bold flex-1 border-rose-200 text-rose-700 hover:bg-rose-50"
              onClick={() => {
                setShowReject((v) => !v);
                setShowCancel(false);
              }}
              disabled={isBusy}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        )}

        {showReject && agreement.canReject && (
          <div className="space-y-3 rounded-lg border border-rose-100 bg-white p-4">
            <p className="text-sm font-medium text-rose-900">Decline this offer?</p>
            <Textarea
              placeholder="Optional reason (max 1000 characters)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={1000}
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setShowReject(false)}>
                Back
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleReject}
                disabled={rejectMutation.isPending}
              >
                Confirm decline
              </Button>
            </div>
          </div>
        )}

        {agreement.canPayDeposit && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Pay the security deposit of{' '}
              <span className="font-bold text-foreground">{agreement.depositFormatted}</span>{' '}
              via Chapa to activate your lease.
            </p>
            <Button
              className="w-full font-bold"
              onClick={handlePayDeposit}
              disabled={isBusy}
            >
              {depositMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CreditCard className="h-4 w-4 mr-2" />
              )}
              Pay security deposit
            </Button>
          </div>
        )}

        {agreement.canCancel && (
          <>
            {!showCancel ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => {
                  setShowCancel(true);
                  setShowReject(false);
                }}
                disabled={isBusy}
              >
                Cancel agreement
              </Button>
            ) : (
              <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium">Cancel this agreement?</p>
                <Textarea
                  placeholder="Optional reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  maxLength={1000}
                  rows={3}
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setShowCancel(false)}>
                    Back
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleCancel}
                    disabled={cancelMutation.isPending}
                  >
                    Confirm cancel
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {agreement.offerExpiresAt && ['sent', 'payment_pending'].includes(agreement.status) && (
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Offer expires: {agreement.offerExpiresFormatted}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function PaymentsSection({ payments }) {
  if (!payments?.length) {
    return (
      <p className="text-sm text-muted-foreground py-4">No payments recorded yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-slate-100 bg-slate-50/50"
        >
          <div>
            <p className="font-semibold text-sm">{payment.purposeLabel}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {payment.provider === 'chapa' ? 'Chapa' : 'Manual'} ·{' '}
              {new Date(payment.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-primary">{payment.displayAmount}</span>
            <PaymentStatusBadge status={payment.status} label={payment.statusLabel} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AgreementDetailView() {
  const { id } = useParams();
  const { data: agreement, isLoading, isError, error, refetch } = useAgreement(id);

  const queryClient = useQueryClient();
  const shouldPollDeposit = agreement?.status === 'payment_pending';
  const { data: depositStatus } = useDepositStatus(id, {
    enabled: shouldPollDeposit,
    poll: shouldPollDeposit,
  });

  useEffect(() => {
    if (
      depositStatus?.payment?.status === 'success' ||
      depositStatus?.agreementStatus === 'completed'
    ) {
      queryClient.invalidateQueries({ queryKey: renterKeys.agreement(id) });
      queryClient.invalidateQueries({ queryKey: renterKeys.agreements() });
    }
  }, [depositStatus, id, queryClient]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-destructive font-medium">Failed to load agreement</p>
        <p className="text-muted-foreground text-sm max-w-md">
          {error?.response?.data?.message || error?.message || 'Please try again.'}
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
          <Link to="/renter/agreements">
            <Button variant="ghost">Back to agreements</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!agreement) return null;

  const terms = agreement.termsSnapshot;
  const leaseTerms = terms?.leaseTerms;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link to="/renter/agreements">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {agreement.propertyTitle}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <AgreementStatusBadge
              status={agreement.status}
              label={agreement.statusLabel}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ActionPanel agreement={agreement} id={id} />

          <Card className="border-slate-200 overflow-hidden">
            <div className="aspect-[21/9] sm:aspect-[2/1] w-full relative overflow-hidden">
              <SafeImage
                src={agreement.propertyImage}
                alt={agreement.propertyTitle}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">{agreement.propertyTitle}</CardTitle>
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{agreement.propertyAddress}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3">Lease terms</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Monthly rent: {agreement.monthlyRentFormatted}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Security deposit: {agreement.depositFormatted}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Start: {agreement.startDateFormatted} · End: {agreement.endDateFormatted}
                  </li>
                  {leaseTerms && (
                    <li className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      Lease terms captured at signing (see property listing for full details)
                    </li>
                  )}
                </ul>
              </div>

              {agreement.ownerMessage && (
                <div className="rounded-lg bg-blue-50/80 border border-blue-100 p-4">
                  <p className="text-xs font-bold text-blue-900 uppercase mb-1">
                    Message from owner
                  </p>
                  <p className="text-sm text-blue-900/90">{agreement.ownerMessage}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentsSection payments={agreement.payments} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 p-6">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Property owner
            </h4>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="h-6 w-6 text-slate-500" />
              </div>
              <div>
                {agreement.ownerId ? (
                  <Link
                    to={`/profile/${agreement.ownerId}`}
                    className="font-bold text-slate-900 hover:text-primary transition-colors"
                  >
                    {agreement.ownerName}
                  </Link>
                ) : (
                  <p className="font-bold text-slate-900">{agreement.ownerName}</p>
                )}
                <p className="text-xs text-muted-foreground">Owner / Host</p>
              </div>
            </div>
          </Card>

          <Card className="border-slate-200 p-6 text-sm space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Timeline
            </h4>
            {agreement.sentAtFormatted !== '—' && (
              <p>
                <span className="text-muted-foreground">Sent:</span>{' '}
                {agreement.sentAtFormatted}
              </p>
            )}
            {agreement.renterRespondedAt && (
              <p>
                <span className="text-muted-foreground">Your response:</span>{' '}
                {new Date(agreement.renterRespondedAt).toLocaleString()}
              </p>
            )}
            {agreement.activatedAtFormatted !== '—' && (
              <p>
                <span className="text-muted-foreground">Activated:</span>{' '}
                {agreement.activatedAtFormatted}
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
