import PropertyHero from "@/features/property/components/PropertyHero"
import PropertyContent from "@/features/property/components/PropertyContent"
import BookingCard from "@/features/property/components/BookingCard"

import OwnerCard from "@/features/property/components/OwnerCard"
import MapSection from "@/features/property/components/MapSection"
import Reviews from "@/features/property/components/Reviews"

export default function PropertyDetails() {
  return (
    <div className="min-h-screen">

      

      <main className="max-w-7xl mx-auto px-6 py-8">

        <PropertyHero />

        <div className="flex flex-col lg:flex-row gap-12">

          <PropertyContent />

          <div className="lg:w-1/3">
            <BookingCard />
          </div>

        </div>

        <OwnerCard />
        <MapSection />
        <Reviews />

      </main>

      <div className="fixed inset-0 ethiopian-pattern pointer-events-none -z-10"></div>

    </div>
  )
}