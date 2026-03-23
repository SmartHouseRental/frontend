'use client';

import {
  ZoomIn,
  Home,
  Bed,
  Wifi,
  Hotel,
  Cctv,
  Map,
  WashingMachine,
  HousePlug,
  ParkingSquare,
  ShowerHead,
  MapPin,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Send,
  ThumbsUp,
  Star,
  Calendar,
  Clock,
  AlertTriangle,
  ArrowRight,
  Printer,
  Gavel,
  ChevronDown,
  X,
  UserX,
  Flag,
  Image as LucideImage,
  FileText,
  Info,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { useNavigate } from 'react-router';

export default function ReportDetailPage() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-6">
      {/* Breadcrumb */}
      <div className="text-muted-foreground mb-6 flex items-center gap-2 text-sm font-medium">
        <button
          onClick={() => navigate('/admin/reports')}
          className="hover:text-foreground transition-colors"
        >
          Investigations
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="hover:text-foreground transition-colors">Fraud Reports</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-semibold">#REP-45678</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-slate-200 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Report #RPT-7429</h1>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">In Review</Badge>
            </div>
            <p className="mt-1 text-slate-500">Filed on Oct 24, 2023 • 2 days ago</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Main content - left side */}
        <div className="space-y-6 lg:col-span-8">
          {/* Report Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight">Report #REP-45678</h2>

                    <Badge
                      variant="outline"
                      className="gap-1 border-yellow-200 bg-yellow-50 text-yellow-800"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      Under Review
                    </Badge>

                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      High Severity
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    Submitted 3 hours ago • Assigned to:{' '}
                    <span className="text-foreground font-medium">Me</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    EN
                  </Button>
                  <Button variant="outline" size="sm">
                    AM
                  </Button>
                  <Button variant="outline" size="icon">
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Reporter */}
                <Card className="hover:border-primary/50 cursor-pointer transition-colors">
                  <CardContent className="flex items-center gap-4 p-5">
                    <Avatar className="h-14 w-14">
                      <AvatarImage
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjVUAEeIuZWvIEuPcfm4NSxU-MscNKIZ84VevnpbJTYdoBPtYCnfeMe_hjemPueFm0o1Sb1EcVPEcD5kxrCXvaODuQTngJD0RdEDLIm6HxNEuLtiRK-x6ejpkCKEcKlnjEyWmxXQaTNfOxCkbpdGKAkWzMc0v4rgf6TaBXrutwtv3gus9hyGVjMefMBt2h8Y52WK7PDVy1j66LOUYn26QjECUsYRy3kVTGVrW_23mi3IYiB64oDlGdzzOyb5Rc2Rq3c7VMjtEViqBA"
                        alt="Abebe"
                      />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs font-medium uppercase">
                        Reporter
                      </p>
                      <p className="font-semibold">Abebe</p>
                      <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                        Renter •{' '}
                        <span className="inline-flex items-center gap-1 font-medium text-green-600">
                          <CheckCircle className="h-3.5 w-3.5" /> ID Verified
                        </span>
                      </p>
                    </div>

                    <ArrowRight className="text-muted-foreground h-4 w-4" />
                  </CardContent>
                </Card>

                {/* Reported Target */}
                <Card className="cursor-pointer border-red-200 transition-colors hover:border-red-400">
                  <CardContent className="flex items-center gap-4 p-5">
                    <Avatar className="h-14 w-14">
                      <AvatarImage
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEnIUaVKEmYIXTvYv2aXtxXm9yPeZr6CwS2kLl6r04-q8ElcutP6h-29OAa1pIB3QGmx34_YtTb8dozQsgJriEcbT2xnA6mt8DrhXilQQgn_bWSO5_yCsFY1lcgzLZvNewAzHkpQ8G2_gk5MrePsqFBnvvpuLnMrIrtIw8XjjFng7h_MS-O8zbHpgFehb4BCwJ26PIlX5eaUb1KfZFOdXz9Nu8rph4STRWpOBreaMdiOQYvNeA8Rr2XYvMqqqvt8r8UXg9JKSrDGrQ"
                        alt="Dawit"
                      />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p className="text-xs font-medium text-red-600 uppercase">Reported Target</p>
                      <p className="font-semibold">Dawit</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Property Owner • 4.2 Rating
                      </p>
                    </div>

                    <ArrowRight className="text-muted-foreground h-4 w-4" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Card className="overflow-hidden">
            <CardContent className="mt-0 border-0 p-0 focus-visible:ring-0">
              <div className="space-y-8 p-8">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-2 px-4 py-1.5 text-sm font-black uppercase"
                  >
                    <Gavel className="h-5 w-5" /> FRAUD
                  </Badge>
                  <h3 className="text-xl font-bold">Inaccurate Property Listing & Deposit Scam</h3>
                </div>

                <div className="prose text-foreground max-w-none">
                  <p className="text-lg leading-relaxed font-medium">
                    "The owner requested a deposit of 15,000 ETB before I could view the property.
                    After sending the payment through Telebirr, the owner ceased all communication
                    and blocked my phone number. The photos provided in the listing appear to be
                    stolen from an international real estate website and do not match the Bole
                    Apartment exterior."
                  </p>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-dashed border-orange-200 bg-orange-50/30 p-5">
                  <img
                    className="size-20 rounded-lg object-cover"
                    alt="Bole Apartment modern exterior view"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMadIFppQTgGd2CMySBd15PmZRLv-dx0At8tXPxNH-GuubUOaq-gFEkhDRiYoUQ4DYvRaGONUrbwOPrIz6ZyHjMbCfXrd6zil5OH1xT2gi7rtZVbr7jvSPvamRlFuyFsoKbulc6AnznqP8AQi--oAatB5Xw9sh6LeC-2UVLg7tRBFt13zuGgT8w-9rqKUle3Cr2cMCT7uNUpZovKq5V1ktgvXZmh3_vbVU7Gu-1-JI1fkDA3YzcYqP1SCzMs-2nb5qpG4KTgDqwXDn"
                  />
                  <div className="flex-1">
                    <p className="text-primary text-xs font-medium uppercase">Linked Property</p>
                    <h4 className="font-semibold">Bole Apartment - 2BHK Luxury</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Bole, Addis Ababa • 45,000 ETB/mo
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Listing
                  </Button>
                </div>

                {/* Evidence Gallery */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-base font-semibold">
                      <LucideImage className="text-primary h-5 w-5" /> Evidence Gallery
                    </h4>
                    <span className="text-muted-foreground text-xs font-medium">4 Attachments</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="group relative cursor-zoom-in overflow-hidden rounded-lg border">
                      <img
                        className="aspect-square h-full w-full object-cover"
                        alt="Screenshot of a chat log complaint"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOPjwvGnbXKkXyVgDP9uCtBxWQAxmSPo2b16IEoV5zgKmQlgzssAnYNAxQlMAICUBeBsrcCBOG4_idk6q-LLF4JJpE2pvhhihnNuX7DxBs6KmZfy_kU_X3xIA0cM_kNow6qG15rQLfiqp9rZLXCQPO9a8-41h5Ne7fovv-RQV9SMRqXTwjJ8ltwv1ynVz7u-JIjUzrDXXIWdd_FE6maURC9SNovgY3bX5TaAian-ADwuBaxCT2QK2y6O2dBrSYvp6uRAFrU8DqPeyp"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <ZoomIn className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-muted-foreground mt-2 text-center text-[10px] font-medium">
                        Chat_Log_01.png
                      </p>
                    </div>

                    {/* Add remaining evidence items using the same structure */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - right column */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
          {/* Risk Assessment */}
          <Card>
            <CardHeader className="bg-red-50/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" /> Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-red-600">HIGH</p>
                  <p className="text-muted-foreground text-xs font-medium uppercase">
                    Risk Level Score
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">5 Unresolved</p>
                  <p className="text-muted-foreground text-xs font-medium uppercase">
                    Previous Reports
                  </p>
                </div>
              </div>

              <div className="bg-muted h-2.5 w-full overflow-hidden rounded-full">
                <div className="h-full w-[80%] bg-red-500" />
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 text-red-600" />
                  <span>Owner account flagged in 3 different cities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 text-red-600" />
                  <span>IP address matches known VPN proxy.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions & Status */}
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <label className="text-muted-foreground mb-2 block text-xs font-medium uppercase">
                  Update Investigation Status
                </label>
                <div className="relative">
                  <select className="border-input bg-background focus:ring-ring w-full appearance-none rounded-md border px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none">
                    <option>Under Review</option>
                    <option>In-Progress</option>
                    <option>Escalated to Legal</option>
                    <option>Awaiting User Response</option>
                    <option>Pending Closure</option>
                  </select>
                  <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Resolve Report
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <X className="h-4 w-4" />
                  Dismiss Report
                </Button>
              </div>

              <div className="border-t pt-6">
                <p className="mb-3 text-xs font-black tracking-wider text-red-600 uppercase">
                  Administrative Sanctions
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <UserX className="h-4 w-4" />
                    Ban User
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Flag className="h-4 w-4" />
                    Flag Property
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
