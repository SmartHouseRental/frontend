import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { profileKeys } from '@/features/profile/constants';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Eye,
  CalendarDays,
  FileText,
  TrendingUp,
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
import { useOwnerOverview } from '../hooks/useOwnerOverview';
import { verificationStateFromOverview } from '../utils/verification';

const colorMap = {
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    hoverBg: 'group-hover:bg-primary',
    hoverText: 'group-hover:text-primary-foreground',
    arrow: 'group-hover:text-primary',
  },
  'blue-500': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    hoverBg: 'group-hover:bg-blue-500',
    hoverText: 'group-hover:text-white',
    arrow: 'group-hover:text-blue-500',
  },
  'amber-500': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    hoverBg: 'group-hover:bg-amber-500',
    hoverText: 'group-hover:text-white',
    arrow: 'group-hover:text-amber-500',
  },
  'rose-500': {
    bg: 'bg-rose-500/10',
    text: 'text-rose-500',
    hoverBg: 'group-hover:bg-rose-500',
    hoverText: 'group-hover:text-white',
    arrow: 'group-hover:text-rose-500',
  },
};

const kpiColorMap = {
  primary: { icon: 'bg-primary/10 text-primary', change: 'text-emerald-500' },
  'blue-500': { icon: 'bg-blue-400/10 text-blue-500', change: 'text-blue-500' },
  'amber-500': { icon: 'bg-amber-400/10 text-amber-500', change: 'text-amber-500' },
  'rose-500': { icon: 'bg-rose-400/10 text-rose-500', change: 'text-rose-500' },
  'emerald-500': { icon: 'bg-emerald-400/10 text-emerald-500', change: 'text-emerald-500' },
};

const activityIconMap = {
  appointment: { icon: CalendarDays, bgColor: 'bg-amber-100', iconColor: 'text-amber-600' },
  payment: { icon: DollarSign, bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  message: { icon: MessageCircle, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  system: { icon: Bell, bgColor: 'bg-slate-100', iconColor: 'text-slate-600' },
};

function formatCurrency(amount, currency = 'ETB') {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M ${currency}`;
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K ${currency}`;
  return `${amount.toLocaleString()} ${currency}`;
}

export function OwnerOverviewContent() {
  const [chartPeriod, setChartPeriod] = useState('monthly');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const { data: overviewResponse, isLoading, isError } = useOwnerOverview(chartPeriod);
  const overview = overviewResponse?.data;

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
      label: 'Add New Property',
      desc: 'List a new rental property',
      icon: Plus,
      color: 'primary',
      to: 'properties',
      isAddProperty: true,
    },
    {
      label: 'View Appointments',
      desc: `${quickActionsMeta?.pendingAppointments ?? 0} pending confirmation${quickActionsMeta?.pendingAppointments === 1 ? '' : 's'}`,
      icon: CalendarDays,
      color: 'amber-500',
      to: 'appointments',
    },
    {
      label: 'Manage Agreements',
      desc:
        (quickActionsMeta?.pendingAgreements ?? 0) > 0
          ? 'Review pending contracts'
          : 'View rental agreements',
      icon: Handshake,
      color: 'blue-500',
      to: 'agreements',
    },
    {
      label: 'Notifications',
      desc: `${quickActionsMeta?.unreadNotifications ?? 0} unread alert${quickActionsMeta?.unreadNotifications === 1 ? '' : 's'}`,
      icon: Bell,
      color: 'rose-500',
      to: 'notifications',
    },
  ];

  const kpiData = kpis
    ? [
        {
          label: 'Active Listings',
          value: String(kpis.activeListings),
          icon: Building2,
          color: 'primary',
          borderColor: 'border-primary',
        },
        {
          label: 'Total Views',
          value: kpis.totalViews.toLocaleString(),
          icon: Eye,
          color: 'blue-500',
          borderColor: 'border-blue-400',
        },
        {
          label: 'Appointments',
          value: String(kpis.pendingAppointments),
          sub: 'Pending',
          icon: CalendarDays,
          color: 'amber-500',
          borderColor: 'border-amber-400',
        },
        {
          label: 'Pending Agreements',
          value: String(kpis.pendingAgreements),
          change: kpis.pendingAgreements > 0 ? 'Action Needed' : undefined,
          changeType: kpis.pendingAgreements > 0 ? 'alert' : undefined,
          icon: FileText,
          color: 'rose-500',
          borderColor: 'border-rose-400',
        },
        {
          label: 'Revenue',
          value: formatCurrency(kpis.revenueThisMonth, kpis.revenueCurrency),
          sub: 'This month',
          icon: DollarSign,
          color: 'emerald-500',
          borderColor: 'border-emerald-400',
        },
      ]
    : [];

  const topProperties = overview?.topPerformingProperties ?? [];
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
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <p className="text-muted-foreground text-sm">Failed to load dashboard. Please try again.</p>
      </div>
    );
  }

  const layoutVerificationState = verificationStateFromOverview(overview);

  return (
    <div className="scrollbar-hide h-screen space-y-8 overflow-y-auto p-8">
      <div className="px-0">
        <VerificationBanner verificationState={layoutVerificationState} />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-foreground text-3xl font-black tracking-tight">
            Welcome back, {profile?.firstName || 'Owner'} 👋
          </h2>
          <p className="text-muted-foreground mt-1 font-medium">
            Here&apos;s what&apos;s happening with your properties today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border-border bg-card text-muted-foreground hidden items-center gap-2 rounded-lg border px-4 py-2 text-sm lg:flex">
            <Clock size={14} />
            <span>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <Button onClick={handleAddProperty} className="gap-2 shadow-sm">
            <Plus size={16} /> Add Property
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          const colors = kpiColorMap[kpi.color];
          return (
            <Card
              key={kpi.label}
              className={`group cursor-pointer border-0 border-l-4 transition-all duration-300 hover:shadow-lg ${kpi.borderColor}`}
            >
              <CardHeader className="flex justify-between pb-2">
                <span
                  className={`rounded-lg p-2 ${colors.icon} transition-transform group-hover:scale-110`}
                >
                  <Icon size={20} />
                </span>
                {kpi.change && (
                  <span
                    className={`flex items-center gap-1 text-xs font-bold ${kpi.changeType === 'alert' ? 'animate-pulse text-rose-500' : colors.change}`}
                  >
                    {kpi.changeType === 'up' && <TrendingUp size={14} />}
                    {kpi.change}
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  {kpi.label}
                </p>
                <h3 className="mt-1 text-2xl font-black">{kpi.value}</h3>
                {kpi.sub && <p className="text-muted-foreground mt-0.5 text-xs">{kpi.sub}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          const colors = colorMap[action.color];
          const content = (
            <button
              type="button"
              onClick={action.isAddProperty ? handleAddProperty : undefined}
              className="border-border bg-card group hover:border-primary/30 flex w-full items-center gap-4 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} ${colors.hoverBg} ${colors.hoverText} transition-all duration-300`}
              >
                <Icon size={22} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-foreground font-bold">{action.label}</p>
                <p className="text-muted-foreground text-xs">{action.desc}</p>
              </div>
              <ArrowRight
                size={16}
                className={`text-muted-foreground ${colors.arrow} transition-all duration-300 group-hover:translate-x-1`}
              />
            </button>
          );

          if (action.isAddProperty) {
            return <div key={action.label}>{content}</div>;
          }

          return (
            <Link key={action.label} to={`/owner/${action.to}`}>
              {content}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="border-border bg-card rounded-2xl border p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h4 className="text-foreground text-lg font-bold">Revenue Overview</h4>
              <div className="mt-1 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary size-2 rounded-full"></span>
                  <span className="text-muted-foreground text-xs font-medium">This Period</span>
                </div>
              </div>
            </div>
            <div className="bg-muted flex gap-1 rounded-lg p-0.5">
              {['monthly', 'weekly'].map((p) => (
                <button
                  key={p}
                  type="button"
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
              <path
                d="M0,180 C100,170 200,190 300,140 C400,90 500,120 600,70 C700,30 800,50 900,20 L1000,10 L1000,250 L0,250 Z"
                fill="url(#ownerRevenueGradient)"
              />
              <path
                d="M0,180 C100,170 200,190 300,140 C400,90 500,120 600,70 C700,30 800,50 900,20 L1000,10"
                fill="none"
                stroke="oklch(0.62 0.11 55)"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div className="border-border mt-6 grid grid-cols-3 gap-4 border-t pt-4">
            <div>
              <p className="text-muted-foreground text-xs font-medium">Total Revenue</p>
              <p className="text-foreground mt-0.5 text-lg font-black">
                {formatCurrency(revenue?.totalThisMonth ?? 0, revenue?.currency)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">Avg per Property</p>
              <p className="text-foreground mt-0.5 text-lg font-black">
                {formatCurrency(revenue?.avgPerProperty ?? 0, revenue?.currency)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">Pending Payments</p>
              <p className="mt-0.5 text-lg font-black text-amber-600">
                {formatCurrency(revenue?.pendingAmount ?? 0, revenue?.currency)}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {revenue?.pendingCount ?? 0} awaiting confirmation
              </p>
            </div>
          </div>
        </div>

        <div className="border-border bg-card flex flex-col rounded-2xl border p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-foreground text-lg font-bold">Recent Activity</h4>
            <Link to="/owner/notifications" className="text-primary text-xs font-bold hover:underline">
              View All
            </Link>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {visibleActivities.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center text-sm">No recent activity</p>
            ) : (
              visibleActivities.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.id}
                    className="hover:bg-muted/30 group -m-1.5 flex cursor-pointer items-start gap-3 rounded-lg p-1.5 transition-colors"
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.bgColor} transition-transform group-hover:scale-110`}
                    >
                      <Icon size={14} className={a.iconColor} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground text-sm font-semibold">{a.title}</p>
                      <p className="text-muted-foreground truncate text-xs">{a.desc}</p>
                      <p className="text-muted-foreground/60 mt-0.5 text-[10px]">{a.time}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
        <div className="border-border flex items-center justify-between border-b p-6">
          <div>
            <h4 className="text-foreground text-lg font-bold">Top Performing Properties</h4>
            <p className="text-muted-foreground text-sm">Your most viewed listings</p>
          </div>
          <Link to="/owner/properties">
            <Button variant="outline" className="gap-1 text-sm font-bold">
              View All <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                <th className="px-6 py-3.5 text-left">Property</th>
                <th className="px-6 py-3.5 text-left">Views</th>
                <th className="px-6 py-3.5 text-left">Inquiries</th>
                <th className="px-6 py-3.5 text-left">Status</th>
                <th className="px-6 py-3.5 text-left">Rent / Month</th>
                <th className="border-border/50 w-20 border-l px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {topProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-muted-foreground px-6 py-8 text-center text-sm">
                    No properties yet. Add your first listing to get started.
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
                              <Eye size={14} /> View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/owner/analytics"
                              className="flex cursor-pointer items-center gap-2"
                            >
                              <BarChart3 size={14} /> View Analytics
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
                <h3 className="text-foreground text-xl font-extrabold">Verification Required</h3>
                <p className="text-muted-foreground text-sm">
                  {hasDocuments ? (
                    <>
                      Your documents are currently{' '}
                      {docStatus === 'under_review'
                        ? 'under review'
                        : docStatus === 'rejected'
                          ? 'rejected'
                          : 'being processed'}
                      . You will be able to list properties once your verification is approved.
                    </>
                  ) : (
                    <>
                      You need to upload verification documents before you can list properties on
                      the platform.
                    </>
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
                  {hasDocuments ? 'View Verification Status' : 'Upload Documents'}{' '}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowVerificationModal(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
