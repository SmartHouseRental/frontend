import { BedDouble, Bath, Square, Users, Wifi, Car, ShieldCheck, Trees } from "lucide-react"

export default function PropertyContent({ property }) {
  const defaultAmenities = [
    { icon: Wifi, title: "High-speed WiFi", desc: "Dedicated fiber line" },
    { icon: Car, title: "Private Parking", desc: "Space for 2 cars" },
    { icon: ShieldCheck, title: "24/7 Security", desc: "Gated community" },
    { icon: Trees, title: "Private Garden", desc: "Lush outdoor area" },
  ]

  const displayAmenities = property?.amenities?.length > 0
    ? property.amenities.map(a => ({ icon: ShieldCheck, title: a, desc: "Included" }))
    : defaultAmenities;

  return (
    <div className="lg:w-2/3">
      {/* Quick info */}
      <div className="flex flex-wrap gap-6 py-6 border-y mb-8">
        <div className="flex items-center gap-2">
          <BedDouble className="text-primary"/>
          <span className="font-semibold">{property?.bedrooms || 0} Bedrooms</span>
        </div>

        <div className="flex items-center gap-2">
          <Bath className="text-primary"/>
          <span className="font-semibold">{property?.bathrooms || 0} Bathrooms</span>
        </div>

        <div className="flex items-center gap-2">
          <Square className="text-primary"/>
          <span className="font-semibold">{property?.area || 0} {property?.areaUnit || 'sqm'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="text-primary"/>
          <span className="font-semibold">{property?.furnishingStatus || 'Family Friendly'}</span>
        </div>
      </div>

      {/* Home story / Description */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">
          The Home Story
        </h3>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {property?.description || "This property is located in a prime area, offering comfort and style for its residents. Experience the best of living in this well-maintained residence."}
        </p>
      </section>

      {/* Amenities */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-6">
          What this home offers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayAmenities.map((a, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <a.icon className="text-primary"/>
              </div>
              <div>
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
