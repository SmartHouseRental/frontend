import { Link } from 'react-router';
import { Building2, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { cn } from '@/lib/utils';

const SIGNUP_HERO_IMAGE =
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';

function SignUpPage() {
  const { t, i18n } = useTranslation();
  const isLatinLocale = (i18n.language || 'en').startsWith('en');

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="relative hidden h-screen w-1/2 shrink-0 overflow-hidden lg:flex">
        <img
          src={SIGNUP_HERO_IMAGE}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 lg:p-14">
          <Link
            to="/"
            className="inline-flex w-fit shrink-0 items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ChevronLeft size={16} />
            {t('auth.backToHome')}
          </Link>

          <div className="max-w-md shrink-0 rounded-[24px] border border-white/15 bg-white/10 p-8 backdrop-blur-md">
            <div className="mb-4 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#22C55E]" />
              <h3 className="text-lg font-semibold text-white">
                {t('auth.signupTestimonialTitle', { defaultValue: 'Trusted by Thousands' })}
              </h3>
            </div>
            <p className="text-sm leading-relaxed font-medium text-white/75 md:text-base">
              {t('auth.signupTestimonialQuote', {
                defaultValue:
                  '"Bet-Connect made finding my new apartment in Bole incredibly easy. The digital contracts and verified owners gave me total peace of mind."',
              })}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="size-10 overflow-hidden rounded-full border border-white/20">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {t('auth.signupTestimonialName', { defaultValue: 'Betelhem T.' })}
                </p>
                <p className="text-xs text-white/60">
                  {t('auth.signupTestimonialRole', { defaultValue: 'Verified Renter' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen min-h-0 w-full flex-col lg:w-1/2">
        <div className="flex shrink-0 items-center justify-between px-6 pt-6 lg:justify-end lg:px-10 lg:pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            <ChevronLeft size={16} />
            {t('auth.home')}
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-6 pb-6 lg:px-12 lg:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-xl min-h-0 flex-1 flex-col"
          >
            <div className="mb-6 shrink-0">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary lg:hidden">
                <Building2 className="size-6 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <p
                className={cn(
                  'mb-2 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground lg:hidden',
                  isLatinLocale && 'uppercase',
                )}
              >
                <span className="size-1.5 rounded-full bg-[#22C55E]" aria-hidden />
                Bet-Connect
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {t('auth.joinCommunity')}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {t('auth.signupIntro')}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto rounded-[24px] border border-border bg-card shadow-luxury">
              <div className="p-6 md:p-8">
                <SignUpForm />
              </div>
            </div>

            <p className="mt-6 shrink-0 text-center text-sm text-muted-foreground">
              {t('auth.alreadyHaveAccount')}{' '}
              <Link
                to="/login"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {t('auth.loginInstead')}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
