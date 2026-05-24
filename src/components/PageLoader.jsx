import { Loader2 } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <Loader2 className="text-primary animate-spin" size={32} aria-label="Loading page" />
    </div>
  );
}
