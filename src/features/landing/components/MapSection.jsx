import PropertyMap from "@/components/map/PropertyMap";
import { properties } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function MapSection() {
  const previewProperties = properties.slice(0, 3); // Just show a few on homepage

  return (
    <section className="py-24 px-6 lg:px-20 bg-foreground text-background rounded-t-[3rem] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

        <div className="lg:w-1/3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Listings
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Available Across <br /> <span className="text-primary italic">Addis Ababa</span>
          </h2>
          <p className="text-background/60 mb-10 text-lg leading-relaxed">
            Finding a home is easier when you can see the neighborhood. Explore our verified listings in prime locations.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              "Bole Atlas", "Old Airport", "Sarbet", "Kazanchis", "CMC", "Ayat"
            ].map((loc) => (
              <div key={loc} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {loc}
              </div>
            ))}
          </div>

          <Button size="lg" asChild className="rounded-full px-8 h-14 font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            <Link to="/explore?view=map">Explore Full Map</Link>
          </Button>
        </div>

        <div className="lg:w-2/3 w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 ring-8 ring-white/5">
          <PropertyMap 
            properties={previewProperties} 
            mode="preview" 
            zoom={12}
          />
        </div>

      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0" />
    </section>
  )
}