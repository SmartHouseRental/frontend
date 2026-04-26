import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-12 mb-16">

          <div>
            <h2 className="text-xl font-extrabold mb-4 text-primary">Bet-Connect</h2>
            <p className="text-background/50 text-sm leading-relaxed">
              Redefining rentals for families in Ethiopia by providing secure, verified, and comfortable long-stay homes.
            </p>
          </div>

          <FooterCol title="Platform" items={[
            { label: "Find a House", path: "/explore" },
            { label: "List Property", path: "/owner/properties/new" },
            { label: "How it Works", path: "/#how-it-works" },
          ]} />

          <FooterCol title="Company" items={[
            { label: "About Us", path: "/about" },
            { label: "Contact", path: "/contact" },
            { label: "Support", path: "/contact" },
          ]} />

          <div>
            <h4 className="font-bold mb-6 text-primary uppercase text-xs tracking-widest">
              Newsletter
            </h4>
            <div className="flex gap-2">
              <Input placeholder="Email address" className="bg-background/10 border-white/20 text-background placeholder:text-background/30" />
              <Button className="font-bold">Join</Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-xs text-background/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 Bet-Connect. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-background cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-background cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-background cursor-pointer transition-colors">Cookie Policy</span>
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
          <li key={i}>
            <Link to={item.path} className="hover:text-background cursor-pointer transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}