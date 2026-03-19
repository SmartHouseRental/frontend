import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Handshake, CheckCircle2, Clock, EllipsisVertical, ChevronLeft, ChevronRight, FileText, Eye } from 'lucide-react';

function AgreementsPage() {
    const agreements = [
        { id: '#AG-2001', property: 'Bole Skyline Apartment', renter: 'Mulugeta Kebede', rent: '45,000 ETB', deposit: '90,000 ETB', duration: '12 Months', status: 'Active', startDate: 'Jan 15, 2026' },
        { id: '#AG-2002', property: 'Luxury Villa in Bole Atlas', renter: 'Sara Tesfaye', rent: '85,000 ETB', deposit: '170,000 ETB', duration: '24 Months', status: 'Pending', startDate: 'Mar 01, 2026' },
        { id: '#AG-2003', property: 'Cottage by the Lake', renter: 'Helen Girma', rent: '32,000 ETB', deposit: '64,000 ETB', duration: '6 Months', status: 'Active', startDate: 'Feb 10, 2026' },
        { id: '#AG-2004', property: 'Modern Studio in Kazanchis', renter: 'Abebe Wolde', rent: '28,000 ETB', deposit: '56,000 ETB', duration: '12 Months', status: 'Expired', startDate: 'Mar 20, 2025' },
    ];

    const statusColors = {
        Active: 'bg-emerald-100 text-emerald-700',
        Pending: 'bg-amber-100 text-amber-700',
        Expired: 'bg-slate-100 text-slate-600',
        Terminated: 'bg-rose-100 text-rose-700',
    };

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
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Handshake size={20} />
                        </div>
                        <span className="rounded bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-500">+3</span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm font-medium">Total Agreements</p>
                        <h3 className="mt-1 text-2xl font-extrabold">14</h3>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                            <CheckCircle2 size={20} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm font-medium">Active</p>
                        <h3 className="mt-1 text-2xl font-extrabold text-emerald-600">10</h3>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                            <Clock size={20} />
                        </div>
                        <span className="rounded bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-500">Review</span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm font-medium">Pending</p>
                        <h3 className="mt-1 text-2xl font-extrabold text-amber-600">3</h3>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card className="flex-row flex-wrap items-center justify-between gap-4 p-4">
                <div className="relative min-w-50 flex-1 max-w-lg">
                    <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Search agreements..." type="text" />
                </div>
                <div className="flex items-center gap-3">
                    <Select>
                        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon"><Filter size={16} /></Button>
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
                        {agreements.map((a) => (
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
                                    <p className="text-[10px] text-muted-foreground">Dep: {a.deposit}</p>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm">{a.duration}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusColors[a.status]}`}>
                                        {a.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <Eye size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <FileText size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                            <EllipsisVertical size={14} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                    <p className="text-muted-foreground text-xs font-medium">Showing 1-4 of 14 agreements</p>
                    <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-border p-2 text-muted-foreground" disabled><ChevronLeft size={16} /></button>
                        <button className="bg-primary rounded-lg px-3 py-1 text-xs font-bold text-primary-foreground">1</button>
                        <button className="text-muted-foreground rounded-lg px-3 py-1 text-xs font-bold hover:bg-card">2</button>
                        <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-card"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default AgreementsPage;
