import { useNavigate } from 'react-router';
import { Search, MapPin, BedDouble, DollarSign, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function PropertySearchHero({ className, floating = true }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('q', location);
    if (type) params.set('category', type);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (priceRange) params.set('priceRange', priceRange);
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={cn(
        'w-full',
        floating && '-mt-8 relative z-20 px-4 md:-mt-12 md:px-8 lg:px-12',
        className,
      )}
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-border/40 bg-card/95 p-2 shadow-xl backdrop-blur-xl md:rounded-3xl md:p-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-0 md:divide-x md:divide-border/40">
          {/* Location */}
          <div className="flex flex-1 items-center gap-3 px-4 py-3">
            <MapPin size={18} className="text-primary shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t('landing.search.location', { defaultValue: 'City or neighborhood...' })}
              className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
            />
          </div>

          {/* Type */}
          <div className="flex flex-1 items-center gap-3 px-4 py-3">
            <Building2 size={18} className="text-primary shrink-0" />
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
                <SelectValue placeholder={t('landing.search.type', { defaultValue: 'Property type' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">{t('owner.myProperties.filters.apartment')}</SelectItem>
                <SelectItem value="house">{t('owner.myProperties.filters.house')}</SelectItem>
                <SelectItem value="villa">{t('owner.myProperties.filters.villa')}</SelectItem>
                <SelectItem value="studio">{t('owner.myProperties.filters.studio')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="hidden flex-1 items-center gap-3 px-4 py-3 lg:flex">
            <DollarSign size={18} className="text-primary shrink-0" />
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
                <SelectValue placeholder={t('landing.search.price', { defaultValue: 'Price range' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10000">Under 10,000 ETB</SelectItem>
                <SelectItem value="10000-25000">10,000 – 25,000 ETB</SelectItem>
                <SelectItem value="25000-50000">25,000 – 50,000 ETB</SelectItem>
                <SelectItem value="50000+">50,000+ ETB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Beds */}
          <div className="hidden flex-1 items-center gap-3 px-4 py-3 sm:flex">
            <BedDouble size={18} className="text-primary shrink-0" />
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="h-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
                <SelectValue placeholder={t('landing.search.beds', { defaultValue: 'Bedrooms' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search button */}
          <div className="p-1 md:pl-2">
            <Button
              type="submit"
              className="h-12 w-full gap-2 rounded-xl px-8 shadow-md md:w-auto md:rounded-2xl"
            >
              <Search size={16} />
              {t('landing.hero.search')}
            </Button>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
