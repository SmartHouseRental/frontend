import { View, Map } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';
import { getSortOptions } from "@/features/explore/utils/propertyFilters";

export function SortBar({ viewMode, setViewMode, sort, onSortChange }) {
  const { t } = useTranslation();
  const sortOptions = getSortOptions(t);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-xl border">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-muted-foreground">{t('explorePage.sort.label')}</span>
        <Select
          value={sort === 'views' ? 'newest' : sort}
          onValueChange={onSortChange}
          disabled={viewMode === 'map'}
        >
          <SelectTrigger className="w-48" disabled={viewMode === 'map'}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center bg-muted p-1 rounded-xl">
        <button 
          type="button"
          onClick={() => setViewMode("grid")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
            viewMode === "grid" 
              ? "bg-white shadow-sm text-primary" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <View className="h-4 w-4" />
          {t('explorePage.sort.gridView')}
        </button>

        <button 
          type="button"
          onClick={() => setViewMode("map")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
            viewMode === "map" 
              ? "bg-white shadow-sm text-primary" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Map className="h-4 w-4" />
          {t('explorePage.sort.mapView')}
        </button>
      </div>
    </div>
  );
}
