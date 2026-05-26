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
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRenterPayments, useUploadPaymentProof } from '../payments/hooks/usePayments';
import { PaymentStatusBadge } from '../agreements/statusBadge';

function ProofUploadRow({ payment, t }) {
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
      setLocalError(t('renter.payments.proof.invalidType'));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLocalError(t('renter.payments.proof.tooLarge'));
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
        {t('renter.payments.actions.uploadProof')}
      </Button>
      {localError && (
        <p className="text-xs text-destructive mt-2">{localError}</p>
      )}
    </div>
  );
}

export default function RenterPaymentsList() {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState('all');

  const queryParams =
    statusFilter === 'all'
      ? { limit: 50 }
      : { status: statusFilter, limit: 50 };

  const { data, isLoading, isFetching, isError, error, refetch } = useRenterPayments(queryParams);
  const payments = data?.items ?? [];
  const isInitialLoad = isLoading && !data;

  const statusFilterOptions = [
    { value: 'all', label: t('renter.payments.statuses.all') },
    { value: 'pending', label: t('renter.payments.statuses.pending') },
    { value: 'processing', label: t('renter.payments.statuses.processing') },
    { value: 'success', label: t('renter.payments.statuses.success') },
    { value: 'failed', label: t('renter.payments.statuses.failed') },
    { value: 'expired', label: t('renter.payments.statuses.expired') },
  ];

  const getPaymentStatusLabel = (status) =>
    t(`renter.payments.statuses.${status}`, {
      defaultValue: status,
    });

  const getProviderLabel = (provider) =>
    t(`renter.payments.providers.${provider}`, {
      defaultValue: provider,
    });

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
        <p className="text-destructive font-medium">
          {t('renter.payments.errors.failedLoad')}
        </p>
        <p className="text-muted-foreground text-sm max-w-md">
          {error?.response?.data?.message || error?.message || t('renter.payments.errors.tryAgain')}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          {t('renter.payments.errors.tryAgain')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t('renter.payments.filterPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {statusFilterOptions.map((opt) => (
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
            <span className="sr-only">{t('renter.payments.actions.updating')}</span>
          </div>
        )}

        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
            <CreditCard className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold text-lg">{t('renter.payments.empty.title')}</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">
              {t('renter.payments.empty.description')}
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
                        {payment.purposeLabel} · {getProviderLabel(payment.provider)}
                      </p>
                      <p className="text-2xl font-bold text-primary mt-2">
                        {payment.displayAmount}
                      </p>
                      <div className="mt-2">
                        <PaymentStatusBadge
                          status={payment.status}
                          label={getPaymentStatusLabel(payment.status)}
                        />
                      </div>
                      <ProofUploadRow payment={payment} t={t} />
                    </div>
                    {payment.agreementId && (
                      <Link to={`/renter/agreements/${payment.agreementId}`}>
                        <Button variant="ghost" className="font-bold text-primary shrink-0">
                          {t('renter.payments.actions.viewAgreement')}
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
