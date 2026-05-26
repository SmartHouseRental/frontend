import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Search,
  Download,
  DollarSign,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ErrorState from '@/components/ErrorState';
import { getApiErrorMessage } from '@/lib/apiErrors';
import { formatCurrency, formatShortDate, PAYMENT_STATUS_STYLES } from '@/features/agreements/utils';
import { OWNER_PAYMENT_STATUS_FILTERS } from '@/features/payments/constants';
import {
  useOwnerPayments,
  useOwnerPaymentSummary,
  useConfirmPayment,
  useExportOwnerPayments,
  useViewPaymentProof,
} from '@/features/payments/hooks/useOwnerPayments';
import { canOwnerConfirmPayment, isPendingConfirmationStatus } from '@/features/payments/utils';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 6;

function PaymentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const apiParams = useMemo(() => {
    const params = {
      page: statusFilter === 'pending' ? 1 : currentPage,
      limit: statusFilter === 'pending' ? 100 : ITEMS_PER_PAGE,
    };
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (statusFilter === 'success') params.status = 'success';
    return params;
  }, [currentPage, searchQuery, statusFilter]);

  const {
    data: paymentsData,
    isLoading: paymentsLoading,
    isFetching: paymentsFetching,
    isError: paymentsError,
    error: paymentsErrorObj,
    refetch: refetchPayments,
  } = useOwnerPayments(apiParams);

  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError,
    error: summaryErrorObj,
    refetch: refetchSummary,
  } = useOwnerPaymentSummary();

  const confirmMutation = useConfirmPayment();
  const exportMutation = useExportOwnerPayments();
  const proofMutation = useViewPaymentProof();

  const filteredItems = useMemo(() => {
    const items = paymentsData?.items ?? [];
    if (statusFilter !== 'pending') return items;
    return items.filter((p) => isPendingConfirmationStatus(p.status));
  }, [paymentsData?.items, statusFilter]);

  const pagination = useMemo(() => {
    if (statusFilter === 'pending') {
      const total = filteredItems.length;
      return {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        total,
        totalPages: Math.max(1, Math.ceil(total / ITEMS_PER_PAGE)),
      };
    }
    return paymentsData?.pagination ?? { page: 1, limit: ITEMS_PER_PAGE, total: 0, totalPages: 1 };
  }, [statusFilter, filteredItems.length, paymentsData?.pagination, currentPage]);

  const paginated = useMemo(() => {
    if (statusFilter === 'pending') {
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      return filteredItems.slice(start, start + ITEMS_PER_PAGE);
    }
    return filteredItems;
  }, [filteredItems, statusFilter, currentPage]);

  const isInitialLoading = (paymentsLoading && !paymentsData) || (summaryLoading && !summary);
  const isListFetching = paymentsFetching && !paymentsLoading;

  const handleConfirm = (paymentId) => {
    confirmMutation.mutate(paymentId);
  };

  const handleExport = () => {
    const params = {};
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (statusFilter === 'success') params.status = 'success';
    exportMutation.mutate(params);
  };

  const handleViewProof = (payment) => {
    if (payment.proofUrl) {
      window.open(payment.proofUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    proofMutation.mutate(payment.id);
  };

  if (isInitialLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if ((paymentsError && !paymentsData) || (summaryError && !summary)) {
    return (
      <div className="scrollbar-hide h-screen overflow-y-auto p-8">
        <ErrorState
          title={t('owner.paymentHistory.failed')}
          message={getApiErrorMessage(paymentsErrorObj || summaryErrorObj, t('owner.paymentHistory.unableToLoad'))}
          onRetry={() => {
            refetchPayments();
            refetchSummary();
          }}
        />
      </div>
    );
  }

  const stats = summary ?? { totalReceived: 0, pendingAmount: 0, thisMonth: 0 };
  const { totalPages, total } = pagination;
  const confirmingId = confirmMutation.isPending ? confirmMutation.variables : null;

  return (
    <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{t('owner.paymentHistory.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('owner.paymentHistory.subtitle')}</p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleExport}
          disabled={exportMutation.isPending}
        >
          {exportMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          {t('owner.paymentHistory.export')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-0 hover:shadow-md transition-shadow">
          <CardContent>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <DollarSign size={20} className="text-emerald-500" />
            </div>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">{t('owner.paymentHistory.totalReceived')}</p>
            <h3 className="text-2xl font-black mt-1">{formatCurrency(stats.totalReceived, 'ETB')}</h3>
          </CardContent>
        </Card>
        <Card className={`border-0 hover:shadow-md transition-shadow ${stats.pendingAmount > 0 ? 'ring-1 ring-amber-500/20' : ''}`}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock size={20} className="text-amber-500" />
              </div>
              {stats.pendingAmount > 0 && (
                <span className="text-xs font-bold text-amber-500 animate-pulse">{t('owner.paymentHistory.actionNeeded')}</span>
              )}
            </div>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">{t('owner.paymentHistory.pendingConfirmation')}</p>
            <h3 className="text-2xl font-black mt-1 text-amber-600">{formatCurrency(stats.pendingAmount, 'ETB')}</h3>
          </CardContent>
        </Card>
        <Card className="border-0 hover:shadow-md transition-shadow">
          <CardContent>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <CheckCircle2 size={20} className="text-primary" />
            </div>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">{t('owner.paymentHistory.thisMonth')}</p>
            <h3 className="text-2xl font-black mt-1 text-primary">{formatCurrency(stats.thisMonth, 'ETB')}</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-row flex-wrap items-center justify-between gap-4 p-4">
        <div className="relative min-w-50 flex-1 max-w-lg">
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder={t('owner.paymentHistory.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-36"><SelectValue placeholder={t('owner.paymentHistory.status')} /></SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {OWNER_PAYMENT_STATUS_FILTERS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {(searchQuery || statusFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
            >
              {t('owner.paymentHistory.clear')}
            </Button>
          )}
        </div>
      </Card>

      <Card className="relative gap-0 overflow-hidden p-0">
        {isListFetching && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <Loader2 className="animate-spin text-primary" size={24} />
          </div>
        )}
        {paymentsError && paymentsData && (
          <div className="border-b border-destructive/20 bg-destructive/5 px-6 py-3 text-sm text-destructive">
            {getApiErrorMessage(paymentsErrorObj, t('owner.paymentHistory.refreshFailed'))}
            <Button variant="link" className="ml-2 h-auto p-0 text-destructive" onClick={() => refetchPayments()}>
              {t('owner.paymentHistory.retry')}
            </Button>
          </div>
        )}
        <Table className="w-full min-w-full text-left">
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="px-6 py-4">{t('owner.paymentHistory.table.paymentId')}</TableHead>
              <TableHead className="px-6 py-4">{t('owner.paymentHistory.table.property')}</TableHead>
              <TableHead className="px-6 py-4">{t('owner.paymentHistory.table.renter')}</TableHead>
              <TableHead className="px-6 py-4">{t('owner.paymentHistory.table.amount')}</TableHead>
              <TableHead className="px-6 py-4">{t('owner.paymentHistory.table.date')}</TableHead>
              <TableHead className="px-6 py-4">{t('owner.paymentHistory.table.status')}</TableHead>
              <TableHead className="px-6 py-4">{t('owner.paymentHistory.table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  {t('owner.paymentHistory.noPayments')}
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((payment) => {
                const statusStyle = PAYMENT_STATUS_STYLES[payment.status] || 'bg-slate-100 text-slate-600';
                const isPendingRow = isPendingConfirmationStatus(payment.status);
                const showConfirm = canOwnerConfirmPayment(payment);

                return (
                  <TableRow
                    key={payment.id}
                    className={`hover:bg-muted/10 transition-colors ${isPendingRow ? 'bg-amber-500/3' : ''}`}
                  >
                    <TableCell className="px-6 py-4">
                      <span className="text-primary font-bold text-sm">{payment.id}</span>
                      <p className="text-[10px] text-muted-foreground">#{payment.agreementId?.slice(0, 8)}</p>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm font-medium">{payment.propertyTitle}</TableCell>
                    <TableCell className="px-6 py-4 text-sm">{payment.renterName}</TableCell>
                    <TableCell className="px-6 py-4 text-sm font-bold">
                      {formatCurrency(payment.amount, payment.currency)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                      {formatShortDate(payment.confirmedAt || payment.paidAt || payment.createdAt)}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusStyle}`}>
                        {payment.statusLabel}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground outline-none">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer text-primary focus:text-primary"
                            onClick={() => handleViewProof(payment)}
                            disabled={proofMutation.isPending}
                          >
                            <ExternalLink size={14} /> {t('owner.paymentHistory.viewProof')}
                          </DropdownMenuItem>
                          {showConfirm && (
                            <DropdownMenuItem
                              className="gap-2 cursor-pointer font-bold text-emerald-600 focus:text-emerald-600"
                              onClick={() => handleConfirm(payment.id)}
                              disabled={confirmingId === payment.id}
                            >
                              {confirmingId === payment.id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <CheckCircle2 size={14} />
                              )}
                              {t('owner.paymentHistory.confirmPayment')}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
            <p className="text-muted-foreground text-xs font-medium">
              {t('owner.paymentHistory.showing', {
                start: (currentPage - 1) * ITEMS_PER_PAGE + 1,
                end: Math.min(currentPage * ITEMS_PER_PAGE, total),
                total
              })}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg px-3 py-1 text-xs font-bold ${currentPage === page ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-card'}`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default PaymentHistoryPage;
