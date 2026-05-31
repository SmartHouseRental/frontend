import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const isRenter = user?.role?.toLowerCase() === 'renter';
  const logoutMutation = useLogout();
  const location = useLocation();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
              : 'rounded-none border-b border-[#E5E5E5] bg-[#FAFAF9]/95 backdrop-blur-md ',
          )}
        >
          {/* Logo — Bet-Connect */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#0A0A0A] transition-transform group-hover:scale-105">
              <Building2 className="size-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="hidden text-sm font-extrabold tracking-tight text-[#111111] sm:block">
              Bet-Connect
            </span>
          </Link>

          {/* Desktop nav — centered, Header links only */}
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

          {/* Actions — Header content */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/search"
              className="hidden size-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#737373] transition-colors hover:bg-[#F5F5F4] hover:text-[#111111] sm:flex"
              aria-label="Search properties"
            >
              <Search size={17} strokeWidth={1.5} />
            </Link>

            <LanguageSwitcher />

            {isAuthenticated && isRenter && (
              <Link
                to="/renter"
                className="hidden rounded-full border border-[#E5E5E5] px-4 py-2 text-[13px] font-medium text-[#111111] transition-colors hover:bg-[#F5F5F4] sm:block"
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="hidden text-[13px] font-medium text-[#737373] transition-colors hover:text-[#111111] sm:block"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/signup"
                  className="hidden rounded-full bg-[#0A0A0A] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#171717] sm:block"
                >
                  {t('signup')}
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="hidden text-[13px] font-medium text-[#737373] transition-colors hover:text-[#111111] sm:block"
              >
                {t('logout')}
              </button>
            )}

            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full border border-[#E5E5E5] md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
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
              className="fixed inset-y-0 right-0 z-[70] w-72 bg-white p-6 shadow-luxury-lg md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-tight text-[#111111]">Bet-Connect</span>
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
                      location.pathname === to ? 'bg-[#F5F5F4] text-[#111111]' : 'text-[#737373]',
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-3 border-t border-[#E5E5E5] pt-6">
                <Link
                  to="/search"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-[#737373]"
                >
                  <Search size={16} /> Search
                </Link>

                {isAuthenticated && isRenter && (
                  <Link
                    to="/renter"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-[#E5E5E5] px-4 py-3 text-center text-sm font-medium"
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
                      <Button className="w-full rounded-full bg-[#0A0A0A] hover:bg-[#171717]">
                        {t('signup')}
                      </Button>
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
