import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Error state with icon, message, and retry button.
 *
 * @param {object} props
 * @param {string} [props.title='Something went wrong'] - Error title
 * @param {string} [props.message] - Error description
 * @param {function} [props.onRetry] - Retry callback
 */
function ErrorState({
    title = 'Something went wrong',
    message = 'We couldn\'t load the data. Please check your connection and try again.',
    onRetry,
    retryLabel = 'Try Again',
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-8 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <AlertCircle size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-muted-foreground mt-1 max-w-md text-sm">{message}</p>
            {onRetry && (
                <Button
                    variant="outline"
                    className="mt-4 gap-2"
                    onClick={onRetry}
                >
                    <RefreshCw size={16} />
                    {retryLabel}
                </Button>
            )}
        </div>
    );
}

export default ErrorState;
