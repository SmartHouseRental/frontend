import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Globe, User, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useLanguage } from '@/contexts/LanguageContext';

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'am', label: 'አማርኛ' },
];

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const isRenter = user?.role?.toLowerCase() === 'renter';
  const logoutMutation = useLogout();
  const location = useLocation();
  const { locale, setLocale, t } = useLanguage();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

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
            {t('home')}
          </Link>
          <Link
            to="/explore"
            className="hover:text-primary text-sm font-semibold transition-colors"
          >
            {t('explore')}
          </Link>

          {isAuthenticated && isRenter && (
            <>
              <Link to="/saved" className="hover:text-primary text-sm font-semibold transition-colors">
                {t('saved')}
              </Link>
              <Link to="/chat" className="hover:text-primary text-sm font-semibold transition-colors">
                {t('messages')}
              </Link>
            </>
          )}

          <Link to="/about" className="hover:text-primary text-sm font-semibold transition-colors">
            {t('about')}
          </Link>

          <Link
            to="/contact"
            className="hover:text-primary text-sm font-semibold transition-colors"
          >
            {t('contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="text-muted-foreground hover:text-primary rounded-full"
                aria-label="Select language"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
              {LANGUAGE_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className="cursor-pointer font-medium"
                  onClick={() => setLocale(option.value)}
                >
                  <span className="flex flex-1 items-center justify-between gap-3">
                    {option.label}
                    {locale === option.value && (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    )}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated && isRenter && (
            <Link to="/renter">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border bg-muted/50 transition-all hover:ring-2 hover:ring-primary"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="shadow-primary/20 rounded-full px-6 font-bold shadow-lg transition-transform hover:scale-105"
            >
              {logoutMutation.isPending ? t('loggingOut') : t('logout')}
            </Button>
          ) : (
            <Link to="/login" state={{ from: location }}>
              <Button className="shadow-primary/20 rounded-full px-6 font-bold shadow-lg transition-transform hover:scale-105">
                {t('login')}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
