import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';

export default function Hero() {
  return (
    <section className="relative px-4 py-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-xl p-12 text-center shadow-2xl">
          <div className="absolute inset-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiBb1NM5847S207x5huwwcuv5kBXN_PLmy0vBJsL_6S2MX6L6qsm2c3tYAXii6b7lXV4Za110Kl4nEdSMr3YicFtJszfIMEiPdfSa32dEQidLxQwB62HsCcTREM1Ph03G5i32bq0LNEcvf1JT-027aG_i6f__iQHlipspzOd8HIWFP1c-uOx9IR8csqo4GX_P01JYtsG2q3StVskMxRtAHtSq-n1f5SdtD01_OcQcxsoRtHWZ71rzNvizcbMM0ySLjbCtJE9WbT2Y"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <h1 className="mb-6 text-5xl font-extrabold text-white">
              Find Your Perfect <span className="text-primary">Family Home</span>
            </h1>

            <p className="mb-10 text-white/90">Verified, family-oriented long stays.</p>

            <div className="flex flex-col gap-2 rounded-xl bg-white/95 p-3 shadow-xl lg:flex-row">
              <Input placeholder="City..." />
              <Input placeholder="Price Range" />
              <Input placeholder="Bedrooms" />
              <Button className="px-8" asChild>
                <Link to="/explore">Search</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
