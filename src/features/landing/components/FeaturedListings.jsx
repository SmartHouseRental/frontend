import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import HeartButton from '@/features/favorites/components/HeartButton';

const listings = [
  {
    id: 'modern-villa-old-airport',
    title: 'Modern Villa, Old Airport',
    price: 'ETB 45,000 /mo',
    beds: 4,
    baths: 3,
    size: '350 m²',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVgURC1lpKm2NhTjoN7OKXfArljV4h3wLH6LpjWuPeGCTDtBV4kJ6qriA-GgEEHF6goYhJeqb-X1HUf1VAFWd3UGza05kHoGe5oin8TRXd4XbpTFnTYCD_yhWbtJvRw3xGH18_ymJt-97r6da6q_0I4Fi7xHoi5Yj8CB4Z_W5cmZx0S9tnPh2ZcqMF6zmzAB503SOjajS9edta0m4A1QiiqKhVLEpN3y9o1OzCZILWZefKYilnrTnmZvmQmpcWFj8hUaP_rQKBv34',
    tag: 'Verified',
    location: 'Old Airport, Addis Ababa',
  },
  {
    id: 'spacious-bungalow-bole',
    title: 'Spacious Bungalow, Bole',
    price: 'ETB 60,000 /mo',
    beds: 5,
    baths: 4,
    size: '2 Parking',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0EeJDohb-Y-fG5jl0JvchacLjGXSYKxJQ_Lsm74xhAr3GeVPK2Cb6MoifTfaU5VnXJhv7OwaJAvh9OW_0TDGAK6_bI0O-sU_-_ZbP75Qw2WnDclVfPrmeYlEFNvjNnqZ3z1uyXXVj486wfyCrxJNK5xzNHRUDvOoIwswYy4bjCr6wGZguGZcgARNNB8rh69u5gGzTCxau_iXfIygVW8UuF8E26CZd6QwajrWrotpwOgVe3gNXYOgB9ORMmKGsC6JlIIAyJObMu5U',
    location: 'Bole, Addis Ababa',
  },
  {
    id: 'garden-retreat-sarbet',
    title: 'Garden Retreat, Sarbet',
    price: 'ETB 35,000 /mo',
    beds: 3,
    baths: 2,
    size: 'Big Yard',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb6JVfIscuxpDpXY41W8u4msNauYJnhHhpGchHpF9_Znw-vuBj8leYM312fc8uhXapfNkWwQpR0A-6FT7dgffuTRaTIu-5hZKRHbSeKcU-_4nEx7VFmv-_Mxh7u0XQn4wqnRrmaZA-aCJd5ZC9alyuJcQ0_rm7Ba0f-g3Ir8Qmc9sLJIN9oHZ0tztXBZ-_nq_8sKJtxb0BPhLDqxeKAUs1PEbedCLbhvjWqFGZuIQvNxDkBmRakF1I1jE6F90GlviJJE2fHykwUnY',
    tag: 'New Listing',
    location: 'Sarbet, Addis Ababa',
  },
];

export default function FeaturedListings() {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-extrabold">Featured Family Homes</h2>
            <p className="text-muted-foreground">Hand-picked residences for comfort and security</p>
          </div>
          <Button
            variant="ghost"
            className="text-primary font-bold transition-all hover:translate-x-1"
            asChild
          >
            <Link to="/explore">See all listings →</Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((home) => (
            <Card
              key={home.id}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
              onClick={() => navigate(`/property/${home.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={home.image}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {home.tag && (
                  <Badge className="bg-primary text-primary-foreground absolute top-4 left-4">
                    {home.tag}
                  </Badge>
                )}

                {/* Heart button */}
                <HeartButton property={home} className="absolute top-4 right-4 z-10" />

                <div className="absolute bottom-4 left-4 rounded-md bg-white/90 px-3 py-1 text-sm font-bold">
                  {home.price}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="group-hover:text-primary mb-1 text-lg font-bold transition-colors">
                  {home.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">Addis Ababa, Ethiopia</p>

                <div className="text-muted-foreground flex gap-4 border-t pt-3 text-sm">
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
  );
}
