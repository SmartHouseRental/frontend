import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Building2, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { cn } from '@/lib/utils';

const LOGIN_HERO_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80';

function LoginPage() {
  const { t, i18n } = useTranslation();
  const isLatinLocale = (i18n.language || 'en').startsWith('en');

  return (
    <div className="flex min-h-screen bg-[#FAFAF9]">
      <div className="relative hidden w-1/2 overflow-hidden lg:flex">
        <img
          src={LOGIN_HERO_IMAGE}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 lg:p-14">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ChevronLeft size={16} />
            {t('auth.backToHome')}
          </Link>

          <div className="max-w-md">
            <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
              <Building2 className="size-6 text-white" strokeWidth={2.5} />
            </div>
            <p
              className={cn(
                'mb-3 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-white/60',
                isLatinLocale && 'uppercase',
              )}
            >
              <span className="size-1.5 rounded-full bg-[#22C55E]" aria-hidden />
              {t('auth.welcomeBackTo')}
            </p>
            <h2
              className={cn(
                'text-4xl font-bold tracking-tight text-white md:text-5xl',
                isLatinLocale && 'uppercase',
              )}
            >
              Bet-Connect
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              {t('auth.loginHeroDesc')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between px-6 pt-6 lg:justify-end lg:px-10 lg:pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#737373] transition-colors hover:text-[#111111] lg:hidden"
          >
            <ChevronLeft size={16} />
            {t('auth.home')}
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-[#111111]">
                {t('auth.signIn')}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#737373] md:text-base">
                {t('auth.signInIntro')}
              </p>
            </div>

            <div className="rounded-[24px] border border-[#E5E5E5] bg-white p-6 shadow-luxury md:p-8">
              <LoginForm />

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E5E5]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs font-medium tracking-wide text-[#737373] uppercase">
                    {t('auth.orContinueWith')}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="h-12 w-full gap-3 rounded-full border-[#E5E5E5] bg-white font-semibold text-[#111111] shadow-sm transition-colors hover:bg-[#FAFAF9]"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {t('auth.googleAccount')}
              </Button>
            </div>

            <p className="mt-8 text-center text-sm text-[#737373]">
              {t('auth.dontHaveAccount')}{' '}
              <Link
                to="/signup"
                className="font-semibold text-[#111111] underline-offset-4 hover:underline"
              >
                {t('auth.createAnAccount')}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
