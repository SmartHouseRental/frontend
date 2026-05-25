import {
  Receipt,
  ExternalLink,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ImageIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import {
  useAdminAgreementPaymentSummary,
  useAdminAgreementPayments,
} from '@/features/admin/hooks/useAdmin';
import { getAgreementStatusMeta } from '@/features/admin/mappers';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
  success: 'bg-emerald-100 text-emerald-800',
  failed: 'bg-rose-100 text-rose-800',
  expired: 'bg-slate-100 text-slate-600',
};

function formatMoney(amount, currency = 'ETB') {
  if (amount == null || Number.isNaN(Number(amount))) return '—';
  return `${Number(amount).toLocaleString('en-ET')} ${currency}`;
}

function isImageProof(url) {
  if (!url) return false;
  return /\.(jpe?g|png|gif|webp)(\?|$)/i.test(url);
}

function PaymentRow({ payment }) {
  const { t } = useTranslation();
  const statusStyle = STATUS_STYLES[payment.status] || STATUS_STYLES.pending;
  const purpose = t(`adminAgreementDetail.paymentPurposes.${payment.purpose}`, {
    defaultValue: String(payment.purpose || 'payment').replace(/_/g, ' '),
  });
  const statusLabel = t(`adminAgreementDetail.paymentStatuses.${payment.status}`, {
    defaultValue: payment.status,
  });

  return (
    <div className="rounded-xl border border-[#A47551]/15 bg-[#FDFBF7]/80 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold">{purpose}</p>
            <Badge className={`text-[10px] uppercase ${statusStyle}`}>{statusLabel}</Badge>
            {payment.provider && (
              <Badge variant="outline" className="text-[10px] capitalize">
                {payment.provider}
              </Badge>
            )}
          </div>
          <p className="text-primary text-xl font-black">
            {formatMoney(payment.amountEtb ?? payment.amount, payment.currency || 'ETB')}
          </p>
          <div className="text-muted-foreground grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {payment.createdAt
                ? t('adminAgreementDetail.payments.created', {
                    date: new Date(payment.createdAt).toLocaleString(),
                  })
                : t('adminAgreementDetail.payments.notAvailable')}
            </span>
            {payment.paidAt && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                {t('adminAgreementDetail.payments.paid', {
                  date: new Date(payment.paidAt).toLocaleString(),
                })}
              </span>
            )}
            {payment.chapaTxRef && (
              <span className="font-mono sm:col-span-2">
                {t('adminAgreementDetail.payments.ref', { ref: payment.chapaTxRef })}
              </span>
            )}
          </div>
        </div>

        {payment.proofUrl && (
          <div className="w-full shrink-0 sm:w-36">
            <p className="text-muted-foreground mb-1.5 text-[10px] font-semibold uppercase">
              {t('adminAgreementDetail.payments.proof')}
            </p>
            {isImageProof(payment.proofUrl) ? (
              <a
                href={payment.proofUrl}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-lg border"
              >
                <img
                  src={payment.proofUrl}
                  alt={t('adminAgreementDetail.payments.proofImageAlt')}
                  className="aspect-4/3 w-full object-cover"
                />
              </a>
            ) : (
              <div className="bg-muted/40 flex aspect-4/3 flex-col items-center justify-center rounded-lg border border-dashed p-2">
                <ImageIcon className="text-muted-foreground mb-1 h-8 w-8" />
                <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                  <a href={payment.proofUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-1 h-3 w-3" />
                    {t('adminAgreementDetail.payments.view')}
                  </a>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryMetrics({ summary }) {
  const { t } = useTranslation();
  const currency = summary.currency || 'ETB';
  const agreementStatusMeta = getAgreementStatusMeta(summary.agreementStatus);
  const byStatus = summary.byStatus || {};

  const agreementStatusLabel = t(`adminAgreementDetail.statuses.${summary.agreementStatus}`, {
    defaultValue: agreementStatusMeta.label,
  });

  return (
    <div className="space-y-4">
      {summary.hasFailedPayments && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{t('adminAgreementDetail.payments.failedPayments')}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-lg bg-muted/40 px-3 py-2 text-center">
          <p className="text-lg font-bold">{summary.paymentCount ?? 0}</p>
          <p className="text-[10px] font-semibold uppercase">
            {t('adminAgreementDetail.payments.paymentCount')}
          </p>
        </div>
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-emerald-800">
          <p className="text-lg font-bold">{formatMoney(summary.totalPaid, currency)}</p>
          <p className="text-[10px] font-semibold uppercase">
            {t('adminAgreementDetail.payments.totalPaid')}
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-center text-amber-800">
          <p className="text-lg font-bold">{formatMoney(summary.totalOutstanding, currency)}</p>
          <p className="text-[10px] font-semibold uppercase">
            {t('adminAgreementDetail.payments.outstanding')}
          </p>
        </div>
        <div className="rounded-lg bg-blue-50 px-3 py-2 text-center text-blue-800">
          <p className="text-lg font-bold">
            {summary.depositAmountEtb != null
              ? formatMoney(summary.depositAmountEtb, currency)
              : '—'}
          </p>
          <p className="text-[10px] font-semibold uppercase">
            {t('adminAgreementDetail.payments.deposit')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[#A47551]/10 bg-[#F5F0E6]/50 p-3">
          <p className="text-muted-foreground text-[10px] font-bold uppercase">
            {t('adminAgreementDetail.payments.monthlyRent')}
          </p>
          <p className="text-primary text-lg font-black">
            {formatMoney(summary.monthlyRent, currency)}
          </p>
        </div>
        <div className="rounded-lg border border-[#A47551]/10 bg-[#F5F0E6]/50 p-3">
          <p className="text-muted-foreground text-[10px] font-bold uppercase">
            {t('adminAgreementDetail.payments.agreementStatus')}
          </p>
          <Badge variant="outline" className={`mt-1 ${agreementStatusMeta.style}`}>
            {agreementStatusLabel}
          </Badge>
        </div>
      </div>

      {Object.keys(byStatus).length > 0 && (
        <div>
          <p className="text-muted-foreground mb-2 text-[10px] font-semibold uppercase">
            {t('adminAgreementDetail.payments.byPaymentStatus')}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(byStatus).map(([status, row]) => {
              const statusLabel = t(`adminAgreementDetail.paymentStatuses.${status}`, {
                defaultValue: status,
              });
              return (
                <Badge
                  key={status}
                  variant="outline"
                  className={`text-xs ${STATUS_STYLES[status] || ''}`}
                >
                  {statusLabel}: {row.count} · {formatMoney(row.amount, currency)}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {summary.lastPayment && (
        <div className="rounded-lg border border-dashed border-[#A47551]/30 bg-white/60 p-3">
          <p className="text-muted-foreground mb-1 text-[10px] font-semibold uppercase">
            {t('adminAgreementDetail.payments.latestPayment')}
          </p>
          <p className="text-sm font-semibold">
            {t(`adminAgreementDetail.paymentPurposes.${summary.lastPayment.purpose}`, {
              defaultValue: String(summary.lastPayment.purpose || 'payment').replace(/_/g, ' '),
            })}{' '}
            · {formatMoney(summary.lastPayment.amount, currency)}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {t(`adminAgreementDetail.paymentStatuses.${summary.lastPayment.status}`, {
              defaultValue: summary.lastPayment.status,
            })}{' '}
            ·{' '}
            {summary.lastPayment.createdAt
              ? new Date(summary.lastPayment.createdAt).toLocaleString()
              : '—'}
          </p>
        </div>
      )}
    </div>
  );
}

export default function AgreementPaymentsSection({ agreementId }) {
  const { t } = useTranslation();
  const summaryQuery = useAdminAgreementPaymentSummary(agreementId);
  const paymentsQuery = useAdminAgreementPayments(agreementId);

  const isLoading = summaryQuery.isLoading || paymentsQuery.isLoading;
  const isError = summaryQuery.isError || paymentsQuery.isError;
  const payments = paymentsQuery.data ?? [];

  const refetchAll = () => {
    summaryQuery.refetch();
    paymentsQuery.refetch();
  };

  return (
    <Card className="border-[#A47551]/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#A47551] uppercase">
          <Receipt size={18} />
          {t('adminAgreementDetail.payments.title')}
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          {t('adminAgreementDetail.payments.description', {
            endpoint: 'GET /admin/agreements/:id/payment-summary',
          })}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <TableSkeleton rows={3} columns={1} showHeader={false} />
        ) : isError ? (
          <ErrorState
            title={t('adminAgreementDetail.payments.failedLoad')}
            onRetry={refetchAll}
          />
        ) : !summaryQuery.data ? (
          <p className="text-muted-foreground text-sm">
            {t('adminAgreementDetail.payments.noSummary')}
          </p>
        ) : (
          <>
            <SummaryMetrics summary={summaryQuery.data} />

            <div>
              <p className="text-muted-foreground mb-3 text-xs font-semibold uppercase tracking-wider">
                {t('adminAgreementDetail.payments.history')}
              </p>
              {payments.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-8 text-sm">
                  <CreditCard className="h-8 w-8 opacity-40" />
                  <p>{t('adminAgreementDetail.payments.noPayments')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <PaymentRow key={payment.id} payment={payment} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
