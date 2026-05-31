import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Building2, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';

export default function LandingNav({ className }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const logoutMutation = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/explore', label: t('explore') },
    { to: '/about', label: t('about') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <>
      <header
        className={cn(
          'relative z-50 flex items-center justify-between gap-4 px-4 py-5 md:px-8 md:py-6 lg:px-10',
          className,
        )}
      >
        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-foreground transition-transform group-hover:scale-105">
            <Building2 className="size-4.5 text-background" strokeWidth={2.5} />
          </div>
          <span className="text-foreground hidden text-sm font-extrabold tracking-[0.15em] sm:block">
            SMARTRENT
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex lg:gap-2"
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

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => logoutMutation.mutate()}
              className="text-muted-foreground hover:text-foreground hidden text-sm font-medium sm:block"
            >
              {t('logout')}
            </button>
          ) : (
            <Link
              to="/login"
              className="text-muted-foreground hover:text-foreground hidden text-sm font-medium sm:block"
            >
              {t('login')}
            </Link>
          )}

          <Link
            to="/contact"
            className="group hidden items-center gap-2.5 rounded-full bg-foreground py-2 pr-2 pl-4 text-sm font-semibold text-background transition-all hover:shadow-lg sm:flex"
          >
            <span className="relative flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              {t('landing.nav.contactCta', { defaultValue: 'Contact Us Now' })}
            </span>
            <span className="flex size-7 items-center justify-center rounded-full bg-background/15 transition-transform group-hover:scale-110">
              <ArrowUpRight className="size-3.5" />
            </span>
          </Link>

          <button
            type="button"
            className="text-foreground flex size-10 items-center justify-center rounded-full border border-border/60 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
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
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-[70] w-72 bg-background p-6 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-[0.15em]">SMARTRENT</span>
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
                    className="rounded-lg px-3 py-3 text-base font-medium"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 text-sm font-semibold text-background"
              >
                {t('landing.nav.contactCta', { defaultValue: 'Contact Us Now' })}
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
