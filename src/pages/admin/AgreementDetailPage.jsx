import {
  Receipt,
  FileText,
  ChevronLeft,
  Download,
  ZoomIn,
  ZoomOut,
  Printer,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminAgreement } from '@/features/admin/hooks/useAdmin';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import { getAgreementStatusMeta } from '@/features/admin/mappers';

/** Placeholder payment proof — admin API does not expose proof on agreement detail yet */
const DUMMY_PAYMENT_PROOF = {
  provider: 'Chapa',
  reference: 'CHP-2026-88421',
  amount: '15,000',
  currency: 'ETB',
  paidAt: '2026-03-12T14:32:00Z',
  status: 'verified',
  receiptLabel: 'Deposit payment receipt',
};

/** Placeholder contract excerpt for preview panel */
const DUMMY_CONTRACT_LINES = [
  'RESIDENTIAL LEASE AGREEMENT',
  '',
  'This Agreement is entered into between the Property Owner and the Renter',
  'for the rental of the property described in the linked listing.',
  '',
  '1. Term: Twelve (12) months commencing on the start date indicated.',
  '2. Rent: Monthly rent payable in advance via approved payment channels.',
  '3. Deposit: One month security deposit due before move-in.',
  '4. Maintenance: Renter shall maintain the premises in good condition.',
  '5. Termination: Either party may terminate per local housing regulations.',
];

function AgreementDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: agreement, isLoading, isError, refetch } = useAdminAgreement(id);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <TableSkeleton rows={4} columns={2} showHeader={false} />
      </main>
    );
  }

  if (isError || !agreement) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <ErrorState title="Failed to load agreement details" onRetry={refetch} />
      </main>
    );
  }

  const statusMeta = getAgreementStatusMeta(agreement.status);
  const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '—');

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-full border bg-card shadow-sm transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Agreement Details</h1>
          <p className="text-muted-foreground mt-0.5 truncate text-sm">
            #{agreement.id} · {statusMeta.label} · {agreement.monthlyRent} {agreement.currency || 'ETB'}/mo
          </p>
        </div>
        <Badge variant="outline" className={statusMeta.style}>
          {statusMeta.label}
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Payment Proof */}
        <Card className="border-[#A47551]/20 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-[#A47551]">
              <Receipt size={20} />
              Payment Proof
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Sample proof display — connect to admin payments API when available.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border-primary/20 bg-muted/30 relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed">
                <Receipt className="text-primary/40 mb-2 h-12 w-12" />
                <p className="text-muted-foreground px-4 text-center text-xs font-medium">
                  {DUMMY_PAYMENT_PROOF.receiptLabel}
                </p>
                <Badge className="absolute top-3 right-3 gap-1 bg-emerald-600 hover:bg-emerald-600">
                  <CheckCircle2 size={12} />
                  {DUMMY_PAYMENT_PROOF.status}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Provider</span>
                  <span className="font-semibold">{DUMMY_PAYMENT_PROOF.provider}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs font-semibold">{DUMMY_PAYMENT_PROOF.reference}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-primary font-bold">
                    {DUMMY_PAYMENT_PROOF.amount} {DUMMY_PAYMENT_PROOF.currency}
                  </span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Paid at</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock size={14} />
                    {new Date(DUMMY_PAYMENT_PROOF.paidAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Lease period</span>
                  <span className="text-right text-xs font-medium">
                    {formatDate(agreement.startDate)} — {formatDate(agreement.endDate)}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full gap-2" type="button">
                  <ExternalLink size={14} />
                  Open proof (preview)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Preview */}
        <Card className="border-[#A47551]/20 shadow-sm">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 pb-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-base font-bold text-[#A47551]">
                <FileText size={20} />
                Contract Preview
              </CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                Sample contract document — preview only.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" type="button" aria-label="Zoom out">
                <ZoomOut size={16} />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" type="button" aria-label="Zoom in">
                <ZoomIn size={16} />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" type="button" aria-label="Print">
                <Printer size={16} />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" type="button" aria-label="Download">
                <Download size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-border/60 max-h-[420px] overflow-y-auto rounded-xl border bg-[#FDFBF7] p-6 shadow-inner">
              <div className="mx-auto max-w-prose space-y-2 font-serif text-sm leading-relaxed text-[#221610]">
                {DUMMY_CONTRACT_LINES.map((line, idx) =>
                  line === '' ? (
                    <div key={`line-${idx}`} className="h-2" />
                  ) : (
                    <p
                      key={`line-${idx}`}
                      className={
                        idx === 0
                          ? 'text-center text-base font-bold tracking-wide uppercase'
                          : undefined
                      }
                    >
                      {line}
                    </p>
                  )
                )}
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-center text-xs">
              Agreement status: <strong>{statusMeta.label}</strong> · Monthly rent{' '}
              <strong>
                {agreement.monthlyRent} {agreement.currency || 'ETB'}
              </strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default AgreementDetailPage;
