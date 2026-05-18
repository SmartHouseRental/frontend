import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import {
    Building2, Eye, CalendarDays, FileText, TrendingUp, DollarSign,
    Plus, ArrowRight, Clock, CheckCircle2, XCircle, Star, MapPin,
    MessageCircle, ArrowUpRight, Handshake, Bell, MoreVertical, BarChart3, Loader2,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMyProperties } from '@/features/properties/hooks/useMyProperties';
import { useOwnerAgreements } from '@/features/agreements/hooks/useAgreements';
import { useAppointments } from '@/features/appointments/hooks/useAppointments';
import { useProfile } from '@/features/profile/hooks/useProfile';

const quickActions = [
    { label: 'Add New Property', desc: 'List a new rental property', icon: Plus, color: 'primary', to: 'properties' },
    { label: 'View Appointments', desc: '3 pending confirmations', icon: CalendarDays, color: 'amber-500', to: 'appointments' },
    { label: 'Manage Agreements', desc: 'Review pending contracts', icon: Handshake, color: 'blue-500', to: 'agreements' },
    { label: 'Notifications', desc: '3 unread alerts', icon: Bell, color: 'rose-500', to: 'notifications' },
];

const colorMap = {
    'primary': { bg: 'bg-primary/10', text: 'text-primary', hoverBg: 'group-hover:bg-primary', hoverText: 'group-hover:text-primary-foreground', arrow: 'group-hover:text-primary' },
    'blue-500': { bg: 'bg-blue-500/10', text: 'text-blue-500', hoverBg: 'group-hover:bg-blue-500', hoverText: 'group-hover:text-white', arrow: 'group-hover:text-blue-500' },
    'amber-500': { bg: 'bg-amber-500/10', text: 'text-amber-500', hoverBg: 'group-hover:bg-amber-500', hoverText: 'group-hover:text-white', arrow: 'group-hover:text-amber-500' },
    'rose-500': { bg: 'bg-rose-500/10', text: 'text-rose-500', hoverBg: 'group-hover:bg-rose-500', hoverText: 'group-hover:text-white', arrow: 'group-hover:text-rose-500' },
    'emerald-500': { bg: 'bg-emerald-500/10', text: 'text-emerald-500', hoverBg: 'group-hover:bg-emerald-500', hoverText: 'group-hover:text-white', arrow: 'group-hover:text-emerald-500' },
};

const kpiColorMap = {
    'primary': { icon: 'bg-primary/10 text-primary', change: 'text-emerald-500' },
    'blue-500': { icon: 'bg-blue-400/10 text-blue-500', change: 'text-blue-500' },
    'amber-500': { icon: 'bg-amber-400/10 text-amber-500', change: 'text-amber-500' },
    'rose-500': { icon: 'bg-rose-400/10 text-rose-500', change: 'text-rose-500' },
    'emerald-500': { icon: 'bg-emerald-400/10 text-emerald-500', change: 'text-emerald-500' },
};

function OverviewPage() {
    const [chartPeriod, setChartPeriod] = useState('monthly');
    const { data: propertiesData, isLoading: propsLoading } = useMyProperties();
    const { data: agreementsData, isLoading: agreementsLoading } = useOwnerAgreements({ status: 'pending' });
    const { data: appointmentsData, isLoading: appointmentsLoading } = useAppointments({ status: 'PENDING' });
    const { data: profileData } = useProfile();

    const properties = propertiesData?.data || [];
    const pendingAgreements = agreementsData?.items || [];
    const pendingAppointments = appointmentsData || [];
    const user = profileData?.data;

    const kpiData = [
        { label: 'Active Listings', value: String(properties.filter(p => p.status === 'AVAILABLE').length), change: '+2', changeType: 'up', icon: Building2, color: 'primary', borderColor: 'border-primary' },
        { label: 'Total Views', value: properties.reduce((sum, p) => sum + (p.viewsCount || 0), 0).toLocaleString(), change: '+18%', changeType: 'up', icon: Eye, color: 'blue-500', borderColor: 'border-blue-400' },
        { label: 'Appointments', value: String(pendingAppointments.length), sub: 'This month', icon: CalendarDays, color: 'amber-500', borderColor: 'border-amber-400' },
        { label: 'Pending Agreements', value: String(pendingAgreements.length), change: pendingAgreements.length > 0 ? 'Action Needed' : undefined, changeType: 'alert', icon: FileText, color: 'rose-500', borderColor: 'border-rose-400' },
        { label: 'Revenue', value: '285K ETB', change: '+12%', changeType: 'up', sub: 'This month', icon: DollarSign, color: 'emerald-500', borderColor: 'border-emerald-400' },
    ];

    const topProperties = properties
        .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
        .slice(0, 4)
        .map(p => ({
            name: typeof p.title === 'string' ? p.title : p.title?.en || 'Property',
            location: p.address || 'Unknown',
            views: String(p.viewsCount || 0),
            inquiries: 0,
            status: p.status,
            statusColor: p.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' : p.status === 'RENTED' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700',
            revenue: `${p.price?.value || 0} ${p.price?.currency || 'ETB'}`,
            img: p.images?.[0] || '',
        }));

    const visibleActivities = [];

    if (propsLoading || agreementsLoading || appointmentsLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto space-y-8 p-8">
            {/* Page Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground">Welcome back, {user?.firstName || 'Owner'} 👋</h2>
                    <p className="text-muted-foreground mt-1 font-medium">Here's what's happening with your properties today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <Link to="/owner/properties">
                        <Button className="gap-2 shadow-sm"><Plus size={16} /> Add Property</Button>
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {kpiData.map((kpi) => {
                    const Icon = kpi.icon;
                    const colors = kpiColorMap[kpi.color];
                    return (
                        <Card key={kpi.label} className={`border-0 border-l-4 ${kpi.borderColor} group hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                            <CardHeader className="flex justify-between pb-2">
                                <span className={`rounded-lg p-2 ${colors.icon} transition-transform group-hover:scale-110`}>
                                    <Icon size={20} />
                                </span>
                                {kpi.change && (
                                    <span className={`flex items-center gap-1 text-xs font-bold ${kpi.changeType === 'alert' ? 'text-rose-500 animate-pulse' : colors.change}`}>
                                        {kpi.changeType === 'up' && <TrendingUp size={14} />}
                                        {kpi.change}
                                    </span>
                                )}
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">{kpi.label}</p>
                                <h3 className="mt-1 text-2xl font-black">{kpi.value}</h3>
                                {kpi.sub && <p className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</p>}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    const colors = colorMap[action.color];
                    return (
                        <Link key={action.label} to={`/owner/${action.to}`}>
                            <button className="w-full group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} ${colors.hoverBg} ${colors.hoverText} transition-all duration-300`}>
                                    <Icon size={22} />
                                </div>
                                <div className="text-left flex-1">
                                    <p className="font-bold text-foreground">{action.label}</p>
                                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                                </div>
                                <ArrowRight size={16} className={`text-muted-foreground ${colors.arrow} transition-all duration-300 group-hover:translate-x-1`} />
                            </button>
                        </Link>
                    );
                })}
            </div>

            {/* Revenue Chart & Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-bold text-foreground">Revenue Overview</h4>
                            <div className="mt-1 flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <span className="size-2 rounded-full bg-primary"></span>
                                    <span className="text-muted-foreground text-xs font-medium">This Period</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="size-2 rounded-full border border-dashed border-muted-foreground"></span>
                                    <span className="text-muted-foreground text-xs font-medium">Previous</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
                            {['monthly', 'weekly'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setChartPeriod(p)}
                                    className={`rounded-md px-3 py-1.5 text-xs font-bold capitalize transition-all ${chartPeriod === p ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-56">
                        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 250">
                            <defs>
                                <linearGradient id="ownerRevenueGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="oklch(0.62 0.11 55)" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="oklch(0.62 0.11 55)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,200 C100,190 200,210 300,170 C400,130 500,150 600,110 C700,70 800,90 900,50 L1000,30" fill="none" opacity="0.4" stroke="oklch(0.5 0.04 60)" strokeDasharray="6,6" strokeWidth="2" />
                            <path d="M0,180 C100,170 200,190 300,140 C400,90 500,120 600,70 C700,30 800,50 900,20 L1000,10 L1000,250 L0,250 Z" fill="url(#ownerRevenueGradient)" />
                            <path d="M0,180 C100,170 200,190 300,140 C400,90 500,120 600,70 C700,30 800,50 900,20 L1000,10" fill="none" stroke="oklch(0.62 0.11 55)" strokeLinecap="round" strokeWidth="3" />
                            {[{ x: 0, y: 180 }, { x: 166, y: 170 }, { x: 333, y: 190 }, { x: 500, y: 140 }, { x: 600, y: 70 }, { x: 800, y: 50 }, { x: 1000, y: 10 }].map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="4" fill="oklch(0.62 0.11 55)" stroke="#fff" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all" />
                            ))}
                        </svg>
                        <div className="mt-4 flex justify-between px-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            {(chartPeriod === 'monthly' ? ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']).map(m => <span key={m}>{m}</span>)}
                        </div>
                    </div>

                    {/* Revenue Summary Row */}
                    <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Total Revenue</p>
                            <p className="text-lg font-black text-foreground mt-0.5">1.47M ETB</p>
                            <p className="text-xs text-emerald-500 font-bold flex items-center gap-0.5 mt-0.5"><ArrowUpRight size={12} /> +15% vs last period</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Avg per Property</p>
                            <p className="text-lg font-black text-foreground mt-0.5">122K ETB</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Pending Payments</p>
                            <p className="text-lg font-black text-amber-600 mt-0.5">85K ETB</p>
                            <p className="text-xs text-muted-foreground mt-0.5">1 awaiting confirmation</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                        <h4 className="text-lg font-bold text-foreground">Recent Activity</h4>
                        <Link to="/owner/notifications" className="text-xs text-primary font-bold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto">
                        {visibleActivities.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center py-4">No recent activity</p>
                        ) : visibleActivities.map((a) => {
                            const Icon = a.icon;
                            return (
                                <div key={a.id} className="flex items-start gap-3 group cursor-pointer rounded-lg p-1.5 -m-1.5 hover:bg-muted/30 transition-colors">
                                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.bgColor} transition-transform group-hover:scale-110`}>
                                        <Icon size={14} className={a.iconColor} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-foreground">{a.title}</p>
                                        <p className="text-xs text-muted-foreground truncate">{a.desc}</p>
                                        <p className="text-[10px] text-muted-foreground/60 mt-0.5">{a.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Top Performing Properties */}
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-border p-6">
                    <div>
                        <h4 className="text-lg font-bold text-foreground">Top Performing Properties</h4>
                        <p className="text-sm text-muted-foreground">Your most viewed listings this month</p>
                    </div>
                    <Link to="/owner/properties">
                        <Button variant="outline" className="gap-1 text-sm font-bold">View All <ArrowRight size={14} /></Button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                <th className="px-6 py-3.5 text-left">Property</th>
                                <th className="px-6 py-3.5 text-left">Views</th>
                                <th className="px-6 py-3.5 text-left">Inquiries</th>
                                <th className="px-6 py-3.5 text-left">Status</th>
                                <th className="px-6 py-3.5 text-left">Rent / Month</th>
                                <th className="px-6 py-3.5 border-l border-border/50 text-center w-20">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {topProperties.map((p, i) => (
                                <tr key={i} className="transition-colors hover:bg-muted/20">
                                    <td className="px-6 py-4">
                                        <Link to="/owner/property-detail" className="flex items-center gap-3">
                                            <img src={p.img} alt={p.name} className="size-11 rounded-lg object-cover" />
                                            <div>
                                                <p className="text-sm font-bold text-foreground hover:text-primary transition-colors">{p.name}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={10} /> {p.location}</p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-sm">{p.views}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-sm">{p.inquiries}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${p.statusColor}`}>{p.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-primary">{p.revenue}</td>
                                    <td className="px-6 py-4 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground outline-none">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem asChild>
                                                    <Link to="/owner/property-detail" className="flex items-center gap-2 cursor-pointer">
                                                        <Eye size={14} /> View Details
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link to="/owner/analytics" className="flex items-center gap-2 cursor-pointer">
                                                        <BarChart3 size={14} /> View Analytics
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OverviewPage;
