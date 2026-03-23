import { cn } from '@/lib/utils';

const defaultStatusMap = {};

/**
 * Reusable colored pill badge for status display.
 *
 * @param {object} props
 * @param {string} props.status - Status key (e.g. 'active', 'pending')
 * @param {object} props.statusMap - Maps status key → { label, style }
 * @param {string} [props.className] - Additional classes
 */
function StatusBadge({ status, statusMap = defaultStatusMap, className }) {
    const config = statusMap[status] || { label: status, style: 'bg-slate-100 text-slate-600' };

    return (
        <span
            className={cn(
                'rounded-full px-2.5 py-1 text-[10px] font-bold uppercase whitespace-nowrap',
                config.style,
                className
            )}
        >
            {config.label}
        </span>
    );
}

export default StatusBadge;
