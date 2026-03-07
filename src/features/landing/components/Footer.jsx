import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-12 mb-16">

          <div>
            <h2 className="text-xl font-extrabold mb-4">Beten</h2>
            <p className="text-background/50 text-sm">
              Redefining rentals for families in Ethiopia.
            </p>
          </div>

          <FooterCol title="Platform" items={[
            "Find a House",
            "List Property",
            "How it Works",
          ]} />

          <FooterCol title="Company" items={[
            "About",
            "Careers",
            "Support",
          ]} />

          <div>
            <h4 className="font-bold mb-6 text-primary uppercase text-xs tracking-widest">
              Newsletter
            </h4>
            <div className="flex gap-2">
              <Input placeholder="Email address" />
              <Button>Send</Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-xs text-background/40 flex justify-between">
          <p>© 2024 Beten. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Cookies</span>
            <span>Security</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="font-bold mb-6 text-primary uppercase text-xs tracking-widest">
        {title}
      </h4>
      <ul className="space-y-4 text-sm text-background/60">
        {items.map((item, i) => (
          <li key={i} className="hover:text-background cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}