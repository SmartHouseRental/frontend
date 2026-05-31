import { lazy, Suspense, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { profileKeys } from '@/features/profile/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  KpiCard,
  AnalyticsCard,
  ActivityFeed,
  QuickActionCard,
  PageContainer,
  PeriodToggle,
  PropertyStatusChart,
} from '@/components/design-system';
import {
  Building2,
  Eye,
  CalendarDays,
  FileText,
  DollarSign,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  Handshake,
  Bell,
  MoreVertical,
  BarChart3,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import VerificationBanner from '@/components/VerificationBanner';
import ErrorState from '@/components/ErrorState';
import { SchemaWarningBanner } from '@/components/SchemaWarningBanner';
import { getApiErrorMessage, isSchemaSyncError } from '@/lib/apiErrors';
import { useOwnerOverview } from '../hooks/useOwnerOverview';
import { useTranslation } from 'react-i18next';

const OwnerRevenueChart = lazy(() =>
  import('./OwnerRevenueChart').then((m) => ({ default: m.OwnerRevenueChart }))
);
import { verificationStateFromOverview } from '../utils/verification';

const quickActionColors = {
  primary: 'primary',
  'blue-500': 'indigo',
  'amber-500': 'warning',
  'rose-500': 'danger',
};

const kpiAccents = {
  primary: 'primary',
  'blue-500': 'indigo',
  'amber-500': 'warning',
  'rose-500': 'danger',
  'emerald-500': 'success',
};

const activityIconMap = {
  appointment: { icon: CalendarDays, bgColor: 'bg-amber-100', iconColor: 'text-amber-600' },
  payment: { icon: DollarSign, bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  message: { icon: MessageCircle, bgColor: 'bg-[#F5F5F4]', iconColor: 'text-[#171717]' },
  system: { icon: Bell, bgColor: 'bg-slate-100', iconColor: 'text-slate-600' },
};

function formatCurrency(amount, currency = 'ETB') {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M ${currency}`;
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K ${currency}`;
  return `${amount.toLocaleString()} ${currency}`;
}

export function OwnerOverviewContent() {
  const { t, i18n } = useTranslation();
  const [chartPeriod, setChartPeriod] = useState('monthly');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const { data: overviewResponse, isLoading, isError, error, refetch } = useOwnerOverview(chartPeriod);
  const overview = overviewResponse?.data;
  const overviewPartial = overview?.partial === true;

  // Hydrate profile cache so Profile page does not refetch after visiting overview
  useEffect(() => {
    if (!overview?.profile) return;
    queryClient.setQueryData(profileKeys.details(), {
      status: 'success',
      data: {
        ...overview.profile,
        verification: overview.verification,
      },
    });
  }, [overview, queryClient]);

  const profile = overview?.profile;
  const verification = overview?.verification;
  const kpis = overview?.kpis;
  const revenue = overview?.revenue;
  const quickActionsMeta = overview?.quickActions;

  const docStatus = verification?.overallStatus || verification?.status;
  const hasDocuments = verification?.hasDocuments ?? false;
  const isVerified = profile?.isVerified || docStatus === 'approved' || docStatus === 'verified';

  const handleAddProperty = () => {
    if (!isVerified) {
      setShowVerificationModal(true);
    } else {
      navigate('/owner/add-property');
    }
  };

  const quickActions = [
    {
      label: t('owner.overview.quickActions.addProperty.title'),
      desc: t('owner.overview.quickActions.addProperty.desc'),
      icon: Plus,
      color: 'primary',
      to: 'properties',
      isAddProperty: true,
    },
    {
      label: t('owner.overview.quickActions.appointments.title'),
      desc: t('owner.overview.quickActions.appointments.desc', {
        count: quickActionsMeta?.pendingAppointments ?? 0,
      }),
      icon: CalendarDays,
      color: 'amber-500',
      to: 'appointments',
    },
    {
      label: t('owner.overview.quickActions.agreements.title'),
      desc:
        (quickActionsMeta?.pendingAgreements ?? 0) > 0
          ? t('owner.overview.quickActions.agreements.descPending')
          : t('owner.overview.quickActions.agreements.descDefault'),
      icon: Handshake,
      color: 'blue-500',
      to: 'agreements',
    },
    {
      label: t('owner.overview.quickActions.notifications.title'),
      desc: t('owner.overview.quickActions.notifications.desc', {
        count: quickActionsMeta?.unreadNotifications ?? 0,
      }),
      icon: Bell,
      color: 'rose-500',
      to: 'notifications',
    },
  ];

  const kpiData = kpis
    ? [
        {
          label: t('owner.overview.kpis.activeListings'),
          value: String(kpis.activeListings),
          icon: Building2,
          color: 'primary',
          borderColor: 'border-primary',
        },
        {
          label: t('owner.overview.kpis.totalViews'),
          value: kpis.totalViews.toLocaleString(),
          icon: Eye,
          color: 'blue-500',
          borderColor: 'border-blue-400',
        },
        {
          label: t('owner.overview.kpis.appointments'),
          value: String(kpis.pendingAppointments),
          sub: t('owner.overview.kpis.pending'),
          icon: CalendarDays,
          color: 'amber-500',
          borderColor: 'border-amber-400',
        },
        {
          label: t('owner.overview.kpis.pendingAgreements'),
          value: String(kpis.pendingAgreements),
          change: kpis.pendingAgreements > 0 ? t('owner.overview.kpis.actionNeeded') : undefined,
          changeType: kpis.pendingAgreements > 0 ? 'alert' : undefined,
          icon: FileText,
          color: 'rose-500',
          borderColor: 'border-rose-400',
        },
        {
          label: t('owner.overview.kpis.revenue'),
          value: formatCurrency(kpis.revenueThisMonth, kpis.revenueCurrency),
          sub: t('owner.overview.kpis.thisMonth'),
          icon: DollarSign,
          color: 'emerald-500',
          borderColor: 'border-emerald-400',
        },
      ]
    : [];

  const topProperties = overview?.topPerformingProperties ?? [];

  const propertyStatusData = (() => {
    const counts = { Available: 0, Rented: 0, Maintenance: 0, Unavailable: 0 };
    topProperties.forEach((p) => {
      const key = (p.status || 'Available').replace(/^\w/, (c) => c.toUpperCase());
      if (counts[key] !== undefined) counts[key] += 1;
    });
    if (kpis?.activeListings && topProperties.length === 0) {
      counts.Available = kpis.activeListings;
    }
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({
        name,
        value,
        color: { Available: '#22C55E', Rented: '#171717', Maintenance: '#eab308', Unavailable: '#737373' }[name],
      }));
  })();

  const visibleActivities = (overview?.recentActivity ?? []).map((a) => {
    const config = activityIconMap[a.type] || activityIconMap.system;
    return { ...a, ...config };
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError || !overview) {
    const errMsg = getApiErrorMessage(error, t('owner.overview.errors.failedLoadDashboard'));
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <ErrorState
          title={
            isSchemaSyncError(error)
              ? t('owner.overview.errors.temporarilyUnavailable')
              : t('owner.overview.errors.couldNotLoad')
          }
          message={
            isSchemaSyncError(error)
              ? t('owner.overview.errors.schemaSync')
              : errMsg
          }
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const layoutVerificationState = verificationStateFromOverview(overview);

  return (
    <PageContainer>
      <VerificationBanner verificationState={layoutVerificationState} />

      {overviewPartial && (
        <SchemaWarningBanner message={t('owner.overview.partialWarning')} />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            {t('owner.overview.welcome', {
              name: profile?.firstName || t('owner.overview.ownerFallback'),
            })}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {t('owner.overview.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border-border/60 bg-card text-muted-foreground hidden items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm lg:flex">
            <Clock size={14} />
            <span>
              {new Date().toLocaleDateString(i18n.resolvedLanguage || i18n.language || undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <Button onClick={handleAddProperty} className="gap-2 shadow-sm">
            <Plus size={16} /> {t('owner.overview.addProperty')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <KpiCard
              key={kpi.label}
              title={kpi.label}
              value={kpi.value}
              subtitle={kpi.sub}
              icon={Icon}
              accent={kpiAccents[kpi.color] || 'primary'}
              actionLabel={kpi.change}
              actionColor={kpi.changeType === 'alert' ? 'text-red-500 animate-pulse' : undefined}
              index={i}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action, i) => (
          <QuickActionCard
            key={action.label}
            label={action.label}
            desc={action.desc}
            icon={action.icon}
            color={quickActionColors[action.color] || 'primary'}
            to={action.isAddProperty ? undefined : `/owner/${action.to}`}
            onClick={action.isAddProperty ? handleAddProperty : undefined}
            index={i}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <AnalyticsCard
          className="xl:col-span-2"
          title={t('owner.overview.revenue.title')}
          subtitle={t('owner.overview.revenue.thisPeriod')}
          actions={
            <PeriodToggle
              periods={[
                { value: 'monthly', label: t('owner.overview.periods.monthly') },
                { value: 'weekly', label: t('owner.overview.periods.weekly') },
              ]}
              value={chartPeriod}
              onChange={setChartPeriod}
            />
          }
          contentClassName="space-y-6"
        >
          <div className="h-56 w-full">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="text-primary animate-spin" size={24} />
                </div>
              }
            >
              <OwnerRevenueChart
                data={revenue?.chart ?? []}
                currency={revenue?.currency ?? 'ETB'}
              />
            </Suspense>
          </div>
          <div className="border-border/60 grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                {t('owner.overview.revenue.totalRevenue')}
              </p>
              <p className="text-foreground mt-0.5 text-lg font-bold tabular-nums">
                {formatCurrency(revenue?.totalThisMonth ?? 0, revenue?.currency)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                {t('owner.overview.revenue.avgPerProperty')}
              </p>
              <p className="text-foreground mt-0.5 text-lg font-bold tabular-nums">
                {formatCurrency(revenue?.avgPerProperty ?? 0, revenue?.currency)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                {t('owner.overview.revenue.pendingPayments')}
              </p>
              <p className="mt-0.5 text-lg font-bold text-amber-600 tabular-nums">
                {formatCurrency(revenue?.pendingAmount ?? 0, revenue?.currency)}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {t('owner.overview.revenue.awaitingConfirmation', {
                  count: revenue?.pendingCount ?? 0,
                })}
              </p>
            </div>
          </div>
        </AnalyticsCard>

        <AnalyticsCard
          title={t('owner.overview.activity.title')}
          actions={
            <Link to="/owner/notifications" className="text-primary text-xs font-semibold hover:underline">
              {t('owner.overview.viewAll')}
            </Link>
          }
          contentClassName="max-h-80 overflow-y-auto"
        >
          <ActivityFeed
            items={visibleActivities}
            emptyMessage={t('owner.overview.activity.empty')}
          />
        </AnalyticsCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsCard
          title={t('owner.overview.propertyStatus', { defaultValue: 'Property Status' })}
          subtitle={t('owner.overview.propertyStatusDesc', { defaultValue: 'Distribution across your portfolio' })}
        >
          <PropertyStatusChart data={propertyStatusData} />
        </AnalyticsCard>

        <AnalyticsCard
          title={t('owner.overview.maintenance', { defaultValue: 'Pending Requests' })}
          subtitle={t('owner.overview.maintenanceDesc', { defaultValue: 'Appointments & agreements requiring action' })}
        >
          <div className="space-y-4">
            {[
              {
                label: t('owner.overview.kpis.appointments'),
                value: kpis?.pendingAppointments ?? 0,
                color: 'bg-amber-500',
                to: '/owner/appointments',
              },
              {
                label: t('owner.overview.kpis.pendingAgreements'),
                value: kpis?.pendingAgreements ?? 0,
                color: 'bg-[#171717]',
                to: '/owner/agreements',
              },
              {
                label: t('owner.overview.quickActions.notifications.title'),
                value: quickActionsMeta?.unreadNotifications ?? 0,
                color: 'bg-primary',
                to: '/owner/notifications',
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="hover:bg-muted/40 flex items-center gap-4 rounded-lg border border-border/40 p-4 transition-colors"
              >
                <div className={`size-2 rounded-full ${item.color}`} />
                <span className="text-muted-foreground flex-1 text-sm">{item.label}</span>
                <span className="text-foreground text-lg font-bold tabular-nums">{item.value}</span>
                <ArrowRight size={14} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        </AnalyticsCard>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <div className="border-border flex items-center justify-between border-b p-6">
          <div>
            <h4 className="text-foreground text-lg font-bold">
              {t('owner.overview.topProperties.title')}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t('owner.overview.topProperties.subtitle')}
            </p>
          </div>
          <Link to="/owner/properties">
            <Button variant="outline" className="gap-1 text-sm font-bold">
              {t('owner.overview.viewAll')} <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                <th className="px-6 py-3.5 text-left">
                  {t('owner.overview.topProperties.table.property')}
                </th>
                <th className="px-6 py-3.5 text-left">
                  {t('owner.overview.topProperties.table.views')}
                </th>
                <th className="px-6 py-3.5 text-left">
                  {t('owner.overview.topProperties.table.inquiries')}
                </th>
                <th className="px-6 py-3.5 text-left">
                  {t('owner.overview.topProperties.table.status')}
                </th>
                <th className="px-6 py-3.5 text-left">
                  {t('owner.overview.topProperties.table.rent')}
                </th>
                <th className="border-border/50 w-20 border-l px-6 py-3.5 text-center">
                  {t('owner.overview.topProperties.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {topProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-muted-foreground px-6 py-8 text-center text-sm">
                    {t('owner.overview.topProperties.empty')}
                  </td>
                </tr>
              ) : (
                topProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <Link to={`/owner/properties/${p.id}`} className="flex items-center gap-3">
                        {p.img ? (
                          <img src={p.img} alt={p.name} className="size-11 rounded-lg object-cover" />
                        ) : (
                          <div className="bg-muted size-11 rounded-lg" />
                        )}
                        <div>
                          <p className="text-foreground hover:text-primary text-sm font-bold transition-colors">
                            {p.name}
                          </p>
                          <p className="text-muted-foreground flex items-center gap-1 text-xs">
                            <MapPin size={10} /> {p.location}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold">{p.views}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold">{p.inquiries}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${p.statusColor}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="text-primary px-6 py-4 text-sm font-bold">{p.revenue}</td>
                    <td className="px-6 py-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground h-8 w-8 outline-none"
                          >
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/owner/properties/${p.id}`}
                              className="flex cursor-pointer items-center gap-2"
                            >
                              <Eye size={14} /> {t('owner.overview.topProperties.viewDetails')}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/owner/analytics"
                              className="flex cursor-pointer items-center gap-2"
                            >
                              <BarChart3 size={14} /> {t('owner.overview.topProperties.viewAnalytics')}
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showVerificationModal && !isVerified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent className="space-y-6 pt-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <ShieldAlert size={32} className="text-amber-500" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-foreground text-xl font-extrabold">
                  {t('owner.addProperty.verificationRequired')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {hasDocuments ? (
                    <>
                      {docStatus === 'under_review'
                        ? t('owner.addProperty.docStatusUnderReview')
                        : docStatus === 'rejected'
                          ? t('owner.addProperty.docStatusRejected')
                          : t('owner.addProperty.docStatusProcessed')}
                    </>
                  ) : (
                    <>{t('owner.addProperty.needUpload')}</>
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setShowVerificationModal(false);
                    navigate('/owner/profile?tab=verification');
                  }}
                  className="w-full"
                >
                  {hasDocuments
                    ? t('owner.addProperty.viewVerificationStatus')
                    : t('owner.addProperty.uploadDocuments')}{' '}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowVerificationModal(false)}
                  className="w-full"
                >
                  {t('owner.overview.cancel')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageContainer>
  );
}
