const defaultStatusMap = {
    Available: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    Confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    Published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    Verified: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    Resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    Rented: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    Completed: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    'Under Review': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    'In Progress': 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    Maintenance: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    Open: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    Draft: 'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400',
    Expired: 'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400',
    Unlisted: 'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400',
    Cancelled: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
    Terminated: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
    Rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
    Dismissed: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
};

function StatusBadge({ status, statusMap, className = '' }) {
    const colorMap = statusMap || defaultStatusMap;
    const colorClass = colorMap[status] || 'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400';

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${colorClass} ${className}`}
        >
            {status}
        </span>
    );
}

export default StatusBadge;
