import Hero from '@/features/landing/components/Hero';
import FeaturedListings from '@/features/landing/components/FeaturedListings';
import HowItWorks from '@/features/landing/components/HowItWorks';
import Benefits from '@/features/landing/components/Benefits';
import MapSection from '@/features/landing/components/MapSection';
import Testimonials from '@/features/home/components/Testimonials';
import CTASection from '@/features/home/components/CTASection';

export default function LandingPage() {
    return (
        <div className="bg-background text-foreground">
            <Hero />
            <FeaturedListings />
            <HowItWorks />
            <Testimonials />
            <Benefits />
            <CTASection />
            <MapSection />
        </div>
    );
}
