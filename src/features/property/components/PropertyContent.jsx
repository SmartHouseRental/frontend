import { BedDouble, Bath, Square, Users, Wifi, Car, ShieldCheck, Trees } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext'

export default function PropertyContent({ property }) {
  const { t } = useLanguage();
  const defaultAmenities = [
    { icon: Wifi, title: t('propertyDetailsComponents.wifi'), desc: t('propertyContent.included') },
    { icon: Car, title: t('propertyDetailsComponents.parking'), desc: t('propertyContent.included') },
    { icon: ShieldCheck, title: t('propertyDetailsComponents.security'), desc: t('propertyContent.included') },
    { icon: Trees, title: t('propertyDetailsComponents.garden'), desc: t('propertyContent.included') },
  ]

  const displayAmenities = property?.amenities?.length > 0
    ? property.amenities.map(a => ({ icon: ShieldCheck, title: a, desc: t('propertyContent.included') }))
    : defaultAmenities;

  return (
    <div className="lg:w-2/3">
      {/* Quick info */}
      <div className="flex flex-wrap gap-6 py-6 border-y mb-8">
        <div className="flex items-center gap-2">
          <BedDouble className="text-primary"/>
          <span className="font-semibold">{property?.bedrooms || 0} {t('beds')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Bath className="text-primary"/>
          <span className="font-semibold">{property?.bathrooms || 0} {t('baths')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Square className="text-primary"/>
          <span className="font-semibold">{property?.area || 0} {property?.areaUnit || t('sqm')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="text-primary"/>
          <span className="font-semibold">{property?.furnishingStatus || t('propertyContent.familyFriendly')}</span>
        </div>
      </div>

      {/* Home story / Description */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">
          {t('propertyContent.homeStoryTitle')}
        </h3>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {property?.description || t('propertyContent.defaultDescription')}
        </p>
      </section>

      {/* Amenities */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-6">
          {t('propertyContent.offersTitle')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayAmenities.map((a, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <a.icon className="text-primary"/>
              </div>
              <div>
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
