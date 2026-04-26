import Header from "@/features/landing/components/Header"
import Hero from "@/features/landing/components/Hero"
import FeaturedListings from "@/features/landing/components/FeaturedListings"
import HowItWorks from "@/features/landing/components/HowItWorks"
import Benefits from "@/features/landing/components/Benefits"
import MapSection from "@/features/landing/components/MapSection"
import Footer from "@/features/landing/components/Footer"

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero />
      <FeaturedListings />
      <HowItWorks />
      <Benefits />
      <MapSection />
      {/* <Footer /> */}
    </div>
  )
}