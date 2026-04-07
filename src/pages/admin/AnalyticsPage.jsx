import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Users,
    Home,
    Handshake,
    TrendingUp,
    TrendingDown,
    DollarSign,
    ClipboardCheck,
    AlertTriangle,
    BarChart3,
    PieChart,
    Activity,
} from 'lucide-react';

const statCards = [
    {
        title: 'Total Users',
        value: '12,450',
        change: '+12%',
        trend: 'up',
        breakdown: 'Renters: 9,820 • Owners: 2,480 • Admins: 150',
        icon: Users,
        borderColor: 'border-blue-400',
        iconBg: 'bg-blue-50 text-blue-600',
    },
    {
        title: 'Active Listings',
        value: '3,820',
        change: '+8%',
        trend: 'up',
        breakdown: 'Available: 2,640 • Pending: 342 • Rented: 838',
        icon: Home,
        borderColor: 'border-emerald-400',
        iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
        title: 'Active Agreements',
        value: '1,284',
        change: '+15%',
        trend: 'up',
        breakdown: 'Active: 890 • Pending: 248 • Draft: 146',
        icon: Handshake,
        borderColor: 'border-primary',
        iconBg: 'bg-primary/10 text-primary',
    },
    {
        title: 'Monthly Revenue',
        value: '₿ 4.2M ETB',
        change: '+22%',
        trend: 'up',
        breakdown: 'Avg Rent: 45,000 ETB • Top: 120,000 ETB',
        icon: DollarSign,
        borderColor: 'border-amber-400',
        iconBg: 'bg-amber-50 text-amber-600',
    },
    {
        title: 'Pending Actions',
        value: '68',
        change: '-5%',
        trend: 'down',
        breakdown: 'Verifications: 24 • Reports: 18 • Properties: 26',
        icon: ClipboardCheck,
        borderColor: 'border-rose-400',
        iconBg: 'bg-rose-50 text-rose-600',
    },
    {
        title: 'Reports Filed',
        value: '124',
        change: '+3%',
        trend: 'up',
        breakdown: 'Fraud: 42 • False Ad: 38 • Other: 44',
        icon: AlertTriangle,
        borderColor: 'border-orange-400',
        iconBg: 'bg-orange-50 text-orange-600',
    },
];

const propertyByType = [
    { type: 'Apartment', count: 1420, percentage: 37, color: '#A47551' },
    { type: 'Villa', count: 840, percentage: 22, color: '#D97745' },
    { type: 'Condominium', count: 680, percentage: 18, color: '#E8A87C' },
    { type: 'Service', count: 520, percentage: 14, color: '#85CDCA' },
    { type: 'Compound', count: 360, percentage: 9, color: '#C38D5F' },
];

const agreementsByStatus = [
    { status: 'Active', count: 890, color: 'bg-emerald-500' },
    { status: 'Pending Renter', count: 168, color: 'bg-amber-500' },
    { status: 'Pending Owner', count: 80, color: 'bg-orange-500' },
    { status: 'Draft', count: 146, color: 'bg-slate-400' },
    { status: 'Expired', count: 92, color: 'bg-rose-400' },
    { status: 'Terminated', count: 38, color: 'bg-red-600' },
];

const listingsByCity = [
    { city: 'Addis Ababa (Bole)', count: 1420, percentage: 85 },
    { city: 'Addis Ababa (Kazanchis)', count: 680, percentage: 65 },
    { city: 'Addis Ababa (CMC)', count: 520, percentage: 50 },
    { city: 'Addis Ababa (Megenagna)', count: 420, percentage: 42 },
    { city: 'Hawassa', count: 180, percentage: 18 },
    { city: 'Bahir Dar', count: 120, percentage: 12 },
];

const monthlyRegistrations = [
    { month: 'Oct', renters: 820, owners: 180 },
    { month: 'Nov', renters: 940, owners: 210 },
    { month: 'Dec', renters: 760, owners: 160 },
    { month: 'Jan', renters: 1100, owners: 280 },
    { month: 'Feb', renters: 1240, owners: 320 },
    { month: 'Mar', renters: 1380, owners: 360 },
];

function AnalyticsPage() {
    const maxRegistrations = 1800;

    return (
        <div className="space-y-8 p-8">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Platform Analytics</h2>
                <p className="text-muted-foreground mt-1">
                    Comprehensive statistics and insights across the Smart House Rental platform.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card) => {
                    const IconComp = card.icon;
                    return (
                        <Card key={card.title} className={`border-0 border-l-4 ${card.borderColor}`}>
                            <CardContent className="p-5">
                                <div className="mb-3 flex items-center justify-between">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                                        <IconComp size={20} />
                                    </div>
                                    <span
                                        className={`flex items-center gap-1 text-xs font-bold ${card.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                                            }`}
                                    >
                                        {card.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {card.change}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                                    {card.title}
                                </p>
                                <p className="mt-1 text-2xl font-extrabold">{card.value}</p>
                                <p className="text-muted-foreground mt-2 text-[11px]">{card.breakdown}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* User Registrations Chart */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <BarChart3 size={18} className="text-primary" />
                            <h4 className="text-base font-bold">Monthly User Registrations</h4>
                        </div>
                        <div className="mt-2 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <span className="bg-primary h-2.5 w-2.5 rounded-full" />
                                <span className="text-muted-foreground text-xs font-medium">Renters</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                <span className="text-muted-foreground text-xs font-medium">Owners</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-3" style={{ height: 200 }}>
                            {monthlyRegistrations.map((item) => (
                                <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
                                    <div className="flex w-full items-end justify-center gap-1" style={{ height: 180 }}>
                                        <div
                                            className="bg-primary/80 w-5 rounded-t-md transition-all hover:bg-primary"
                                            style={{
                                                height: `${(item.renters / maxRegistrations) * 100}%`,
                                            }}
                                        />
                                        <div
                                            className="w-5 rounded-t-md bg-amber-400 transition-all hover:bg-amber-500"
                                            style={{
                                                height: `${(item.owners / maxRegistrations) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-muted-foreground text-[11px] font-bold">{item.month}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Property by Type */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <PieChart size={18} className="text-primary" />
                            <h4 className="text-base font-bold">Listings by Property Type</h4>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-8">
                            {/* Simple donut visualization */}
                            <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
                                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
                                    {propertyByType.reduce((acc, item, index) => {
                                        const offset = acc.offset;
                                        const circumference = 2 * Math.PI * 48;
                                        const dashLength = (item.percentage / 100) * circumference;
                                        acc.elements.push(
                                            <circle
                                                key={item.type}
                                                cx="60"
                                                cy="60"
                                                r="48"
                                                fill="transparent"
                                                stroke={item.color}
                                                strokeWidth="16"
                                                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                                                strokeDashoffset={-offset}
                                                strokeLinecap="butt"
                                            />
                                        );
                                        acc.offset += dashLength;
                                        return acc;
                                    }, { elements: [], offset: 0 }).elements}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl font-black">3,820</span>
                                    <span className="text-muted-foreground text-[10px] font-medium">Total</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-2.5">
                                {propertyByType.map((item) => (
                                    <div key={item.type} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="h-3 w-3 rounded-sm"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="font-medium">{item.type}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-muted-foreground text-xs">{item.count}</span>
                                            <span className="w-8 text-right text-xs font-bold">{item.percentage}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Agreements by Status */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <Activity size={18} className="text-primary" />
                            <h4 className="text-base font-bold">Agreements by Status</h4>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {agreementsByStatus.map((item) => {
                                const maxCount = Math.max(...agreementsByStatus.map((a) => a.count));
                                return (
                                    <div key={item.status} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{item.status}</span>
                                            <span className="font-bold">{item.count}</span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className={`h-full rounded-full ${item.color}`}
                                                style={{ width: `${(item.count / maxCount) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Geographic Distribution */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <Home size={18} className="text-primary" />
                            <h4 className="text-base font-bold">Listings by Location</h4>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {listingsByCity.map((item) => (
                                <div key={item.city} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{item.city}</span>
                                        <span className="text-muted-foreground">{item.count} listings</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="bg-primary h-full rounded-full"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AnalyticsPage;
