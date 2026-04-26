import { Button } from "@/components/ui/button"
import { Home, Globe, Heart, MessageCircle, User, LogOut, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom" 
import { useFavorites } from "@/features/favorites/FavoritesContext"
import { useChat } from "@/features/chat/ChatContext"
import { useAuth } from "@/features/users/AuthContext"

export default function Header() {
  const { favorites, hasNewFavorites } = useFavorites();
  const { unreadCount } = useChat();
  const { isAuthenticated, user, logout, openLoginModal } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b px-6 lg:px-20 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2 group transition-all">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground group-hover:rotate-6 transition-transform">
            <Home className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Bet-Connect
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-sm font-semibold hover:text-primary transition-colors">
            Explore
          </Link>
          
          <Link to="/about" className="text-sm font-semibold hover:text-primary transition-colors">
            About
          </Link>

          <Link to="/contact" className="text-sm font-semibold hover:text-primary transition-colors">
            Contact
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/saved" className="relative text-sm font-semibold hover:text-[#D97745] flex items-center gap-1.5 transition-colors">
                <Heart className={`h-4 w-4 ${favorites.length > 0 ? "fill-[#D97745] text-[#D97745]" : ""}`} />
                Saved
                {hasNewFavorites && (
                  <span className="absolute -top-2 -right-4 min-w-[18px] h-[18px] bg-[#D97745] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm animate-pulse">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link to="/chat" className="relative text-sm font-semibold hover:text-primary flex items-center gap-1.5 transition-colors">
                <MessageCircle className="h-4 w-4" />
                Messages
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-4 min-w-[18px] h-[18px] bg-[#D97745] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="rounded-full hidden lg:flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Globe className="h-4 w-4" />
            EN / አማ
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="flex flex-col items-end hidden lg:flex">
                <span className="text-sm font-bold leading-none">{user.name}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none mt-1">{user.role}</span>
              </div>
              <div className="relative group">
                <Button variant="outline" size="icon" className="rounded-full border-primary/20 hover:border-primary transition-colors">
                  <User className="h-4 w-4" />
                </Button>
                
                {/* Simple dropdown simulation */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-card border border-border rounded-xl shadow-xl p-2 min-w-[160px]">
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                      <User className="w-4 h-4" />
                      View Profile
                    </Link>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Button 
              onClick={openLoginModal}
              className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              Login
            </Button>
          )}
        </div>

      </div>
    </header>
  )
}