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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Search,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Eye,
    FileText,
    Download,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    Clock,
    ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const pendingOwners = [
    {
        id: 'USR-4821',
        name: 'Mulugeta Abebe',
        email: 'mulugeta.a@email.com',
        phone: '+251 911 234 567',
        submittedDate: 'Mar 18, 2026',
        daysWaiting: 5,
        documents: ['National ID', 'Business License', 'Property Title Deed'],
        avatar: 'MA',
        avatarColor: 'bg-blue-500/10 text-blue-600',
    },
    {
        id: 'USR-4835',
        name: 'Tigist Hailu',
        email: 'tigist.h@email.com',
        phone: '+251 922 345 678',
        submittedDate: 'Mar 16, 2026',
        daysWaiting: 7,
        documents: ['National ID', 'Tax Certificate'],
        avatar: 'TH',
        avatarColor: 'bg-rose-500/10 text-rose-600',
    },
    {
        id: 'USR-4842',
        name: 'Dawit Tesfaye',
        email: 'dawit.t@email.com',
        phone: '+251 933 456 789',
        submittedDate: 'Mar 20, 2026',
        daysWaiting: 3,
        documents: ['National ID', 'Business License', 'Utility Bill'],
        avatar: 'DT',
        avatarColor: 'bg-emerald-500/10 text-emerald-600',
    },
    {
        id: 'USR-4856',
        name: 'Hana Bekele',
        email: 'hana.b@email.com',
        phone: '+251 944 567 890',
        submittedDate: 'Mar 21, 2026',
        daysWaiting: 2,
        documents: ['National ID', 'Property Title Deed'],
        avatar: 'HB',
        avatarColor: 'bg-amber-500/10 text-amber-600',
    },
    {
        id: 'USR-4867',
        name: 'Yonas Gebre',
        email: 'yonas.g@email.com',
        phone: '+251 955 678 901',
        submittedDate: 'Mar 22, 2026',
        daysWaiting: 1,
        documents: ['National ID', 'Business License'],
        avatar: 'YG',
        avatarColor: 'bg-violet-500/10 text-violet-600',
    },
];

function PendingVerificationsPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 p-8">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">
                        Pending Verifications
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Review and approve owner document submissions for platform access.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
                        <Clock size={16} />
                        <span>{pendingOwners.length} Awaiting Review</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="border-0 border-l-4 border-amber-400 p-5">
                    <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                        Pending Review
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-amber-600">{pendingOwners.length}</p>
                </Card>
                <Card className="border-0 border-l-4 border-emerald-400 p-5">
                    <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                        Approved This Week
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-emerald-600">12</p>
                </Card>
                <Card className="border-0 border-l-4 border-rose-400 p-5">
                    <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                        Rejected This Week
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-rose-600">3</p>
                </Card>
            </div>

            <Card className="flex flex-row items-center justify-between gap-4 px-6 py-4">
                <div className="relative max-w-xl flex-1">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                        <Search size={18} />
                    </span>
                    <Input
                        placeholder="Search by name, email, or ID..."
                        type="text"
                        className="pl-10"
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    Export
                </Button>
            </Card>

            <Card className="gap-0 overflow-hidden p-0">
                <Table className="w-full min-w-full border-collapse text-left">
                    <TableHeader className="bg-muted/30 w-full">
                        <TableRow>
                            <TableHead className="px-6 py-4">Owner</TableHead>
                            <TableHead className="px-6 py-4">Contact</TableHead>
                            <TableHead className="px-6 py-4">Submitted</TableHead>
                            <TableHead className="px-6 py-4">Waiting</TableHead>
                            <TableHead className="px-6 py-4">Documents</TableHead>
                            <TableHead className="px-4 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingOwners.map((owner) => (
                            <TableRow
                                key={owner.id}
                                className="cursor-pointer transition-colors hover:bg-muted/20"
                                onClick={() => navigate(`/admin/users/${owner.id}`)}
                            >
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${owner.avatarColor}`}
                                        >
                                            {owner.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{owner.name}</p>
                                            <p className="text-muted-foreground text-xs">{owner.id}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <p className="text-sm">{owner.email}</p>
                                    <p className="text-muted-foreground text-xs">{owner.phone}</p>
                                </TableCell>
                                <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                                    {owner.submittedDate}
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${owner.daysWaiting >= 7
                                            ? 'bg-rose-100 text-rose-700'
                                            : owner.daysWaiting >= 3
                                                ? 'bg-amber-100 text-amber-700'
                                                : 'bg-emerald-100 text-emerald-700'
                                            }`}
                                    >
                                        {owner.daysWaiting} days
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {owner.documents.map((doc) => (
                                            <span
                                                key={doc}
                                                className="bg-primary/5 text-primary rounded px-2 py-0.5 text-[10px] font-medium"
                                            >
                                                {doc}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Eye className="mr-2 h-4 w-4" />
                                                <span>View Documents</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <FileText className="mr-2 h-4 w-4" />
                                                <span>View Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                <span>Approve & Verify</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                                                <XCircle className="mr-2 h-4 w-4" />
                                                <span>Reject Documents</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                    <span className="text-muted-foreground text-xs font-medium">
                        Showing 1-{pendingOwners.length} of {pendingOwners.length} owners
                    </span>
                    <div className="flex items-center gap-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
                            1
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

export default PendingVerificationsPage;
