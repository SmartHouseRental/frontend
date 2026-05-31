import { Link } from 'react-router';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProperties } from '@/features/property/hooks/useProperties';
import { getPropertyCardFields } from '@/features/property/utils/propertyCardHelpers';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import LuxuryPropertyCard from './LuxuryPropertyCard';

export default function FeaturedListings() {
  const { locale, t } = useLanguage();
  const { data: propertiesData, isLoading, isError } = useProperties({
    status: 'available',
    limit: 3,
    sortBy: 'createdAt',
    order: 'desc',
  });

  const listings = propertiesData?.data || [];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <p className="text-muted-foreground">{t('landing.featured.error')}</p>
        <Button variant="link" onClick={() => window.location.reload()} className="text-primary font-bold">
          {t('tryAgain')}
        </Button>
      </div>
    );
  }

  if (listings.length === 0) return null;

  return (
    <section className="px-4 py-16 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase"
            >
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-foreground text-3xl font-bold tracking-tight md:text-4xl"
            >
              {t('featuredTitle')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-muted-foreground mt-2"
            >
              {t('featuredSubtitle')}
            </motion.p>
          </div>
          <Button
            variant="outline"
            className="gap-2 self-start rounded-full"
            asChild
          >
            <Link to="/explore">
              {t('seeAllListings')}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

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
      </div>
    </section>
  );
}
