import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, DollarSign, CheckCircle2, Clock, ExternalLink, ChevronLeft, ChevronRight, TrendingUp, AlertCircle, MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const initialPayments = [
    { id: 'PAY-501', agreement: '#AG-2001', property: 'Bole Skyline Apt', renter: 'Mulugeta K.', amount: 45000, date: 'Mar 5, 2026', proofUrl: '#', status: 'Confirmed' },
    { id: 'PAY-502', agreement: '#AG-2003', property: 'Cottage by the Lake', renter: 'Helen G.', amount: 32000, date: 'Mar 3, 2026', proofUrl: '#', status: 'Confirmed' },
    { id: 'PAY-503', agreement: '#AG-2002', property: 'Luxury Villa Bole', renter: 'Sara T.', amount: 85000, date: 'Mar 1, 2026', proofUrl: '#', status: 'Pending' },
    { id: 'PAY-504', agreement: '#AG-2005', property: 'Penthouse Suite CMC', renter: 'Yonas D.', amount: 120000, date: 'Mar 1, 2026', proofUrl: '#', status: 'Confirmed' },
    { id: 'PAY-505', agreement: '#AG-2001', property: 'Bole Skyline Apt', renter: 'Mulugeta K.', amount: 45000, date: 'Feb 5, 2026', proofUrl: '#', status: 'Confirmed' },
    { id: 'PAY-506', agreement: '#AG-2003', property: 'Cottage by the Lake', renter: 'Helen G.', amount: 32000, date: 'Feb 3, 2026', proofUrl: '#', status: 'Confirmed' },
    { id: 'PAY-507', agreement: '#AG-2001', property: 'Bole Skyline Apt', renter: 'Mulugeta K.', amount: 45000, date: 'Jan 15, 2026', proofUrl: '#', status: 'Confirmed' },
    { id: 'PAY-508', agreement: '#AG-2005', property: 'Penthouse Suite CMC', renter: 'Yonas D.', amount: 120000, date: 'Jan 1, 2026', proofUrl: '#', status: 'Confirmed' },
];

function PaymentHistoryPage() {
    const [payments, setPayments] = useState(initialPayments);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filtered = useMemo(() => {
        return payments.filter(p => {
            const matchesSearch = p.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.renter.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [payments, searchQuery, statusFilter]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const stats = useMemo(() => ({
        totalReceived: payments.filter(p => p.status === 'Confirmed').reduce((sum, p) => sum + p.amount, 0),
        pendingAmount: payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0),
        thisMonth: payments.filter(p => p.date.includes('Mar')).reduce((sum, p) => sum + p.amount, 0),
    }), [payments]);

    const handleConfirm = (id) => {
        setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'Confirmed' } : p));
    };

    const formatAmount = (n) => n.toLocaleString() + ' ETB';

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Payment History</h1>
                    <p className="text-muted-foreground mt-1">Track all payments received from your rental agreements.</p>
                </div>
                <Button variant="outline" className="gap-2"><Download size={14} /> Export</Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card className="border-0 hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10"><DollarSign size={20} className="text-emerald-500" /></div>
                            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-500"><TrendingUp size={14} /> +12%</span>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">Total Received</p>
                        <h3 className="text-2xl font-black mt-1">{formatAmount(stats.totalReceived)}</h3>
                    </CardContent>
                </Card>
                <Card className={`border-0 hover:shadow-md transition-shadow ${stats.pendingAmount > 0 ? 'ring-1 ring-amber-500/20' : ''}`}>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10"><Clock size={20} className="text-amber-500" /></div>
                            {stats.pendingAmount > 0 && <span className="text-xs font-bold text-amber-500 animate-pulse">Action Needed</span>}
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">Pending Confirmation</p>
                        <h3 className="text-2xl font-black mt-1 text-amber-600">{formatAmount(stats.pendingAmount)}</h3>
                    </CardContent>
                </Card>
                <Card className="border-0 hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><CheckCircle2 size={20} className="text-primary" /></div>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">This Month</p>
                        <h3 className="text-2xl font-black mt-1 text-primary">{formatAmount(stats.thisMonth)}</h3>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card className="flex-row flex-wrap items-center justify-between gap-4 p-4">
                <div className="relative min-w-50 flex-1 max-w-lg">
                    <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Search by ID, renter, or property..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
                </div>
                <div className="flex items-center gap-3">
                    <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {(searchQuery || statusFilter !== 'all') && (
                        <Button variant="ghost" size="sm" className="text-xs" onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}>Clear</Button>
                    )}
                </div>
            </Card>

            {/* Table */}
            <Card className="gap-0 overflow-hidden p-0">
                <Table className="w-full min-w-full text-left">
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="px-6 py-4">Payment ID</TableHead>
                            <TableHead className="px-6 py-4">Property</TableHead>
                            <TableHead className="px-6 py-4">Renter</TableHead>
                            <TableHead className="px-6 py-4">Amount</TableHead>
                            <TableHead className="px-6 py-4">Date</TableHead>
                            <TableHead className="px-6 py-4">Status</TableHead>
                            <TableHead className="px-6 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No payments found</TableCell></TableRow>
                        ) : (
                            paginated.map((p) => (
                                <TableRow key={p.id} className={`hover:bg-muted/10 transition-colors ${p.status === 'Pending' ? 'bg-amber-500/3' : ''}`}>
                                    <TableCell className="px-6 py-4">
                                        <span className="text-primary font-bold text-sm">{p.id}</span>
                                        <p className="text-[10px] text-muted-foreground">{p.agreement}</p>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm font-medium">{p.property}</TableCell>
                                    <TableCell className="px-6 py-4 text-sm">{p.renter}</TableCell>
                                    <TableCell className="px-6 py-4 text-sm font-bold">{formatAmount(p.amount)}</TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">{p.date}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${p.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground outline-none">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem className="gap-2 cursor-pointer text-primary focus:text-primary">
                                                    <ExternalLink size={14} /> View Proof
                                                </DropdownMenuItem>
                                                {p.status === 'Pending' && (
                                                    <DropdownMenuItem
                                                        className="gap-2 cursor-pointer font-bold text-emerald-600 focus:text-emerald-600"
                                                        onClick={() => handleConfirm(p.id)}
                                                    >
                                                        <CheckCircle2 size={14} /> Confirm Payment
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Download size={14} /> Download Receipt
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                        <p className="text-muted-foreground text-xs font-medium">Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}</p>
                        <div className="flex items-center gap-2">
                            <button className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft size={16} /></button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`rounded-lg px-3 py-1 text-xs font-bold ${currentPage === page ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-card'}`}>{page}</button>
                            ))}
                            <button className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight size={16} /></button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default PaymentHistoryPage;
