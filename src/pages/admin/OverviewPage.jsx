import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  CircleDot,
  Home,
  TrendingUp,
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const recentActivity = [
  {
    icon: UserPlus,
    iconColor: 'text-blue-600 bg-blue-50',
    text: 'New owner registration',
    detail: 'Hana Bekele signed up and submitted verification documents.',
    time: '12 min ago',
  },
  {
    icon: Home,
    iconColor: 'text-emerald-600 bg-emerald-50',
    text: 'Property auto-approved',
    detail: 'Luxury Villa in Bole Atlas by verified owner Michael Chen.',
    time: '45 min ago',
  },
  {
    icon: AlertTriangle,
    iconColor: 'text-rose-600 bg-rose-50',
    text: 'Fraud report filed',
    detail: 'Report #RPT-7430 against property listing PRP-2841.',
    time: '1 hour ago',
  },
  {
    icon: Handshake,
    iconColor: 'text-primary bg-primary/10',
    text: 'Agreement activated',
    detail: 'Agreement #AG-9428 between Mulugeta K. and Tadesse W.',
    time: '2 hours ago',
  },
  {
    icon: FileText,
    iconColor: 'text-amber-600 bg-amber-50',
    text: 'Documents submitted',
    detail: 'Tigist Hailu uploaded business license for verification.',
    time: '3 hours ago',
  },
];

const recentProperties = [
  {
    id: 'PRP-9402',
    name: 'Horizon Peak Villa',
    owner: 'Michael Chen',
    location: 'Bole, Addis Ababa',
    status: 'Pending',
    statusStyle: 'bg-amber-100 text-amber-700',
    date: 'Mar 22, 2026',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuoTFnm7eiUv3aKP_BJ5piF4y8mlzYH5ClM5cBXvCWiUBoKTyYq1fVvBa1ON_b343Lnm8gmkoCZu--XjCNHqF0C_MeQTDaVpBbPejgSOMxhesm8QdPtka1Sf7nq8DJL7UhC_eZs_rTsy4xIu6xuYQGKmdGUEc1F9lQPDNQ6jWkuyV_vzyE-JvOZVwndSvv4-arIqjshonMQ_Cvrc8GSp1iaQcWcbzTUNuOqCFGwTWZutx9kXsgtmfjULDan6j82KWu2NOo2-Z_dXl',
    ownerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3Zv5Qqs1eb6dibqsV7q3gViURackqyH78pXKOUpHJolFGSCT3Z9RmgzlbHVW0PQYom3kc45jw3Ie1_Pxkmq90DBfahykycUdNLLkMeE0M-FuaJrbjQ_RxEhLGcKwvq1HbdNi1H2hixXsPhQTvldB0WNMdV8XR-fqotDrYQ1VrZPmaATTS4_81szDJs1krDraYZdDI48uHTQOkotqaTOiLPAyutyq6aPPE2GOqN9tKNsxzpH7pEDaFpbcnErDDMJzgeAcHaMOJa-MZ',
  },
  {
    id: 'PRP-8210',
    name: 'Urban Loft 42',
    owner: 'Sarah Jenkins',
    location: 'Kazanchis, Addis Ababa',
    status: 'Needs Review',
    statusStyle: 'bg-rose-100 text-rose-700',
    date: 'Mar 21, 2026',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJmCVHHK5IgTYuMnEBX8RO1nOinrW0cnVikNmuGhYgY_CkHYI8gfpCp3SEvgug4SdZc7v6SX_o6N0eaXn-2EA9Z4xMqc9UosSSlqEGjec-0k91lXxF97pnVZ-EP6Vmf8WW4roVyCo5Am06bkxTHfotXf9mc3BScw9j6P4xBfjmzaQ5Z9Z9aX84jQ5oWmTUzI8Ifu0io--9zkixMk-fH4LdGKr80ZMqIQUK8K38xJmywgMq0LVHHEmKYxLMYGS6lfgFMprudQ4gCRcO',
    ownerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBj58V8RTH3-AtT79g3d6qGb2vavhXgSE2y1aHqa6J3tjxe8UN7OTlhY3Dv7V-NpJ-JZPcvyYQ_7LbBvyVShv7Y7xAlEt4He29exApLTZmthojFIWaXAX5XWEv92fDhDAAGx-3zHKSWrpqBwM43OG2TloV5-pRsF_4bJThIfwcdJYsR2Q05oebDMTZ27fZuDl3lcBlf_WSwF3hUX__7szfXtzoC0BS6R-Z9EW_07NaiAsB95UZHwoGfl4MsLKT4QdANRqNXlOdFTQ1E',
  },
  {
    id: 'PRP-7731',
    name: 'Cottage by the Lake',
    owner: 'David Miller',
    location: 'Hawassa',
    status: 'Pending',
    statusStyle: 'bg-amber-100 text-amber-700',
    date: 'Mar 20, 2026',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHK4MBf-7UqrhDns85XvQ8rILU5gDaYMqKUfF9Wf5uB7jOthE-628mLKysKbIm1k6jW99udN3BX2TELrn_bQhFYQE4qiEKrxf9Uvwi94473iylGn2WS5r61GBMgRbO7vN-8WO902Pk_3LWwYfkGACDKym_P-aSaMjnt5XB3lL6_i562wLzPu0wKH5lnacfnK0J1c_n9mz4fslMIn6wohA3b1ddHEiYTpShBnbHAmhp5ifGDttU_5ZxLoR-BUPiZwEpwYOYUg1kB9Q2',
    ownerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXoMCKst5jXLQ8v_86OCtrjKWx_6NRcwIrSJdYnUIuvt5FqNVAz7jcQyn-gjTfoHUwLcb-bJyS3i_bwZlJrbtxyvONegIxNnETExN4gqFboL72O1D1vprxu6LfD2mSKpBVLn33z6d8HXvX4qSFAj1zyYHBe6FCTPqWCNcnX-BLK2qYW8FWLAbFzZ7eLgWSkTm0G84GZqbMZnESTcIct3EplMEpbSPVvp-pzQIXv0OCyh7ZJ8yv8OJszLUVdNCceHXei526huSrZtlI',
  },
];

function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1 font-medium">
            Real-time platform metrics and system control center.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-400">
          <Activity size={14} />
          <span>Last updated: 2 mins ago</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 border-l-4 border-blue-400">
          <CardHeader className="flex justify-between">
            <span className="text-accent rounded-lg bg-blue-400/10 p-2">
              <Users />
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-blue-500">
              <TrendingUp size={14} />
              +12%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Total Users
            </p>
            <h3 className="mt-1 text-3xl font-bold">12,450</h3>
          </CardContent>
        </Card>

        <Card className="border-accent border-0 border-l-4">
          <CardHeader className="flex justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <Home />
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
              <TrendingUp size={14} />
              +8%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Active Listings
            </p>
            <h3 className="mt-1 text-3xl font-bold">3,820</h3>
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
            <h3 className="mt-1 text-3xl font-bold">24</h3>
          </CardContent>
        </Card>

        <Card className="border-0 border-l-4 border-emerald-400">
          <CardHeader className="flex justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <Handshake />
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
              <TrendingUp size={14} />
              +15%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Active Agreements
            </p>
            <h3 className="mt-1 text-3xl font-bold">890</h3>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* User Growth Chart */}
        <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
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
              <button className="text-primary rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold">
                Monthly
              </button>
              <button className="text-muted-foreground rounded-lg px-3 py-1.5 text-xs font-bold transition-colors hover:bg-slate-50">
                Weekly
              </button>
            </div>
          </div>
          <div className="relative h-72">
            <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,250 C100,240 200,270 300,230 C400,190 500,210 600,160 C700,110 800,140 900,120 L1000,100"
                fill="none"
                opacity="0.5"
                stroke="#94a3b8"
                strokeDasharray="6,6"
                strokeWidth="2"
              />
              <path
                d="M0,220 C100,210 200,240 300,180 C400,120 500,150 600,90 C700,30 800,60 900,40 L1000,20 L1000,300 L0,300 Z"
                fill="url(#areaGradient)"
              />
              <path
                d="M0,220 C100,210 200,240 300,180 C400,120 500,150 600,90 C700,30 800,60 900,40 L1000,20"
                fill="none"
                stroke="#38bdf8"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle cx="600" cy="90" fill="#1e3a8a" r="6" stroke="#fff" strokeWidth="3" />
            </svg>
            <div className="mt-6 flex justify-between px-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-bold">Recent Activity</h4>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="flex gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconColor}`}>
                    <IconComp size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{item.text}</p>
                    <p className="text-muted-foreground mt-0.5 truncate text-xs">{item.detail}</p>
                    <p className="text-muted-foreground/60 mt-1 text-[10px]">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Listings by Area
            </h4>
          </div>
          <div className="space-y-3">
            {[
              { area: 'Bole', count: '1.4k', pct: 85 },
              { area: 'Kazanchis', count: '680', pct: 65 },
              { area: 'CMC', count: '520', pct: 50 },
              { area: 'Megenagna', count: '420', pct: 42 },
            ].map((item) => (
              <div key={item.area} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span>{item.area}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="relative flex size-20 shrink-0 items-center justify-center">
            <svg className="size-full -rotate-90 transform">
              <circle cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6" className="text-slate-100" />
              <circle cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213.6" strokeDashoffset="21.36" strokeLinecap="round" strokeWidth="6" className="text-accent" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-black">90%</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-muted-foreground mb-2 text-xs font-bold tracking-wider uppercase">
              Payment Success
            </h4>
            <div className="flex flex-col gap-1">
              <p className="text-lg leading-tight font-bold">₿ 2.4M ETB</p>
              <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                <CheckCircle2 size={12} />
                On Time Collection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Submitted Properties */}
      <div className="shadow-soft overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h4 className="text-lg font-bold">Recently Submitted Properties</h4>
            <p className="text-muted-foreground text-sm">
              Review new listings awaiting platform approval.
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/properties')}
            className="text-primary rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold transition-colors hover:bg-slate-50"
          >
            View Full Queue
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Property Name</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Submitted</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentProperties.map((property) => (
                <tr
                  key={property.id}
                  className="cursor-pointer transition-colors hover:bg-slate-50/50"
                  onClick={() => navigate(`/admin/properties/${property.id}`)}
                >
                  <td className="px-6 py-4">
                    <div
                      className="size-14 rounded-lg border border-slate-200 bg-slate-100 bg-cover bg-center"
                      style={{ backgroundImage: `url('${property.image}')` }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold">{property.name}</p>
                    <p className="text-muted-foreground text-xs">ID: {property.id}</p>
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
                  <td className="text-muted-foreground px-6 py-4 text-sm">{property.date}</td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
