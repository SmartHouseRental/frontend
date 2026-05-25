import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  Filter,
  MoreVertical,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAdminReports, useAdminUpdateReportStatus } from '@/features/admin/hooks/useAdmin';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import { getReportStatusMeta } from '@/features/admin/mappers';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import TableSkeleton from '@/components/TableSkeleton';
import DataTablePagination from '@/components/DataTablePagination';

function ReportsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');

  const params = {
    page,
    limit: 20,
    ...(search.trim() ? { search: search.trim() } : {}),
  };

  const { data, isLoading, isError, refetch } = useAdminReports(params);
  const updateReportStatus = useAdminUpdateReportStatus();

  const reports = getAdminListItems(data).filter((item) => {
    const statusOk = status === 'all' ? true : item.status === status;
    const reasonOk =
      reasonFilter === 'all'
        ? true
        : String(item.category || '').toLowerCase() === reasonFilter.toLowerCase();
    return statusOk && reasonOk;
  });
  const meta = data?.meta || { page: 1, limit: 20, total: 0, totalPages: 1 };

  const translateReportStatus = (statusValue) =>
    t(`adminReports.statuses.${statusValue}`, {
      defaultValue: getReportStatusMeta(statusValue).label,
    });

  const handleReportStatus = (id, nextStatus) => {
    updateReportStatus.mutate({ id, status: nextStatus });
  };

  const toInitials = (name = '') =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'NA';

  const formatDate = (value) => new Date(value).toLocaleDateString();
  const formatTime = (value) => new Date(value).toLocaleTimeString();

  return (
    <div className="space-y-6 px-4 py-8">
      <div>
        <h2 className="text-3xl font-semibold">{t('adminReports.title')}</h2>
        <p className="text-muted-foreground text-sm">{t('adminReports.subtitle')}</p>
      </div>
      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="relative max-w-2xl min-w-50 flex-1">
          <span className="text-muted-foreground/90 absolute top-1/2 left-3 -translate-y-1/2">
            <Search />
          </span>
          <Input
            className="py-2 pr-4 pl-10 outline-none focus:ring-2"
            placeholder={t('adminReports.searchPlaceholder')}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex flex-row flex-wrap items-center gap-3">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t('adminReports.filters.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">{t('adminReports.filters.allStatuses')}</SelectItem>
                <SelectItem value="open">{translateReportStatus('open')}</SelectItem>
                <SelectItem value="in_review">{translateReportStatus('in_review')}</SelectItem>
                <SelectItem value="resolved">{translateReportStatus('resolved')}</SelectItem>
                <SelectItem value="dismissed">{translateReportStatus('dismissed')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={reasonFilter} onValueChange={setReasonFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder={t('adminReports.filters.reason')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">{t('adminReports.reasonOptions.all')}</SelectItem>
                <SelectItem value="fraud">{t('adminReports.reasonOptions.fraud')}</SelectItem>
                <SelectItem value="false_advertising">
                  {t('adminReports.reasonOptions.falseAdvertising')}
                </SelectItem>
                <SelectItem value="inappropriate_behavior">
                  {t('adminReports.reasonOptions.inappropriateBehavior')}
                </SelectItem>
                <SelectItem value="spam">{t('adminReports.reasonOptions.spam')}</SelectItem>
                <SelectItem value="other">{t('adminReports.reasonOptions.other')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" aria-label={t('adminReports.filters.filter')}>
            <Filter size={16} />
          </Button>
        </div>
      </Card>

      {isLoading ? (
        <TableSkeleton rows={6} columns={7} />
      ) : isError ? (
        <ErrorState title={t('adminReports.errors.failedLoadReports')} onRetry={refetch} />
      ) : reports.length === 0 ? (
        <EmptyState
          title={t('adminReports.empty.title')}
          description={t('adminReports.empty.description')}
        />
      ) : (
        <Card className="gap-0 overflow-visible p-0">
          <div className="overflow-x-auto overflow-y-visible">
            <Table className="w-full min-w-full border-collapse text-left">
              <TableHeader className="bg-muted/30 w-full">
                <TableRow>
                  <TableHead className="px-6 py-4">{t('adminReports.table.id')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminReports.table.reporter')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminReports.table.reportedUser')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminReports.table.reason')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminReports.table.status')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminReports.table.created')}</TableHead>
                  <TableHead className="px-4 py-4">{t('adminReports.table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => {
                  const sState = getReportStatusMeta(report.status);
                  const reporterName = report?.reportedBy
                    ? `${report.reportedBy.first_name || ''} ${report.reportedBy.last_name || ''}`.trim() ||
                      report.reportedBy.email
                    : t('adminReports.fallbacks.unknownReporter');
                  return (
                    <TableRow
                      key={report.id}
                      className="cursor-pointer transition-colors hover:bg-muted/20"
                      onClick={() => navigate(`/admin/reports/${report.id}`)}
                    >
                      <TableCell className="px-6 py-4 text-sm font-bold">#{report.id}</TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold">
                            {toInitials(reporterName)}
                          </div>
                          <span className="text-sm font-semibold">{reporterName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 text-slate-600 flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold">
                            {String(report.targetType || 'O')[0]?.toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold capitalize">
                            {report.targetType || t('adminReports.fallbacks.targetType')}:{' '}
                            {report.targetId?.slice(0, 8)}…
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="bg-orange-100 text-orange-700 rounded px-2 py-1 text-[10px] font-extrabold whitespace-nowrap uppercase">
                          {report.category || t('adminReports.reasonOptions.other')}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${sState.style}`}
                        >
                          {translateReportStatus(report.status)}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <p className="text-muted-foreground text-[11px] font-medium uppercase">
                          {formatDate(report.createdAt)}
                        </p>
                        <p className="text-muted-foreground/40 text-[10px]">{formatTime(report.createdAt)}</p>
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
                              onClick={() => navigate(`/admin/reports/${report.id}`)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>{t('adminReports.actions.investigate')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                              onClick={() => handleReportStatus(report.id, 'resolved')}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              <span>{t('adminReports.actions.resolve')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-amber-600 focus:text-amber-600"
                              onClick={() => handleReportStatus(report.id, 'dismissed')}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>{t('adminReports.actions.dismiss')}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination
            currentPage={meta.page || 1}
            totalPages={meta.totalPages || 1}
            totalItems={meta.total || 0}
            itemsPerPage={meta.limit || 20}
            itemLabel={t('adminReports.pagination.itemLabel')}
            showingLabel={t('adminReports.pagination.showing')}
            ofLabel={t('adminReports.pagination.of')}
            onPageChange={setPage}
          />
        </Card>
      )}
    </div>
  );
}

export default ReportsPage;
