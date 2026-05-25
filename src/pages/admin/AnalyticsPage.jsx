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
import { useTranslation } from 'react-i18next';
import { useAdminAnalytics } from '@/features/admin/hooks/useAdmin';
import CardSkeleton from '@/components/CardSkeleton';
import ErrorState from '@/components/ErrorState';

function AnalyticsPage() {
    const { t } = useTranslation();
    const { data, isLoading, isError, refetch } = useAdminAnalytics({ range: '30d' });

    const statCards = [
      {
        title: t('adminAnalytics.cards.totalUsers'),
        value: data?.users?.total ?? 0,
        change: '',
        trend: 'up',
        breakdown: t('adminAnalytics.breakdowns.users', {
          renters: data?.users?.renters ?? 0,
          owners: data?.users?.owners ?? 0,
          verifiedOwners: data?.users?.verifiedOwners ?? 0,
        }),
        icon: Users,
        borderColor: 'border-blue-400',
        iconBg: 'bg-blue-50 text-blue-600',
      },
      {
        title: t('adminAnalytics.cards.activeListings'),
        value: data?.properties?.available ?? 0,
        change: '',
        trend: 'up',
        breakdown: t('adminAnalytics.breakdowns.properties', {
          available: data?.properties?.available ?? 0,
          pending: data?.properties?.pending ?? 0,
          rented: data?.properties?.rented ?? 0,
        }),
        icon: Home,
        borderColor: 'border-emerald-400',
        iconBg: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: t('adminAnalytics.cards.appointments'),
        value: data?.appointments?.total ?? 0,
        change: '',
        trend: 'up',
        breakdown: t('adminAnalytics.breakdowns.appointments', {
          pending: data?.appointments?.pending ?? 0,
          accepted: data?.appointments?.accepted ?? 0,
        }),
        icon: Handshake,
        borderColor: 'border-primary',
        iconBg: 'bg-primary/10 text-primary',
      },
      {
        title: t('adminAnalytics.cards.messages'),
        value: data?.engagement?.messages ?? 0,
        change: '',
        trend: 'up',
        breakdown: t('adminAnalytics.breakdowns.messages', {
          conversations: data?.engagement?.conversations ?? 0,
          newMessagesInRange: data?.engagement?.newMessagesInRange ?? 0,
        }),
        icon: DollarSign,
        borderColor: 'border-amber-400',
        iconBg: 'bg-amber-50 text-amber-600',
      },
      {
        title: t('adminAnalytics.cards.unreadNotifications'),
        value: data?.notifications?.unread ?? 0,
        change: '',
        trend: 'down',
        breakdown: t('adminAnalytics.breakdowns.notifications', {
          total: data?.notifications?.total ?? 0,
        }),
        icon: ClipboardCheck,
        borderColor: 'border-rose-400',
        iconBg: 'bg-rose-50 text-rose-600',
      },
      {
        title: t('adminAnalytics.cards.auditLogs'),
        value: data?.audit?.total ?? 0,
        change: '',
        trend: 'up',
        breakdown: t('adminAnalytics.breakdowns.auditLogs', {
          newInRange: data?.audit?.newInRange ?? 0,
        }),
        icon: AlertTriangle,
        borderColor: 'border-orange-400',
        iconBg: 'bg-orange-50 text-orange-600',
      },
    ];

    return (
        <div className="space-y-8 p-8">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight">{t('adminAnalytics.title')}</h2>
                <p className="text-muted-foreground mt-1">
                    {t('adminAnalytics.subtitle')}
                </p>
            </div>

            {isLoading ? (
              <CardSkeleton count={6} gridCols="lg:grid-cols-3" />
            ) : isError ? (
              <ErrorState
                title={t('adminAnalytics.errorTitle')}
                message={t('adminAnalytics.errorFallback')}
                onRetry={refetch}
                retryLabel={t('tryAgain')}
              />
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
                        <h4 className="text-base font-bold">{t('adminAnalytics.trendCharts.title')}</h4>
                    </div>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2 text-sm">
                    <p>
                        {t('adminAnalytics.trendCharts.description', {
                            endpoint: 'GET /admin/analytics',
                        })}
                    </p>
                    <p>
                        {t('adminAnalytics.trendCharts.docs', {
                            path: 'docs/ADMIN_BACKEND_CLARIFICATIONS.md',
                        })}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default AnalyticsPage;
