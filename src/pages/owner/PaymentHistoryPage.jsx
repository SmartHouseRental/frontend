import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, DollarSign, CheckCircle2, Clock, ExternalLink, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

function PaymentHistoryPage() {
    const payments = [
        { id: 'PAY-501', agreement: '#AG-2001', property: 'Bole Skyline Apt', renter: 'Mulugeta K.', amount: '45,000 ETB', date: 'Mar 5, 2026', proofUrl: '#', status: 'Confirmed' },
        { id: 'PAY-502', agreement: '#AG-2003', property: 'Cottage by the Lake', renter: 'Helen G.', amount: '32,000 ETB', date: 'Mar 3, 2026', proofUrl: '#', status: 'Confirmed' },
        { id: 'PAY-503', agreement: '#AG-2002', property: 'Luxury Villa Bole', renter: 'Sara T.', amount: '85,000 ETB', date: 'Mar 1, 2026', proofUrl: '#', status: 'Pending' },
        { id: 'PAY-504', agreement: '#AG-2001', property: 'Bole Skyline Apt', renter: 'Mulugeta K.', amount: '45,000 ETB', date: 'Feb 5, 2026', proofUrl: '#', status: 'Confirmed' },
        { id: 'PAY-505', agreement: '#AG-2003', property: 'Cottage by the Lake', renter: 'Helen G.', amount: '32,000 ETB', date: 'Feb 3, 2026', proofUrl: '#', status: 'Confirmed' },
        { id: 'PAY-506', agreement: '#AG-2001', property: 'Bole Skyline Apt', renter: 'Mulugeta K.', amount: '45,000 ETB', date: 'Jan 15, 2026', proofUrl: '#', status: 'Confirmed' },
    ];

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
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                                <DollarSign size={20} className="text-emerald-500" />
                            </div>
                            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-500">
                                <TrendingUp size={14} /> +12%
                            </span>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">Total Received</p>
                        <h3 className="text-2xl font-black mt-1">1.47M ETB</h3>
                    </CardContent>
                </Card>
                <Card className="border-0 hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                                <Clock size={20} className="text-amber-500" />
                            </div>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">Pending Confirmation</p>
                        <h3 className="text-2xl font-black mt-1 text-amber-600">85,000 ETB</h3>
                    </CardContent>
                </Card>
                <Card className="border-0 hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                <CheckCircle2 size={20} className="text-primary" />
                            </div>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">This Month</p>
                        <h3 className="text-2xl font-black mt-1 text-primary">162,000 ETB</h3>
                    </CardContent>
                </Card>
            </div>

            {/* Search & Filter */}
            <Card className="flex-row flex-wrap items-center justify-between gap-4 p-4">
                <div className="relative min-w-50 flex-1 max-w-lg">
                    <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Search by ID, renter, or property..." />
                </div>
                <div className="flex items-center gap-3">
                    <Select>
                        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
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
                            <TableHead className="px-6 py-4">Payment ID</TableHead>
                            <TableHead className="px-6 py-4">Property</TableHead>
                            <TableHead className="px-6 py-4">Renter</TableHead>
                            <TableHead className="px-6 py-4">Amount</TableHead>
                            <TableHead className="px-6 py-4">Date</TableHead>
                            <TableHead className="px-6 py-4">Status</TableHead>
                            <TableHead className="px-6 py-4">Proof</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((p) => (
                            <TableRow key={p.id} className="hover:bg-muted/10 transition-colors">
                                <TableCell className="px-6 py-4">
                                    <span className="text-primary font-bold text-sm">{p.id}</span>
                                    <p className="text-[10px] text-muted-foreground">{p.agreement}</p>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm font-medium">{p.property}</TableCell>
                                <TableCell className="px-6 py-4 text-sm">{p.renter}</TableCell>
                                <TableCell className="px-6 py-4 text-sm font-bold">{p.amount}</TableCell>
                                <TableCell className="px-6 py-4 text-sm text-muted-foreground">{p.date}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${p.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {p.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                                        <ExternalLink size={12} /> View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                    <p className="text-muted-foreground text-xs font-medium">Showing 1-6 of 24 payments</p>
                    <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-border p-2 text-muted-foreground" disabled><ChevronLeft size={16} /></button>
                        <button className="bg-primary rounded-lg px-3 py-1 text-xs font-bold text-primary-foreground">1</button>
                        <button className="text-muted-foreground rounded-lg px-3 py-1 text-xs font-bold hover:bg-card">2</button>
                        <button className="text-muted-foreground rounded-lg px-3 py-1 text-xs font-bold hover:bg-card">3</button>
                        <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-card"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default PaymentHistoryPage;
