import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router';
import {
    Check, ArrowRight, ArrowLeft, Plus,
    Wallet, BedDouble, MapPin, Home, Sparkles, Sofa,
} from 'lucide-react';
import LocationSelector from '@/components/auth/LocationSelector';

const QUESTIONS = [
    { id: 'budget', icon: Wallet, title: 'What is your monthly budget?', subtitle: 'Drag the slider to set your price range in ETB' },
    { id: 'bedrooms', icon: BedDouble, title: 'How many bedrooms do you need?', subtitle: 'Choose your preferred bedroom count' },
    { id: 'areas', icon: MapPin, title: 'Where would you like to live?', subtitle: 'Pick popular areas or drop a pin on the map' },
    { id: 'type', icon: Home, title: 'Preferred property type?', subtitle: 'Select the kind of property you want' },
    { id: 'amenities', icon: Sparkles, title: 'Must-have amenities?', subtitle: 'Select or type your own — skip if unsure' },
    { id: 'furnishing', icon: Sofa, title: 'Furnishing preference?', subtitle: 'How would you like the property delivered?' },
];

const DEFAULT_AMENITIES = ['Backup Generator', 'Parking', 'WiFi / Broadband', 'Security', 'Balcony', 'Elevator', 'Gym'];
const PROPERTY_TYPES = [
    { label: 'Villa', emoji: '🏡' },
    { label: 'Apartment', emoji: '🏢' },
    { label: 'Condominium', emoji: '🏬' },
    { label: 'Service Quarter', emoji: '🏠' },
    { label: 'Private Compound', emoji: '🏘️' },
];
const FURNISHING = [
    { label: 'Fully Furnished', emoji: '🛋️', detail: 'Move in with just your bags' },
    { label: 'Semi-Furnished', emoji: '🪑', detail: 'Major furniture is there' },
    { label: 'Unfurnished', emoji: '📦', detail: 'Blank canvas – decorate your way' },
];

function RenterPreferencesWizard() {
    const [step, setStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const [preferences, setPreferences] = useState({
        budget: [15000, 80000],
        bedrooms: '2',
        areas: [],
        type: '',
        amenities: [],
        furnishing: '',
    });

    const [customAmenity, setCustomAmenity] = useState('');

    const currentQuestion = QUESTIONS[step];
    const StepIcon = currentQuestion.icon;
    const progress = ((step + 1) / QUESTIONS.length) * 100;

    const handleNext = () => {
        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            setIsSaving(true);
            setTimeout(() => navigate('/welcome'), 1500);
        }
    };

    const handleBack = () => { if (step > 0) setStep(step - 1); };

    const toggleArrayItem = (field, item) => {
        setPreferences((prev) => {
            const array = prev[field];
            return array.includes(item)
                ? { ...prev, [field]: array.filter((i) => i !== item) }
                : { ...prev, [field]: [...array, item] };
        });
    };

    const handleAddCustomAmenity = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = customAmenity.trim();
            if (val && !preferences.amenities.includes(val)) {
                toggleArrayItem('amenities', val);
                setCustomAmenity('');
            }
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 0: return true;
            case 1: return !!preferences.bedrooms;
            case 2: return preferences.areas.length > 0;
            case 3: return !!preferences.type;
            case 4: return true;
            case 5: return !!preferences.furnishing;
            default: return true;
        }
    };

    const displayAmenities = Array.from(new Set([...DEFAULT_AMENITIES, ...preferences.amenities]));

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-slate-950 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Page Title */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Find Your Perfect Home</h1>
                    <p className="text-muted-foreground mt-2 font-medium italic">Tell us what you're looking for in Addis Ababa</p>
                </div>

                {/* Progress & Navigation Section */}
                <div className="mb-10 bg-background/50 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={handleBack}
                            className={`flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors ${step === 0 ? 'invisible' : ''}`}
                        >
                            <ArrowLeft size={16} /> Back
                        </button>

                        {/* Step dots */}
                        <div className="flex items-center gap-2">
                            {QUESTIONS.map((q, i) => {
                                const Icon = q.icon;
                                return (
                                    <div
                                        key={q.id}
                                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${i < step
                                            ? 'border-primary bg-primary text-primary-foreground scale-90'
                                            : i === step
                                                ? 'border-primary bg-primary text-primary-foreground scale-110 shadow-md shadow-primary/30'
                                                : 'border-border bg-card text-muted-foreground/40 scale-90'
                                            }`}
                                    >
                                        {i < step ? <Check size={14} /> : <Icon size={14} />}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-widest">
                                Step {step + 1}
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Main content */}
                <main className="pb-20">
                    {/* Step title block */}
                    {step !== 2 && (
                        <div className="mb-8 flex flex-col items-center text-center gap-3">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                                <StepIcon size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-foreground leading-tight">
                                    {currentQuestion.title}
                                </h2>
                                <p className="text-muted-foreground mt-1.5 font-medium">{currentQuestion.subtitle}</p>
                            </div>
                        </div>
                    )}

                    {/* Step content */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-400">

                        {/* Step 0: Budget */}
                        {step === 0 && (
                            <div className="space-y-8">
                                <div className="rounded-3xl bg-card border border-border shadow-sm p-8 space-y-8">
                                    <Slider
                                        defaultValue={preferences.budget}
                                        max={200000}
                                        min={5000}
                                        step={1000}
                                        onValueChange={(val) => setPreferences({ ...preferences, budget: val })}
                                        className="w-full"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-2xl border border-border bg-muted/30 p-4 text-center">
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Minimum</span>
                                            <span className="text-2xl font-black text-foreground">{preferences.budget[0].toLocaleString()}</span>
                                            <span className="text-sm font-bold text-muted-foreground ml-1">ETB</span>
                                        </div>
                                        <div className="rounded-2xl border-2 border-primary bg-primary/5 p-4 text-center">
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-primary block mb-1">Maximum</span>
                                            <span className="text-2xl font-black text-foreground">{preferences.budget[1].toLocaleString()}</span>
                                            <span className="text-sm font-bold text-primary ml-1">ETB</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-muted-foreground font-medium">
                                    💡 Most rentals in Addis Ababa range between 8,000 – 120,000 ETB/month.
                                </p>
                            </div>
                        )}

                        {/* Step 1: Bedrooms */}
                        {step === 1 && (
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { num: '1', label: '1 Bedroom', detail: 'Studio / 1-bed' },
                                    { num: '2', label: '2 Bedrooms', detail: 'Ideal for couples' },
                                    { num: '3', label: '3 Bedrooms', detail: 'For small families' },
                                    { num: '4+', label: '4+ Bedrooms', detail: 'Large family / villa' },
                                ].map(({ num, label, detail }) => (
                                    <button
                                        key={num}
                                        onClick={() => setPreferences({ ...preferences, bedrooms: num })}
                                        className={`flex flex-col items-start gap-1.5 rounded-2xl border-2 p-5 text-left transition-all duration-200 ${preferences.bedrooms === num
                                            ? 'border-primary bg-primary/5 text-primary shadow-md shadow-primary/10 scale-[1.02]'
                                            : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                                            }`}
                                    >
                                        <span className="text-3xl font-black">{num}</span>
                                        <span className="font-bold text-[15px] leading-none">{label}</span>
                                        <span className="text-xs text-muted-foreground font-medium">{detail}</span>
                                        {preferences.bedrooms === num && (
                                            <div className="absolute top-3 right-3 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                <Check size={11} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 2: Location */}
                        {step === 2 && (
                            <LocationSelector
                                selectedLocations={preferences.areas}
                                setSelectedLocations={(newLocs) =>
                                    setPreferences({
                                        ...preferences,
                                        areas: typeof newLocs === 'function' ? newLocs(preferences.areas) : newLocs,
                                    })
                                }
                            />
                        )}

                        {/* Step 3: Property Type */}
                        {step === 3 && (
                            <div className="space-y-3">
                                {PROPERTY_TYPES.map(({ label, emoji }) => (
                                    <button
                                        key={label}
                                        onClick={() => setPreferences({ ...preferences, type: label })}
                                        className={`w-full flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 ${preferences.type === label
                                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.01]'
                                            : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                                            }`}
                                    >
                                        <span className="text-3xl">{emoji}</span>
                                        <span className={`font-bold text-[16px] flex-1 ${preferences.type === label ? 'text-primary' : 'text-foreground'}`}>{label}</span>
                                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${preferences.type === label ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'}`}>
                                            {preferences.type === label && <Check size={12} />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 4: Amenities */}
                        {step === 4 && (
                            <div className="space-y-5">
                                <div className="relative">
                                    <Input
                                        placeholder="Type a custom amenity and press Enter…"
                                        value={customAmenity}
                                        onChange={(e) => setCustomAmenity(e.target.value)}
                                        onKeyDown={handleAddCustomAmenity}
                                        className="pl-4 pr-12 h-12 rounded-2xl bg-card border-border/60 focus:border-primary shadow-sm"
                                    />
                                    <Plus className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {displayAmenities.map((amenity) => {
                                        const isSelected = preferences.amenities.includes(amenity);
                                        return (
                                            <button
                                                key={amenity}
                                                onClick={() => toggleArrayItem('amenities', amenity)}
                                                className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all duration-200 ${isSelected
                                                    ? 'border-primary bg-primary text-primary-foreground shadow-sm scale-105'
                                                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                                                    }`}
                                            >
                                                {isSelected && <Check size={13} />}
                                                {amenity}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-sm text-muted-foreground font-medium text-center pt-2">
                                    ✅ {preferences.amenities.length} selected — you can always update later
                                </p>
                            </div>
                        )}

                        {/* Step 5: Furnishing */}
                        {step === 5 && (
                            <div className="space-y-3">
                                {FURNISHING.map(({ label, emoji, detail }) => (
                                    <button
                                        key={label}
                                        onClick={() => setPreferences({ ...preferences, furnishing: label })}
                                        className={`w-full flex items-center gap-4 rounded-2xl border-2 px-5 py-5 text-left transition-all duration-200 ${preferences.furnishing === label
                                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.01]'
                                            : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                                            }`}
                                    >
                                        <span className="text-3xl">{emoji}</span>
                                        <div className="flex-1">
                                            <p className={`font-bold text-[16px] ${preferences.furnishing === label ? 'text-primary' : 'text-foreground'}`}>{label}</p>
                                            <p className="text-sm text-muted-foreground font-medium">{detail}</p>
                                        </div>
                                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${preferences.furnishing === label ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'}`}>
                                            {preferences.furnishing === label && <Check size={12} />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-10">
                        <Button
                            onClick={handleNext}
                            disabled={!isStepValid() || isSaving}
                            className="w-full h-14 rounded-2xl font-bold shadow-lg text-base shadow-primary/20"
                        >
                            {isSaving ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Saving preferences…
                                </span>
                            ) : step === QUESTIONS.length - 1 ? (
                                <>Save My Preferences <Check size={18} className="ml-2" /></>
                            ) : (
                                <>Continue <ArrowRight size={18} className="ml-2" /></>
                            )}
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default RenterPreferencesWizard;
