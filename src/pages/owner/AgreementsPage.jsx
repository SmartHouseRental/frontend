import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router';
import { Search, Filter, Download, Handshake, CheckCircle2, Clock, EllipsisVertical, ChevronLeft, ChevronRight, FileText, Eye, XCircle } from 'lucide-react';

const initialAgreements = [
    { id: '#AG-2001', property: 'Bole Skyline Apartment', renter: 'Mulugeta Kebede', rent: '45,000 ETB', deposit: '90,000 ETB', duration: '12 Months', status: 'Active', startDate: 'Jan 15, 2026', paymentDay: '5th' },
    { id: '#AG-2002', property: 'Luxury Villa in Bole Atlas', renter: 'Sara Tesfaye', rent: '85,000 ETB', deposit: '170,000 ETB', duration: '24 Months', status: 'Pending', startDate: 'Mar 01, 2026', paymentDay: '1st' },
    { id: '#AG-2003', property: 'Cottage by the Lake', renter: 'Helen Girma', rent: '32,000 ETB', deposit: '64,000 ETB', duration: '6 Months', status: 'Active', startDate: 'Feb 10, 2026', paymentDay: '10th' },
    { id: '#AG-2004', property: 'Modern Studio in Kazanchis', renter: 'Abebe Wolde', rent: '28,000 ETB', deposit: '56,000 ETB', duration: '12 Months', status: 'Expired', startDate: 'Mar 20, 2025', paymentDay: '20th' },
    { id: '#AG-2005', property: 'Penthouse Suite CMC', renter: 'Yonas Desta', rent: '120,000 ETB', deposit: '240,000 ETB', duration: '12 Months', status: 'Active', startDate: 'Dec 01, 2025', paymentDay: '1st' },
    { id: '#AG-2006', property: 'Riverside Garden Home', renter: 'Tigist Haile', rent: '55,000 ETB', deposit: '110,000 ETB', duration: '12 Months', status: 'Terminated', startDate: 'Oct 15, 2025', paymentDay: '15th' },
];

const statusColors = {
    Active: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Expired: 'bg-slate-100 text-slate-600',
    Terminated: 'bg-rose-100 text-rose-700',
};

function AgreementsPage() {
    const [agreements] = useState(initialAgreements);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filtered = useMemo(() => {
        return agreements.filter(a => {
            const matchesSearch = a.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.renter.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || a.status.toLowerCase() === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [agreements, searchQuery, statusFilter]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const stats = useMemo(() => ({
        total: agreements.length,
        active: agreements.filter(a => a.status === 'Active').length,
        pending: agreements.filter(a => a.status === 'Pending').length,
    }), [agreements]);

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Rental Agreements</h1>
                    <p className="text-muted-foreground mt-1">Track and manage your rental contracts.</p>
                </div>
                <Button variant="outline" className="gap-2"><Download size={14} /> Export CSV</Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex justify-between pb-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Handshake size={20} />
                        </div>
                        <span className="rounded bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-500">+3</span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm font-medium">Total Agreements</p>
                        <h3 className="mt-1 text-2xl font-extrabold">{stats.total}</h3>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex justify-between pb-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                            <CheckCircle2 size={20} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm font-medium">Active</p>
                        <h3 className="mt-1 text-2xl font-extrabold text-emerald-600">{stats.active}</h3>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex justify-between pb-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                            <Clock size={20} />
                        </div>
                        {stats.pending > 0 && <span className="rounded bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-500 animate-pulse">Review</span>}
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm font-medium">Pending</p>
                        <h3 className="mt-1 text-2xl font-extrabold text-amber-600">{stats.pending}</h3>
                    </CardContent>
                </Card>
            </div>

            {/* Search & Filter */}
            <Card className="flex-row flex-wrap items-center justify-between gap-4 p-4">
                <div className="relative min-w-50 flex-1 max-w-lg">
                    <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        className="pl-10"
                        placeholder="Search by property, renter, or ID..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                                <SelectItem value="terminated">Terminated</SelectItem>
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
                            <TableHead className="px-6 py-4">ID</TableHead>
                            <TableHead className="px-6 py-4">Property</TableHead>
                            <TableHead className="px-6 py-4">Renter</TableHead>
                            <TableHead className="px-6 py-4">Rent</TableHead>
                            <TableHead className="px-6 py-4">Duration</TableHead>
                            <TableHead className="px-6 py-4">Status</TableHead>
                            <TableHead className="px-6 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No agreements match your search</TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((a) => (
                                <TableRow key={a.id} className="hover:bg-muted/10 transition-colors">
                                    <TableCell className="px-6 py-4">
                                        <span className="text-primary font-bold text-sm">{a.id}</span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <p className="text-sm font-bold text-foreground">{a.property}</p>
                                        <p className="text-xs text-muted-foreground">From: {a.startDate}</p>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm font-medium">{a.renter}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <p className="text-sm font-bold">{a.rent}</p>
                                        <p className="text-[10px] text-muted-foreground">Due: {a.paymentDay}</p>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm">{a.duration}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusColors[a.status]}`}>{a.status}</span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <Link to="/owner/agreement-detail">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Eye size={14} /></Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><FileText size={14} /></Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><EllipsisVertical size={14} /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                        <p className="text-muted-foreground text-xs font-medium">
                            Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
                        </p>
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

export default AgreementsPage;
