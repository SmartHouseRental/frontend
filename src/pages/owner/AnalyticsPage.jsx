import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Eye, DollarSign, Building2, Percent, BarChart3, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const topProperties = [
    { name: 'Penthouse Suite CMC', views: 1560, bookingRate: 45, revenue: '360K ETB' },
    { name: 'Luxury Villa in Bole Atlas', views: 1245, bookingRate: 68, revenue: '510K ETB' },
    { name: 'Bole Skyline Apartment', views: 892, bookingRate: 85, revenue: '405K ETB' },
    { name: 'Cottage by the Lake', views: 678, bookingRate: 72, revenue: '192K ETB' },
    { name: 'Modern Studio Kazanchis', views: 456, bookingRate: 60, revenue: '168K ETB' },
];

function AnalyticsPage() {
    const [period, setPeriod] = useState('monthly');
    const [hoveredBar, setHoveredBar] = useState(null);

    const periods = ['monthly', 'weekly', 'yearly'];

    const barData = [
        { x: 20, h: 100, label: 'Oct', value: '180K' },
        { x: 120, h: 120, label: 'Nov', value: '215K' },
        { x: 220, h: 95, label: 'Dec', value: '170K' },
        { x: 320, h: 140, label: 'Jan', value: '252K' },
        { x: 420, h: 155, label: 'Feb', value: '279K' },
        { x: 520, h: 170, label: 'Mar', value: '306K' },
    ];

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Analytics & Insights</h1>
                    <p className="text-muted-foreground mt-1">Track performance and trends across your properties.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2"><Download size={14} /> Export</Button>
                    <div className="flex gap-0.5 bg-muted rounded-lg p-0.5">
                        {periods.map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`rounded-md px-3 py-1.5 text-xs font-bold capitalize transition-all ${period === p ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Total Views', value: '12,847', change: '+24%', up: true, icon: Eye, bg: 'bg-blue-500/10', text: 'text-blue-500' },
                    { label: 'Booking Rate', value: '67.3%', change: '+8%', up: true, icon: Percent, bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
                    { label: 'Revenue', value: '1.47M ETB', change: '+15%', up: true, icon: DollarSign, bg: 'bg-primary/10', text: 'text-primary' },
                    { label: 'Occupancy Rate', value: '83.3%', change: '-3%', up: false, icon: Building2, bg: 'bg-amber-500/10', text: 'text-amber-500' },
                ].map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={kpi.label} className="border-0 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${kpi.bg} group-hover:scale-110 transition-transform`}>
                                        <Icon size={20} className={kpi.text} />
                                    </div>
                                    <span className={`flex items-center gap-0.5 text-xs font-bold ${kpi.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpi.change}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-3">{kpi.label}</p>
                                <h3 className="text-2xl font-black mt-1">{kpi.value}</h3>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Views Over Time */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-foreground flex items-center gap-2"><Eye size={16} /> Views Over Time</h4>
                        <span className="text-xs text-emerald-500 font-bold flex items-center gap-0.5"><ArrowUpRight size={12} /> +24% vs last period</span>
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
                            {[{ x: 0, y: 160 }, { x: 200, y: 130 }, { x: 400, y: 100 }, { x: 600, y: 75 }, { x: 800, y: 35 }, { x: 1000, y: 20 }].map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2.5" className="cursor-pointer" />
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
                        <span className="text-xs text-emerald-500 font-bold flex items-center gap-0.5"><ArrowUpRight size={12} /> +15% growth</span>
                    </div>
                    <div className="h-48 relative">
                        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 600 200">
                            {barData.map((bar, i) => (
                                <g key={i}>
                                    <rect
                                        x={bar.x} y={200 - bar.h} width="60" height={bar.h} rx="6"
                                        fill="oklch(0.62 0.11 55)"
                                        opacity={hoveredBar === i ? 1 : i === barData.length - 1 ? 0.85 : 0.5}
                                        className="cursor-pointer transition-opacity duration-200"
                                        onMouseEnter={() => setHoveredBar(i)}
                                        onMouseLeave={() => setHoveredBar(null)}
                                    />
                                    {hoveredBar === i && (
                                        <text x={bar.x + 30} y={200 - bar.h - 8} textAnchor="middle" className="text-xs font-bold fill-foreground" fontSize="11">{bar.value}</text>
                                    )}
                                </g>
                            ))}
                        </svg>
                    </div>
                    <div className="flex justify-between px-4 mt-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        {barData.map(b => <span key={b.label}>{b.label}</span>)}
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
                                    <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                                        <td className="py-3 pr-4">
                                            <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-300 text-white' : i === 2 ? 'bg-amber-600 text-white' : 'bg-muted text-muted-foreground'}`}>{i + 1}</span>
                                        </td>
                                        <td className="py-3 pr-4 text-sm font-semibold text-foreground">{p.name}</td>
                                        <td className="py-3 pr-4 text-sm font-medium">{p.views.toLocaleString()}</td>
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                                                    <div className={`h-full rounded-full transition-all duration-700 ${p.bookingRate >= 80 ? 'bg-emerald-500' : p.bookingRate >= 60 ? 'bg-primary' : 'bg-amber-500'}`} style={{ width: `${p.bookingRate}%` }}></div>
                                                </div>
                                                <span className="text-sm font-medium">{p.bookingRate}%</span>
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
