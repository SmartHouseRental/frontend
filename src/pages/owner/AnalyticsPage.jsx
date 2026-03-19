import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Eye, CalendarDays, DollarSign, Building2, Percent, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function AnalyticsPage() {
    const topProperties = [
        { name: 'Luxury Villa in Bole Atlas', views: 1245, bookingRate: '68%', revenue: '510K ETB' },
        { name: 'Bole Skyline Apartment', views: 892, bookingRate: '85%', revenue: '405K ETB' },
        { name: 'Penthouse Suite CMC', views: 1560, bookingRate: '45%', revenue: '360K ETB' },
        { name: 'Cottage by the Lake', views: 678, bookingRate: '72%', revenue: '192K ETB' },
    ];

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Analytics & Insights</h1>
                    <p className="text-muted-foreground mt-1">Track performance and trends across your properties.</p>
                </div>
                <div className="flex gap-1 bg-muted rounded-lg p-1">
                    <button className="text-foreground rounded-md bg-card px-3 py-1.5 text-xs font-bold shadow-sm">Monthly</button>
                    <button className="text-muted-foreground rounded-md px-3 py-1.5 text-xs font-bold hover:text-foreground transition-colors">Weekly</button>
                    <button className="text-muted-foreground rounded-md px-3 py-1.5 text-xs font-bold hover:text-foreground transition-colors">Yearly</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="border-0 hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                                <Eye size={20} className="text-blue-500" />
                            </div>
                            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-500">
                                <ArrowUpRight size={14} /> +24%
                            </span>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">Total Views</p>
                        <h3 className="text-2xl font-black mt-1">12,847</h3>
                    </CardContent>
                </Card>
                <Card className="border-0 hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                                <Percent size={20} className="text-emerald-500" />
                            </div>
                            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-500">
                                <ArrowUpRight size={14} /> +8%
                            </span>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">Booking Rate</p>
                        <h3 className="text-2xl font-black mt-1">67.3%</h3>
                    </CardContent>
                </Card>
                <Card className="border-0 hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                <DollarSign size={20} className="text-primary" />
                            </div>
                            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-500">
                                <ArrowUpRight size={14} /> +15%
                            </span>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">Revenue</p>
                        <h3 className="text-2xl font-black mt-1">1.47M ETB</h3>
                    </CardContent>
                </Card>
                <Card className="border-0 hover:shadow-md transition-shadow">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                                <Building2 size={20} className="text-amber-500" />
                            </div>
                            <span className="flex items-center gap-0.5 text-xs font-bold text-rose-500">
                                <ArrowDownRight size={14} /> -3%
                            </span>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">Occupancy Rate</p>
                        <h3 className="text-2xl font-black mt-1">83.3%</h3>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Views Over Time */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-foreground flex items-center gap-2"><Eye size={16} /> Views Over Time</h4>
                    </div>
                    <div className="h-48">
                        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                            <defs>
                                <linearGradient id="analyticsViewsGrad" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,160 C80,150 160,140 240,120 C320,100 400,110 480,90 C560,70 640,80 720,50 C800,30 880,40 1000,20 L1000,200 L0,200 Z" fill="url(#analyticsViewsGrad)" />
                            <path d="M0,160 C80,150 160,140 240,120 C320,100 400,110 480,90 C560,70 640,80 720,50 C800,30 880,40 1000,20" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                            {[{ x: 0, y: 160 }, { x: 240, y: 120 }, { x: 480, y: 90 }, { x: 720, y: 50 }, { x: 1000, y: 20 }].map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                            ))}
                        </svg>
                    </div>
                    <div className="flex justify-between px-1 mt-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
                    </div>
                </div>

                {/* Revenue Trends */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-foreground flex items-center gap-2"><DollarSign size={16} /> Revenue Trends</h4>
                    </div>
                    <div className="h-48">
                        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 600 200">
                            {[
                                { x: 20, h: 100, label: 'Oct' },
                                { x: 120, h: 120, label: 'Nov' },
                                { x: 220, h: 95, label: 'Dec' },
                                { x: 320, h: 140, label: 'Jan' },
                                { x: 420, h: 155, label: 'Feb' },
                                { x: 520, h: 170, label: 'Mar' },
                            ].map((bar, i) => (
                                <g key={i}>
                                    <rect x={bar.x} y={200 - bar.h} width="60" height={bar.h} rx="6" fill="oklch(0.62 0.11 55)" opacity={i === 5 ? 1 : 0.6} />
                                </g>
                            ))}
                        </svg>
                    </div>
                    <div className="flex justify-between px-4 mt-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
                    </div>
                </div>
            </div>

            {/* Top Properties Table */}
            <Card className="overflow-hidden shadow-sm">
                <CardContent>
                    <h4 className="font-bold text-foreground flex items-center gap-2 mb-4"><BarChart3 size={16} /> Top Performing Properties</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase border-b border-border">
                                    <th className="pb-3 pr-4">#</th>
                                    <th className="pb-3 pr-4">Property</th>
                                    <th className="pb-3 pr-4">Views</th>
                                    <th className="pb-3 pr-4">Booking Rate</th>
                                    <th className="pb-3">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProperties.map((p, i) => (
                                    <tr key={i} className="border-b border-border/50 last:border-0">
                                        <td className="py-3 pr-4">
                                            <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-300 text-white' : i === 2 ? 'bg-amber-600 text-white' : 'bg-muted text-muted-foreground'}`}>{i + 1}</span>
                                        </td>
                                        <td className="py-3 pr-4 text-sm font-semibold text-foreground">{p.name}</td>
                                        <td className="py-3 pr-4 text-sm font-medium">{p.views.toLocaleString()}</td>
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                                                    <div className="h-full rounded-full bg-primary" style={{ width: p.bookingRate }}></div>
                                                </div>
                                                <span className="text-sm font-medium">{p.bookingRate}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-sm font-bold text-primary">{p.revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default AnalyticsPage;
