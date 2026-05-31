import { Link } from 'react-router';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProperties } from '@/features/property/hooks/useProperties';
import { getPropertyCardFields } from '@/features/property/utils/propertyCardHelpers';
import { useLanguage } from '@/contexts/LanguageContext';
import LuxuryPropertyCard from './LuxuryPropertyCard';
import { Button } from '@/components/ui/button';

export default function AIRecommendations() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  const { data, isLoading, isError } = useProperties({
    status: 'available',
    limit: 3,
    sortBy: 'viewCount',
    order: 'desc',
  });

  const listings = data?.data || [];

  return (
    <section className="px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-foreground text-3xl font-bold tracking-tight md:text-4xl"
            >
              {t('landing.ai.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-3 text-base"
            >
              {t('landing.ai.subtitle', {
                defaultValue:
                  'Our intelligent recommendation engine analyzes your preferences, budget, and lifestyle to surface properties you will love.',
              })}
            </motion.p>
          </div>

          <Button variant="outline" className="gap-2 self-start rounded-full" asChild>
            <Link to="/explore">
              {t('landing.ai.viewAll', { defaultValue: 'View all matches' })}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        {isLoading && (
          <div className="flex min-h-[320px] items-center justify-center">
            <Loader2 className="text-primary size-8 animate-spin" />
          </div>
        )}

        {isError && (
          <p className="text-muted-foreground py-12 text-center">
            {t('landing.featured.error')}
          </p>
        )}

        {!isLoading && !isError && listings.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {listings.map((home, i) => {
              const fields = getPropertyCardFields(home, locale);
              return (
                <LuxuryPropertyCard
                  key={home.id}
                  property={home}
                  title={fields.title}
                  address={fields.address}
                  price={fields.priceValue}
                  currency={fields.priceCurrency}
                  image={fields.image}
                  bedrooms={home.bedrooms}
                  bathrooms={home.bathrooms}
                  area={fields.areaValue}
                  type={fields.type}
                  index={i}
                  perMonthLabel={` ${t('perMonth')}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
