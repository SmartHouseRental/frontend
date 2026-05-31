import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Search,
    Download,
    Filter,
    ShieldCheck,
    UserX,
    CheckCircle2,
    XCircle,
    Home,
    FileText,
    AlertTriangle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAdminAuditLogs } from '@/features/admin/hooks/useAdmin';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import DataTablePagination from '@/components/DataTablePagination';

const severityStyles = {
    high: 'bg-rose-100 text-rose-700',
    warning: 'bg-amber-100 text-amber-700',
    normal: 'bg-slate-100 text-slate-600',
};

function AuditLogsPage() {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const params = {
      page,
      limit: 50,
      ...(search.trim() ? { search: search.trim() } : {}),
    };

    const { data, isLoading, isError, refetch } = useAdminAuditLogs(params);

    const auditLogs = getAdminListItems(data);
    const meta = data?.meta || { page: 1, limit: 50, total: 0, totalPages: 1 };

    const toLabel = (value = '') =>
      String(value)
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

    const actionTypeLabels = {
      user_suspended: t('adminAuditLogs.actionTypes.userSuspended'),
      property_approved: t('adminAuditLogs.actionTypes.propertyApproved'),
      property_rejected: t('adminAuditLogs.actionTypes.propertyRejected'),
      report_resolved: t('adminAuditLogs.actionTypes.reportResolved'),
      documents_verified: t('adminAuditLogs.actionTypes.documentsVerified'),
      agreement_terminated: t('adminAuditLogs.actionTypes.agreementTerminated'),
    };

    const severityLabels = {
      high: t('adminAuditLogs.severities.high'),
      warning: t('adminAuditLogs.severities.warning'),
      normal: t('adminAuditLogs.severities.normal'),
    };

    const getIconByEvent = (eventType = '') => {
      if (eventType.includes('SUSPEND') || eventType.includes('BAN')) return UserX;
      if (eventType.includes('APPROVE')) return CheckCircle2;
      if (eventType.includes('VERIFY')) return ShieldCheck;
      if (eventType.includes('REJECT')) return XCircle;
      if (eventType.includes('REPORT')) return AlertTriangle;
      if (eventType.includes('BROADCAST')) return Home;
      return FileText;
    };

    const getActionLabel = (eventType = '') => actionTypeLabels[eventType] || toLabel(eventType);

    const toSeverity = (eventType = '') => {
      if (eventType.includes('DELETE') || eventType.includes('REJECT') || eventType.includes('SUSPEND')) return 'high';
      if (eventType.includes('PENDING') || eventType.includes('UPDATE')) return 'warning';
      return 'normal';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">{t('adminAuditLogs.title')}</h2>
                    <p className="text-muted-foreground mt-1">
                        {t('adminAuditLogs.subtitle')}
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    {t('adminAuditLogs.exportLogs')}
                </Button>
            </div>

            <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="relative max-w-xl flex-1">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                        <Search size={18} />
                    </span>
                    <Input
                        placeholder={t('adminAuditLogs.searchPlaceholder')}
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
                    <Select>
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder={t('adminAuditLogs.filters.actionTypePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">{t('adminAuditLogs.filters.allActions')}</SelectItem>
                                <SelectItem value="user_suspended">{t('adminAuditLogs.actionTypes.userSuspended')}</SelectItem>
                                <SelectItem value="property_approved">{t('adminAuditLogs.actionTypes.propertyApproved')}</SelectItem>
                                <SelectItem value="property_rejected">{t('adminAuditLogs.actionTypes.propertyRejected')}</SelectItem>
                                <SelectItem value="report_resolved">{t('adminAuditLogs.actionTypes.reportResolved')}</SelectItem>
                                <SelectItem value="documents_verified">{t('adminAuditLogs.actionTypes.documentsVerified')}</SelectItem>
                                <SelectItem value="agreement_terminated">{t('adminAuditLogs.actionTypes.agreementTerminated')}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder={t('adminAuditLogs.filters.severityPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">{t('adminAuditLogs.filters.all')}</SelectItem>
                                <SelectItem value="high">{t('adminAuditLogs.severities.high')}</SelectItem>
                                <SelectItem value="warning">{t('adminAuditLogs.severities.warning')}</SelectItem>
                                <SelectItem value="normal">{t('adminAuditLogs.severities.normal')}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <Filter size={16} />
                    </Button>
                </div>
            </Card>

            {isLoading ? (
              <TableSkeleton rows={8} columns={6} />
            ) : isError ? (
              <ErrorState title={t('adminAuditLogs.errorTitle')} onRetry={refetch} />
            ) : auditLogs.length === 0 ? (
              <EmptyState title={t('adminAuditLogs.emptyTitle')} description={t('adminAuditLogs.emptyDescription')} />
            ) : (
            <Card className="gap-0 overflow-hidden p-0">
                <Table className="w-full min-w-full border-collapse text-left">
                    <TableHeader className="bg-muted/30 w-full">
                        <TableRow>
                            <TableHead className="px-6 py-4">{t('adminAuditLogs.table.timestamp')}</TableHead>
                            <TableHead className="px-6 py-4">{t('adminAuditLogs.table.admin')}</TableHead>
                            <TableHead className="px-6 py-4">{t('adminAuditLogs.table.action')}</TableHead>
                            <TableHead className="px-6 py-4">{t('adminAuditLogs.table.target')}</TableHead>
                            <TableHead className="px-6 py-4">{t('adminAuditLogs.table.details')}</TableHead>
                            <TableHead className="px-4 py-4">{t('adminAuditLogs.table.severity')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {auditLogs.map((log) => {
                            const IconComp = getIconByEvent(log.eventType);
                            const severity = toSeverity(log.eventType);
                            const actorName = log.actor
                              ? `${log.actor.first_name || ''} ${log.actor.last_name || ''}`.trim() || log.actor.email
                              : t('adminAuditLogs.systemActor');
                            return (
                                <TableRow key={log.id} className="transition-colors hover:bg-muted/20">
                                    <TableCell className="px-6 py-4">
                                        <p className="whitespace-nowrap text-xs font-medium">{new Date(log.createdAt).toLocaleString()}</p>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span
                                            className={`text-sm font-medium ${actorName === t('adminAuditLogs.systemActor') ? 'text-muted-foreground italic' : ''}`}
                                        >
                                            {actorName}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <IconComp size={14} className="text-muted-foreground" />
                                            <span className="whitespace-nowrap text-sm font-semibold">
                                                {getActionLabel(log.eventType)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span className="text-primary text-sm font-medium">
                                          {log.entityType}{log.entityId ? ` (${log.entityId})` : ''}
                                        </span>
                                    </TableCell>
                                    <TableCell className="max-w-xs px-6 py-4">
                                        <p className="text-muted-foreground truncate text-xs">
                                          {log.metadata ? JSON.stringify(log.metadata) : t('adminAuditLogs.noDetails')}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${severityStyles[severity]}`}
                                        >
                                            {severityLabels[severity]}
                                        </span>
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
                  itemsPerPage={meta.limit || 50}
                  itemLabel={t('adminAuditLogs.pagination.itemLabel')}
                  showingLabel={t('adminAuditLogs.pagination.showing')}
                  ofLabel={t('adminAuditLogs.pagination.of')}
                  onPageChange={setPage}
                />
            </Card>
            )}
        </div>
    );
}

export default AuditLogsPage;
