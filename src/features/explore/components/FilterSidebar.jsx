import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  PRICE_MAX_THOUSANDS,
  PRICE_MIN_THOUSANDS,
  PRICE_SLIDER_STEP_THOUSANDS,
  getPropertyCategoryOptions,
  draftToFilterPatch,
  filtersToDraft,
} from "@/features/explore/utils/propertyFilters";

export function FilterSidebar({ filters, onApply, onClear }) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(() => filtersToDraft(filters));
  const categoryOptions = getPropertyCategoryOptions(t);

  useEffect(() => {
    setDraft(filtersToDraft(filters));
  }, [filters]);

  const toggleBedroom = (bed) => {
    setDraft((prev) => ({
      ...prev,
      bedrooms: prev.bedrooms === bed ? "" : bed,
    }));
  };

  const toggleBathroom = (bath) => {
    setDraft((prev) => ({
      ...prev,
      bathrooms: prev.bathrooms === bath ? "" : bath,
    }));
  };

  const handleApply = () => {
    onApply?.(draftToFilterPatch(draft));
  };

  const handleClear = () => {
    const cleared = filtersToDraft({
      category: "",
      minPriceThousands: PRICE_MIN_THOUSANDS,
      maxPriceThousands: PRICE_MAX_THOUSANDS,
      bedrooms: "",
      bathrooms: "",
    });
    setDraft(cleared);
    onClear?.();
  };

  const formatThousands = (value) =>
    `${(value * 1000).toLocaleString()} ETB`;

  return (
    <aside className="w-72 hidden xl:block sticky top-24 self-start h-[calc(100vh-120px)] overflow-y-auto pr-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t('explorePage.filters.title')}</h2>
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-primary hover:underline"
          >
            {t('explorePage.filters.clearAll')}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">{t('explorePage.filters.propertyType')}</label>
          <Select
            value={draft.category}
            onValueChange={(value) =>
              setDraft((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t('explorePage.categories.allTypes')} />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">{t('explorePage.filters.monthlyBudget')}</label>
          <p className="text-muted-foreground text-xs">
            {formatThousands(draft.minPriceThousands)} – {formatThousands(draft.maxPriceThousands)}
          </p>
          <Slider
            min={PRICE_MIN_THOUSANDS}
            max={PRICE_MAX_THOUSANDS}
            step={PRICE_SLIDER_STEP_THOUSANDS}
            value={[draft.minPriceThousands, draft.maxPriceThousands]}
            onValueChange={([min, max]) =>
              setDraft((prev) => ({
                ...prev,
                minPriceThousands: min,
                maxPriceThousands: max,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">{t('explorePage.filters.bedrooms')}</label>
          <div className="flex gap-2">
            {BEDROOM_OPTIONS.map((bed) => (
              <Button
                key={bed}
                type="button"
                variant={draft.bedrooms === bed ? "default" : "outline"}
                className="flex-1"
                onClick={() => toggleBedroom(bed)}
              >
                {bed}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">{t('explorePage.filters.bathrooms')}</label>
          <div className="flex gap-2">
            {BATHROOM_OPTIONS.map((bath) => (
              <Button
                key={bath}
                type="button"
                variant={draft.bathrooms === bath ? "default" : "outline"}
                className="flex-1"
                onClick={() => toggleBathroom(bath)}
              >
                {bath}
              </Button>
            ))}
          </div>
        </div>

        <Button type="button" className="w-full" onClick={handleApply}>
          {t('explorePage.filters.showResults')}
        </Button>
      </div>
    </aside>
  );
}
