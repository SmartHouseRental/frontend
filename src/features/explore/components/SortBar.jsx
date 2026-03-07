import { View, Map } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SortBar() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-xl border">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-muted-foreground">Sort by:</span>
        <Select defaultValue="newest">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest Listings</SelectItem>
            <SelectItem value="low">Price: Low to High</SelectItem>
            <SelectItem value="high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center bg-muted p-1 rounded-xl">
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white shadow-sm text-sm font-bold text-primary">
          <View className="h-4 w-4" />
          Grid View
        </button>

        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold text-muted-foreground hover:text-foreground">
          <Map className="h-4 w-4" />
          Map View
        </button>
      </div>
    </div>
  );
}