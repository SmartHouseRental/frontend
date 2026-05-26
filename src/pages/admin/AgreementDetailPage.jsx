// AgreementDetailPage.jsx
import {
  User,
  Building2,
  Gavel,
  Receipt,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdminAgreement, useAdminUpdateAgreementStatus } from '@/features/admin/hooks/useAdmin';
import {
  useAdminResolvedProperty,
  useAdminResolvedUser,
} from '@/features/admin/hooks/useAdminLookupMaps';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import { getAgreementStatusMeta, formatLocalizedText } from '@/features/admin/mappers';
import AgreementPaymentsSection from '@/features/admin/components/AgreementPaymentsSection';

function AgreementDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: agreement, isLoading, isError, refetch } = useAdminAgreement(id);
  const updateStatus = useAdminUpdateAgreementStatus();
  const { data: renter } = useAdminResolvedUser(agreement?.renterId);
  const { data: owner } = useAdminResolvedUser(agreement?.ownerId);
  const { data: property } = useAdminResolvedProperty(agreement?.propertyId);

  const translateAgreementStatus = (statusValue) =>
    t(`adminAgreementDetail.statuses.${statusValue}`, {
      defaultValue: getAgreementStatusMeta(statusValue).label,
    });

  if (isLoading) {
    return (
      <main className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8">
        <TableSkeleton rows={4} columns={2} showHeader={false} />
      </main>
    );
  }

  if (isError || !agreement) {
    return (
      <main className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8">
        <ErrorState
          title={t('adminAgreementDetail.errors.failedLoadAgreementDetails')}
          onRetry={refetch}
        />
      </main>
    );
  }

  const statusMeta = getAgreementStatusMeta(agreement.status);
  const formatDate = (value) => new Date(value).toLocaleDateString();
  const propertyTitle = property
    ? formatLocalizedText(property.title, t('adminAgreementDetail.propertyFallback'))
    : t('adminAgreementDetail.propertyIdFallback', {
        id: String(agreement.propertyId || '').slice(0, 8),
      });
  const propertyImage =
    Array.isArray(property?.images) && property.images.length > 0 ? property.images[0] : null;

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="hover:bg-slate-100 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {t('adminAgreementDetail.title')}
        </h1>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-[#A47551]/20 shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#A47551]/10 text-[#A47551]">
                <User size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#A47551] uppercase">
                  {t('adminAgreementDetail.cardLabels.renter')}
                </p>
                <h3 className="text-lg font-bold">
                  {renter?.displayName || t('adminAgreementDetail.fallbacks.renter')}
                </h3>
                {renter?.email && (
                  <p className="text-muted-foreground text-xs">{renter.email}</p>
                )}
                <Badge
                  variant="outline"
                  className="mt-1 border-green-200 bg-green-50 text-green-700"
                >
                  <CheckCircle2 size={14} className="mr-1" />
                  {t('adminAgreementDetail.badges.verifiedIdentity')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A47551]/20 shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#A47551]/10 text-[#A47551]">
                <Building2 size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#A47551] uppercase">
                  {t('adminAgreementDetail.cardLabels.owner')}
                </p>
                <h3 className="text-lg font-bold">
                  {owner?.displayName || t('adminAgreementDetail.fallbacks.owner')}
                </h3>
                {owner?.email && (
                  <p className="text-muted-foreground text-xs">{owner.email}</p>
                )}
                <Badge
                  variant="outline"
                  className="mt-1 border-green-200 bg-green-50 text-green-700"
                >
                  <CheckCircle2 size={14} className="mr-1" />
                  {t('adminAgreementDetail.badges.verifiedOwner')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/[0.02] shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                {propertyImage ? (
                  <img
                    alt={propertyTitle}
                    className="h-full w-full object-cover"
                    src={propertyImage}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[#A47551]">
                    <Building2 size={24} />
                  </div>
                )}
              </div>
              <div>
                <p className="text-primary text-xs font-bold uppercase">
                  {t('adminAgreementDetail.linkedProperty')}
                </p>
                <h3 className="text-base leading-tight font-bold">{propertyTitle}</h3>
                <button
                  type="button"
                  className="text-primary mt-1 text-xs font-medium underline"
                  onClick={() => navigate(`/admin/properties/${agreement.propertyId}`)}
                >
                  {t('adminAgreementDetail.viewProperty')}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#A47551]/20 shadow-sm">
          <CardContent className="space-y-8 p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#A47551] uppercase">
                  <Gavel size={18} />
                  {t('adminAgreementDetail.coreLeaseTerms')}
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card className="border-[#A47551]/10 bg-[#F5F0E6]/50">
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-[#A47551]">
                        {t('adminAgreementDetail.monthlyRentLabel')}
                      </p>
                      <p className="text-primary text-2xl font-black">
                        {agreement.monthlyRent} <span className="text-sm">ETB</span>
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-[#A47551]/10 bg-[#F5F0E6]/50">
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-[#A47551]">
                        {t('adminAgreementDetail.statusLabel')}
                      </p>
                      <p className="text-2xl font-black text-[#221610]">
                        {translateAgreementStatus(agreement.status)}
                      </p>
                      <p className="mt-1 text-[10px] font-medium text-[#A47551] uppercase">
                        {t('adminAgreementDetail.lifecycleStatus')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#A47551] uppercase">
                  <Receipt size={18} />
                  {t('adminAgreementDetail.leasePeriod')}
                </h4>
                <p className="text-sm">
                  {formatDate(agreement.startDate)} — {formatDate(agreement.endDate)}
                </p>
                <p className="text-muted-foreground text-xs">
                  {t('adminAgreementDetail.currencyLabel', {
                    currency: agreement.currency || 'ETB',
                  })}
                </p>
              </div>
            </div>

            <AgreementPaymentsSection agreementId={agreement.id} />

            <div className="max-w-xs">
              <label className="mb-1.5 block text-[10px] font-black text-[#A47551] uppercase">
                {t('adminAgreementDetail.updateStatus.label')}
              </label>
              <Select
                defaultValue={agreement.status}
                onValueChange={(value) =>
                  updateStatus.mutate({ id: agreement.id, status: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('adminAgreementDetail.updateStatus.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'draft',
                    'sent',
                    'payment_pending',
                    'completed',
                    'rejected',
                    'cancelled',
                    'terminated',
                    'expired',
                  ].map((statusValue) => (
                    <SelectItem key={statusValue} value={statusValue}>
                      {translateAgreementStatus(statusValue)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default AgreementDetailPage;
