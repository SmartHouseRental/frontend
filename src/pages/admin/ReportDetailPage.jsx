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
import { useParams } from 'react-router';
import {
  useAdminReport,
  useAdminReportRiskAssessment,
  useAdminUpdateReportStatus,
} from '@/features/admin/hooks/useAdmin';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import { getReportStatusMeta, formatPersonName } from '@/features/admin/mappers';
import { useAdminReportTarget } from '@/features/admin/hooks/useAdminLookupMaps';
import RiskAssessmentCard from '@/features/admin/components/RiskAssessmentCard';

export default function ReportDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: report, isLoading, isError, refetch } = useAdminReport(id);
  const riskQuery = useAdminReportRiskAssessment(id);
  const updateStatus = useAdminUpdateReportStatus();
  const target = useAdminReportTarget(report);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1440px] p-6">
        <TableSkeleton rows={4} columns={2} showHeader={false} />
      </main>
    );
  }

  if (isError || !report) {
    return (
      <main className="mx-auto max-w-[1440px] p-6">
        <ErrorState title="Failed to load report details" onRetry={refetch} />
      </main>
    );
  }

  const statusMeta = getReportStatusMeta(report.status);
  const createdAt = new Date(report.createdAt).toLocaleString();
  const reporterName = report.reportedBy
    ? formatPersonName(report.reportedBy)
    : 'Unknown reporter';

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
        <span className="text-foreground font-semibold">#{report.id}</span>
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
              <h1 className="text-2xl font-bold text-slate-900">Report #{report.id}</h1>
              <Badge className={`${statusMeta.style} hover:brightness-95`}>{statusMeta.label}</Badge>
            </div>
            <p className="mt-1 text-slate-500">Filed on {createdAt}</p>
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
                    <h2 className="text-2xl font-bold tracking-tight">Report #{report.id}</h2>

                    <Badge
                      variant="outline"
                      className="gap-1 border-yellow-200 bg-yellow-50 text-yellow-800"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {statusMeta.label}
                    </Badge>

                  </div>

                  <p className="text-muted-foreground text-sm">Submitted {createdAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Reporter */}
                <Card
                  className="hover:border-primary/50 cursor-pointer transition-colors"
                  onClick={() => report.reportedBy?.id && navigate(`/admin/users/${report.reportedBy.id}`)}
                >
                  <CardContent className="flex items-center gap-4 p-5">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback>{reporterName[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs font-medium uppercase">Reporter</p>
                      <p className="font-semibold">{reporterName}</p>
                      <p className="text-muted-foreground mt-1 text-xs">{report.reportedBy?.email}</p>
                    </div>
                    <ArrowRight className="text-muted-foreground h-4 w-4" />
                  </CardContent>
                </Card>

                {target.navigateTo && (
                  <Card
                    className="cursor-pointer border-red-200 transition-colors hover:border-red-400"
                    onClick={() => navigate(target.navigateTo)}
                  >
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-red-600 uppercase capitalize">
                          Reported {report.targetType}
                        </p>
                        <p className="font-semibold">{target.label}</p>
                        {target.sublabel && (
                          <p className="text-muted-foreground mt-1 text-xs">{target.sublabel}</p>
                        )}
                      </div>
                      <ArrowRight className="text-muted-foreground h-4 w-4" />
                    </CardContent>
                  </Card>
                )}
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
                  <h3 className="text-xl font-bold capitalize">{report.category || 'Report'}</h3>
                </div>

                <div className="prose text-foreground max-w-none">
                  <p className="text-lg leading-relaxed font-medium">{report.description}</p>
                </div>

                {Array.isArray(report.images) && report.images.length > 0 && (
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-base font-semibold">
                      <LucideImage className="text-primary h-5 w-5" /> Evidence
                    </h4>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {report.images.map((url, idx) => (
                        <a
                          key={`evidence-${idx}`}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="block overflow-hidden rounded-lg border"
                        >
                          <img src={url} alt={`Evidence ${idx + 1}`} className="aspect-square w-full object-cover" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <RiskAssessmentCard
            data={riskQuery.data}
            isLoading={riskQuery.isLoading}
            isError={riskQuery.isError}
            refetch={riskQuery.refetch}
            emptyMessage="Risk assessment could not be computed for this report subject."
          />

          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <label className="text-muted-foreground mb-2 block text-xs font-medium uppercase">
                  Update Investigation Status
                </label>
                <div className="relative">
                  <select
                    className="border-input bg-background focus:ring-ring w-full appearance-none rounded-md border px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    value={report.status}
                    onChange={(e) =>
                      updateStatus.mutate({ id: report.id, status: e.target.value })
                    }
                    disabled={updateStatus.isPending}
                  >
                    <option value="open">Open</option>
                    <option value="in_review">In Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                  <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2" onClick={() => updateStatus.mutate({ id: report.id, status: 'resolved' })}>
                  <CheckCircle className="h-4 w-4" />
                  Resolve Report
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={() => updateStatus.mutate({ id: report.id, status: 'dismissed' })}>
                  <X className="h-4 w-4" />
                  Dismiss Report
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
