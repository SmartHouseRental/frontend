import { Clock, CheckCircle, XCircle } from "lucide-react";

const STATUS = {
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-600",
    iconColor: "text-amber-500",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle,
    bg: "bg-green-50 border-green-200",
    text: "text-green-700",
    iconColor: "text-green-500",
  },
  rejected: {
    label: "Not Available",
    icon: XCircle,
    bg: "bg-red-50 border-red-200",
    text: "text-red-600",
    iconColor: "text-red-500",
  },
};

/**
 * Small badge showing visit status.
 */
export function VisitStatusBadge({ status, className = "" }) {
  const cfg = STATUS[status] ?? STATUS.pending;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${className}`}
    >
      <Icon className={`h-3.5 w-3.5 ${cfg.iconColor}`} />
      {cfg.label}
    </span>
  );
}

/**
 * Full card for a scheduled visit, with reschedule and cancel actions.
 */
export function VisitCard({ visit, onReschedule, onCancel }) {
  const cfg = STATUS[visit.status] ?? STATUS.pending;
  const Icon = cfg.icon;

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${cfg.bg} visit-card-enter`}
    >
      {/* Status row */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-1.5 text-sm font-bold ${cfg.text}`}>
          <Icon className={`h-4 w-4 ${cfg.iconColor}`} />
          {cfg.label}
        </div>
        <span className="text-[10px] text-muted-foreground">
          {new Date(visit.updatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
        <p>
          <span className="font-semibold text-foreground">{formatDate(visit.date)}</span>
          {" · "}
          {visit.timeSlot}
          {" · "}
          <span className="capitalize">{visit.type === "virtual" ? "Virtual Tour" : "In-Person"}</span>
        </p>
        {visit.ownerName && (
          <p>Owner: <span className="font-medium text-foreground">{visit.ownerName}</span></p>
        )}
      </div>

      {/* Actions */}
      {(onReschedule || onCancel) && (
        <div className="flex gap-2">
          {onReschedule && (
            <button
              onClick={onReschedule}
              className="flex-1 py-1.5 rounded-lg border border-current text-xs font-semibold text-[#D97745] border-[#D97745]/40 hover:bg-[#D97745]/5 transition-colors"
            >
              Reschedule
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 py-1.5 rounded-lg border border-red-300 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}
