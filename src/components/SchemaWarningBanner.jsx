import { AlertCircle } from 'lucide-react';

/**
 * Shown when API returns partial data or a schema-sync warning.
 */
export function SchemaWarningBanner({ message, className = '' }) {
  if (!message) return null;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100 ${className}`}
      role="status"
    >
      <AlertCircle className="mt-0.5 shrink-0 text-amber-600" size={18} />
      <p>{message}</p>
    </div>
  );
}
