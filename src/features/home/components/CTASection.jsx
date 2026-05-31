import { Link } from 'react-router';
import { ArrowUpRight, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-16 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative overflow-hidden rounded-[24px] p-8 shadow-luxury-lg md:rounded-[32px] md:p-12 lg:p-14',
            'border border-border bg-foreground text-background',
            'dark:bg-secondary dark:text-foreground',
          )}
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 size-48 rounded-full bg-background/5 blur-3xl dark:bg-foreground/5"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-xl">
              <h2 className="text-white/80 text-3xl font-bold tracking-tight md:text-4xl">
                {t('landing.cta.title')}
              </h2>
              <p className="mt-4 max-w-lg text-white/50 text-sm leading-relaxed opacity-70 md:text-base">
                {t('landing.cta.subtitle')}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
              <Link
                to="/explore"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-background py-2.5 pr-2.5 pl-6 text-sm font-semibold text-foreground shadow-luxury-md transition-all hover:shadow-luxury-lg dark:bg-primary dark:text-primary-foreground"
              >
                {t('landing.cta.browseHomes')}
                <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:scale-105 dark:bg-primary-foreground dark:text-primary">
                  <ArrowUpRight size={16} />
                </span>
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-background/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-background/40 hover:bg-background/10 dark:border-border dark:hover:bg-muted"
              >
                <Building2 size={16} />
                {t('landing.cta.listYourProperty')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
