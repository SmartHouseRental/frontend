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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { useAdminOverview } from '@/features/admin/hooks/useAdmin';
import { getAdminItemKey } from '@/features/admin/mappers';
import CardSkeleton from '@/components/CardSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';

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

  const activity = data?.recentActivity || [];
  const properties = data?.recentProperties || [];
  const stats = data?.stats;
  const growthLabels = data?.userGrowth?.labels || [];
  const growthCurrent = data?.userGrowth?.currentPeriod || [];
  const growthMax = Math.max(...growthCurrent, 1);

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1 font-medium">
            Real-time platform metrics and system control center.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          <Activity size={14} />
          <span>
            Last updated:{' '}
            {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : 'N/A'}
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      {isLoading ? (
        <CardSkeleton count={4} />
      ) : isError ? (
        <ErrorState title="Failed to load overview" onRetry={refetch} />
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
              Total Users
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
              Active Listings
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
              Action Needed
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Pending Verifications
            </p>
            <h3 className="mt-1 text-3xl font-bold">
              {stats?.pendingVerifications?.value || 0}
            </h3>
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
              Active Agreements
            </p>
            <h3 className="mt-1 text-3xl font-bold">{stats?.activeAgreements?.value || 0}</h3>
          </CardContent>
        </Card>
      </div>
      )}

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* User Growth Chart */}
        <div className="shadow-soft rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold">User Growth</h4>
              <div className="mt-1 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="bg-accent size-2 rounded-full" />
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
                type="button"
                onClick={() => setGrowthRange('monthly')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-bold transition-all',
                  growthRange === 'monthly'
                    ? 'bg-muted text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Monthly
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
                Weekly
              </button>
            </div>
          </div>
          <div className="flex h-72 items-end gap-2 px-2">
            {growthLabels.length === 0 ? (
              <p className="text-muted-foreground text-sm">No growth data for this period.</p>
            ) : (
              growthLabels.map((label, index) => {
                const value = growthCurrent[index] ?? 0;
                const heightPct = Math.max(8, (value / growthMax) * 100);
                return (
                  <div
                    key={getAdminItemKey({ id: label }, index, 'growth-label')}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-[10px] font-bold text-primary">{value}</span>
                    <div
                      className="bg-primary/80 w-full rounded-t-md transition-all"
                      style={{ height: `${heightPct}%`, minHeight: '8px' }}
                      title={`${label}: ${value} registrations`}
                    />
                    <span className="text-muted-foreground text-[10px] font-bold uppercase">
                      {label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <p className="text-muted-foreground mt-4 text-xs">
            Data from <code className="text-[10px]">GET /admin/overview</code> (
            {data?.userGrowth?.range || 'monthly'} registrations).
          </p>
        </div>

        {/* Recent Activity Feed */}
        <div className="shadow-soft rounded-2xl border border-border bg-card p-6 flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-bold text-foreground">Recent Activity</h4>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {activity.length === 0 ? (
              <EmptyState title="No recent activity" description="No admin activity was found yet." />
            ) : (
              activity.map((item, index) => {
              const IconComp = activityIconMap[item.type] || Activity;
              return (
                <div key={getAdminItemKey(item, index, 'activity')} className="flex gap-3 items-start group rounded-lg p-1.5 -m-1.5 hover:bg-muted/30 transition-colors">
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

      {/* Recently Submitted Properties */}
      <div className="shadow-soft overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h4 className="text-lg font-bold text-foreground">Recently Submitted Properties</h4>
            <p className="text-muted-foreground text-sm">Latest property submissions on the platform.</p>
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
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${property.statusStyle}`}
                    >
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
                      View Property Details
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
