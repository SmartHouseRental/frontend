import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Filter,
  MoreVertical,
  Search,
  Eye,
  FileText,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAdminAgreements } from '@/features/admin/hooks/useAdmin';
import { useAdminAgreementStats } from '@/features/admin/hooks/useAdminPageStats';
import CardSkeleton from '@/components/CardSkeleton';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import { getAgreementStatusMeta } from '@/features/admin/mappers';
import { useAdminLookupMaps } from '@/features/admin/hooks/useAdminLookupMaps';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import DataTablePagination from '@/components/DataTablePagination';

function AgreementsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const params = {
    page,
    limit: 20,
    ...(search.trim() ? { search: search.trim() } : {}),
  };

  const { data, isLoading, isError, refetch } = useAdminAgreements(params);
  const {
    data: agreementStats,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useAdminAgreementStats();
  const { getUserName, getPropertyTitle } = useAdminLookupMaps();

  const agreements = getAdminListItems(data).filter((item) =>
    status === 'all' ? true : item.status === status
  );
  const meta = data?.meta || { page: 1, limit: 20, total: 0, totalPages: 1 };

  const translateAgreementStatus = (statusValue) =>
    t(`adminAgreements.statuses.${statusValue}`, {
      defaultValue: getAgreementStatusMeta(statusValue).label,
    });

  const translatePaymentLabel = (statusValue) =>
    t(`adminAgreements.payment.${statusValue}`, {
      defaultValue: statusValue === 'payment_pending' ? 'Pending' : 'Confirmed',
    });

  const formatDate = (value) => new Date(value).toLocaleDateString();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{t('adminAgreements.title')}</h2>
          <p className="text-muted-foreground text-sm">{t('adminAgreements.subtitle')}</p>
        </div>
      </div>

      {statsLoading ? (
        <CardSkeleton count={4} />
      ) : statsError ? (
        <Card className="border-dashed p-4">
          <p className="text-muted-foreground text-sm">{t('adminAgreements.statsError')}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => refetchStats()}>
            {t('adminAgreements.retry')}
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-0 border-l-4 border-emerald-400 p-5">
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              {t('adminAgreements.summary.active')}
            </p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-600">
              {agreementStats?.active?.toLocaleString() ?? 0}
            </p>
            <p className="text-muted-foreground mt-1 text-[10px]">
              {t('adminAgreements.summaryDescriptions.active')}
            </p>
          </Card>
          <Card className="border-0 border-l-4 border-amber-400 p-5">
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              {t('adminAgreements.summary.pending')}
            </p>
            <p className="mt-1 text-2xl font-extrabold text-amber-600">
              {agreementStats?.pending?.toLocaleString() ?? 0}
            </p>
            <p className="text-muted-foreground mt-1 text-[10px]">
              {t('adminAgreements.summaryDescriptions.pending')}
            </p>
          </Card>
          <Card className="border-0 border-l-4 border-slate-300 p-5">
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              {t('adminAgreements.summary.draft')}
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-600">
              {agreementStats?.draft?.toLocaleString() ?? 0}
            </p>
          </Card>
          <Card className="border-0 border-l-4 border-rose-400 p-5">
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              {t('adminAgreements.summary.terminated')}
            </p>
            <p className="mt-1 text-2xl font-extrabold text-rose-600">
              {agreementStats?.terminated?.toLocaleString() ?? 0}
            </p>
            <p className="text-muted-foreground mt-1 text-[10px]">
              {t('adminAgreements.summaryDescriptions.terminated')}
            </p>
          </Card>
        </div>
      )}

      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="relative max-w-xl flex-1">
          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
            <Search size={18} />
          </span>
          <Input
            placeholder={t('adminAgreements.searchPlaceholder')}
            type="text"
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t('adminAgreements.filters.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">{t('adminAgreements.filters.all')}</SelectItem>
                <SelectItem value="draft">{translateAgreementStatus('draft')}</SelectItem>
                <SelectItem value="sent">{translateAgreementStatus('sent')}</SelectItem>
                <SelectItem value="payment_pending">
                  {translateAgreementStatus('payment_pending')}
                </SelectItem>
                <SelectItem value="completed">{translateAgreementStatus('completed')}</SelectItem>
                <SelectItem value="rejected">{translateAgreementStatus('rejected')}</SelectItem>
                <SelectItem value="cancelled">{translateAgreementStatus('cancelled')}</SelectItem>
                <SelectItem value="terminated">{translateAgreementStatus('terminated')}</SelectItem>
                <SelectItem value="expired">{translateAgreementStatus('expired')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t('adminAgreements.filters.payment')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">{t('adminAgreements.filters.all')}</SelectItem>
                <SelectItem value="confirmed">{t('adminAgreements.payment.confirmed')}</SelectItem>
                <SelectItem value="proof_uploaded">
                  {t('adminAgreements.payment.proofUploaded')}
                </SelectItem>
                <SelectItem value="pending">{t('adminAgreements.payment.pending')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" aria-label={t('adminAgreements.filters.filter')}>
            <Filter size={16} />
          </Button>
        </div>
      </Card>

      {isLoading ? (
        <TableSkeleton rows={6} columns={8} />
      ) : isError ? (
        <ErrorState title={t('adminAgreements.errors.failedLoadAgreements')} onRetry={refetch} />
      ) : agreements.length === 0 ? (
        <EmptyState
          title={t('adminAgreements.empty.title')}
          description={t('adminAgreements.empty.description')}
        />
      ) : (
        <Card className="gap-0 overflow-hidden p-0">
          <Table className="w-full min-w-full border-collapse text-left">
            <TableHeader className="bg-muted/30 w-full">
              <TableRow>
                <TableHead className="px-6 py-4">{t('adminAgreements.table.id')}</TableHead>
                <TableHead className="px-6 py-4">{t('adminAgreements.table.property')}</TableHead>
                <TableHead className="px-6 py-4">{t('adminAgreements.table.parties')}</TableHead>
                <TableHead className="px-6 py-4">{t('adminAgreements.table.rent')}</TableHead>
                <TableHead className="px-6 py-4">{t('adminAgreements.table.duration')}</TableHead>
                <TableHead className="px-6 py-4">{t('adminAgreements.table.status')}</TableHead>
                <TableHead className="px-6 py-4">{t('adminAgreements.table.payment')}</TableHead>
                <TableHead className="px-4 py-4">{t('adminAgreements.table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agreements.map((agreement) => {
                const sState = getAgreementStatusMeta(agreement.status);
                return (
                  <TableRow
                    key={agreement.id}
                    className="cursor-pointer transition-colors hover:bg-muted/20"
                    onClick={() => navigate(`/admin/agreements/${agreement.id}`)}
                  >
                    <TableCell className="px-6 py-4 text-sm font-bold">#{agreement.id}</TableCell>
                    <TableCell className="px-6 py-4">
                      <p className="text-sm font-semibold">
                        {getPropertyTitle(agreement.propertyId, t('adminAgreements.fallbacks.unknownProperty'))}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <p className="text-xs">
                        <span className="font-semibold">
                          {getUserName(agreement.renterId, t('adminAgreements.fallbacks.renter'))}
                        </span>
                        <span className="text-muted-foreground"> → </span>
                        <span className="font-semibold">
                          {getUserName(agreement.ownerId, t('adminAgreements.fallbacks.owner'))}
                        </span>
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm font-bold">
                      {agreement.monthlyRent} ETB
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <p className="text-xs">{formatDate(agreement.startDate)}</p>
                      <p className="text-muted-foreground text-[10px]">
                        {t('adminAgreements.durationTo', { date: formatDate(agreement.endDate) })}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap uppercase ${sState.style}`}
                      >
                        {translateAgreementStatus(agreement.status)}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap uppercase">
                        {translatePaymentLabel(agreement.status === 'payment_pending' ? 'pending' : 'confirmed')}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => navigate(`/admin/agreements/${agreement.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>{t('adminAgreements.actions.viewAgreement')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>{t('adminAgreements.actions.viewContract')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <DataTablePagination
            currentPage={meta.page || 1}
            totalPages={meta.totalPages || 1}
            totalItems={meta.total || 0}
            itemsPerPage={meta.limit || 20}
            itemLabel={t('adminAgreements.pagination.itemLabel')}
            showingLabel={t('adminAgreements.pagination.showing')}
            ofLabel={t('adminAgreements.pagination.of')}
            onPageChange={setPage}
          />
        </Card>
      )}
    </div>
  );
}

export default AgreementsPage;
