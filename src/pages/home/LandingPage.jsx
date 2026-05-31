import LandingShell from '@/features/landing/components/LandingShell';
import FeaturedListings from '@/features/landing/components/FeaturedListings';
import AIRecommendations from '@/features/landing/components/AIRecommendations';
import NearMeSection from '@/features/landing/components/NearMeSection';
import HowItWorks from '@/features/landing/components/HowItWorks';
import Benefits from '@/features/landing/components/Benefits';
import MapSection from '@/features/landing/components/MapSection';
import Testimonials from '@/features/home/components/Testimonials';
import CTASection from '@/features/home/components/CTASection';

export default function LandingPage() {
  return (
    <LandingShell>
      <FeaturedListings />
      <AIRecommendations />
      <NearMeSection />
      <HowItWorks />
      <Testimonials />
      <Benefits />
      <CTASection />
      <MapSection />
    </LandingShell>
  );
}
