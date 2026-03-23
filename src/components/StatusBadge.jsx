const defaultStatusMap = {
  Available: 'bg-emerald-100 text-emerald-700',
  Active: 'bg-emerald-100 text-emerald-700',
  Confirmed: 'bg-emerald-100 text-emerald-700',
  Published: 'bg-emerald-100 text-emerald-700',
  Verified: 'bg-emerald-100 text-emerald-700',
  Resolved: 'bg-emerald-100 text-emerald-700',
  Rented: 'bg-blue-100 text-blue-700',
  Completed: 'bg-blue-100 text-blue-700',
  'Under Review': 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  Maintenance: 'bg-amber-100 text-amber-700',
  Open: 'bg-amber-100 text-amber-700',
  Draft: 'bg-slate-100 text-slate-600',
  Expired: 'bg-slate-100 text-slate-600',
  Unlisted: 'bg-slate-100 text-slate-600',
  Cancelled: 'bg-rose-100 text-rose-700',
  Terminated: 'bg-rose-100 text-rose-700',
  Rejected: 'bg-rose-100 text-rose-700',
  Dismissed: 'bg-rose-100 text-rose-700',
};

function StatusBadge({ status, statusMap, className = '' }) {
  const colorMap = statusMap || defaultStatusMap;
  const colorClass = colorMap[status] || 'bg-slate-100 text-slate-600';

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${colorClass} ${className}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
