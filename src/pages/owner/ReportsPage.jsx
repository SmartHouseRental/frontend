import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, MessageSquare, ChevronRight, Shield, Send } from 'lucide-react';

function ReportsPage() {
    const reports = [
        { id: 'RPT-401', type: 'Noise Complaint', property: 'Penthouse Suite CMC', reporter: 'Neighbor — Building Admin', date: 'Mar 15, 2026', status: 'Open', severity: 'Medium', desc: 'Excessive noise reported from the unit during late evening hours. Multiple complaints from other tenants.' },
        { id: 'RPT-402', type: 'Property Condition', property: 'Bole Skyline Apartment', reporter: 'Mulugeta K. (Renter)', date: 'Mar 10, 2026', status: 'Resolved', severity: 'Low', desc: 'Minor water leak in the kitchen area. Issue was reported and addressed within 48 hours.' },
        { id: 'RPT-403', type: 'Safety Concern', property: 'Modern Studio in Kazanchis', reporter: 'System / Admin', date: 'Feb 28, 2026', status: 'Under Review', severity: 'High', desc: 'Fire safety inspection overdue. Property requires updated fire extinguishers and smoke detection systems.' },
    ];

    const statusColors = {
        Open: 'bg-amber-100 text-amber-700',
        Resolved: 'bg-emerald-100 text-emerald-700',
        'Under Review': 'bg-blue-100 text-blue-700',
    };

    const severityColors = {
        Low: 'bg-slate-100 text-slate-600',
        Medium: 'bg-amber-100 text-amber-700',
        High: 'bg-rose-100 text-rose-700',
    };

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Reports Against Me</h1>
                    <p className="text-muted-foreground mt-1">View and respond to reports filed against you or your properties.</p>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                            <AlertTriangle size={18} className="text-amber-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Total Reports</p>
                            <p className="text-xl font-extrabold">3</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                            <Clock size={18} className="text-rose-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Open</p>
                            <p className="text-xl font-extrabold text-rose-600">1</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                            <Shield size={18} className="text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Resolved</p>
                            <p className="text-xl font-extrabold text-emerald-600">1</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                {reports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                        <CardContent>
                            <div className="flex items-start gap-4">
                                <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${report.severity === 'High' ? 'bg-rose-500/10' : report.severity === 'Medium' ? 'bg-amber-500/10' : 'bg-slate-100'}`}>
                                    <AlertTriangle size={20} className={report.severity === 'High' ? 'text-rose-500' : report.severity === 'Medium' ? 'text-amber-500' : 'text-slate-500'} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-foreground">{report.type}</p>
                                                <Badge className={`border-0 text-[10px] uppercase ${statusColors[report.status]}`}>{report.status}</Badge>
                                                <Badge className={`border-0 text-[10px] uppercase ${severityColors[report.severity]}`}>{report.severity}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">{report.property} • {report.id}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{report.date}</p>
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{report.desc}</p>

                                    <div className="flex items-center justify-between mt-4">
                                        <p className="text-xs text-muted-foreground">Reported by: <span className="font-semibold">{report.reporter}</span></p>
                                        <div className="flex items-center gap-2">
                                            {report.status !== 'Resolved' && (
                                                <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                                                    <MessageSquare size={12} /> Respond
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                                <ChevronRight size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Response Form (for the open report) */}
                            {report.status === 'Open' && (
                                <div className="mt-5 pt-4 border-t border-border">
                                    <p className="text-xs font-bold text-foreground mb-2">Submit Your Response</p>
                                    <textarea
                                        className="w-full h-20 rounded-lg border border-border bg-muted/30 p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Explain your side of the situation..."
                                    ></textarea>
                                    <div className="flex justify-end mt-2">
                                        <Button size="sm" className="gap-1"><Send size={12} /> Submit Response</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ReportsPage;
