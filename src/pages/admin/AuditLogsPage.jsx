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
    ChevronLeft,
    ChevronRight,
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

const auditLogs = [
    {
        id: 'AUD-0012',
        timestamp: 'Mar 23, 2026 01:14 AM',
        admin: 'Alex Rivera',
        action: 'user_suspended',
        actionLabel: 'User Suspended',
        target: 'David Vance (USR-3421)',
        details: 'Suspended for multiple fraud reports. Reason: Repeated false advertising.',
        severity: 'high',
        icon: UserX,
    },
    {
        id: 'AUD-0011',
        timestamp: 'Mar 22, 2026 11:30 PM',
        admin: 'Alex Rivera',
        action: 'property_approved',
        actionLabel: 'Property Approved',
        target: 'Horizon Peak Villa (PRP-9402)',
        details: 'Property listing approved after document verification.',
        severity: 'normal',
        icon: CheckCircle2,
    },
    {
        id: 'AUD-0010',
        timestamp: 'Mar 22, 2026 10:15 PM',
        admin: 'System',
        action: 'property_auto_approved',
        actionLabel: 'Auto-Approved',
        target: 'Bole Skyline Apt (PRP-8829)',
        details: 'Automatically approved — owner is verified.',
        severity: 'normal',
        icon: ShieldCheck,
    },
    {
        id: 'AUD-0009',
        timestamp: 'Mar 22, 2026 08:45 PM',
        admin: 'Alex Rivera',
        action: 'report_resolved',
        actionLabel: 'Report Resolved',
        target: 'Report #RPT-4521',
        details: 'Fraud report resolved. No action taken — insufficient evidence.',
        severity: 'normal',
        icon: FileText,
    },
    {
        id: 'AUD-0008',
        timestamp: 'Mar 22, 2026 06:20 PM',
        admin: 'Alex Rivera',
        action: 'documents_verified',
        actionLabel: 'Documents Verified',
        target: 'Dawit Tesfaye (USR-4842)',
        details: 'Owner documents approved. User verification state changed to verified.',
        severity: 'normal',
        icon: ShieldCheck,
    },
    {
        id: 'AUD-0007',
        timestamp: 'Mar 22, 2026 04:00 PM',
        admin: 'Alex Rivera',
        action: 'property_rejected',
        actionLabel: 'Property Rejected',
        target: 'Suspicious Listing (PRP-8102)',
        details: 'Rejected due to misleading photos and inconsistent pricing.',
        severity: 'warning',
        icon: XCircle,
    },
    {
        id: 'AUD-0006',
        timestamp: 'Mar 22, 2026 02:30 PM',
        admin: 'Alex Rivera',
        action: 'agreement_terminated',
        actionLabel: 'Agreement Terminated',
        target: 'Agreement #AG-7102',
        details: 'Early termination by admin due to ongoing dispute between parties.',
        severity: 'high',
        icon: AlertTriangle,
    },
    {
        id: 'AUD-0005',
        timestamp: 'Mar 22, 2026 11:00 AM',
        admin: 'System',
        action: 'broadcast_sent',
        actionLabel: 'Broadcast Sent',
        target: 'All Users',
        details: 'Platform maintenance notification sent to 12,450 users.',
        severity: 'normal',
        icon: Home,
    },
];

const severityStyles = {
    high: 'bg-rose-100 text-rose-700',
    warning: 'bg-amber-100 text-amber-700',
    normal: 'bg-slate-100 text-slate-600',
};

function AuditLogsPage() {
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
                            const IconComp = log.icon;
                            return (
                                <TableRow key={log.id} className="transition-colors hover:bg-muted/20">
                                    <TableCell className="px-6 py-4">
                                        <p className="whitespace-nowrap text-xs font-medium">{log.timestamp}</p>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span
                                            className={`text-sm font-medium ${log.admin === 'System' ? 'text-muted-foreground italic' : ''}`}
                                        >
                                            {log.admin}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <IconComp size={14} className="text-muted-foreground" />
                                            <span className="whitespace-nowrap text-sm font-semibold">
                                                {log.actionLabel}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span className="text-primary text-sm font-medium">{log.target}</span>
                                    </TableCell>
                                    <TableCell className="max-w-xs px-6 py-4">
                                        <p className="text-muted-foreground truncate text-xs">{log.details}</p>
                                    </TableCell>
                                    <TableCell className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${severityStyles[log.severity]}`}
                                        >
                                            {log.severity}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                    <span className="text-muted-foreground text-xs font-medium">
                        Showing 1-{auditLogs.length} of 248 entries
                    </span>
                    <div className="flex items-center gap-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
                            1
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white">
                            2
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white">
                            3
                        </button>
                        <span className="text-muted-foreground px-1">...</span>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white">
                            31
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default AuditLogsPage;
