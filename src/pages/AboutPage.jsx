import { Building2, Users, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-24 px-6 lg:px-20 overflow-hidden bg-primary/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            Redefining <span className="text-primary">Family Living</span> in Ethiopia
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground mb-10">
            Bet-Connect is the leading platform for families to find secure, comfortable, and verified long-stay rentals across Addis Ababa and beyond.
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 lg:px-20 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Our mission is to create a seamless bridge between property owners and families seeking long-term homes. We believe that finding a home should be a joyful experience, not a stressful one. 
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              By leveraging technology and human trust, we ensure every listing on our platform belongs to the "Excellence" category—verified for security, amenities, and family comfort.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">1,200+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Verified Homes</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">5,000+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Happy Families</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">100%</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Secure Profile</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Top Rated</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 lg:px-20 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Core Values</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The principles that guide us every day in building the future of Ethiopian rentals.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Trust First",
              desc: "Every owner and every property is manually verified by our team before they appear on your screen.",
              icon: ShieldCheck
            },
            {
              title: "Family Centric",
              desc: "We focus exclusively on long-stay rentals that offer the space and security families need to thrive.",
              icon: Heart
            },
            {
              title: "Innovation",
              desc: "Continuous improvement of our digital platform to make renting as easy as ordering a cup of coffee.",
              icon: Building2
            }
          ].map((value, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-3xl border border-border shadow-sm transition-all hover:-translate-y-1">
              <div className="size-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-6 shadow-lg shadow-primary/20">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center text-primary-foreground shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              Ready to find your <br /> next forever home?
            </h2>
            <Button size="lg" variant="secondary" asChild className="rounded-full px-10 h-14 font-bold text-lg hover:scale-105 transition-transform group">
              <Link to="/explore" className="flex items-center gap-2">
                Start Searching
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 border-4 border-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border-4 border-white/10 rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
      </section>
    </div>
  );
}
