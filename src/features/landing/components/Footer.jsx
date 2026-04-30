import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-white/5 px-6 pt-20 pb-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="text-primary mb-4 text-xl font-extrabold">Bet-Connect</h2>
            <p className="text-background/50 text-sm leading-relaxed">
              Redefining rentals for families in Ethiopia by providing secure, verified, and
              comfortable long-stay homes.
            </p>
          </div>

          <FooterCol
            title="Platform"
            items={[
              { label: 'Find a House', path: '/explore' },
              { label: 'List Property', path: '/owner/properties/new' },
              { label: 'How it Works', path: '/#how-it-works' },
            ]}
          />

          <FooterCol
            title="Company"
            items={[
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
              { label: 'Support', path: '/contact' },
            ]}
          />

          <div>
            <h4 className="text-primary mb-6 text-xs font-bold tracking-widest uppercase">
              Newsletter
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder="Email address"
                className="bg-background/10 text-background placeholder:text-background/30 border-white/20"
              />
              <Button className="font-bold">Join</Button>
            </div>
          </div>
        </div>

        <div className="border-background/10 text-background/40 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs md:flex-row">
          <p>© 2024 Bet-Connect. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-background cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-background cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-background cursor-pointer transition-colors">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="text-primary mb-6 text-xs font-bold tracking-widest uppercase">{title}</h4>
      <ul className="text-background/60 space-y-4 text-sm">
        {items.map((item, i) => (
          <li key={i}>
            <Link to={item.path} className="hover:text-background cursor-pointer transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
