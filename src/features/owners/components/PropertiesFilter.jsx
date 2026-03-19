import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function PropertiesFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by location, title, or property ID..."
          className="pl-10 h-11"
        />
      </div>

      <div className="flex items-center border rounded-xl p-1 bg-card">
        <Button size="sm">All</Button>
        <Button variant="ghost" size="sm">
          Available
        </Button>
        <Button variant="ghost" size="sm">
          Rented
        </Button>
        <Button variant="ghost" size="sm">
          Hidden
        </Button>
      </div>
    </div>
  );
}