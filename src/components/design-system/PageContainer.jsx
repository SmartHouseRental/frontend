import { cn } from '@/lib/utils';

/**
 * Standard dashboard page wrapper with consistent padding and scroll behavior.
 */
export function PageContainer({ children, className, fullHeight = true }) {
  return (
    <div
      className={cn(
        'animate-fade-in ',
        fullHeight && 'scrollbar-hide min-h-[calc(100vh-4rem)] overflow-y-auto',
        className,
      )}
    >
      <div className="mx-auto max-w-[1600px] space-y-6 lg:space-y-8">{children}</div>
    </div>
  );
}

export default PageContainer;
