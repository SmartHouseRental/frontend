import {
  AlertTriangle,
  Shield,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';

const LEVEL_META = {
  low: {
    label: 'Low risk',
    style: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: ShieldCheck,
    ring: 'text-emerald-600',
  },
  medium: {
    label: 'Medium risk',
    style: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Shield,
    ring: 'text-amber-600',
  },
  high: {
    label: 'High risk',
    style: 'bg-rose-100 text-rose-800 border-rose-200',
    icon: ShieldAlert,
    ring: 'text-rose-600',
  },
};

function formatSubjectType(type) {
  if (!type) return 'Subject';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function RiskAssessmentCard({
  title = 'Risk Assessment',
  data,
  isLoading,
  isError,
  refetch,
  emptyMessage = 'No risk assessment data available for this investigation.',
}) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <AlertTriangle className="text-primary h-4 w-4" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton rows={3} columns={1} showHeader={false} />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <AlertTriangle className="text-primary h-4 w-4" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState title="Could not load risk assessment" onRetry={refetch} />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <AlertTriangle className="text-primary h-4 w-4" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground flex items-start gap-2 text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            {emptyMessage}
          </p>
        </CardContent>
      </Card>
    );
  }

  const levelMeta = LEVEL_META[data.level] || LEVEL_META.low;
  const LevelIcon = levelMeta.icon;
  const breakdown = data.reportsAgainstSubject || {};
  const factors = Array.isArray(data.factors) ? data.factors : [];

  return (
    <Card className="border-[#A47551]/15 overflow-hidden shadow-sm">
      <CardHeader className="border-b border-border/60 bg-muted/20 pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <AlertTriangle className="text-primary h-4 w-4" />
            {title}
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => refetch?.()} type="button">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">
          Computed {data.computedAt ? new Date(data.computedAt).toLocaleString() : '—'}
          {data.version != null && ` · v${data.version}`}
        </p>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        <div className="flex items-center gap-4">
          <div
            className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 bg-white ${levelMeta.ring} border-current/30`}
          >
            <span className="text-2xl font-black">{data.score ?? 0}</span>
            <span className="text-muted-foreground absolute -bottom-1 text-[9px] font-bold uppercase">
              score
            </span>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <Badge variant="outline" className={`gap-1.5 font-bold ${levelMeta.style}`}>
              <LevelIcon className="h-3.5 w-3.5" />
              {levelMeta.label}
            </Badge>
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">{data.previousReportsCount ?? 0}</span>{' '}
              unresolved report(s) against this subject
            </p>
            <p className="text-muted-foreground text-xs capitalize">
              Subject: {formatSubjectType(data.subject?.type)}
              {data.subject?.agreementId && ` · Agreement ${String(data.subject.agreementId).slice(0, 8)}…`}
              {data.subject?.propertyId && !data.subject?.agreementId &&
                ` · Property ${String(data.subject.propertyId).slice(0, 8)}…`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { key: 'open', label: 'Open', tone: 'bg-rose-50 text-rose-700' },
            { key: 'in_review', label: 'In review', tone: 'bg-amber-50 text-amber-700' },
            { key: 'resolved', label: 'Resolved', tone: 'bg-emerald-50 text-emerald-700' },
            { key: 'dismissed', label: 'Dismissed', tone: 'bg-slate-100 text-slate-600' },
          ].map((item) => (
            <div key={item.key} className={`rounded-lg px-3 py-2 text-center ${item.tone}`}>
              <p className="text-lg font-bold">{breakdown[item.key] ?? 0}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>

        {factors.length > 0 ? (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
              Risk factors
            </p>
            <ul className="space-y-2">
              {factors.map((factor) => (
                <li
                  key={factor.code}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-2"
                >
                  <span className="text-sm font-medium">{factor.label}</span>
                  <span className="text-muted-foreground shrink-0 text-xs font-bold">
                    +{factor.weight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No contributing risk factors identified.</p>
        )}
      </CardContent>
    </Card>
  );
}
