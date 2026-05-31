import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const NEUTRAL_BADGE = 'bg-muted-foreground hover:bg-muted-foreground/90';

const STATUS_STYLES = {
  draft: NEUTRAL_BADGE,
  sent: 'bg-blue-500 hover:bg-blue-600',
  payment_pending: 'bg-amber-500 hover:bg-amber-600',
  completed: 'bg-emerald-500 hover:bg-emerald-600',
  rejected: 'bg-rose-500 hover:bg-rose-600',
  cancelled: NEUTRAL_BADGE,
  terminated: NEUTRAL_BADGE,
  expired: 'bg-orange-500 hover:bg-orange-600',
};

const PAYMENT_STATUS_STYLES = {
  pending: 'bg-amber-500 hover:bg-amber-600',
  processing: 'bg-blue-500 hover:bg-blue-600',
  success: 'bg-emerald-500 hover:bg-emerald-600',
  failed: 'bg-rose-500 hover:bg-rose-600',
  expired: NEUTRAL_BADGE,
};

export function AgreementStatusBadge({ status, label, className }) {
  return (
    <Badge
      className={cn(
        'font-semibold text-white',
        STATUS_STYLES[status] || NEUTRAL_BADGE,
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
        'font-semibold text-white',
        PAYMENT_STATUS_STYLES[status] || NEUTRAL_BADGE,
        className,
      )}
    >
      {label || status}
    </Badge>
  );
}
