import { cn } from '@/lib/utils';

/**
 * Period selector toggle for analytics charts.
 */
export function PeriodToggle({ periods = [], value, onChange, className }) {
  return (
    <div
      className={cn(
        'bg-muted/60 inline-flex gap-0.5 rounded-lg p-0.5',
        className,
      )}
    >
      {periods.map((period) => (
        <button
          key={period.value}
          type="button"
          onClick={() => onChange(period.value)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-200',
            value === period.value
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

export default PeriodToggle;
