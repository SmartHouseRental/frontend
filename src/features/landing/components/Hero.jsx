import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Hero() {
  return (
    <section className="relative px-4 py-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[560px] rounded-xl overflow-hidden flex items-center justify-center text-center p-12 shadow-2xl">

          <div className="absolute inset-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiBb1NM5847S207x5huwwcuv5kBXN_PLmy0vBJsL_6S2MX6L6qsm2c3tYAXii6b7lXV4Za110Kl4nEdSMr3YicFtJszfIMEiPdfSa32dEQidLxQwB62HsCcTREM1Ph03G5i32bq0LNEcvf1JT-027aG_i6f__iQHlipspzOd8HIWFP1c-uOx9IR8csqo4GX_P01JYtsG2q3StVskMxRtAHtSq-n1f5SdtD01_OcQcxsoRtHWZ71rzNvizcbMM0ySLjbCtJE9WbT2Y"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <h1 className="text-5xl font-extrabold text-white mb-6">
              Find Your Perfect{" "}
              <span className="text-primary">Family Home</span>
            </h1>

            <p className="text-white/90 mb-10">
              Verified, family-oriented long stays.
            </p>

            <div className="bg-white/95 p-3 rounded-xl shadow-xl flex flex-col lg:flex-row gap-2">
              <Input placeholder="City..." />
              <Input placeholder="Price Range" />
              <Input placeholder="Bedrooms" />
              <Button className="px-8">Search</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}