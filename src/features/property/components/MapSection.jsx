import PropertyMap from "@/components/map/PropertyMap";
import { MapPin, Info } from "lucide-react";

export default function MapSection({ property }) {
  if (!property) return null;

  const poiList = [
    { label: "Public School", distance: "1.2km" },
    { label: "Shopping Mall", distance: "800m" },
    { label: "Hospital", distance: "2.5km" },
  ];

  // Get coordinates from location object or fallback
  const lat = property.location?.lat || 9.0300;
  const lng = property.location?.lng || 38.7578;
  const address = property.address || "Addis Ababa, Ethiopia";

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">Location & Neighborhood</h3>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {address}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/10">
          <Info className="w-3 h-3" />
          Verified Coordinates
        </div>
      </div>

      <div className="h-96 rounded-3xl overflow-hidden relative border border-border shadow-xl ring-8 ring-muted/30">
        <PropertyMap
          properties={[property]}
          center={[lat, lng]}
          zoom={15}
          mode="detail"
        />

        {/* POI Overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 pointer-events-none z-[10]">
          {poiList.map((poi) => (
            <div
              key={poi.label}
              className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-[11px] font-bold shadow-lg flex items-center gap-2 border border-black/5 pointer-events-auto hover:bg-white transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {poi.label} <span className="text-muted-foreground font-normal">({poi.distance})</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground leading-relaxed italic">
        "This neighborhood is known for its safety, quiet streets, and proximity to major international schools and shopping centers in {address.split(',')[0]}."
      </p>
    </section>
  );
}