import {
  ShieldCheck,
  Brain,
  Headset
} from "lucide-react"

export default function Benefits() {
  return (
    <section className="py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

        <div className="lg:w-1/2 space-y-8">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            Why Choose Beten
          </div>

          <h2 className="text-5xl font-extrabold leading-tight">
            Trust & Technology For Your Family's Comfort
          </h2>

          <div className="space-y-6">

            <Feature
              icon={<ShieldCheck className="h-6 w-6 text-primary" />}
              title="Verified Listings"
              desc="Every property is physically visited and verified."
            />

            <Feature
              icon={<Brain className="h-6 w-6 text-primary" />}
              title="AI-Powered Long Stays"
              desc="Smart matching for long-term living."
            />

            <Feature
              icon={<Headset className="h-6 w-6 text-primary" />}
              title="24/7 Support"
              desc="Dedicated team ready to assist."
            />
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -right-10 size-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfC6CaPYWvbI6UliNQcOcxAY8mki5EBP-fkt884ae0bVk0OSLlIfOuC5bVqHR8qYdEAz9zG7EzX1uVDYMJw0F3-2wCg4Wm6K-TvclJQaLzLV7thWY_jpF5pciYm7WAj5dKSROB5uA0dckcdnYoN3qrns5skybHYVIXnd_C36kllFq7klycNyna2YYSSGa6rfh0K4dDuPTPgHSq0dhkzFevoERW036mLUmJErHCsJ94mM6YYLwDG6XcizDSoIyUId4xXX9t5ft7lvg" className="rounded-xl shadow-lg mt-8" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdBgrkTv-dHodBFaF6moAmpGrIIWxQzuWMsw6_MTY0hPKMBw9pECySa1BNnFUbKeql3oXM62vk4ift7ReN__EoNsXD3y757PtYP_V8-pmd11BNBQEW0gsNP6D4pssc2-9hIJetgGDeReQqREgWNrXkSIHYOkE7208GdCHmNJ3tjntsDWLK3QldjHEmwFJwMDI_dbYZhgRP62UmBB2tLboJ1ty07OllWotHXGlogAvoxWTnaaC2gTR-kOLZx16Ott4duru6BJrDbuY" className="rounded-xl shadow-lg" />
          </div>
        </div>

      </div>
    </section>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}