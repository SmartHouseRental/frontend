import { useState } from "react"

const amenities = [
  "Garden",
  "Generator",
  "Water Tank",
  "Security",
  "Parking",
  "WiFi",
  "Compound",
  "Laundry",
]

export default function AmenitiesSection() {
  const [selected, setSelected] = useState([])

  function toggleAmenity(a) {
    setSelected((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    )
  }

  return (
    <section className="bg-muted/40 border rounded-xl p-8 space-y-6">

      <h3 className="text-xl font-bold">Essential Amenities</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {amenities.map((amenity) => {
          const active = selected.includes(amenity)

          return (
            <button
              key={amenity}
              onClick={() => toggleAmenity(amenity)}
              className={`p-6 rounded-xl border text-sm font-bold transition
              ${active
                ? "border-primary bg-primary/10 text-primary"
                : "bg-background hover:border-border"
              }`}
            >
              {amenity}
            </button>
          )
        })}
      </div>

    </section>
  )
}