import PropertyMap from '@/components/map/PropertyMap';
import { properties } from '@/lib/dummyData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function MapSection() {
  const previewProperties = properties.slice(0, 3); // Just show a few on homepage

  return (
    <section className="bg-foreground text-background relative overflow-hidden rounded-t-[3rem] px-6 py-24 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
        <div className="relative z-10 lg:w-1/3">
          <div className="bg-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            Live Listings
          </div>

          <h2 className="mb-6 text-4xl leading-tight font-black md:text-5xl">
            Available Across <br /> <span className="text-primary italic">Addis Ababa</span>
          </h2>
          <p className="text-background/60 mb-10 text-lg leading-relaxed">
            Finding a home is easier when you can see the neighborhood. Explore our verified
            listings in prime locations.
          </p>

          <div className="mb-10 grid grid-cols-2 gap-4">
            {['Bole Atlas', 'Old Airport', 'Sarbet', 'Kazanchis', 'CMC', 'Ayat'].map((loc) => (
              <div
                key={loc}
                className="hover:text-primary flex cursor-default items-center gap-2 text-sm font-medium transition-colors"
              >
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                {loc}
              </div>
            ))}
          </div>

          <Button
            size="lg"
            asChild
            className="shadow-primary/20 h-14 rounded-full px-8 text-lg font-bold shadow-xl transition-transform hover:scale-105"
          >
            <Link to="/explore?view=map">Explore Full Map</Link>
          </Button>
        </div>

        <div className="h-[500px] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl ring-8 ring-white/5 lg:w-2/3">
          <PropertyMap properties={previewProperties} mode="preview" zoom={12} />
        </div>
      </div>

      {/* Decorative background element */}
      <div className="bg-primary/10 absolute top-1/2 left-0 -z-0 h-96 w-96 -translate-y-1/2 rounded-full blur-[120px]" />
    </section>
  );
}
