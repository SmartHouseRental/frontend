import { Button } from '@/components/ui/button';
import { Home, Globe, Heart, MessageCircle, User, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b px-6 py-4 shadow-sm backdrop-blur-md lg:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="group flex items-center gap-2 transition-all">
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg transition-transform group-hover:rotate-6">
            <Home className="h-5 w-5" />
          </div>
          <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
            Bet-Connect
          </h1>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="hover:text-primary text-sm font-semibold transition-colors">
            Home
          </Link>
          <Link
            to="/explore"
            className="hover:text-primary text-sm font-semibold transition-colors"
          >
            Explore
          </Link>

          <Link to="/about" className="hover:text-primary text-sm font-semibold transition-colors">
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-primary text-sm font-semibold transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary hidden items-center gap-2 rounded-full lg:flex"
          >
            <Globe className="h-4 w-4" />
            EN / አማ
          </Button>

          <Link to="/renter">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border bg-muted/50 transition-all hover:ring-2 hover:ring-primary"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              className="shadow-primary/20 rounded-full px-6 font-bold shadow-lg transition-transform hover:scale-105"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
