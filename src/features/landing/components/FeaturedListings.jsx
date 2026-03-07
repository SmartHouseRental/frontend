import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const listings = [
  {
    title: "Modern Villa, Old Airport",
    price: "ETB 45,000 /mo",
    beds: 4,
    baths: 3,
    size: "350 m²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVgURC1lpKm2NhTjoN7OKXfArljV4h3wLH6LpjWuPeGCTDtBV4kJ6qriA-GgEEHF6goYhJeqb-X1HUf1VAFWd3UGza05kHoGe5oin8TRXd4XbpTFnTYCD_yhWbtJvRw3xGH18_ymJt-97r6da6q_0I4Fi7xHoi5Yj8CB4Z_W5cmZx0S9tnPh2ZcqMF6zmzAB503SOjajS9edta0m4A1QiiqKhVLEpN3y9o1OzCZILWZefKYilnrTnmZvmQmpcWFj8hUaP_rQKBv34",
    tag: "Verified",
  },
  {
    title: "Spacious Bungalow, Bole",
    price: "ETB 60,000 /mo",
    beds: 5,
    baths: 4,
    size: "2 Parking",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0EeJDohb-Y-fG5jl0JvchacLjGXSYKxJQ_Lsm74xhAr3GeVPK2Cb6MoifTfaU5VnXJhv7OwaJAvh9OW_0TDGAK6_bI0O-sU_-_ZbP75Qw2WnDclVfPrmeYlEFNvjNnqZ3z1uyXXVj486wfyCrxJNK5xzNHRUDvOoIwswYy4bjCr6wGZguGZcgARNNB8rh69u5gGzTCxau_iXfIygVW8UuF8E26CZd6QwajrWrotpwOgVe3gNXYOgB9ORMmKGsC6JlIIAyJObMu5U",
  },
  {
    title: "Garden Retreat, Sarbet",
    price: "ETB 35,000 /mo",
    beds: 3,
    baths: 2,
    size: "Big Yard",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb6JVfIscuxpDpXY41W8u4msNauYJnhHhpGchHpF9_Znw-vuBj8leYM312fc8uhXapfNkWwQpR0A-6FT7dgffuTRaTIu-5hZKRHbSeKcU-_4nEx7VFmv-_Mxh7u0XQn4wqnRrmaZA-aCJd5ZC9alyuJcQ0_rm7Ba0f-g3Ir8Qmc9sLJIN9oHZ0tztXBZ-_nq_8sKJtxb0BPhLDqxeKAUs1PEbedCLbhvjWqFGZuIQvNxDkBmRakF1I1jE6F90GlviJJE2fHykwUnY",
    tag: "New Listing",
  },
]

export default function FeaturedListings() {
  return (
    <section className="py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">
              Featured Family Homes
            </h2>
            <p className="text-muted-foreground">
              Hand-picked residences for comfort and security
            </p>
          </div>
          <Button variant="ghost" className="text-primary font-bold">
            See all listings →
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((home, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={home.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {home.tag && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {home.tag}
                  </Badge>
                )}
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-md font-bold text-sm">
                  {home.price}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-bold mb-1">{home.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Addis Ababa, Ethiopia
                </p>

                <div className="flex gap-4 text-sm text-muted-foreground border-t pt-3">
                  <span>{home.beds} Beds</span>
                  <span>{home.baths} Baths</span>
                  <span>{home.size}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}