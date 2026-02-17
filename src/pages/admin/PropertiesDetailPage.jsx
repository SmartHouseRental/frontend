import { useState } from 'react';
import {
  ZoomIn,
  Home,
  Bed,
  Wifi,
  Hotel,
  Cctv,
  Map,
  WashingMachine,
  HousePlug,
  ParkingSquare,
  ShowerHead,
  MapPin,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Send,
  ThumbsUp,
  Star,
  Calendar,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

import OwnerChat from '@/features/message/components/OwnerChat';

function GallerySection() {
  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="group border-border/60 relative aspect-[4/3] overflow-hidden rounded-2xl border bg-black shadow-xl sm:aspect-[21/9]">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGa9VWUeIpJ5lvc9e_T61IzjXJVX5HQMQrT93RV9lhILmKr8QdbOCc9gHc7F7e9OWdWNT0kGgPTiRHi4tPATT1GXv_IJVLHbh_STwx0LKV7As8_QZaxDp2HWuE3guefhCtfWLIcrF5VocO7UFaLuwpHXPxd2DlW8HPbGkdVbWDKFtNweIq8zOJuFjS_J23K5zs87NhHXiMvBTKxJKsGrG3qFvvNneQYXwLyEx2reKwm4y0w4nhTLFaSL19B0s8dq6fOaawqnlSTdNA"
          alt="Modern 3-bedroom apartment interior"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute right-4 bottom-4 flex gap-2.5 opacity-90 transition-opacity group-hover:opacity-100">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80">
            <ZoomIn className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent flex gap-2.5 overflow-x-auto pb-3">
        <button className="border-primary/40 ring-primary/20 hover:border-primary hover:ring-primary/40 relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 ring-1 transition-all">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGa9VWUeIpJ5lvc9e_T61IzjXJVX5HQMQrT93RV9lhILmKr8QdbOCc9gHc7F7e9OWdWNT0kGgPTiRHi4tPATT1GXv_IJVLHbh_STwx0LKV7As8_QZaxDp2HWuE3guefhCtfWLIcrF5VocO7UFaLuwpHXPxd2DlW8HPbGkdVbWDKFtNweIq8zOJuFjS_J23K5zs87NhHXiMvBTKxJKsGrG3qFvvNneQYXwLyEx2reKwm4y0w4nhTLFaSL19B0s8dq6fOaawqnlSTdNA"
            alt="Thumbnail 1"
            className="h-full w-full object-cover"
          />
        </button>

        <button className="hover:border-primary/60 relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 border-transparent transition-all">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPc67_u8In39uMSAnxEgN_zME8TLLgDNVADYakjQZjvU9Sd8_pHYiEIylL9rHfqIkQCFVX0EM8YJjcSCZxJeihZraGZpzAlhpcxvHMfoGw1eNeoHU1qDY1R4tuptmZOCr7pv0JHm9JMlrnsYrKDRWt_iOsXf1qa-b0l7dA6D5X8ZGyDunw_zYJhU_q8vQlA3XzStLM9zsraskRIbplcD9uYzSmuAGoL1918A2ZYoQdY92DfVX0c1y89KGi3wHFgQrfJukg5zq1zV9D"
            alt="Thumbnail 2"
            className="h-full w-full object-cover"
          />
        </button>

        <button className="hover:border-primary/60 relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 border-transparent transition-all">
          <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white">
            +12
          </div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAFhAk2erySqt8Yr-zweNPJ-6TWLGZrO6yJV7bb4UAKCuXQ0uqsV73EjDCHC8Bx1S7yJ8z-b0QbNalxTL6N_enrhqUa8Xx0zyuXwE8vKR6lAqYhndpsc7hDurgxsa64lc8All0gkc1jmwNoa4aHx_sjPQNBTrhEMs84uwjUWhPb-fzxiJ1akxt_PmfKGKM64y0X9INDJ0FejynAMpkoaVLyCiTqbpudj4O72zGS0c7EdNWHDd7oiUEJtQTRMUPi7jyRvgVDR2BBQlx"
            alt="More photos"
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </div>
  );
}

function PropertyInfoCard({ userRating, setUserRating, hoveredRating, setHoveredRating }) {
  const averageRating = 4.5;
  const reviewCount = 18;
  const views = '1.2k';
  const relativeTime = 'Listed 3 months ago';

  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50"
              >
                <CheckCircle className="mr-1.5 h-4 w-4" />
                Available
              </Badge>
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50"
              >
                <Home className="mr-1.5 h-4 w-4" />
                Apartment
              </Badge>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Modern 3-Bedroom Apartment in Bole
            </h1>

            <div className="text-muted-foreground flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Bole, Addis Ababa, Ethiopia • ID:{' '}
                <strong className="text-foreground">ET-99283</strong>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{relativeTime}</span>
              </div>
            </div>

            {/* Compact stats row */}
            <div className="flex items-center gap-5 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-primary font-medium">{views}</span>
                <span>views</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : star === Math.floor(averageRating) + 1 && averageRating % 1 >= 0.5
                            ? 'fill-yellow-400/60 text-yellow-400'
                            : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{averageRating}</span>
                <span className="text-muted-foreground">({reviewCount})</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Monthly Rent
            </span>
            <span className="text-primary text-3xl font-extrabold sm:text-4xl">45,000 ETB</span>
          </div>
        </div>

        {/* Rate this property */}
        <div className="mt-6 border-t pt-5">
          <p className="mb-2.5 text-sm font-medium">Rate this property</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110 focus:outline-none"
                onClick={() => setUserRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    hoveredRating >= star || userRating >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground hover:text-yellow-300'
                  }`}
                />
              </button>
            ))}

            {userRating > 0 && (
              <Button size="sm" className="ml-4">
                Submit {userRating} ★
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DescriptionSection() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Description</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-4 leading-relaxed">
        <p>
          This beautifully designed modern 3-bedroom apartment is located in the heart of Bole, one
          of Addis Ababa's most sought-after neighborhoods. The unit features spacious open-plan
          living areas, large floor-to-ceiling windows that flood the space with natural light, and
          high-quality finishes throughout.
        </p>
        <p>
          The fully fitted kitchen comes with modern appliances, granite countertops, and ample
          storage. All three bedrooms are generously sized with built-in wardrobes, and the master
          bedroom includes an en-suite bathroom with a walk-in shower. The apartment also benefits
          from a private balcony with city views.
        </p>
        <p>
          Residents enjoy access to 24/7 security, CCTV surveillance, basement parking, high-speed
          elevator, backup generator, and high-speed internet infrastructure. Located just minutes
          from Edna Mall, major international schools, hospitals, and Bole International Airport —
          perfect for families and professionals alike.
        </p>
        <p className="text-muted-foreground text-sm italic">
          Note: All measurements and features are approximate. Please contact the owner for the most
          current information and to schedule a viewing.
        </p>
      </CardContent>
    </Card>
  );
}

export default function PropertiesDetailPage() {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <main className="bg-background min-h-screen pb-16">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Gallery + Main Info + Sidebar */}
        <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-12 lg:gap-8">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-8 lg:space-y-8">
            <GallerySection />
            <PropertyInfoCard
              userRating={userRating}
              setUserRating={setUserRating}
              hoveredRating={hoveredRating}
              setHoveredRating={setHoveredRating}
            />
            <DescriptionSection />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <OwnerChat />
            </div>
          </aside>
        </div>

        {/* Specifications + Map */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Specifications */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-7">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-muted-foreground text-sm">Listing ID</div>
                  <div className="mt-1.5 font-medium">ET-99283</div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground text-sm">Total Area</div>
                  <div className="text-primary mt-1.5 text-xl font-bold">120 m²</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 flex items-center gap-3.5 rounded-xl border px-4 py-3.5">
                  <Bed className="text-primary h-6 w-6" />
                  <div>
                    <div className="leading-tight font-semibold">3</div>
                    <div className="text-muted-foreground text-xs">Bedrooms</div>
                  </div>
                </div>
                <div className="bg-muted/30 flex items-center gap-3.5 rounded-xl border px-4 py-3.5">
                  <ShowerHead className="text-primary h-6 w-6" />
                  <div>
                    <div className="leading-tight font-semibold">2.5</div>
                    <div className="text-muted-foreground text-xs">Bathrooms</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm">
                  {[
                    { Icon: Wifi, label: 'High Speed WiFi' },
                    { Icon: ParkingSquare, label: 'Basement Parking' },
                    { Icon: Hotel, label: '24/7 Elevator' },
                    { Icon: HousePlug, label: 'Generator Backup' },
                    { Icon: Cctv, label: 'CCTV Security' },
                    { Icon: WashingMachine, label: 'Internal Laundry' },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <Icon className="text-primary h-4.5 w-4.5" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="border-border/60 shadow-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">Location</CardTitle>
                <p className="text-muted-foreground mt-1 text-sm">
                  Bole Medhanialem Area, Addis Ababa
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Map className="h-4 w-4" />
                Open in Maps
              </Button>
            </CardHeader>
            <CardContent>
              <div className="bg-muted relative aspect-video overflow-hidden rounded-2xl border shadow-inner">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpSG0L2fDi7fFBXggX89PKf0S-o-qRxdZgIgrlvr2xCKhgijJMpVADDL3FKv553kjivVytpAGXnWcRDrZ0C9eEbuKTyYDsE9OJZNlRkBDKW-BckEjXULuPsv4aWb7_EXCVBlRT3pJHcjTVjyYRdyDqN6XobWBKJ0u5agNEzxXlCQkNjhVjp5PJQiI47_mtdOaldLhdGcAlf20lTo5N4AE0f8ub84V4KeDHaIr954aikPwqK4SL0QBeZ_XvE9Utxiy-rcQ9kbQs5BRP"
                  alt="Satellite map view of Bole, Addis Ababa"
                  className="h-full w-full object-cover opacity-85 grayscale-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="h-12 w-12 text-red-500 drop-shadow-lg" />
                </div>
                <div className="absolute bottom-5 left-5 max-w-xs rounded-xl bg-white/90 p-4 text-sm shadow-lg backdrop-blur-md dark:bg-black/75">
                  <p className="text-muted-foreground mb-2.5 text-xs font-semibold uppercase">
                    Nearby Landmarks
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between font-medium">
                      <span>Edna Mall</span>
                      <span className="text-primary">450 m</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Bole Airport</span>
                      <span className="text-primary">2.1 km</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comments */}
        <section className="mt-12">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                <MessageSquare className="text-primary h-5 w-5" />
                Comments (3)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* New Comment Input */}
              <div className="flex gap-4">
                <Avatar className="h-11 w-11 border">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Add a comment about this property..."
                    className="min-h-[88px] resize-none text-base"
                  />
                  <div className="flex justify-end">
                    <Button className="gap-2 px-6">
                      <Send className="h-4 w-4" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Comments with nesting */}
              <div className="space-y-8">
                {/* Comment 1 with replies */}
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-semibold">John Doe</span>
                        <span className="text-muted-foreground text-xs">2 days ago</span>
                        <Badge variant="secondary" className="text-xs">
                          Tenant
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1.5 leading-relaxed">
                        The location is perfect — very close to Edna Mall and the airport. The
                        photos look accurate. Is the generator reliable during power cuts?
                      </p>
                      <div className="text-muted-foreground mt-2.5 flex gap-6 text-xs">
                        <button className="hover:text-foreground flex items-center gap-1.5 transition-colors">
                          <ThumbsUp className="h-3.5 w-3.5" /> 4
                        </button>
                        <button className="hover:text-foreground transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  <div className="ml-14 space-y-5">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" />
                        <AvatarFallback>AK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-primary font-semibold">Abebe Kebede</span>
                          <span className="text-muted-foreground text-xs">Owner • 1 day ago</span>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                          Hi John, thank you for your interest! Yes, the generator is very reliable
                          — it kicks in automatically within seconds during outages and covers the
                          whole building. Feel free to come for a viewing to test everything
                          yourself.
                        </p>
                        <div className="text-muted-foreground mt-2 flex gap-5 text-xs">
                          <button className="hover:text-foreground flex items-center gap-1.5 transition-colors">
                            <ThumbsUp className="h-3 w-3" /> 2
                          </button>
                          <button className="hover:text-foreground transition-colors">Reply</button>
                        </div>
                      </div>
                    </div>

                    <div className="ml-12 flex gap-3">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">John Doe</span>
                          <span className="text-muted-foreground text-xs">1 day ago</span>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                          Thank you Abebe! I'll contact you soon to arrange a visit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment 2 */}
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-semibold">Sara Kebede</span>
                      <span className="text-muted-foreground text-xs">1 week ago</span>
                      <Badge variant="secondary" className="text-xs">
                        Interested
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1.5 leading-relaxed">
                      Looks very modern! How much is the service charge per month? And is parking
                      included for visitors?
                    </p>
                    <div className="text-muted-foreground mt-2.5 flex gap-6 text-xs">
                      <button className="hover:text-foreground flex items-center gap-1.5 transition-colors">
                        <ThumbsUp className="h-3.5 w-3.5" /> 2
                      </button>
                      <button className="hover:text-foreground transition-colors">Reply</button>
                    </div>
                  </div>
                </div>

                {/* Comment 3 */}
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-semibold">Michael T.</span>
                      <span className="text-muted-foreground text-xs">3 weeks ago</span>
                    </div>
                    <p className="text-muted-foreground mt-1.5 leading-relaxed">
                      Great amenities list. Is the WiFi stable for remote work? Planning to move in
                      next month.
                    </p>
                    <div className="text-muted-foreground mt-2.5 flex gap-6 text-xs">
                      <button className="hover:text-foreground flex items-center gap-1.5 transition-colors">
                        <ThumbsUp className="h-3.5 w-3.5" /> 1
                      </button>
                      <button className="hover:text-foreground transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-center">
                <Button variant="outline" size="sm" className="gap-1.5">
                  Load more comments
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-muted-foreground mt-16 border-t pt-10 text-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span>Created: Oct 12, 2023</span>
              <span>Last Updated: 2 days ago</span>
              <span>Moderator Assigned: Dawit L.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Audit Logs
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support Hub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
