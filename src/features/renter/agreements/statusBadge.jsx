import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  draft: 'bg-slate-500 hover:bg-slate-600',
  sent: 'bg-blue-500 hover:bg-blue-600',
  payment_pending: 'bg-amber-500 hover:bg-amber-600',
  completed: 'bg-emerald-500 hover:bg-emerald-600',
  rejected: 'bg-rose-500 hover:bg-rose-600',
  cancelled: 'bg-slate-400 hover:bg-slate-500',
  terminated: 'bg-slate-600 hover:bg-slate-700',
  expired: 'bg-orange-500 hover:bg-orange-600',
};

const PAYMENT_STATUS_STYLES = {
  pending: 'bg-amber-500 hover:bg-amber-600',
  processing: 'bg-blue-500 hover:bg-blue-600',
  success: 'bg-emerald-500 hover:bg-emerald-600',
  failed: 'bg-rose-500 hover:bg-rose-600',
  expired: 'bg-slate-400 hover:bg-slate-500',
};

export function AgreementStatusBadge({ status, label, className }) {
  return (
    <Badge
      className={cn(
        'text-white font-semibold',
        STATUS_STYLES[status] || 'bg-slate-500',
        className,
      )}
    >
      {label || status}
    </Badge>
  );
}

export function PaymentStatusBadge({ status, label, className }) {
  return (
    <Badge
      className={cn(
        'text-white font-semibold',
        PAYMENT_STATUS_STYLES[status] || 'bg-slate-500',
        className,
      )}
    >
      {label || status}
    </Badge>
  );
}
