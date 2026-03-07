import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PropertyCard({ title, location, image, status }) {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>

        <Button variant="secondary" className="w-full">
          Manage Listing
        </Button>
      </CardContent>
    </Card>
  );
}