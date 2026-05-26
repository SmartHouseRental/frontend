import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import ScheduleVisitForm from '@/features/renter/components/ScheduleVisitForm';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/features/property/hooks/useProperty';

export default function ScheduleVisitPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading, isError } = useProperty(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-destructive font-medium">{t('renter.scheduleVisit.propertyFallback')}</p>
        <Button variant="outline" onClick={() => navigate('/explore')}>{t('renter.scheduleVisit.browseProperties')}</Button>
      </div>
    );
  }

  const propertyTitle = (property.title && typeof property.title === 'object') ? (property.title.en || property.title.am) : (property.title || t('renter.scheduleVisit.propertyFallback'));

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        {t('renter.scheduleVisit.backTo', { property: propertyTitle })}
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('renter.scheduleVisit.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('renter.scheduleVisit.description', { property: propertyTitle })}
          </p>
        </div>

        <ScheduleVisitForm property={property} />
      </div>
    </div>
  );
}
