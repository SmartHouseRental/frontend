import { Link } from 'react-router';
import { ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AnimatedCounter } from '@/components/design-system/AnimatedCounter';
import { cn } from '@/lib/utils';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80';

const AGENT_AVATARS = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isLatinLocale = (i18n.language || 'en').startsWith('en');

  const stats = [
    {
      value: t('landing.hero.stats.projectsValue'),
      label: t('landing.hero.stats.projects'),
    },
    {
      value: t('landing.hero.stats.clientsValue'),
      label: t('landing.hero.stats.clients'),
    },
    {
      value: t('landing.hero.stats.valueAmount'),
      prefix: t('landing.hero.stats.valuePrefix'),
      label: t('landing.hero.stats.value'),
    },
  ];

  return (
    <section className="px-3 pt-5 pb-2 md:px-5 md:pb-4">
      <div className="relative min-h-[78vh] overflow-hidden rounded-[24px] md:min-h-[82vh] md:rounded-[32px] lg:rounded-[40px]">
        <img
          src={HERO_IMAGE}
          alt={t('landing.hero.imageAlt')}
          className="absolute inset-0 size-full object-cover"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 flex min-h-[78vh] flex-col justify-between p-6 md:min-h-[82vh] md:p-10 lg:p-14">
          <div className="flex flex-1 flex-col justify-center md:max-w-2xl lg:max-w-3xl">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className={cn(
                'text-3xl leading-[1.05] font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]',
                isLatinLocale && 'uppercase',
              )}
            >
              {t('landing.hero.headline')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-md text-sm leading-relaxed font-light text-white/70 md:text-base"
            >
              {t('landing.hero.subtitleLong')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-10"
            >
              <Link
                to="/explore"
                className="group inline-flex items-center gap-3 rounded-full bg-white py-2.5 pr-2.5 pl-6 text-sm font-semibold text-[#0A0A0A] shadow-luxury-md transition-all hover:shadow-luxury-lg"
              >
                {t('landing.hero.exploreCta')}
                <span className="flex size-9 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-transform group-hover:scale-105">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
