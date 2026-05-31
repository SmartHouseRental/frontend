import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Home,
  TrendingUp,
  Handshake,
  Users,
  Eye,
  ClipboardCheck,
  AlertTriangle,
  UserPlus,
  Activity,
  XCircle,
  BrainCircuit,
} from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from '@/features/admin/api';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { useAdminOverview } from '@/features/admin/hooks/useAdmin';
import { getAdminItemKey } from '@/features/admin/mappers';
import CardSkeleton from '@/components/CardSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const activityIconMap = {
  OWNER_REGISTRATION: UserPlus,
  PROPERTY_APPROVED: Home,
  PROPERTY_REJECTED: XCircle,
  REPORT_CREATED: AlertTriangle,
  AGREEMENT_CREATED: Handshake,
};

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString();
}

function OverviewPage() {
  const navigate = useNavigate();
  const [growthRange, setGrowthRange] = useState('monthly');
  const { data, isLoading, isError, refetch } = useAdminOverview({ range: growthRange });
  const { t } = useTranslation();

  const activity = data?.recentActivity || [];
  const properties = data?.recentProperties || [];
  const stats = data?.stats;
  const growthLabels = data?.userGrowth?.labels || [];
  const growthCurrent = data?.userGrowth?.currentPeriod || [];
  const lastUpdatedText = data?.lastUpdated
    ? t('adminOverview.updatedAt', {
      time: new Date(data.lastUpdated).toLocaleTimeString(),
    })
    : t('adminOverview.notAvailable');

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground">{t('adminOverview.title')}</h2>
          <p className="text-muted-foreground mt-1 font-medium">{t('adminOverview.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                toast.loading(t('adminOverview.training.started', 'Initiating ML training...'), { id: 'train' });
                await adminApi.triggerRecommendationTraining();
                toast.success(t('adminOverview.training.success', 'Training started successfully!'), { id: 'train' });
              } catch (err) {
                toast.error(t('adminOverview.training.error', 'Failed to trigger training'), { id: 'train' });
              }
            }}
            className="flex items-center gap-2"
          >
            <BrainCircuit size={16} />
            {t('adminOverview.training.button', 'Retrain ML Model')}
          </Button>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <Activity size={14} />
            <span>{lastUpdatedText}</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <CardSkeleton count={4} />
      ) : isError ? (
        <ErrorState
          title={t('adminOverview.errorTitle')}
          message={t('adminOverview.errorFallback')}
          onRetry={refetch}
          retryLabel={t('tryAgain')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 border-l-4 border-blue-400">
            <CardHeader className="flex justify-between">
              <span className="text-accent rounded-lg bg-blue-400/10 p-2">
                <Users />
              </span>
              {stats?.totalUsers?.trendPercent != null && (
                <span className="flex items-center gap-1 text-xs font-bold text-blue-500">
                  <TrendingUp size={14} />
                  {stats.totalUsers.trendPercent > 0 ? '+' : ''}
                  {stats.totalUsers.trendPercent}%
                </span>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                {t('adminOverview.stats.totalUsers')}
              </p>
              <h3 className="mt-1 text-3xl font-bold">{stats?.totalUsers?.value || 0}</h3>
            </CardContent>
          </Card>

          <Card className="border-accent border-0 border-l-4">
            <CardHeader className="flex justify-between">
              <span className="bg-accent/10 text-accent rounded-lg p-2">
                <Home />
              </span>
              {stats?.activeListings?.trendPercent != null && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                  <TrendingUp size={14} />
                  {stats.activeListings.trendPercent > 0 ? '+' : ''}
                  {stats.activeListings.trendPercent}%
                </span>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                {t('adminOverview.stats.activeListings')}
              </p>
              <h3 className="mt-1 text-3xl font-bold">{stats?.activeListings?.value || 0}</h3>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer border-0 border-l-4 border-amber-400 transition-shadow hover:shadow-md"
            onClick={() => navigate('/admin/pending-verifications')}
          >
            <CardHeader className="flex justify-between">
              <span className="rounded-lg bg-amber-400/10 p-2 text-amber-500">
                <ClipboardCheck />
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                {t('adminOverview.stats.actionNeeded')}
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                {t('adminOverview.stats.pendingVerifications')}
              </p>
              <h3 className="mt-1 text-3xl font-bold">{stats?.pendingVerifications?.value || 0}</h3>
            </CardContent>
          </Card>

          <Card className="border-0 border-l-4 border-emerald-400">
            <CardHeader className="flex justify-between">
              <span className="bg-accent/10 text-accent rounded-lg p-2">
                <Handshake />
              </span>
              {stats?.activeAgreements?.trendPercent != null && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                  <TrendingUp size={14} />
                  {stats.activeAgreements.trendPercent > 0 ? '+' : ''}
                  {stats.activeAgreements.trendPercent}%
                </span>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                {t('adminOverview.stats.activeAgreements')}
              </p>
              <h3 className="mt-1 text-3xl font-bold">{stats?.activeAgreements?.value || 0}</h3>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="shadow-soft rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold">{t('adminOverview.chart.title')}</h4>
              <div className="mt-1 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="bg-accent size-2 rounded-full" />
                  <span className="text-muted-foreground text-xs font-medium">
                    {t('adminOverview.chart.currentPeriod')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full border border-dashed border-slate-400" />
                  <span className="text-muted-foreground text-xs font-medium">
                    {t('adminOverview.chart.previousPeriod')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGrowthRange('monthly')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-bold transition-all',
                  growthRange === 'monthly'
                    ? 'bg-muted text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t('adminOverview.chart.monthly')}
              </button>
              <button
                type="button"
                onClick={() => setGrowthRange('weekly')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-bold transition-all',
                  growthRange === 'weekly'
                    ? 'bg-muted text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t('adminOverview.chart.weekly')}
              </button>
            </div>
          </div>
          <div className="h-72 w-full px-2">
            {growthLabels.length === 0 ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
                <p className="text-muted-foreground text-sm">{t('adminOverview.chart.noData')}</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={growthLabels.map((label, index) => ({
                    label,
                    value: growthCurrent[index] ?? 0,
                  }))}
                  barCategoryGap={16}
                  margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="growthBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.96} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.32} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 700 }}
                    interval="preserveStartEnd"
                    minTickGap={16}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 700 }}
                    width={36}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip
                    cursor={{ fill: 'color-mix(in srgb, var(--muted) 10%, transparent)' }}
                    contentStyle={{
                      borderRadius: 14,
                      border: '1px solid var(--border)',
                      background: 'var(--card)',
                      color: 'var(--foreground)',
                      fontSize: 12,
                    }}
                    formatter={(value) => [value.toLocaleString(), t('adminOverview.chart.currentPeriod')]}
                    labelStyle={{ color: 'var(--foreground)', fontWeight: 700, fontSize: 12 }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={42}
                    fill="url(#growthBarGradient)"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="shadow-soft rounded-2xl border border-border bg-card p-6 flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-bold text-foreground">{t('adminOverview.activity.title')}</h4>
            <button className="text-primary text-xs font-bold hover:underline">
              {t('adminOverview.activity.viewAll')}
            </button>
          </div>
          <div className="space-y-4">
            {activity.length === 0 ? (
              <EmptyState
                title={t('adminOverview.activity.empty')}
                description={t('adminOverview.activity.emptyDescription')}
              />
            ) : (
              activity.map((item, index) => {
                const IconComp = activityIconMap[item.type] || Activity;
                return (
                  <div
                    key={getAdminItemKey(item, index, 'activity')}
                    className="flex gap-3 items-start group rounded-lg p-1.5 -m-1.5 hover:bg-muted/30 transition-colors"
                  >
                    <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
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
            )}
          </div>
        </div>
      </div>

      <div className="shadow-soft overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h4 className="text-lg font-bold text-foreground">{t('adminOverview.recentProperties.title')}</h4>
            <p className="text-muted-foreground text-sm">{t('adminOverview.recentProperties.subtitle')}</p>
          </div>
          <button
            onClick={() => navigate('/admin/properties')}
            className="text-primary rounded-lg border border-border px-4 py-2 text-sm font-bold transition-colors hover:bg-muted"
          >
            {t('adminOverview.recentProperties.viewQueue')}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                <th className="px-6 py-4">{t('adminOverview.recentProperties.preview')}</th>
                <th className="px-6 py-4">{t('adminOverview.recentProperties.propertyName')}</th>
                <th className="px-6 py-4">{t('adminOverview.recentProperties.owner')}</th>
                <th className="px-6 py-4">{t('adminOverview.recentProperties.location')}</th>
                <th className="px-6 py-4">{t('adminOverview.recentProperties.status')}</th>
                <th className="px-6 py-4">{t('adminOverview.recentProperties.dateSubmitted')}</th>
                <th className="px-6 py-4">{t('adminOverview.recentProperties.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="cursor-pointer transition-colors hover:bg-muted/20"
                  onClick={() => navigate(`/admin/properties/${property.id}`)}
                >
                  <td className="px-6 py-4">
                    {property.image ? (
                      <div
                        className="size-14 rounded-lg border border-slate-200 bg-slate-100 bg-cover bg-center"
                        style={{ backgroundImage: `url('${property.image}')` }}
                      />
                    ) : (
                      <div className="size-14 rounded-lg border border-slate-200 bg-slate-100" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold">{property.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-6 rounded-full bg-slate-200 bg-cover bg-center"
                        style={{ backgroundImage: `url('${property.ownerAvatar}')` }}
                      />
                      <span className="text-sm font-medium">{property.owner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{property.location}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${property.statusStyle}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm">
                    {formatDate(property.dateSubmitted)}
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => navigate(`/admin/properties/${property.id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {t('adminOverview.recentProperties.viewDetails')}
                    </Button>
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
