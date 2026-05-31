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
import { useTranslation } from 'react-i18next';
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
function ActionPanel({ agreement, id, t }) {
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
            <p className="font-semibold text-emerald-900">{t('renter.agreementDetail.actions.leaseActiveTitle')}</p>
            <p className="text-sm text-emerald-800/80 mt-1">
              {t('renter.agreementDetail.actions.leaseActiveDescription', {
                date:
                  agreement.activatedAtFormatted !== '—'
                    ? ` ${agreement.activatedAtFormatted}`
                    : '',
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (['rejected', 'cancelled', 'terminated', 'expired'].includes(agreement.status)) {
    return (
      <Card className="border-border bg-muted/50">
        <CardContent className="pt-6 flex items-start gap-3">
          <Ban className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">
              {t('renter.agreementDetail.statusBanner', {
                status: agreement.statusLabel,
              })}
            </p>
            {agreement.cancellationReason && (
              <p className="text-sm text-muted-foreground mt-1">
                {agreement.cancellationReason}
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
        <CardTitle className="text-base font-bold">{t('renter.agreementDetail.actions.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {agreement.isOfferExpired && agreement.status === 'sent' && (
          <p className="text-sm text-amber-700 font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t('renter.agreementDetail.actions.offerExpired')}
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
              {t('renter.agreementDetail.actions.acceptOffer')}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-destructive/30 font-bold text-destructive hover:bg-destructive/10"
              onClick={() => {
                setShowReject((v) => !v);
                setShowCancel(false);
              }}
              disabled={isBusy}
            >
              <XCircle className="h-4 w-4 mr-2" />
              {t('renter.agreementDetail.actions.decline')}
            </Button>
          </div>
        )}

        {showReject && agreement.canReject && (
          <div className="space-y-3 rounded-lg border border-destructive/20 bg-card p-4">
            <p className="text-sm font-medium text-destructive">{t('renter.agreementDetail.actions.declineOfferQuestion')}</p>
            <Textarea
              placeholder={t('renter.agreementDetail.actions.optionalReason')}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={1000}
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setShowReject(false)}>
                {t('renter.agreementDetail.actions.back')}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleReject}
                disabled={rejectMutation.isPending}
              >
                {t('renter.agreementDetail.actions.confirmDecline')}
              </Button>
            </div>
          </div>
        )}

        {agreement.canPayDeposit && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {t('renter.agreementDetail.actions.payDepositHelp', {
                amount: agreement.depositFormatted,
              })}
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
              {t('renter.agreementDetail.actions.paySecurityDeposit')}
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
                {t('renter.agreementDetail.actions.cancelAgreement')}
              </Button>
            ) : (
              <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-medium">{t('renter.agreementDetail.actions.cancelAgreementQuestion')}</p>
                <Textarea
                  placeholder={t('renter.agreementDetail.actions.optionalReasonShort')}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  maxLength={1000}
                  rows={3}
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setShowCancel(false)}>
                    {t('renter.agreementDetail.actions.back')}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleCancel}
                    disabled={cancelMutation.isPending}
                  >
                    {t('renter.agreementDetail.actions.confirmCancel')}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {agreement.offerExpiresAt && ['sent', 'payment_pending'].includes(agreement.status) && (
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {t('renter.agreementDetail.actions.offerExpires', {
              date: agreement.offerExpiresFormatted,
            })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function PaymentsSection({ payments, t }) {
  if (!payments?.length) {
    return (
      <p className="text-sm text-muted-foreground py-4">{t('renter.agreementDetail.actions.noPayments')}</p>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-border bg-muted/30"
        >
          <div>
            <p className="font-semibold text-sm">{payment.purposeLabel}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t(`renter.payments.providers.${payment.provider}`, {
                defaultValue: payment.provider,
              })}{' '}
              · {new Date(payment.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-primary">{payment.displayAmount}</span>
            <PaymentStatusBadge
              status={payment.status}
              label={t(`renter.payments.statuses.${payment.status}`, {
                defaultValue: payment.statusLabel,
              })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AgreementDetailView() {
  const { t } = useTranslation();
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
        <p className="text-destructive font-medium">{t('renter.agreementDetail.errors.failedLoad')}</p>
        <p className="text-muted-foreground text-sm max-w-md">
          {error?.response?.data?.message || error?.message || t('renter.agreementDetail.errors.retry')}
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => refetch()}>
            {t('renter.agreementDetail.errors.retry')}
          </Button>
          <Link to="/renter/agreements">
            <Button variant="ghost">{t('renter.agreementDetail.errors.backToAgreements')}</Button>
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
              label={t(`renter.agreements.statuses.${agreement.status}`, {
                defaultValue: agreement.statusLabel,
              })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ActionPanel agreement={agreement} id={id} t={t} />

          <Card className="border-border overflow-hidden">
            <div className="aspect-[21/9] sm:aspect-[2/1] w-full relative overflow-hidden">
              <SafeImage
                src={agreement.propertyImage}
                alt={agreement.propertyTitle}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="border-b bg-muted/30">
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
                <h3 className="font-bold text-foreground mb-3">{t('renter.agreementDetail.leaseTerms')}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {t('renter.agreementDetail.monthlyRent')}: {agreement.monthlyRentFormatted}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {t('renter.agreementDetail.securityDeposit')}: {agreement.depositFormatted}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {t('renter.agreementDetail.start')}: {agreement.startDateFormatted} · {t('renter.agreementDetail.end')}: {agreement.endDateFormatted}
                  </li>
                  {leaseTerms && (
                    <li className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {t('renter.agreementDetail.leaseTermsNote')}
                    </li>
                  )}
                </ul>
              </div>

              {agreement.ownerMessage && (
                <div className="rounded-lg bg-blue-50/80 border border-blue-100 p-4">
                  <p className="text-xs font-bold text-blue-900 uppercase mb-1">
                    {t('renter.agreementDetail.messageFromOwner')}
                  </p>
                  <p className="text-sm text-blue-900/90">{agreement.ownerMessage}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                {t('renter.agreementDetail.payments')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentsSection payments={agreement.payments} t={t} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border p-6">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {t('renter.agreementDetail.propertyOwner')}
            </h4>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                {agreement.ownerId ? (
                  <Link
                    to={`/profile/${agreement.ownerId}`}
                    className="font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {agreement.ownerName}
                  </Link>
                ) : (
                  <p className="font-bold text-foreground">{agreement.ownerName}</p>
                )}
                <p className="text-xs text-muted-foreground">{t('renter.agreementDetail.ownerHost')}</p>
              </div>
            </div>
          </Card>

          <Card className="border-border p-6 text-sm space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
              {t('renter.agreementDetail.timeline')}
            </h4>
            {agreement.sentAtFormatted !== '—' && (
              <p>
                <span className="text-muted-foreground">{t('renter.agreementDetail.sentLabel')}:</span>{' '}
                {agreement.sentAtFormatted}
              </p>
            )}
            {agreement.renterRespondedAt && (
              <p>
                <span className="text-muted-foreground">{t('renter.agreementDetail.responseLabel')}:</span>{' '}
                {new Date(agreement.renterRespondedAt).toLocaleString()}
              </p>
            )}
            {agreement.activatedAtFormatted !== '—' && (
              <p>
                <span className="text-muted-foreground">{t('renter.agreementDetail.activatedLabel')}:</span>{' '}
                {agreement.activatedAtFormatted}
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
