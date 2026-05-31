import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

function PageHeader({ title, description, backLink, children, className, badge }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {backLink && (
          <Link to={backLink}>
            <Button variant="outline" size="icon-sm" className="mt-0.5 shrink-0">
              <ArrowLeft size={16} />
            </Button>
          </Link>
        )}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export default PageHeader;
