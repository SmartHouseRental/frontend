import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function OverviewPage() {
    return (
        <div className="space-y-8 p-8">
            {/* Page Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground">
                        Welcome back, Dawit 👋
                    </h2>
                    <p className="text-muted-foreground mt-1 font-medium">
                        Here's what's happening with your properties today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="gap-2">
                        <Plus size={16} />
                        Add Property
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
                <Card className="border-0 border-l-4 border-primary group hover:shadow-md transition-shadow">
                    <CardHeader className="flex justify-between pb-2">
                        <span className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Building2 size={20} />
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                            <TrendingUp size={14} /> +2
                        </span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                            Active Listings
                        </p>
                        <h3 className="mt-1 text-2xl font-black">12</h3>
                    </CardContent>
                </Card>

                <Card className="border-0 border-l-4 border-blue-400 group hover:shadow-md transition-shadow">
                    <CardHeader className="flex justify-between pb-2">
                        <span className="rounded-lg bg-blue-400/10 p-2 text-blue-500">
                            <Eye size={20} />
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-blue-500">
                            <TrendingUp size={14} /> +18%
                        </span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                            Total Views
                        </p>
                        <h3 className="mt-1 text-2xl font-black">3,847</h3>
                    </CardContent>
                </Card>

                <Card className="border-0 border-l-4 border-amber-400 group hover:shadow-md transition-shadow">
                    <CardHeader className="flex justify-between pb-2">
                        <span className="rounded-lg bg-amber-400/10 p-2 text-amber-500">
                            <CalendarDays size={20} />
                        </span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                            Appointments
                        </p>
                        <h3 className="mt-1 text-2xl font-black">8</h3>
                        <p className="text-xs text-muted-foreground mt-1">This month</p>
                    </CardContent>
                </Card>

                <Card className="border-0 border-l-4 border-rose-400 group hover:shadow-md transition-shadow">
                    <CardHeader className="flex justify-between pb-2">
                        <span className="rounded-lg bg-rose-400/10 p-2 text-rose-500">
                            <FileText size={20} />
                        </span>
                        <span className="text-xs font-bold text-rose-500">Action Needed</span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                            Pending Agreements
                        </p>
                        <h3 className="mt-1 text-2xl font-black">3</h3>
                    </CardContent>
                </Card>

                <Card className="border-0 border-l-4 border-emerald-400 group hover:shadow-md transition-shadow">
                    <CardHeader className="flex justify-between pb-2">
                        <span className="rounded-lg bg-emerald-400/10 p-2 text-emerald-500">
                            <DollarSign size={20} />
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                            <TrendingUp size={14} /> +12%
                        </span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                            Revenue
                        </p>
                        <h3 className="mt-1 text-2xl font-black">285K ETB</h3>
                        <p className="text-xs text-muted-foreground mt-1">This month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Plus size={22} />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-foreground">Add New Property</p>
                        <p className="text-xs text-muted-foreground">List a new rental property</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                </button>

                <button className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        <CalendarDays size={22} />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-foreground">View Appointments</p>
                        <p className="text-xs text-muted-foreground">3 pending confirmations</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-amber-500 transition-colors" />
                </button>

                <button className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <FileText size={22} />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-foreground">Manage Agreements</p>
                        <p className="text-xs text-muted-foreground">Review pending contracts</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </button>
            </div>

            {/* Revenue Chart & Recent Activity */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-bold text-foreground">Revenue Overview</h4>
                            <div className="mt-1 flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <span className="size-2 rounded-full bg-primary"></span>
                                    <span className="text-muted-foreground text-xs font-medium">This Month</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="size-2 rounded-full border border-dashed border-muted-foreground"></span>
                                    <span className="text-muted-foreground text-xs font-medium">Last Month</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button className="text-foreground rounded-lg bg-muted px-3 py-1.5 text-xs font-bold">
                                Monthly
                            </button>
                            <button className="text-muted-foreground rounded-lg px-3 py-1.5 text-xs font-bold transition-colors hover:bg-muted">
                                Weekly
                            </button>
                        </div>
                    </div>
                    <div className="relative h-56">
                        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 250">
                            <defs>
                                <linearGradient id="ownerRevenueGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="oklch(0.62 0.11 55)" stopOpacity="0.2"></stop>
                                    <stop offset="100%" stopColor="oklch(0.62 0.11 55)" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,200 C100,190 200,210 300,170 C400,130 500,150 600,110 C700,70 800,90 900,50 L1000,30"
                                fill="none" opacity="0.4" stroke="oklch(0.5 0.04 60)" strokeDasharray="6,6" strokeWidth="2"
                            />
                            <path
                                d="M0,180 C100,170 200,190 300,140 C400,90 500,120 600,70 C700,30 800,50 900,20 L1000,10 L1000,250 L0,250 Z"
                                fill="url(#ownerRevenueGradient)"
                            />
                            <path
                                d="M0,180 C100,170 200,190 300,140 C400,90 500,120 600,70 C700,30 800,50 900,20 L1000,10"
                                fill="none" stroke="oklch(0.62 0.11 55)" strokeLinecap="round" strokeWidth="3"
                            />
                            <circle cx="600" cy="70" fill="oklch(0.62 0.11 55)" r="5" stroke="#fff" strokeWidth="3" />
                        </svg>
                        <div className="mt-4 flex justify-between px-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-5">Recent Activity</h4>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                                <CheckCircle2 size={14} className="text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Agreement signed</p>
                                <p className="text-xs text-muted-foreground">Bole Skyline Apt — Mulugeta K.</p>
                                <p className="text-[10px] text-muted-foreground/60 mt-1">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                                <Clock size={14} className="text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">New appointment request</p>
                                <p className="text-xs text-muted-foreground">Horizon Peak Villa — Sara T.</p>
                                <p className="text-[10px] text-muted-foreground/60 mt-1">5 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                                <Eye size={14} className="text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Property viewed 45 times</p>
                                <p className="text-xs text-muted-foreground">Luxury Villa in Bole Atlas</p>
                                <p className="text-[10px] text-muted-foreground/60 mt-1">Today</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                                <XCircle size={14} className="text-rose-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Appointment cancelled</p>
                                <p className="text-xs text-muted-foreground">Urban Loft 42 — Abebe M.</p>
                                <p className="text-[10px] text-muted-foreground/60 mt-1">Yesterday</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <DollarSign size={14} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Payment received</p>
                                <p className="text-xs text-muted-foreground">45,000 ETB — Cottage by the Lake</p>
                                <p className="text-[10px] text-muted-foreground/60 mt-1">2 days ago</p>
                            </div>
                        </div>
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
                    <button className="text-primary rounded-lg border border-border px-4 py-2 text-sm font-bold hover:bg-muted/50 transition-colors">
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                <th className="px-6 py-3.5">Property</th>
                                <th className="px-6 py-3.5">Views</th>
                                <th className="px-6 py-3.5">Inquiries</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            <tr className="transition-colors hover:bg-muted/20">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-11 rounded-lg bg-muted bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnuoTFnm7eiUv3aKP_BJ5piF4y8mlzYH5ClM5cBXvCWiUBoKTyYq1fVvBa1ON_b343Lnm8gmkoCZu--XjCNHqF0C_MeQTDaVpBbPejgSOMxhesm8QdPtka1Sf7nq8DJL7UhC_eZs_rTsy4xIu6xuYQGKmdGUEc1F9lQPDNQ6jWkuyV_vzyE-JvOZVwndSvv4-arIqjshonMQ_Cvrc8GSp1iaQcWcbzTUNuOqCFGwTWZutx9kXsgtmfjULDan6j82KWu2NOo2-Z_dXl')" }}></div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Luxury Villa in Bole Atlas</p>
                                            <p className="text-xs text-muted-foreground">Bole, Addis Ababa</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-sm">1,245</td>
                                <td className="px-6 py-4 font-bold text-sm">34</td>
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 uppercase">Available</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-primary">85,000 ETB</td>
                            </tr>
                            <tr className="transition-colors hover:bg-muted/20">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-11 rounded-lg bg-muted bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJmCVHHK5IgTYuMnEBX8RO1nOinrW0cnVikNmuGhYgY_CkHYI8gfpCp3SEvgug4SdZc7v6SX_o6N0eaXn-2EA9Z4xMqc9UosSSlqEGjec-0k91lXxF97pnVZ-EP6Vmf8WW4roVyCo5Am06bkxTHfotXf9mc3BScw9j6P4xBfjmzaQ5Z9Z9aX84jQ5oWmTUzI8Ifu0io--9zkixMk-fH4LdGKr80ZMqIQUK8K38xJmywgMq0LVHHEmKYxLMYGS6lfgFMprudQ4gCRcO')" }}></div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Bole Skyline Apartment</p>
                                            <p className="text-xs text-muted-foreground">Bole, Addis Ababa</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-sm">892</td>
                                <td className="px-6 py-4 font-bold text-sm">22</td>
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700 uppercase">Rented</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-primary">45,000 ETB</td>
                            </tr>
                            <tr className="transition-colors hover:bg-muted/20">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-11 rounded-lg bg-muted bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHK4MBf-7UqrhDns85XvQ8rILU5gDaYMqKUfF9Wf5uB7jOthE-628mLKysKbIm1k6jW99udN3BX2TELrn_bQhFYQE4qiEKrxf9Uvwi94473iylGn2WS5r61GBMgRbO7vN-8WO902Pk_3LWwYfkGACDKym_P-aSaMjnt5XB3lL6_i562wLzPu0wKH5lnacfnK0J1c_n9mz4fslMIn6wohA3b1ddHEiYTpShBnbHAmhp5ifGDttU_5ZxLoR-BUPiZwEpwYOYUg1kB9Q2')" }}></div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Cottage by the Lake</p>
                                            <p className="text-xs text-muted-foreground">Hawassa</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-sm">678</td>
                                <td className="px-6 py-4 font-bold text-sm">18</td>
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 uppercase">Available</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-primary">32,000 ETB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OverviewPage;
