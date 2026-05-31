import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Menu, X, User, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

function ThemeToggleButton({ className, iconSize = 17, onToggle, theme, label, title }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className,
      )}
      aria-label={label}
      title={title}
    >
      {theme === 'dark' ? (
        <Sun size={iconSize} strokeWidth={1.5} />
      ) : (
        <Moon size={iconSize} strokeWidth={1.5} />
      )}
    </button>
  );
}

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const isRenter = user?.role?.toLowerCase() === 'renter';
  const logoutMutation = useLogout();
  const location = useLocation();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const themeToggleLabel = t('header.toggleTheme');
  const themeToggleTitle =
    theme === 'dark' ? t('header.switchToLightMode') : t('header.switchToDarkMode');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/explore', label: t('explore') },
    ...(isAuthenticated && isRenter
      ? [
          { to: '/saved', label: t('saved') },
          { to: '/chat', label: t('messages') },
        ]
      : []),
    { to: '/about', label: t('about') },
    { to: '/contact', label: t('contact') },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled ? 'px-4 py-3 md:px-6' : 'px-0 py-0',
        )}
      >
        <div
          className={cn(
            'mx-auto flex items-center justify-between gap-4 px-4 py-3 transition-all duration-300 md:px-10 md:py-3.5',
            isScrolled
              ? 'glass-luxury shadow-luxury rounded-full py-2.5 md:px-6 md:py-3'
              : 'rounded-none border-b border-border bg-background/95 backdrop-blur-md',
          )}
        >
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary transition-transform group-hover:scale-105">
              <Building2 className="size-4.5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="hidden text-sm font-extrabold tracking-tight text-foreground sm:block">
              Bet-Connect
            </span>
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex lg:gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={`${to}-${label}`}
                to={to}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  location.pathname === to
                    ? 'bg-foreground/5 text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggleButton
              className="hidden sm:flex"
              theme={theme}
              onToggle={toggleTheme}
              label={themeToggleLabel}
              title={themeToggleTitle}
            />

            <LanguageSwitcher />

            {isAuthenticated && isRenter && (
              <Link
                to="/renter"
                className="hidden rounded-full border border-border p-3 text-[13px] font-medium text-foreground transition-colors hover:bg-muted sm:block"
              >
                <User size={16} />
              </Link>
            )}

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/signup"
                  className="hidden rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:block"
                >
                  {t('signup')}
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                {t('logout')}
              </button>
            )}

            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 340 }}
              className="fixed inset-y-0 right-0 z-[70] w-72 border-l border-border bg-card p-6 shadow-luxury-lg md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-tight text-foreground">Bet-Connect</span>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={`mobile-${to}-${label}`}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'rounded-2xl px-4 py-3 text-base font-medium',
                      location.pathname === to
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  {themeToggleTitle}
                </button>

                {isAuthenticated && isRenter && (
                  <Link
                    to="/renter"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-border px-4 py-3 text-center text-sm font-medium text-foreground"
                  >
                    Dashboard
                  </Link>
                )}

                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full rounded-full">
                        {t('login')}
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full rounded-full">{t('signup')}</Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    disabled={logoutMutation.isPending}
                  >
                    {t('logout')}
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
