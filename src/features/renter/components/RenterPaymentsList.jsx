import { Link } from 'react-router';
import {
  Loader2,
  AlertCircle,
  CreditCard,
  ChevronRight,
  Upload,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRenterPayments, useUploadPaymentProof } from '../payments/hooks/usePayments';
import { PaymentStatusBadge } from '../agreements/statusBadge';

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'success', label: 'Paid' },
  { value: 'failed', label: 'Failed' },
  { value: 'expired', label: 'Expired' },
];

function ProofUploadRow({ payment }) {
  const fileRef = useRef(null);
  const uploadMutation = useUploadPaymentProof();
  const [localError, setLocalError] = useState('');

  if (payment.provider !== 'manual' || !['pending', 'failed'].includes(payment.status)) {
    return null;
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalError('');
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setLocalError('Upload a JPEG, PNG, or PDF file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLocalError('File must be 5 MB or smaller.');
      return;
    }
    try {
      await uploadMutation.mutateAsync({ paymentId: payment.id, file });
      if (fileRef.current) fileRef.current.value = '';
    } catch {
      /* toast in hook */
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-slate-100">
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        className="hidden"
        onChange={handleFile}
      />
      <Button
        variant="outline"
        size="sm"
        className="font-semibold"
        disabled={uploadMutation.isPending}
        onClick={() => fileRef.current?.click()}
      >
        {uploadMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Upload className="h-4 w-4 mr-2" />
        )}
        Upload proof
      </Button>
      {localError && (
        <p className="text-xs text-destructive mt-2">{localError}</p>
      )}
    </div>
  );
}

export default function RenterPaymentsList() {
  const [statusFilter, setStatusFilter] = useState('all');

  const queryParams =
    statusFilter === 'all'
      ? { limit: 50 }
      : { status: statusFilter, limit: 50 };

  const { data, isLoading, isFetching, isError, error, refetch } = useRenterPayments(queryParams);
  const payments = data?.items ?? [];
  const isInitialLoad = isLoading && !data;

  if (isInitialLoad) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-destructive font-medium">Failed to load payments</p>
        <p className="text-muted-foreground text-sm max-w-md">
          {error?.response?.data?.message || error?.message || 'Please try again.'}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTER_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative min-h-[120px]">
        {isFetching && (
          <div className="absolute right-0 top-0 z-10 flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="sr-only">Updating list</span>
          </div>
        )}

        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
            <CreditCard className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold text-lg">No payments yet</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">
              Payments for your rental agreements will appear here after you accept an offer
              and pay a deposit.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {payments.map((payment) => (
              <Card key={payment.id} className="border-slate-200">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-lg">{payment.propertyTitle}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {payment.purposeLabel} · {payment.provider === 'chapa' ? 'Chapa' : 'Manual'}
                      </p>
                      <p className="text-2xl font-bold text-primary mt-2">
                        {payment.displayAmount}
                      </p>
                      <div className="mt-2">
                        <PaymentStatusBadge
                          status={payment.status}
                          label={payment.statusLabel}
                        />
                      </div>
                      <ProofUploadRow payment={payment} />
                    </div>
                    {payment.agreementId && (
                      <Link to={`/renter/agreements/${payment.agreementId}`}>
                        <Button variant="ghost" className="font-bold text-primary shrink-0">
                          View agreement
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
