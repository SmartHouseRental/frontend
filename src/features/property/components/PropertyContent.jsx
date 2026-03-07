import { BedDouble, Bath, Square, Users, Wifi, Car, ShieldCheck, Trees } from "lucide-react"

export default function PropertyContent() {

  const amenities = [
    { icon: Wifi, title: "High-speed WiFi", desc: "Dedicated fiber line" },
    { icon: Car, title: "Private Parking", desc: "Space for 2 cars" },
    { icon: ShieldCheck, title: "24/7 Security", desc: "Gated community" },
    { icon: Trees, title: "Private Garden", desc: "Lush outdoor area" },
  ]

  return (
    <div className="lg:w-2/3">

      {/* Quick info */}

      <div className="flex gap-8 py-6 border-y mb-8">

        <div className="flex items-center gap-2">
          <BedDouble className="text-primary"/>
          <span className="font-semibold">3 Bedrooms</span>
        </div>

        <div className="flex items-center gap-2">
          <Bath className="text-primary"/>
          <span className="font-semibold">2.5 Bathrooms</span>
        </div>

        <div className="flex items-center gap-2">
          <Square className="text-primary"/>
          <span className="font-semibold">280 m²</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="text-primary"/>
          <span className="font-semibold">Family Friendly</span>
        </div>

      </div>

      {/* Home story */}

      <section className="mb-12">

        <h3 className="text-2xl font-bold mb-4">
          The Home Story
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-4">
          This isn't just a house; it's where your family's next chapter begins. Located in Bole Atlas,
          the Morning Sun Villa captures the first Addis morning light with high ceilings and warm wood finishes.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Imagine weekends in the private garden hosting coffee ceremonies while the kids play safely in the courtyard.
        </p>

      </section>

      {/* Amenities */}

      <section className="mb-12">

        <h3 className="text-xl font-bold mb-6">
          What this home offers
        </h3>

        <div className="grid grid-cols-2 gap-6">

          {amenities.map((a,i)=>(
            <div key={i} className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
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