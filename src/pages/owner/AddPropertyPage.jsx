import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '@/components/PageHeader';
import {
    CheckCircle2, ChevronRight, ChevronLeft, Upload, X, Image as ImageIcon,
    MapPin, DollarSign, Bed, Bath, Maximize, Home, FileText, Loader2, Plus,
} from 'lucide-react';

const propertyTypes = [
    { value: 'VILLA', label: 'Villa' },
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'CONDOMINIUM', label: 'Condominium' },
    { value: 'SERVICES', label: 'Service Apartment' },
    { value: 'PRIVATE_COMPOUND', label: 'Private Compound' },
];

const furnishingOptions = ['Fully Furnished', 'Semi-Furnished', 'Unfurnished'];

const amenityOptions = [
    'Parking', 'Garden', 'Generator', 'Security', 'WiFi', 'Furnished',
    'Gym', 'Pool', 'Elevator', 'Balcony', 'CCTV', 'Water Tank',
    'Laundry', 'Air Conditioning', 'Solar Power', 'Intercom',
];

const steps = [
    { label: 'Basic Info', icon: Home },
    { label: 'Media', icon: ImageIcon },
    { label: 'Rent Terms', icon: FileText },
];

function AddPropertyPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [form, setForm] = useState({
        titleEn: '', titleAm: '', descriptionEn: '', descriptionAm: '',
        type: '', price: '', bedrooms: '', bathrooms: '', area: '',
        address: '', location: '', amenities: [],
        furnishingType: '', images: [], videos: [],
        leaseDuration: '', depositAmount: '', specialTerms: '',
        availableFrom: '',
    });

    const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const toggleAmenity = (amenity) => {
        setForm(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity],
        }));
    };

    const addImages = (e) => {
        const files = Array.from(e.target.files || []);
        const previews = files.map(f => ({ name: f.name, url: URL.createObjectURL(f), file: f }));
        setForm(prev => ({ ...prev, images: [...prev.images, ...previews] }));
    };

    const removeImage = (index) => {
        setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const canProceed = () => {
        if (currentStep === 0) {
            return form.titleEn && form.type && form.price && form.address;
        }
        if (currentStep === 1) {
            return form.images.length > 0;
        }
        return true;
    };

    if (isSubmitted) {
        return (
            <div className="scrollbar-hide h-screen overflow-y-auto p-8">
                <div className="flex flex-col items-center justify-center py-24 animate-in fade-in-0 duration-500">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
                        <CheckCircle2 size={40} className="text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-foreground">Property Listed Successfully!</h2>
                    <p className="text-muted-foreground mt-2 text-center max-w-md">
                        Your property has been submitted. As a verified owner, your listing is automatically approved and now live.
                    </p>
                    <div className="flex items-center gap-3 mt-8">
                        <Button variant="outline" onClick={() => { setIsSubmitted(false); setCurrentStep(0); setForm({ titleEn: '', titleAm: '', descriptionEn: '', descriptionAm: '', type: '', price: '', bedrooms: '', bathrooms: '', area: '', address: '', location: '', amenities: [], furnishingType: '', images: [], videos: [], leaseDuration: '', depositAmount: '', specialTerms: '', availableFrom: '' }); }}>
                            Add Another Property
                        </Button>
                        <Button asChild>
                            <a href="/owner/properties">View My Properties</a>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <PageHeader
                title="Add New Property"
                description="List a new rental property on the platform."
                backLink="/owner/properties"
            />

            {/* Step Progress */}
            <div className="flex items-center justify-center gap-2">
                {steps.map((step, i) => {
                    const Icon = step.icon;
                    const isActive = currentStep === i;
                    const isCompleted = currentStep > i;
                    return (
                        <div key={i} className="flex items-center gap-2">
                            <button
                                onClick={() => i < currentStep && setCurrentStep(i)}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : isCompleted
                                            ? 'bg-emerald-100 text-emerald-700 cursor-pointer hover:bg-emerald-200'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 size={14} />
                                ) : (
                                    <Icon size={14} />
                                )}
                                <span className="hidden sm:inline">{step.label}</span>
                                <span className="sm:hidden">{i + 1}</span>
                            </button>
                            {i < steps.length - 1 && (
                                <div className={`h-px w-8 transition-colors ${isCompleted ? 'bg-emerald-400' : 'bg-border'}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Step 1: Basic Info */}
            {currentStep === 0 && (
                <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
                    <CardContent className="space-y-6">
                        <h3 className="font-bold text-foreground text-lg">Property Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Title (English) <span className="text-rose-500">*</span>
                                </label>
                                <Input className="mt-1.5" placeholder="e.g. Luxury Villa in Bole Atlas" value={form.titleEn} onChange={e => updateForm('titleEn', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Title (Amharic)
                                </label>
                                <Input className="mt-1.5" placeholder="e.g. የቦሌ አትላስ ቪላ" value={form.titleAm} onChange={e => updateForm('titleAm', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Description (English)
                                </label>
                                <textarea
                                    className="mt-1.5 w-full h-28 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Describe your property in detail..."
                                    value={form.descriptionEn}
                                    onChange={e => updateForm('descriptionEn', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Description (Amharic)
                                </label>
                                <textarea
                                    className="mt-1.5 w-full h-28 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="ንብረቱን በዝርዝር ይግለጹ..."
                                    value={form.descriptionAm}
                                    onChange={e => updateForm('descriptionAm', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Property Type <span className="text-rose-500">*</span>
                                </label>
                                <Select value={form.type} onValueChange={v => updateForm('type', v)}>
                                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {propertyTypes.map(t => (
                                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <DollarSign size={12} /> Monthly Rent (ETB) <span className="text-rose-500">*</span>
                                </label>
                                <Input className="mt-1.5" type="number" placeholder="e.g. 45000" value={form.price} onChange={e => updateForm('price', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Bed size={12} /> Bedrooms
                                </label>
                                <Input className="mt-1.5" type="number" placeholder="e.g. 3" value={form.bedrooms} onChange={e => updateForm('bedrooms', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Bath size={12} /> Bathrooms
                                </label>
                                <Input className="mt-1.5" type="number" placeholder="e.g. 2" value={form.bathrooms} onChange={e => updateForm('bathrooms', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Maximize size={12} /> Area (m²)
                                </label>
                                <Input className="mt-1.5" type="number" placeholder="e.g. 250" value={form.area} onChange={e => updateForm('area', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <MapPin size={12} /> Address <span className="text-rose-500">*</span>
                                </label>
                                <Input className="mt-1.5" placeholder="e.g. Bole, Addis Ababa" value={form.address} onChange={e => updateForm('address', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Furnishing
                                </label>
                                <Select value={form.furnishingType} onValueChange={v => updateForm('furnishingType', v)}>
                                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {furnishingOptions.map(f => (
                                                <SelectItem key={f} value={f}>{f}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Amenities</label>
                            <div className="flex flex-wrap gap-2">
                                {amenityOptions.map(a => (
                                    <button
                                        key={a}
                                        type="button"
                                        onClick={() => toggleAmenity(a)}
                                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${form.amenities.includes(a)
                                                ? 'bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20'
                                                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                                            }`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 2: Media */}
            {currentStep === 1 && (
                <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
                    <CardContent className="space-y-6">
                        <h3 className="font-bold text-foreground text-lg">Property Photos & Videos</h3>
                        <p className="text-sm text-muted-foreground -mt-4">Upload at least 1 photo. High-quality images attract more renters.</p>

                        {/* Image Upload */}
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                                Photos <span className="text-rose-500">*</span> <span className="text-muted-foreground/60 normal-case">({form.images.length} uploaded)</span>
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {form.images.map((img, i) => (
                                    <div key={i} className="relative group h-40 rounded-xl overflow-hidden border border-border">
                                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                            <button
                                                onClick={() => removeImage(i)}
                                                className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-100 text-rose-500"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                        {i === 0 && (
                                            <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                                                Cover
                                            </span>
                                        )}
                                    </div>
                                ))}
                                <label className="h-40 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/3 transition-all cursor-pointer">
                                    <Upload size={24} />
                                    <span className="text-xs font-medium">Add Photos</span>
                                    <span className="text-[10px] text-muted-foreground/60">JPG, PNG up to 10MB</span>
                                    <input type="file" accept="image/*" multiple onChange={addImages} className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        {/* Video Upload */}
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                                Video Tour <span className="text-muted-foreground/60 normal-case">(optional)</span>
                            </label>
                            <label className="flex h-32 rounded-xl border-2 border-dashed border-border items-center justify-center gap-3 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/3 transition-all cursor-pointer">
                                <Upload size={20} />
                                <div>
                                    <p className="text-sm font-medium">Upload a video tour</p>
                                    <p className="text-[10px] text-muted-foreground/60">MP4 up to 100MB</p>
                                </div>
                                <input type="file" accept="video/*" className="hidden" />
                            </label>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 3: Rent Terms */}
            {currentStep === 2 && (
                <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
                    <CardContent className="space-y-6">
                        <h3 className="font-bold text-foreground text-lg">Rental Terms & Conditions</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Minimum Lease Duration
                                </label>
                                <Select value={form.leaseDuration} onValueChange={v => updateForm('leaseDuration', v)}>
                                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="3">3 Months</SelectItem>
                                            <SelectItem value="6">6 Months</SelectItem>
                                            <SelectItem value="12">12 Months (1 Year)</SelectItem>
                                            <SelectItem value="24">24 Months (2 Years)</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <DollarSign size={12} /> Security Deposit (ETB)
                                </label>
                                <Input className="mt-1.5" type="number" placeholder="e.g. 90000" value={form.depositAmount} onChange={e => updateForm('depositAmount', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Available From
                                </label>
                                <Input className="mt-1.5" type="date" value={form.availableFrom} onChange={e => updateForm('availableFrom', e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Special Terms & Conditions
                            </label>
                            <textarea
                                className="mt-1.5 w-full h-32 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Any special conditions, rules, or requirements for potential renters..."
                                value={form.specialTerms}
                                onChange={e => updateForm('specialTerms', e.target.value)}
                            />
                        </div>

                        <div className="h-px bg-border" />

                        {/* Summary Preview */}
                        <div>
                            <h4 className="font-bold text-foreground mb-4">Listing Summary</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Type', value: propertyTypes.find(t => t.value === form.type)?.label || '—' },
                                    { label: 'Monthly Rent', value: form.price ? `${Number(form.price).toLocaleString()} ETB` : '—' },
                                    { label: 'Bedrooms', value: form.bedrooms || '—' },
                                    { label: 'Bathrooms', value: form.bathrooms || '—' },
                                    { label: 'Area', value: form.area ? `${form.area} m²` : '—' },
                                    { label: 'Deposit', value: form.depositAmount ? `${Number(form.depositAmount).toLocaleString()} ETB` : '—' },
                                    { label: 'Photos', value: form.images.length },
                                    { label: 'Amenities', value: form.amenities.length },
                                ].map(item => (
                                    <div key={item.label} className="rounded-lg bg-muted/30 p-3">
                                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                                        <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Auto-approve note */}
                        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-emerald-700">Auto-Approval Enabled</p>
                                <p className="text-xs text-emerald-600 mt-0.5">As a verified owner, your listing will be automatically approved and visible to renters immediately.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 0}
                >
                    <ChevronLeft size={16} /> Previous
                </Button>
                <div className="text-xs text-muted-foreground font-medium">
                    Step {currentStep + 1} of {steps.length}
                </div>
                {currentStep < steps.length - 1 ? (
                    <Button
                        className="gap-2"
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        disabled={!canProceed()}
                    >
                        Next <ChevronRight size={16} />
                    </Button>
                ) : (
                    <Button
                        className="gap-2"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <><Loader2 size={16} className="animate-spin" /> Publishing...</>
                        ) : (
                            <><Plus size={16} /> Publish Property</>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default AddPropertyPage;
