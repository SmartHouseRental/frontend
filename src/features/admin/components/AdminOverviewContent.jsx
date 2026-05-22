import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Home,
    TrendingUp,
    TrendingDown,
    Handshake,
    Users,
    MoreVertical,
    Eye,
    CheckCircle2,
    XCircle,
    ClipboardCheck,
    AlertTriangle,
    FileText,
    UserPlus,
    Activity,
    AlertCircle,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useAdminOverview } from '../hooks/useAdminOverview';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

/* ───── activity icon mapping by audit event type ───── */
const ACTIVITY_ICON_MAP = {
    OWNER_REGISTRATION: {
        icon: UserPlus,
        color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-400',
    },
    ADMIN_PROPERTY_APPROVED: {
        icon: Home,
        color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 dark:text-emerald-400',
    },
    ADMIN_PROPERTY_REJECTED: {
        icon: XCircle,
        color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/40 dark:text-rose-400',
    },
    AGREEMENT_ACTIVATED: {
        icon: Handshake,
        color: 'text-primary bg-primary/10 dark:bg-primary/20 dark:text-primary-foreground',
    },
    AGREEMENT_TERMINATED: {
        icon: AlertTriangle,
        color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/40 dark:text-rose-400',
    },
    USER_STATUS_UPDATE: {
        icon: Users,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/40 dark:text-amber-400',
    },
};
const DEFAULT_ACTIVITY_ICON = {
    icon: FileText,
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/40 dark:text-amber-400',
};

function getActivityIcon(eventType) {
    return ACTIVITY_ICON_MAP[eventType] || DEFAULT_ACTIVITY_ICON;
}

function formatNumber(n) {
    if (n == null) return '0';
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
    return String(n);
}

function TrendBadge({ value, label }) {
    if (value == null) return null;
    const isUp = value >= 0;
    const Icon = isUp ? TrendingUp : TrendingDown;
    const color = label ? 'text-amber-600' : isUp ? 'text-emerald-500' : 'text-rose-500';
    return (
        <span className={`flex items-center gap-1 text-xs font-bold ${color}`}>
            {label ? label : <><Icon size={14} />{isUp ? '+' : ''}{Math.round(value)}%</>}
        </span>
    );
}

/* ───── skeleton loader ───── */
function OverviewSkeleton() {
    return (
        <div className="space-y-8 p-8 animate-pulse">
            <div className="h-8 w-60 rounded bg-muted" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-32 rounded-2xl bg-muted" />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-2xl bg-muted h-80 lg:col-span-2" />
                <div className="rounded-2xl bg-muted h-80" />
            </div>
            <div className="rounded-2xl bg-muted h-60" />
        </div>
    );
}

/* ───── custom tooltip component for Recharts ───── */
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-xs">
                <p className="font-bold mb-1 text-foreground">{label}</p>
                <div className="space-y-1">
                    <p className="flex items-center gap-2 text-primary font-semibold">
                        <span className="size-2 rounded-full bg-primary" />
                        Current: <span className="text-foreground">{payload[0].value}</span>
                    </p>
                    {payload[1] && (
                        <p className="flex items-center gap-2 text-muted-foreground font-semibold">
                            <span className="size-2 rounded-full border border-dashed border-muted-foreground" />
                            Previous: <span className="text-foreground">{payload[1].value}</span>
                        </p>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

/* ───── User Growth Recharts chart ───── */
function UserGrowthChart({ data, range, onRangeChange }) {
    if (!data) return null;
    const { labels = [], currentPeriod = [], previousPeriod = [] } = data;

    const chartData = labels.map((label, index) => ({
        name: label,
        current: currentPeriod[index] || 0,
        previous: previousPeriod[index] || 0,
    }));

    return (
        <div className="shadow-soft rounded-2xl border border-border bg-card p-6 lg:col-span-2 flex flex-col justify-between">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-bold text-foreground">User Growth</h4>
                    <div className="mt-1 flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="bg-primary size-2 rounded-full" />
                            <span className="text-muted-foreground text-xs font-medium">Current Period</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full border border-dashed border-slate-400" />
                            <span className="text-muted-foreground text-xs font-medium">Previous Period</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onRangeChange('monthly')}
                        className={`rounded-md px-3 py-1.5 text-xs font-bold shadow-sm transition-all ${range === 'monthly' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => onRangeChange('weekly')}
                        className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${range === 'weekly' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Weekly
                    </button>
                </div>
            </div>
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={11}
                            fontWeight="bold"
                            dy={10}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={11}
                            fontWeight="bold"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="previous"
                            stroke="hsl(var(--muted-foreground))"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fill="none"
                            opacity={0.4}
                            name="Previous Period"
                        />
                        <Area
                            type="monotone"
                            dataKey="current"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorCurrent)"
                            name="Current Period"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

/* ───── main component ───── */
export default function AdminOverviewContent() {
    const navigate = useNavigate();
    const [range, setRange] = useState('monthly');
    const { data: res, isLoading, isError, error } = useAdminOverview(range);

    if (isLoading) return <OverviewSkeleton />;
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 p-16 text-center">
                <AlertCircle className="size-12 text-destructive" />
                <h3 className="text-lg font-bold">Failed to load overview</h3>
                <p className="text-muted-foreground text-sm">{error?.userMessage || error?.message || 'Something went wrong'}</p>
            </div>
        );
    }

    const overview = res?.data;
    if (!overview) return null;

    const { stats, userGrowth, recentActivity, listingsByArea, paymentPerformance, recentProperties, lastUpdated } = overview;

    const statCards = [
        {
            label: 'Total Users',
            value: stats?.totalUsers?.value,
            trend: stats?.totalUsers?.trendPercent,
            icon: Users,
            borderColor: 'border-blue-400',
            iconBg: 'bg-blue-400/10',
            iconColor: 'text-accent',
        },
        {
            label: 'Active Listings',
            value: stats?.activeListings?.value,
            trend: stats?.activeListings?.trendPercent,
            icon: Home,
            borderColor: 'border-accent',
            iconBg: 'bg-accent/10',
            iconColor: 'text-accent',
        },
        {
            label: 'Pending Verifications',
            value: stats?.pendingVerifications?.value,
            trendLabel: stats?.pendingVerifications?.actionNeeded ? 'Action Needed' : null,
            icon: ClipboardCheck,
            borderColor: 'border-amber-400',
            iconBg: 'bg-amber-400/10',
            iconColor: 'text-amber-500',
            clickPath: '/admin/pending-verifications',
        },
        {
            label: 'Active Agreements',
            value: stats?.activeAgreements?.value,
            trend: stats?.activeAgreements?.trendPercent,
            icon: Handshake,
            borderColor: 'border-emerald-400',
            iconBg: 'bg-accent/10',
            iconColor: 'text-accent',
        },
        {
            label: 'Total Reports',
            value: stats?.totalReport?.value,
            trend: stats?.totalReport?.trendPercent,
            icon: AlertTriangle,
            borderColor: 'border-rose-400',
            iconBg: 'bg-rose-400/10',
            iconColor: 'text-rose-500',
        },
    ];

    const relativeUpdated = lastUpdated
        ? `Updated ${new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : '';

    return (
        <div className="space-y-8 p-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground">Dashboard Overview</h2>
                    <p className="text-muted-foreground mt-1 font-medium">
                        Real-time platform metrics and system control center.
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                    <Activity size={14} />
                    <span>{relativeUpdated}</span>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                {statCards.map((card) => {
                    const IconComp = card.icon;
                    return (
                        <Card
                            key={card.label}
                            className={`border-0 border-l-4 ${card.borderColor} ${card.clickPath ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}`}
                            onClick={card.clickPath ? () => navigate(card.clickPath) : undefined}
                        >
                            <CardHeader className="flex justify-between">
                                <span className={`${card.iconBg} ${card.iconColor} rounded-lg p-2`}>
                                    <IconComp />
                                </span>
                                <TrendBadge value={card.trend} label={card.trendLabel} />
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                                    {card.label}
                                </p>
                                <h3 className="mt-1 text-3xl font-bold">{formatNumber(card.value)}</h3>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Chart + Activity */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <UserGrowthChart data={userGrowth} range={range} onRangeChange={setRange} />

                {/* Recent Activity Feed */}
                <div className="shadow-soft rounded-2xl border border-border bg-card p-6 flex flex-col">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-lg font-bold text-foreground">Recent Activity</h4>
                        <button
                            onClick={() => navigate('/admin/audit-logs')}
                            className="text-primary text-xs font-bold hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto">
                        {recentActivity && recentActivity.length > 0 ? (
                            recentActivity.map((item) => {
                                const iconMeta = getActivityIcon(item.type);
                                const IconComp = iconMeta.icon;
                                return (
                                    <div key={item.id} className="flex gap-3 items-start group rounded-lg p-1.5 -m-1.5 hover:bg-muted/30 transition-colors">
                                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconMeta.color}`}>
                                            <IconComp size={14} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-foreground">{item.text}</p>
                                            <p className="text-muted-foreground mt-0.5 truncate text-xs">{item.detail}</p>
                                            <p className="text-muted-foreground/60 mt-1 text-[10px]">{item.time}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-muted-foreground text-sm text-center py-8">No recent activity</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Listings By Area + Payment Performance */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Listings by Area */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                            Listings by Area
                        </h4>
                    </div>
                    <div className="space-y-3">
                        {listingsByArea && listingsByArea.length > 0 ? (
                            listingsByArea.map((item) => (
                                <div key={item.area} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span>{item.area}</span>
                                        <span>{formatNumber(item.count)}</span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                        <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${item.percentage}%` }} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground text-sm text-center py-4">No area data</p>
                        )}
                    </div>
                </div>

                {/* Payment Performance */}
                <div className="flex items-center gap-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="relative flex size-20 shrink-0 items-center justify-center">
                        <svg className="size-full -rotate-90 transform">
                            <circle cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6" className="text-muted/50" />
                            <circle
                                cx="40" cy="40" fill="transparent" r="34"
                                stroke="currentColor"
                                strokeDasharray="213.6"
                                strokeDashoffset={213.6 - (213.6 * (paymentPerformance?.successRate ?? 0)) / 100}
                                strokeLinecap="round" strokeWidth="6"
                                className="text-accent"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-sm font-black text-foreground">{paymentPerformance?.successRate ?? 0}%</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-muted-foreground mb-2 text-xs font-bold tracking-wider uppercase">
                            Payment Success
                        </h4>
                        <div className="flex flex-col gap-1">
                            <p className="text-lg leading-tight font-bold">
                                {formatNumber(paymentPerformance?.totalCollectionAmount)} {paymentPerformance?.currency || 'ETB'}
                            </p>
                            <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                                <CheckCircle2 size={12} />
                                {paymentPerformance?.label || 'Collection'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recently Submitted Properties */}
            <div className="shadow-soft overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border p-6">
                    <div>
                        <h4 className="text-lg font-bold text-foreground">Recently Submitted Properties</h4>
                        <p className="text-muted-foreground text-sm">
                            Review new listings awaiting platform approval.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/properties')}
                        className="text-primary rounded-lg border border-border px-4 py-2 text-sm font-bold transition-colors hover:bg-muted"
                    >
                        View Full Queue
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                <th className="px-6 py-4">Preview</th>
                                <th className="px-6 py-4">Property Name</th>
                                <th className="px-6 py-4">Owner</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date Submitted</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentProperties && recentProperties.length > 0 ? (
                                recentProperties.map((property) => (
                                    <tr
                                        key={property.id}
                                        className="cursor-pointer transition-colors hover:bg-muted/20"
                                        onClick={() => navigate(`/admin/properties/${property.id}`)}
                                    >
                                        <td className="px-6 py-4">
                                            <div
                                                className="size-14 rounded-lg border border-slate-200 bg-slate-100 bg-cover bg-center dark:border-slate-700 dark:bg-slate-800"
                                                style={property.image ? { backgroundImage: `url('${property.image}')` } : undefined}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold">{property.name}</p>
                                            <p className="text-muted-foreground text-xs">ID: {property.id?.slice(0, 12)}…</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="size-6 rounded-full bg-slate-200 bg-cover bg-center dark:bg-slate-700"
                                                    style={property.ownerAvatar ? { backgroundImage: `url('${property.ownerAvatar}')` } : undefined}
                                                />
                                                <span className="text-sm font-medium">{property.owner}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {typeof property.location === 'object'
                                                ? property.location?.en || property.location?.am || '—'
                                                : property.location || '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${property.statusStyle || 'bg-slate-100 text-slate-700'}`}>
                                                {property.statusLabel || property.status}
                                            </span>
                                        </td>
                                        <td className="text-muted-foreground px-6 py-4 text-sm">
                                            {property.dateSubmitted ? new Date(property.dateSubmitted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/admin/properties/${property.id}`);
                                                        }}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>Review Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                                        <span>Approve Property</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        <span>Reject Property</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground text-sm">
                                        No pending properties to review.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
