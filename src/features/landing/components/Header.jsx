import { Button } from "@/components/ui/button"
import { Home, Globe } from "lucide-react"
import { Link } from "react-router-dom" 

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b px-6 lg:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <Home className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Bet-Connect
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
        <Link to="/explore" className="text-sm font-semibold hover:text-primary">
          Explore
        </Link>

        <Link to="/list" className="text-sm font-semibold hover:text-primary">
          List Property
        </Link>

        <Link to="/about" className="text-sm font-semibold hover:text-primary">
          About
        </Link>

        <Link to="/contact" className="text-sm font-semibold hover:text-primary">
          Contact
        </Link>
</nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full flex items-center gap-2">
            <Globe className="h-4 w-4" />
            EN / አማ
          </Button>
        </div>

      </div>
    </header>
  )
}