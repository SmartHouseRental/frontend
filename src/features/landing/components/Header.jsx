import { Button } from '@/components/ui/button';
import { Home, Globe, Heart, MessageCircle, User, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { useChat } from '@/features/chat/ChatContext';
import { useAuth } from '@/features/users/AuthContext';

export default function Header() {
  const { favorites, hasNewFavorites } = useFavorites();
  const { unreadCount } = useChat();
  const { isAuthenticated, user, logout, openLoginModal } = useAuth();

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

          {isAuthenticated && (
            <>
              <Link
                to="/saved"
                className="relative flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#D97745]"
              >
                <Heart
                  className={`h-4 w-4 ${favorites.length > 0 ? 'fill-[#D97745] text-[#D97745]' : ''}`}
                />
                Saved
                {hasNewFavorites && (
                  <span className="absolute -top-2 -right-4 flex h-[18px] min-w-[18px] animate-pulse items-center justify-center rounded-full bg-[#D97745] px-1 text-[10px] font-bold text-white shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                to="/chat"
                className="hover:text-primary relative flex items-center gap-1.5 text-sm font-semibold transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Messages
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-4 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#D97745] px-1 text-[10px] font-bold text-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </>
          )}
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

          {isAuthenticated ? (
            <div className="border-border flex items-center gap-3 border-l pl-4">
              <div className="flex hidden flex-col items-end lg:flex">
                <span className="text-sm leading-none font-bold">{user.name}</span>
                <span className="text-muted-foreground mt-1 text-[10px] leading-none tracking-widest uppercase">
                  {user.role}
                </span>
              </div>
              <div className="group relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/20 hover:border-primary rounded-full transition-colors"
                >
                  <User className="h-4 w-4" />
                </Button>

                {/* Simple dropdown simulation */}
                <div className="invisible absolute top-full right-0 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="bg-card border-border min-w-[160px] rounded-xl border p-2 shadow-xl">
                    <Link
                      to="/profile"
                      className="hover:bg-muted flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                    >
                      <User className="h-4 w-4" />
                      View Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Button
              onClick={openLoginModal}
              className="shadow-primary/20 rounded-full px-6 font-bold shadow-lg transition-transform hover:scale-105"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
