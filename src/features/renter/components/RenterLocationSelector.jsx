import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Loader2, Map as MapIcon, Check } from 'lucide-react';
import RenterMapModal from './RenterMapModal';

const POPULAR_AREAS = [
  'Bole',
  'Piassa',
  'CMC',
  'Megenagna',
  'Old Airport',
  'Saris',
  'Kazanchis',
  'Hayahulet',
  'Mexico Square',
  'Lideta',
];

export default function RenterLocationSelector({ selectedLocations, setSelectedLocations }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const addLocation = (loc) => {
    setSelectedLocations((prev) => {
      const exists = prev.some(
        (item) => item.name === loc.name || (item.lat === loc.lat && item.lng === loc.lng)
      );
      if (exists) return prev;
      return [...prev, loc];
    });
  };

  const fetchCoordinates = async (name) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${name}, Addis Ababa, Ethiopia`)}&limit=1`
      );
      const data = await response.json();
      if (data?.[0]) {
        addLocation({
          name: data[0].display_name,
          lat: Number.parseFloat(data[0].lat),
          lng: Number.parseFloat(data[0].lon),
        });
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    } finally {
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  const removeLocation = (index) => {
    setSelectedLocations((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSearchSubmit = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchCoordinates(searchQuery.trim());
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-black tracking-tight text-foreground">Where would you like to live?</h2>
        <p className="mt-2 text-sm font-medium text-muted-foreground">You can select multiple areas</p>
      </div>

      <div className="space-y-4">
        <h3 className="ml-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Popular Areas</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {POPULAR_AREAS.map((area) => {
            const isSelected = selectedLocations.some((location) =>
              location.name.toLowerCase().includes(area.toLowerCase())
            );

            return (
              <button
                key={area}
                type="button"
                disabled={isSearching}
                onClick={() => fetchCoordinates(area)}
                className={`flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-bold transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                    : 'border-border bg-card text-muted-foreground hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-500'
                }`}
              >
                {isSelected && <Check size={14} />}
                {area}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="ml-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Custom Search</h3>
        <div className="relative">
          <Input
            placeholder="Search any location in Addis Ababa or Ethiopia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            disabled={isSearching}
            className="h-14 rounded-2xl border-border/60 bg-muted/40 pl-12 shadow-sm transition-colors hover:bg-muted/60 focus:border-emerald-500 focus:bg-background"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {isSearching ? <Loader2 size={20} className="animate-spin text-emerald-500" /> : <Search size={20} />}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsMapOpen(true)}
          className="h-12 rounded-xl border-2 border-dashed border-border px-6 transition-all hover:border-emerald-500 hover:bg-emerald-500/5"
        >
          <MapIcon size={18} className="mr-2 text-muted-foreground" />
          <span className="font-bold text-muted-foreground">Pick exact location on map</span>
        </Button>
      </div>

      {selectedLocations.length > 0 && (
        <div className="space-y-4 border-t border-border pt-4">
          <h3 className="ml-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Selected Locations</h3>
          <div className="flex flex-wrap gap-3">
            {selectedLocations.map((loc, index) => (
              <div
                key={`${loc.name}-${loc.lat}-${loc.lng}`}
                className="relative flex flex-col gap-1 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 p-3 pr-10 dark:bg-emerald-950/20"
              >
                <p className="pr-2 text-[14px] font-bold leading-tight text-foreground">
                  {loc.name.split(',')[0]}
                </p>
                <p className="font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  ({loc.lat.toFixed(4)}, {loc.lng.toFixed(4)})
                </p>
                <button
                  type="button"
                  onClick={() => removeLocation(index)}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition-colors hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400"
                  aria-label={`Remove ${loc.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <RenterMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} onConfirm={addLocation} />
    </div>
  );
}
