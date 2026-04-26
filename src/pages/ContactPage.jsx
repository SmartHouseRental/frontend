import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="py-20 px-6 lg:px-20 bg-background text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have questions about a listing or want to partner with us? Our team is here to help you find the perfect family home.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="pb-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Email Us</p>
                    <p className="font-bold text-lg">hello@bet-connect.com</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Call Us</p>
                    <p className="font-bold text-lg">+251 911 234 567</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Office Location</p>
                    <p className="font-bold text-lg">Bole, Medhanialem Street</p>
                    <p className="text-sm text-muted-foreground mt-1">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <p>Typical response time: <span className="font-bold text-foreground">Under 2 hours</span></p>
                </div>
              </div>
            </div>

            {/* Social Links / Map Thumbnail */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-border bg-muted flex items-center justify-center group cursor-pointer shadow-sm">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiBb1NM5847S207x5huwwcuv5kBXN_PLmy0vBJsL_6S2MX6L6qsm2c3tYAXii6b7lXV4Za110Kl4nEdSMr3YicFtJszfIMEiPdfSa32dEQidLxQwB62HsCcTREM1Ph03G5i32bq0LNEcvf1JT-027aG_i6f__iQHlipspzOd8HIWFP1c-uOx9IR8csqo4GX_P01JYtsG2q3StVskMxRtAHtSq-n1f5SdtD01_OcQcxsoRtHWZ71rzNvizcbMM0ySLjbCtJE9WbT2Y" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
              <Button variant="secondary" size="sm" className="relative z-10 rounded-full font-bold shadow-xl">
                View on Google Maps
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-card rounded-[2rem] p-8 md:p-12 border border-border shadow-xl shadow-primary/5">
            <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Full Name</label>
                  <Input placeholder="Abebe Bikila" className="h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Email Address</label>
                  <Input type="email" placeholder="abebe@example.com" className="h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Phone Number</label>
                  <Input placeholder="+251 911..." className="h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Subject</label>
                  <Input placeholder="Inquiry about pricing" className="h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Your Message</label>
                <Textarea 
                  placeholder="How can we help you?" 
                  className="min-h-[160px] rounded-2xl border-border/60 bg-muted/30 focus:bg-background transition-colors resize-none p-4" 
                />
              </div>

              <div className="pt-4">
                <Button className="w-full h-14 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-3">
                  Send Message
                  <Send className="w-5 h-5" />
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  By submitting this form, you agree to our <button type="button" className="underline hover:text-primary">Privacy Policy</button>.
                </p>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
