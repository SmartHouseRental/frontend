import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, X, Loader2, Plus, Map as MapIcon } from 'lucide-react';
import MapModal from './MapModal';

const POPULAR_AREAS = [
    'Bole', 'Piassa', 'CMC', 'Megenagna', 'Old Airport',
    'Saris', 'Kazanchis', 'Hayahulet', 'Mexico Square', 'Lideta'
];

export default function LocationSelector({ selectedLocations, setSelectedLocations }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);

    const fetchCoordinates = async (name) => {
        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name + ', Addis Ababa, Ethiopia')}&limit=1`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                const newLoc = {
                    name: data[0].display_name,
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon),
                };
                addLocation(newLoc);
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        } finally {
            setIsSearching(false);
            setSearchQuery('');
        }
    };

    const addLocation = (loc) => {
        setSelectedLocations((prev) => {
            // Avoid duplicates based on name or coordinates
            const exists = prev.some(
                (l) => l.name === loc.name || (l.lat === loc.lat && l.lon === loc.lon)
            );
            if (exists) return prev;
            return [...prev, loc];
        });
    };

    const removeLocation = (index) => {
        setSelectedLocations((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchQuery.trim()) {
                fetchCoordinates(searchQuery.trim());
            }
        }
    };

    return (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
                <h2 className="text-2xl font-black tracking-tight text-foreground">Where would you like to live?</h2>
                <p className="text-muted-foreground mt-2 text-sm font-medium">You can select multiple areas</p>
            </div>

            {/* Section 1: Popular Areas */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Popular Areas</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                    {POPULAR_AREAS.map((area) => {
                        const isSelected = selectedLocations.some(l => l.name.toLowerCase().includes(area.toLowerCase()));
                        return (
                            <button
                                key={area}
                                disabled={isSearching}
                                onClick={() => fetchCoordinates(area)}
                                className={`flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-bold transition-all ${isSelected
                                        ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                                        : 'border-border bg-card text-muted-foreground hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-500'
                                    }`}
                            >
                                {isSelected && <CheckCircle size={14} />}
                                {area}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Section 2: Custom Search */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Custom Search</h3>
                <div className="relative group">
                    <Input
                        placeholder="Search any location in Addis Ababa or Ethiopia..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchSubmit}
                        disabled={isSearching}
                        className="pl-12 h-14 rounded-2xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-emerald-500 shadow-sm"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {isSearching ? <Loader2 size={20} className="animate-spin text-emerald-500" /> : <Search size={20} />}
                    </div>
                </div>
            </div>

            {/* Section 3: Advanced Option */}
            <div className="flex justify-center">
                <Button
                    variant="outline"
                    onClick={() => setIsMapOpen(true)}
                    className="h-12 px-6 rounded-xl border-2 border-dashed border-border hover:border-emerald-500 hover:bg-emerald-500/5 group transition-all"
                >
                    <MapIcon size={18} className="mr-2 text-muted-foreground group-hover:text-emerald-500" />
                    <span className="font-bold text-muted-foreground group-hover:text-emerald-500">📍 Pick exact location on map</span>
                </Button>
            </div>

            {/* Selected Locations area */}
            {selectedLocations.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Selected Locations</h3>
                    <div className="flex flex-wrap gap-3">
                        {selectedLocations.map((loc, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-1 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 pr-10 relative group animate-in zoom-in duration-300"
                            >
                                <p className="text-[14px] font-bold text-foreground pr-2 leading-tight">
                                    {loc.name.split(',')[0]}
                                </p>
                                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                                    ({loc.lat.toFixed(4)}, {loc.lon.toFixed(4)})
                                </p>
                                <button
                                    onClick={() => removeLocation(index)}
                                    className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <MapModal
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                onConfirm={addLocation}
            />
        </div>
    );
}

// Simple internal icon for cleaner import
function CheckCircle({ size }) {
    return (
        <svg
            width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}
