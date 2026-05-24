import { useParams, useNavigate } from 'react-router';
import ScheduleVisitForm from '@/features/renter/components/ScheduleVisitForm';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/features/property/hooks/useProperty';

export default function ScheduleVisitPage() {
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
        <p className="text-destructive font-medium">Property not found</p>
        <Button variant="outline" onClick={() => navigate('/explore')}>Browse Properties</Button>
      </div>
    );
  }

  const propertyTitle = (property.title && typeof property.title === 'object') ? (property.title.en || property.title.am) : (property.title || "Property Details");

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to {propertyTitle}
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule a Visit</h1>
          <p className="text-muted-foreground mt-2">
            Choose a convenient time to view <span className="font-semibold text-foreground">{propertyTitle}</span> and meet the owner.
          </p>
        </div>

        <ScheduleVisitForm property={property} />
      </div>
    </div>
  );
}
