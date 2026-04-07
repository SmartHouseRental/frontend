import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, MessageSquare, ChevronDown, Shield, Send, CheckCircle2, Loader2 } from 'lucide-react';

const initialReports = [
    { id: 'RPT-401', type: 'Noise Complaint', property: 'Penthouse Suite CMC', reporter: 'Neighbor — Building Admin', date: 'Mar 15, 2026', status: 'Open', severity: 'Medium', desc: 'Excessive noise reported from the unit during late evening hours. Multiple complaints from other tenants.', myResponse: '' },
    { id: 'RPT-402', type: 'Property Condition', property: 'Bole Skyline Apartment', reporter: 'Mulugeta K. (Renter)', date: 'Mar 10, 2026', status: 'Resolved', severity: 'Low', desc: 'Minor water leak in the kitchen area. Issue was reported and addressed within 48 hours.', myResponse: 'Plumber dispatched and issue fixed within 24 hours. Renter confirmed resolution.' },
    { id: 'RPT-403', type: 'Safety Concern', property: 'Modern Studio in Kazanchis', reporter: 'System / Admin', date: 'Feb 28, 2026', status: 'Under Review', severity: 'High', desc: 'Fire safety inspection overdue. Property requires updated fire extinguishers and smoke detection systems.', myResponse: '' },
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

function ReportsPage() {
    const [reports, setReports] = useState(initialReports);
    const [expandedId, setExpandedId] = useState(null);
    const [responseTexts, setResponseTexts] = useState({});
    const [submittingId, setSubmittingId] = useState(null);

    const stats = useMemo(() => ({
        total: reports.length,
        open: reports.filter(r => r.status === 'Open').length,
        resolved: reports.filter(r => r.status === 'Resolved').length,
    }), [reports]);

    const handleSubmitResponse = (id) => {
        const text = responseTexts[id];
        if (!text?.trim()) return;
        setSubmittingId(id);
        setTimeout(() => {
            setReports(prev => prev.map(r =>
                r.id === id ? { ...r, status: 'Under Review', myResponse: text } : r
            ));
            setResponseTexts(prev => ({ ...prev, [id]: '' }));
            setSubmittingId(null);
        }, 800);
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
                {[
                    { label: 'Total Reports', value: stats.total, icon: AlertTriangle, bg: 'bg-amber-500/10', text: 'text-amber-500' },
                    { label: 'Open', value: stats.open, icon: Clock, bg: 'bg-rose-500/10', text: 'text-rose-500', valueColor: 'text-rose-600' },
                    { label: 'Resolved', value: stats.resolved, icon: Shield, bg: 'bg-emerald-500/10', text: 'text-emerald-500', valueColor: 'text-emerald-600' },
                ].map((s) => {
                    const Icon = s.icon;
                    return (
                        <Card key={s.label} className="border-0 hover:shadow-md transition-shadow">
                            <CardContent className="flex items-center gap-3">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
                                    <Icon size={18} className={s.text} />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{s.label}</p>
                                    <p className={`text-xl font-extrabold ${s.valueColor || ''}`}>{s.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Reports */}
            <div className="space-y-4">
                {reports.map((report) => {
                    const isExpanded = expandedId === report.id;
                    return (
                        <Card key={report.id} className={`transition-all duration-300 ${isExpanded ? 'shadow-md border-primary/20' : 'hover:shadow-md'}`}>
                            <CardContent>
                                <div className="flex items-start gap-4 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : report.id)}>
                                    <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${report.severity === 'High' ? 'bg-rose-500/10' : report.severity === 'Medium' ? 'bg-amber-500/10' : 'bg-slate-100'}`}>
                                        <AlertTriangle size={20} className={report.severity === 'High' ? 'text-rose-500' : report.severity === 'Medium' ? 'text-amber-500' : 'text-slate-500'} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-bold text-foreground">{report.type}</p>
                                                <Badge className={`border-0 text-[10px] uppercase ${statusColors[report.status]}`}>{report.status}</Badge>
                                                <Badge className={`border-0 text-[10px] uppercase ${severityColors[report.severity]}`}>{report.severity}</Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs text-muted-foreground">{report.date}</p>
                                                <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">{report.property} • {report.id}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{report.desc}</p>
                                        <p className="text-[10px] text-muted-foreground mt-2">Reported by: <span className="font-semibold">{report.reporter}</span></p>
                                    </div>
                                </div>

                                {/* Expanded Section */}
                                {isExpanded && (
                                    <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-200 space-y-4">
                                        {report.myResponse && (
                                            <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
                                                <p className="text-xs font-bold text-emerald-700 mb-1 flex items-center gap-1"><CheckCircle2 size={12} /> Your Response</p>
                                                <p className="text-sm text-foreground">{report.myResponse}</p>
                                            </div>
                                        )}

                                        {report.status === 'Open' && (
                                            <div>
                                                <p className="text-xs font-bold text-foreground mb-2">Submit Your Response</p>
                                                <textarea
                                                    value={responseTexts[report.id] || ''}
                                                    onChange={(e) => setResponseTexts(prev => ({ ...prev, [report.id]: e.target.value }))}
                                                    className="w-full h-24 rounded-lg border border-border bg-muted/30 p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                                    placeholder="Explain your side of the situation..."
                                                />
                                                <div className="flex justify-end mt-2">
                                                    <Button
                                                        size="sm" className="gap-1"
                                                        onClick={() => handleSubmitResponse(report.id)}
                                                        disabled={!responseTexts[report.id]?.trim() || submittingId === report.id}
                                                    >
                                                        {submittingId === report.id ? <><Loader2 size={12} className="animate-spin" /> Submitting...</> :
                                                            <><Send size={12} /> Submit Response</>}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {report.status === 'Resolved' && (
                                            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1"><CheckCircle2 size={12} /> This report has been resolved</p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default ReportsPage;
