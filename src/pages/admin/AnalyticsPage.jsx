import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Users,
    Home,
    Handshake,
    TrendingUp,
    DollarSign,
    ClipboardCheck,
    AlertTriangle,
    BarChart3,
} from 'lucide-react';
import { useAdminAnalytics } from '@/features/admin/hooks/useAdmin';
import CardSkeleton from '@/components/CardSkeleton';
import ErrorState from '@/components/ErrorState';

function AnalyticsPage() {
    const { data, isLoading, isError, refetch } = useAdminAnalytics({ range: '30d' });

    const statCards = [
      {
        title: 'Total Users',
        value: data?.users?.total ?? 0,
        change: '',
        trend: 'up',
        breakdown: `Renters: ${data?.users?.renters ?? 0} • Owners: ${data?.users?.owners ?? 0} • Verified Owners: ${data?.users?.verifiedOwners ?? 0}`,
        icon: Users,
        borderColor: 'border-blue-400',
        iconBg: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Active Listings',
        value: data?.properties?.available ?? 0,
        change: '',
        trend: 'up',
        breakdown: `Available: ${data?.properties?.available ?? 0} • Pending: ${data?.properties?.pending ?? 0} • Rented: ${data?.properties?.rented ?? 0}`,
        icon: Home,
        borderColor: 'border-emerald-400',
        iconBg: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'Appointments',
        value: data?.appointments?.total ?? 0,
        change: '',
        trend: 'up',
        breakdown: `Pending: ${data?.appointments?.pending ?? 0} • Accepted: ${data?.appointments?.accepted ?? 0}`,
        icon: Handshake,
        borderColor: 'border-primary',
        iconBg: 'bg-primary/10 text-primary',
      },
      {
        title: 'Messages',
        value: data?.engagement?.messages ?? 0,
        change: '',
        trend: 'up',
        breakdown: `Conversations: ${data?.engagement?.conversations ?? 0} • New In Range: ${data?.engagement?.newMessagesInRange ?? 0}`,
        icon: DollarSign,
        borderColor: 'border-amber-400',
        iconBg: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Unread Notifications',
        value: data?.notifications?.unread ?? 0,
        change: '',
        trend: 'down',
        breakdown: `Total notifications: ${data?.notifications?.total ?? 0}`,
        icon: ClipboardCheck,
        borderColor: 'border-rose-400',
        iconBg: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'Audit Logs',
        value: data?.audit?.total ?? 0,
        change: '',
        trend: 'up',
        breakdown: `New in range: ${data?.audit?.newInRange ?? 0}`,
        icon: AlertTriangle,
        borderColor: 'border-orange-400',
        iconBg: 'bg-orange-50 text-orange-600',
      },
    ];

    return (
        <div className="space-y-8 p-8">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Platform Analytics</h2>
                <p className="text-muted-foreground mt-1">
                    Comprehensive statistics and insights across the Smart House Rental platform.
                </p>
            </div>

            {/* Stat Cards */}
            {isLoading ? (
              <CardSkeleton count={6} gridCols="lg:grid-cols-3" />
            ) : isError ? (
              <ErrorState title="Failed to load analytics" onRetry={refetch} />
            ) : (
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
                                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                                      <TrendingUp size={14} />
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
            )}

            <Card className="border-dashed">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <BarChart3 size={18} className="text-primary" />
                        <h4 className="text-base font-bold">Trend charts</h4>
                    </div>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2 text-sm">
                    <p>
                        Registration and property-type breakdown charts are not returned by{' '}
                        <code className="text-xs">GET /admin/analytics</code>. Use the Dashboard User
                        Growth chart (<code className="text-xs">GET /admin/overview</code>) for
                        registration trends.
                    </p>
                    <p>
                        See <code className="text-xs">docs/ADMIN_BACKEND_CLARIFICATIONS.md</code> for
                        optional dedicated chart endpoints.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default AnalyticsPage;
