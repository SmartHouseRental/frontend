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
    ScrollText,
    ShieldCheck,
    UserX,
    CheckCircle2,
    XCircle,
    Home,
    FileText,
    AlertTriangle,
    Eye,
} from 'lucide-react';
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

    const getIconByEvent = (eventType = '') => {
      if (eventType.includes('SUSPEND') || eventType.includes('BAN')) return UserX;
      if (eventType.includes('APPROVE')) return CheckCircle2;
      if (eventType.includes('VERIFY')) return ShieldCheck;
      if (eventType.includes('REJECT')) return XCircle;
      if (eventType.includes('REPORT')) return AlertTriangle;
      if (eventType.includes('BROADCAST')) return Home;
      return FileText;
    };

    const toSeverity = (eventType = '') => {
      if (eventType.includes('DELETE') || eventType.includes('REJECT') || eventType.includes('SUSPEND')) return 'high';
      if (eventType.includes('PENDING') || eventType.includes('UPDATE')) return 'warning';
      return 'normal';
    };

    return (
        <div className="space-y-6 p-8">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Audit Logs</h2>
                    <p className="text-muted-foreground mt-1">
                        Track all administrative actions and sensitive system events.
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    Export Logs
                </Button>
            </div>

            <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="relative max-w-xl flex-1">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                        <Search size={18} />
                    </span>
                    <Input
                        placeholder="Search by admin, action, or target..."
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
                            <SelectValue placeholder="Action Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Actions</SelectItem>
                                <SelectItem value="user_suspended">User Suspended</SelectItem>
                                <SelectItem value="property_approved">Property Approved</SelectItem>
                                <SelectItem value="property_rejected">Property Rejected</SelectItem>
                                <SelectItem value="report_resolved">Report Resolved</SelectItem>
                                <SelectItem value="documents_verified">Documents Verified</SelectItem>
                                <SelectItem value="agreement_terminated">Agreement Terminated</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
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
              <ErrorState title="Failed to load audit logs" onRetry={refetch} />
            ) : auditLogs.length === 0 ? (
              <EmptyState title="No audit logs found" description="Try changing search filters." />
            ) : (
            <Card className="gap-0 overflow-hidden p-0">
                <Table className="w-full min-w-full border-collapse text-left">
                    <TableHeader className="bg-muted/30 w-full">
                        <TableRow>
                            <TableHead className="px-6 py-4">Timestamp</TableHead>
                            <TableHead className="px-6 py-4">Admin</TableHead>
                            <TableHead className="px-6 py-4">Action</TableHead>
                            <TableHead className="px-6 py-4">Target</TableHead>
                            <TableHead className="px-6 py-4">Details</TableHead>
                            <TableHead className="px-4 py-4">Severity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {auditLogs.map((log) => {
                            const IconComp = getIconByEvent(log.eventType);
                            const severity = toSeverity(log.eventType);
                            const actorName = log.actor
                              ? `${log.actor.first_name || ''} ${log.actor.last_name || ''}`.trim() || log.actor.email
                              : 'System';
                            return (
                                <TableRow key={log.id} className="transition-colors hover:bg-muted/20">
                                    <TableCell className="px-6 py-4">
                                        <p className="whitespace-nowrap text-xs font-medium">{new Date(log.createdAt).toLocaleString()}</p>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span
                                            className={`text-sm font-medium ${actorName === 'System' ? 'text-muted-foreground italic' : ''}`}
                                        >
                                            {actorName}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <IconComp size={14} className="text-muted-foreground" />
                                            <span className="whitespace-nowrap text-sm font-semibold">
                                                {toLabel(log.eventType)}
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
                                          {log.metadata ? JSON.stringify(log.metadata) : 'No details'}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${severityStyles[severity]}`}
                                        >
                                            {severity}
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
                  itemLabel="entries"
                  onPageChange={setPage}
                />
            </Card>
            )}
        </div>
    );
}

export default AuditLogsPage;
