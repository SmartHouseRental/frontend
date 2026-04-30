import { Building2, Users, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="bg-primary/5 relative overflow-hidden px-6 py-24 lg:px-20">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
          <h1 className="mb-8 text-4xl font-black tracking-tight md:text-6xl">
            Redefining <span className="text-primary">Family Living</span> in Ethiopia
          </h1>
          <p className="text-muted-foreground mb-10 max-w-2xl text-lg">
            Bet-Connect is the leading platform for families to find secure, comfortable, and
            verified long-stay rentals across Addis Ababa and beyond.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild className="rounded-full px-8">
              <Link to="/explore">Explore Listings</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Background Accents */}
        <div className="bg-primary/10 absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />
      </section>

      {/* Mission & Vision */}
      <section className="bg-background px-6 py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Our mission is to create a seamless bridge between property owners and families
              seeking long-term homes. We believe that finding a home should be a joyful experience,
              not a stressful one.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              By leveraging technology and human trust, we ensure every listing on our platform
              belongs to the "Excellence" category—verified for security, amenities, and family
              comfort.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card border-border rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-xl">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-bold">1,200+</h3>
              <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
                Verified Homes
              </p>
            </div>
            <div className="bg-card border-border rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-xl">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-bold">5,000+</h3>
              <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
                Happy Families
              </p>
            </div>
            <div className="bg-card border-border rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-xl">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-bold">100%</h3>
              <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
                Secure Profile
              </p>
            </div>
            <div className="bg-card border-border rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-xl">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-bold">Top Rated</h3>
              <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
                Customer Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 px-6 py-24 lg:px-20">
        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Core Values</h2>
          <p className="text-muted-foreground mx-auto max-w-xl">
            The principles that guide us every day in building the future of Ethiopian rentals.
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {[
            {
              title: 'Trust First',
              desc: 'Every owner and every property is manually verified by our team before they appear on your screen.',
              icon: ShieldCheck,
            },
            {
              title: 'Family Centric',
              desc: 'We focus exclusively on long-stay rentals that offer the space and security families need to thrive.',
              icon: Heart,
            },
            {
              title: 'Innovation',
              desc: 'Continuous improvement of our digital platform to make renting as easy as ordering a cup of coffee.',
              icon: Building2,
            },
          ].map((value, i) => (
            <div
              key={i}
              className="bg-card border-border flex flex-col items-center rounded-3xl border p-8 text-center shadow-sm transition-all hover:-translate-y-1"
            >
              <div className="bg-primary text-primary-foreground shadow-primary/20 mb-6 flex size-16 items-center justify-center rounded-2xl shadow-lg">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-20">
        <div className="bg-primary text-primary-foreground relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] p-12 text-center shadow-2xl md:p-20">
          <div className="relative z-10">
            <h2 className="mb-8 text-3xl leading-tight font-black md:text-5xl">
              Ready to find your <br /> next forever home?
            </h2>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="group h-14 rounded-full px-10 text-lg font-bold transition-transform hover:scale-105"
            >
              <Link to="/explore" className="flex items-center gap-2">
                Start Searching
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/10" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white/10" />
        </div>
      </section>
    </div>
  );
}
