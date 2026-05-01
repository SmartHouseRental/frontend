import { Heart, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

// Stub: shows empty state until favorites integration
export default function SavedPropertiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero / Header */}
      <section className="via-background relative border-b bg-gradient-to-br from-[#D97745]/5 to-[#D97745]/10 px-6 py-14 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#D97745]/10">
                  <Heart className="h-6 w-6 fill-[#D97745] text-[#D97745]" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">Saved Properties</h1>
              </div>
              <p className="text-muted-foreground ml-[60px]">
                You haven't saved any properties yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content — Empty State */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-20">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-muted mb-6 flex size-24 items-center justify-center rounded-2xl">
            <Home className="text-muted-foreground h-10 w-10" />
          </div>
          <h2 className="mb-2 text-xl font-bold">No Saved Properties</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Start exploring homes and tap the <Heart className="inline h-4 w-4 text-[#D97745]" />{' '}
            icon to save your favorites here.
          </p>
          <Link to="/explore">
            <Button className="bg-primary text-primary-foreground rounded-xl px-8 py-3 font-bold shadow-lg">
              Explore Listings
            </Button>
          </Link>
        </div>
      </section>

      {/* Subtle background pattern */}
      <div className="ethiopian-pattern pointer-events-none fixed inset-0 -z-10" />
    </div>
  );
}
