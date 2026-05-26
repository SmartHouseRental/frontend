import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Shield, Send, CheckCircle2, Loader2 } from 'lucide-react';
import ErrorState from '@/components/ErrorState';
import { getApiErrorMessage } from '@/lib/apiErrors';
import { useTranslation } from 'react-i18next';
import { useOwnerReports, useSubmitOwnerReportResponse } from '@/features/reports/hooks/useOwnerReports';
import { REPORT_STATUS_COLORS, REPORT_STATUS_LABELS } from '@/features/reports/constants';

function formatReporterName(reportedBy) {
  if (!reportedBy) return 'Unknown';
  const name = [reportedBy.first_name, reportedBy.last_name].filter(Boolean).join(' ').trim();
  if (name) return name;
  return reportedBy.role ? `${reportedBy.role}` : 'Unknown';
}

function formatReportDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTargetLabel(report, t) {
  if (report.targetType === 'user') return t('owner.reports.againstAccount');
  return t('owner.reports.againstProperty');
}

function canRespond(status) {
  return status === 'open' || status === 'in_review';
}

function ReportsPage() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error, refetch } = useOwnerReports({ limit: 50 });
  const submitMutation = useSubmitOwnerReportResponse();

  const [expandedId, setExpandedId] = useState(null);
  const [responseTexts, setResponseTexts] = useState({});

  const reports = data?.items ?? [];
  const stats = data?.summary ?? { total: 0, open: 0, resolved: 0 };

  const handleSubmitResponse = (reportId) => {
    const text = responseTexts[reportId];
    if (!text?.trim() || text.trim().length < 10) return;

    submitMutation.mutate(
      { reportId, response: text.trim() },
      {
        onSuccess: () => {
          setResponseTexts((prev) => ({ ...prev, [reportId]: '' }));
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="scrollbar-hide h-screen overflow-y-auto p-8">
        <ErrorState
          title={t('owner.reports.failed')}
          message={getApiErrorMessage(error, t('owner.reports.unableToLoad'))}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{t('owner.reports.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('owner.reports.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: t('owner.reports.total'), value: stats.total, icon: AlertTriangle, bg: 'bg-amber-500/10', text: 'text-amber-500' },
          { label: t('owner.reports.open'), value: stats.open, icon: Clock, bg: 'bg-rose-500/10', text: 'text-rose-500', valueColor: 'text-rose-600' },
          { label: t('owner.reports.resolved'), value: stats.resolved, icon: Shield, bg: 'bg-emerald-500/10', text: 'text-emerald-500', valueColor: 'text-emerald-600' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-0 hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
                  <Icon size={18} className={s.text} />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{s.label}</p>
                  <p className={`text-xl font-extrabold ${s.valueColor || ''}`}>{s.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="text-center py-12">
              <Shield size={32} className="mx-auto text-muted-foreground/20 mb-3" />
              <p className="text-muted-foreground">{t('owner.reports.noReports')}</p>
            </CardContent>
          </Card>
        ) : (
          reports.map((report) => {
            const isExpanded = expandedId === report.id;
            const statusLabel = t(`owner.reports.statuses.${report.status}`, {
              defaultValue: REPORT_STATUS_LABELS[report.status] || report.status,
            });
            const statusColor = REPORT_STATUS_COLORS[report.status] || 'bg-slate-100 text-slate-600';
            const isSubmitting = submitMutation.isPending && submitMutation.variables?.reportId === report.id;

            return (
              <Card key={report.id} className={`transition-all duration-300 ${isExpanded ? 'shadow-md border-primary/20' : 'hover:shadow-md'}`}>
                <CardContent>
                  <button
                    type="button"
                    className="flex w-full items-start gap-4 text-left"
                    onClick={() => setExpandedId(isExpanded ? null : report.id)}
                  >
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                      <AlertTriangle size={20} className="text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-foreground">{report.category}</p>
                          <Badge className={`border-0 text-[10px] uppercase ${statusColor}`}>{statusLabel}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatReportDate(report.createdAt)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{formatTargetLabel(report, t)} • {report.id}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">{report.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-2">
                        {t('owner.reports.reportedBy', { name: formatReporterName(report.reportedBy) })}
                      </p>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-200 space-y-4">
                      {report.ownerResponse && (
                        <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
                          <p className="text-xs font-bold text-emerald-700 mb-1 flex items-center gap-1">
                            <CheckCircle2 size={12} /> {t('owner.reports.yourResponse')}
                          </p>
                          <p className="text-sm text-foreground">{report.ownerResponse}</p>
                        </div>
                      )}

                      {canRespond(report.status) && !report.ownerResponse && (
                        <div>
                          <p className="text-xs font-bold text-foreground mb-2">{t('owner.reports.submitYourResponse')}</p>
                          <textarea
                            value={responseTexts[report.id] || ''}
                            onChange={(e) => setResponseTexts((prev) => ({ ...prev, [report.id]: e.target.value }))}
                            className="w-full h-24 rounded-lg border border-border bg-muted/30 p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                            placeholder={t('owner.reports.explainSide')}
                          />
                          <div className="flex justify-end mt-2">
                            <Button
                              size="sm"
                              className="gap-1"
                              onClick={() => handleSubmitResponse(report.id)}
                              disabled={
                                !responseTexts[report.id]?.trim() ||
                                responseTexts[report.id]?.trim().length < 10 ||
                                isSubmitting
                              }
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 size={12} className="animate-spin" /> {t('owner.reports.submitting')}
                                </>
                              ) : (
                                <>
                                  <Send size={12} /> {t('owner.reports.submitResponse')}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}

                      {report.status === 'resolved' && (
                        <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} /> {t('owner.reports.resolvedStatus')}
                        </p>
                      )}

                      {report.status === 'dismissed' && (
                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} /> {t('owner.reports.dismissedStatus')}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ReportsPage;
