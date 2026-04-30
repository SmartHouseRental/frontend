import { Button } from '@/components/ui/button';
import { HomePlus } from 'lucide-react';
import { Link } from 'react-router';

export default function PropertiesHeader() {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h2 className="mb-2 text-4xl font-black">My Properties</h2>
        <p className="text-muted-foreground font-medium">
          Manage your family-oriented long-stay homes across Ethiopia.
        </p>
      </div>

      <Button
        asChild
        className="bg-accent hover:bg-accent/90 flex items-center gap-2 rounded-xl px-6 py-3 text-white shadow-lg"
      >
        <Link to="/owner/properties/new">
          <HomePlus size={18} />
          Add New Property
        </Link>
      </Button>
    </div>
  );
}
