import Hero from './Hero';
import PropertySearchHero from './PropertySearchHero';

/**
 * Card-in-card landing shell — Vistahaven-inspired premium layout.
 */
export default function LandingShell({ children }) {
  return (
    <div className="bg-muted/50 min-h-screen ">
      <div className="mx-auto px-2 md:px-4 lg:px-5 overflow-hidden bg-card ">
        <Hero />
        <PropertySearchHero />
        <div className="bg-card">{children}</div>
      </div>
    </div>
  );
}
