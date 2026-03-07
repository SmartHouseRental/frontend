import { Star } from "lucide-react"

const reviews = [
  {
    name: "Almaz T.",
    stay: "Stayed 1 year • Verified Tenant",
    text: "Perfect for our kids. The garden is spacious and the neighborhood is very quiet at night. Maintenance was always responsive.",
    initial: "A",
  },
  {
    name: "Samuel B.",
    stay: "Stayed 6 months • Verified Tenant",
    text: "Internet speed was consistent, which was important for remote work. The house has a wonderful home-like atmosphere.",
    initial: "S",
  },
]

export default function Reviews() {
  return (
    <section>

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-bold">Family Reviews</h3>

          <div className="flex items-center gap-1 text-primary">
            <Star className="w-5 h-5" />
            <span className="font-bold">4.9</span>
          </div>
        </div>

        <button className="text-primary text-sm font-semibold">
          Read all reviews
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {reviews.map((r) => (
          <div key={r.name} className="space-y-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                {r.initial}
              </div>
              <div>
                <p className="font-bold text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.stay}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic leading-relaxed">
              “{r.text}”
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}