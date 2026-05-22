import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/PageHeader';
import ErrorState from '@/components/ErrorState';
import { getApiErrorMessage, isSchemaSyncError } from '@/lib/apiErrors';
import StatusBadge from '@/components/StatusBadge';
import {
  FileText,
  User,
  MapPin,
  Calendar,
  Shield,
  DollarSign,
  Loader2,
  Send,
  XCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  Pencil,
} from 'lucide-react';
import { getLocalizedText } from '@/lib/utils/i18n';
import {
  useAgreementDetail,
  useAgreementPayments,
  useSendAgreement,
  useCancelAgreement,
  useTerminateAgreement,
} from '../hooks/useAgreements';
import { AgreementStatusBadge } from './AgreementStatusBadge';
import {
  unwrapAgreementDetail,
  unwrapAgreementPayments,
  getRenterDisplayName,
  getRenterInitials,
  getPropertyImage,
  getTermsFromAgreement,
  getDepositDisplay,
  formatCurrency,
  formatDateRange,
  formatShortDate,
  getAgreementStatusLabel,
  findSecurityDepositPayment,
  PAYMENT_STATUS_STYLES,
  PAYMENT_STATUS_LABELS,
  toDatetimeLocalValue,
  datetimeLocalToIso,
} from '../utils';

const STATUS_STEPS = [
  { key: 'draft', label: 'Draft', icon: FileText },
  { key: 'sent', label: 'Sent', icon: Send },
  { key: 'payment_pending', label: 'Payment pending', icon: DollarSign },
  { key: 'completed', label: 'Completed', icon: CheckCircle2 },
];

function stepIndexForStatus(status) {
  if (status === 'completed' || status === 'terminated') return 3;
  if (status === 'payment_pending') return 2;
  if (status === 'sent') return 1;
  if (status === 'draft') return 0;
  return -1;
}

export function OwnerAgreementDetailContent() {
  const { id } = useParams();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showTerminateConfirm, setShowTerminateConfirm] = useState(false);

  const { data: detailResponse, isLoading, isError, error, refetch } = useAgreementDetail(id);
  const { data: paymentsResponse, isError: paymentsError, error: paymentsErr } = useAgreementPayments(id);
  const sendMutation = useSendAgreement();
  const cancelMutation = useCancelAgreement();
  const terminateMutation = useTerminateAgreement();

  const agreement = useMemo(() => unwrapAgreementDetail(detailResponse), [detailResponse]);
  const payments = useMemo(() => unwrapAgreementPayments(paymentsResponse), [paymentsResponse]);
  const depositPayment = findSecurityDepositPayment(payments);

  const terms = agreement ? getTermsFromAgreement(agreement) : null;
  const image = agreement ? getPropertyImage(agreement.property ?? agreement) : null;
  const currentStep = agreement ? stepIndexForStatus(agreement.status) : 0;
  const isTerminal = ['rejected', 'cancelled', 'expired', 'terminated'].includes(agreement?.status);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !agreement) {
    const errMsg = getApiErrorMessage(error, 'Agreement not found.');
    return (
      <div className="p-8">
        <ErrorState
          title={isSchemaSyncError(error) ? 'Agreements unavailable' : 'Agreement not found'}
          message={isSchemaSyncError(error) ? errMsg : errMsg}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const canSend = agreement.status === 'draft';
  const canCancel = ['draft', 'sent', 'payment_pending'].includes(agreement.status);
  const canTerminate = agreement.status === 'completed';

  const handleSend = () => {
    const offerExpiresAt = agreement.offerExpiresAt
      ? new Date(agreement.offerExpiresAt).toISOString()
      : datetimeLocalToIso(toDatetimeLocalValue(new Date(Date.now() + 14 * 86400000)));
    sendMutation.mutate({ agreementId: id, offerExpiresAt });
  };

  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <PageHeader
        title={terms?.title || 'Agreement'}
        description={`${getRenterDisplayName(agreement.renter)} · ${formatDateRange(agreement.startDate, agreement.endDate)}`}
        backLink="/owner/agreements"
      >
        <AgreementStatusBadge agreement={agreement} />
        {canSend && (
          <Button
            className="gap-2"
            onClick={handleSend}
            disabled={sendMutation.isPending}
          >
            {sendMutation.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
            Send offer
          </Button>
        )}
        {canSend && (
          <Button variant="outline" className="gap-2" asChild>
            <Link to={`/owner/agreements/${id}/edit`}>
              <Pencil size={14} /> Edit draft
            </Link>
          </Button>
        )}
        {canCancel && !showCancelConfirm && (
          <Button
            variant="outline"
            className="gap-2 text-destructive border-destructive/30"
            onClick={() => setShowCancelConfirm(true)}
          >
            <XCircle size={14} /> Cancel
          </Button>
        )}
        {showCancelConfirm && (
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              disabled={cancelMutation.isPending}
              onClick={() =>
                cancelMutation.mutate(
                  { agreementId: id },
                  { onSuccess: () => setShowCancelConfirm(false) }
                )
              }
            >
              Confirm cancel
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowCancelConfirm(false)}>
              Back
            </Button>
          </div>
        )}
        {canTerminate && !showTerminateConfirm && (
          <Button
            variant="outline"
            className="gap-2 text-destructive"
            onClick={() => setShowTerminateConfirm(true)}
          >
            Terminate
          </Button>
        )}
        {showTerminateConfirm && (
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              disabled={terminateMutation.isPending}
              onClick={() =>
                terminateMutation.mutate(
                  { agreementId: id },
                  { onSuccess: () => setShowTerminateConfirm(false) }
                )
              }
            >
              Confirm terminate
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowTerminateConfirm(false)}>
              Back
            </Button>
          </div>
        )}
      </PageHeader>

      {isTerminal && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="flex items-start gap-3 py-4">
            <AlertCircle className="mt-0.5 shrink-0 text-amber-600" size={18} />
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Agreement {getAgreementStatusLabel(agreement)}
              </p>
              {agreement.cancellationReason && (
                <p className="mt-1 text-xs text-amber-800">{agreement.cancellationReason}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {!isTerminal && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
              <Shield size={16} /> Progress
            </h3>
            <div className="flex flex-wrap items-start justify-between gap-4">
              {STATUS_STEPS.map((step, i) => {
                const Icon = step.icon;
                const done = i < currentStep;
                const active = i === currentStep;
                return (
                  <div key={step.key} className="flex flex-1 min-w-[100px] flex-col items-center text-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${done
                          ? 'bg-emerald-500 text-white'
                          : active
                            ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                            : 'bg-muted text-muted-foreground'
                        }`}
                    >
                      {done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                    </div>
                    <p className={`mt-2 text-[11px] font-bold ${active ? 'text-primary' : ''}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {image && (
            <div className="overflow-hidden rounded-xl border border-border">
              <img src={image} alt="" className="h-48 w-full object-cover" />
            </div>
          )}

          <Card>
            <CardContent className="space-y-4 pt-6">
              <h3 className="flex items-center gap-2 font-bold">
                <FileText size={16} /> Terms snapshot
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Property</p>
                  <p className="mt-1 text-sm font-bold">{terms?.title || '—'}</p>
                  {terms?.address && (
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={10} /> {terms.address}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Monthly rent</p>
                  <p className="mt-1 text-sm font-bold text-primary">
                    {formatCurrency(terms?.monthlyRent, terms?.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Security deposit (ETB)
                  </p>
                  <p className="mt-1 text-sm font-bold">{getDepositDisplay(agreement)}</p>
                  {agreement.fxRate != null && agreement.fxRate !== 1 && (
                    <p className="text-[10px] text-muted-foreground">
                      FX rate: {agreement.fxRate} at {formatShortDate(agreement.fxRateAt)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Lease period</p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold">
                    <Calendar size={12} />
                    {formatDateRange(agreement.startDate, agreement.endDate)}
                  </p>
                </div>
                {agreement.offerExpiresAt && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Offer expires</p>
                    <p className="mt-1 flex items-center gap-1 text-sm">
                      <Clock size={12} />
                      {formatShortDate(agreement.offerExpiresAt)}
                    </p>
                  </div>
                )}
              </div>

              {terms?.conditions && (
                <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Conditions</p>
                  <div>
                    <Badge variant="outline" className="mb-1 text-[10px]">
                      English
                    </Badge>
                    <p className="text-sm leading-relaxed">
                      {getLocalizedText(agreement.termsSnapshot?.leaseTerms?.conditions, 'en') ||
                        terms.conditions}
                    </p>
                  </div>
                  {agreement.termsSnapshot?.leaseTerms?.conditions?.am && (
                    <div>
                      <Badge variant="outline" className="mb-1 text-[10px]">
                        አማርኛ
                      </Badge>
                      <p className="text-sm leading-relaxed">
                        {getLocalizedText(agreement.termsSnapshot?.leaseTerms?.conditions, 'am')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {agreement.ownerMessage && (
                <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                  <p className="text-xs font-medium text-muted-foreground">Your message</p>
                  <p className="text-sm mt-1">{agreement.ownerMessage}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <h3 className="flex items-center gap-2 font-bold">
                <DollarSign size={16} /> Security deposit payment
              </h3>
              {paymentsError ? (
                <p className="text-sm text-amber-700">
                  {getApiErrorMessage(paymentsErr, 'Payment details could not be loaded.')}
                </p>
              ) : !depositPayment ? (
                <p className="text-sm text-muted-foreground">
                  {agreement.status === 'payment_pending'
                    ? 'Waiting for the renter to pay via Chapa.'
                    : 'No deposit payment initiated yet.'}
                </p>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-bold">
                      {formatCurrency(depositPayment.amountEtb ?? depositPayment.amount, 'ETB')}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {depositPayment.chapaTxRef || depositPayment.id}
                    </p>
                  </div>
                  <StatusBadge
                    status={PAYMENT_STATUS_LABELS[depositPayment.status] || depositPayment.status}
                    statusMap={Object.fromEntries(
                      Object.entries(PAYMENT_STATUS_LABELS).map(([k, label]) => [
                        label,
                        PAYMENT_STATUS_STYLES[k],
                      ])
                    )}
                  />
                  {depositPayment.paidAt && (
                    <p className="w-full text-xs text-muted-foreground">
                      Paid {formatShortDate(depositPayment.paidAt)}
                    </p>
                  )}
                </div>
              )}
              {payments.length > 1 && (
                <p className="text-xs text-muted-foreground">
                  + {payments.length - 1} other payment record(s) on file
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h3 className="flex items-center gap-2 font-bold text-sm">
                <User size={16} /> Renter
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {getRenterInitials(agreement.renter)}
                </div>
                <div>
                  <p className="font-bold">{getRenterDisplayName(agreement.renter)}</p>
                  {agreement.renter?.email && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail size={10} /> {agreement.renter.email}
                    </p>
                  )}
                  {agreement.renter?.phone && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone size={10} /> {agreement.renter.phone}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/owner/messages">Message renter</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2 pt-6 text-sm">
              <h3 className="font-bold text-sm mb-3">Timeline</h3>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">{formatShortDate(agreement.createdAt)}</span>
              </div>
              {agreement.sentAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sent</span>
                  <span className="font-medium">{formatShortDate(agreement.sentAt)}</span>
                </div>
              )}
              {agreement.renterRespondedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Renter responded</span>
                  <span className="font-medium">{formatShortDate(agreement.renterRespondedAt)}</span>
                </div>
              )}
              {agreement.activatedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Activated</span>
                  <span className="font-medium text-emerald-600">
                    {formatShortDate(agreement.activatedAt)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
