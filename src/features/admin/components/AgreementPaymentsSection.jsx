import {
  Receipt,
  ExternalLink,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ImageIcon,
} from 'lucide-react';
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

const PURPOSE_LABELS = {
  security_deposit: 'Security deposit',
  rent: 'Rent',
  maintenance: 'Maintenance',
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
  const statusStyle = STATUS_STYLES[payment.status] || STATUS_STYLES.pending;
  const purpose =
    PURPOSE_LABELS[payment.purpose] ||
    String(payment.purpose || 'Payment').replace(/_/g, ' ');

  return (
    <div className="rounded-xl border border-[#A47551]/15 bg-[#FDFBF7]/80 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold">{purpose}</p>
            <Badge className={`text-[10px] uppercase ${statusStyle}`}>{payment.status}</Badge>
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
              Created {payment.createdAt ? new Date(payment.createdAt).toLocaleString() : '—'}
            </span>
            {payment.paidAt && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Paid {new Date(payment.paidAt).toLocaleString()}
              </span>
            )}
            {payment.chapaTxRef && (
              <span className="font-mono sm:col-span-2">Ref: {payment.chapaTxRef}</span>
            )}
          </div>
        </div>

        {payment.proofUrl && (
          <div className="w-full shrink-0 sm:w-36">
            <p className="text-muted-foreground mb-1.5 text-[10px] font-semibold uppercase">
              Proof
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
                  alt="Payment proof"
                  className="aspect-[4/3] w-full object-cover"
                />
              </a>
            ) : (
              <div className="bg-muted/40 flex aspect-[4/3] flex-col items-center justify-center rounded-lg border border-dashed p-2">
                <ImageIcon className="text-muted-foreground mb-1 h-8 w-8" />
                <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                  <a href={payment.proofUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-1 h-3 w-3" />
                    View
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
  const currency = summary.currency || 'ETB';
  const agreementStatusMeta = getAgreementStatusMeta(summary.agreementStatus);
  const byStatus = summary.byStatus || {};

  return (
    <div className="space-y-4">
      {summary.hasFailedPayments && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>One or more payments on this agreement have failed.</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-lg bg-muted/40 px-3 py-2 text-center">
          <p className="text-lg font-bold">{summary.paymentCount ?? 0}</p>
          <p className="text-[10px] font-semibold uppercase">Payments</p>
        </div>
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-emerald-800">
          <p className="text-lg font-bold">{formatMoney(summary.totalPaid, currency)}</p>
          <p className="text-[10px] font-semibold uppercase">Total paid</p>
        </div>
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-center text-amber-800">
          <p className="text-lg font-bold">{formatMoney(summary.totalOutstanding, currency)}</p>
          <p className="text-[10px] font-semibold uppercase">Outstanding</p>
        </div>
        <div className="rounded-lg bg-blue-50 px-3 py-2 text-center text-blue-800">
          <p className="text-lg font-bold">
            {summary.depositAmountEtb != null
              ? formatMoney(summary.depositAmountEtb, currency)
              : '—'}
          </p>
          <p className="text-[10px] font-semibold uppercase">Deposit (ETB)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[#A47551]/10 bg-[#F5F0E6]/50 p-3">
          <p className="text-muted-foreground text-[10px] font-bold uppercase">Monthly rent</p>
          <p className="text-primary text-lg font-black">
            {formatMoney(summary.monthlyRent, currency)}
          </p>
        </div>
        <div className="rounded-lg border border-[#A47551]/10 bg-[#F5F0E6]/50 p-3">
          <p className="text-muted-foreground text-[10px] font-bold uppercase">Agreement status</p>
          <Badge variant="outline" className={`mt-1 ${agreementStatusMeta.style}`}>
            {agreementStatusMeta.label}
          </Badge>
        </div>
      </div>

      {Object.keys(byStatus).length > 0 && (
        <div>
          <p className="text-muted-foreground mb-2 text-[10px] font-semibold uppercase">
            By payment status
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(byStatus).map(([status, row]) => (
              <Badge
                key={status}
                variant="outline"
                className={`text-xs ${STATUS_STYLES[status] || ''}`}
              >
                {status}: {row.count} · {formatMoney(row.amount, currency)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {summary.lastPayment && (
        <div className="rounded-lg border border-dashed border-[#A47551]/30 bg-white/60 p-3">
          <p className="text-muted-foreground mb-1 text-[10px] font-semibold uppercase">
            Latest payment
          </p>
          <p className="text-sm font-semibold">
            {PURPOSE_LABELS[summary.lastPayment.purpose] || summary.lastPayment.purpose} ·{' '}
            {formatMoney(summary.lastPayment.amount, currency)}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {summary.lastPayment.status} ·{' '}
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
          Payment summary
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Aggregated from <code className="text-xs">GET /admin/agreements/:id/payment-summary</code>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <TableSkeleton rows={3} columns={1} showHeader={false} />
        ) : isError ? (
          <ErrorState title="Failed to load payment summary" onRetry={refetchAll} />
        ) : !summaryQuery.data ? (
          <p className="text-muted-foreground text-sm">No payment summary available.</p>
        ) : (
          <>
            <SummaryMetrics summary={summaryQuery.data} />

            <div>
              <p className="text-muted-foreground mb-3 text-xs font-semibold uppercase tracking-wider">
                Payment history
              </p>
              {payments.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-8 text-sm">
                  <CreditCard className="h-8 w-8 opacity-40" />
                  <p>No payment records for this agreement yet.</p>
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
