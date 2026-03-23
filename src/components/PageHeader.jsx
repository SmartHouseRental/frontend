import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

function PageHeader({ title, description, backLink, children }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        {backLink && (
          <Link to={backLink}>
            <Button variant="outline" size="icon" className="mt-1 h-9 w-9 shrink-0">
              <ArrowLeft size={16} />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-foreground text-3xl font-extrabold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

export default PageHeader;
