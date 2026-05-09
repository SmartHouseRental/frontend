import { useParams } from 'react-router';
import { properties } from '@/lib/dummyData';
import ScheduleVisitForm from '@/features/renter/components/ScheduleVisitForm';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

export default function ScheduleVisitPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find property from dummy data
  const property = properties.find((p) => p.id === id) || properties[0];

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Property
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule a Visit</h1>
          <p className="text-muted-foreground mt-2">
            Choose a convenient time to view this property and meet the owner.
          </p>
        </div>

        <ScheduleVisitForm property={property} />
      </div>
    </div>
  );
}
