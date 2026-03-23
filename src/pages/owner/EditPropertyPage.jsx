import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import {
    CheckCircle2, Save, Loader2, AlertTriangle, Lock,
    MapPin, DollarSign, Bed, Bath, Maximize, Upload, X,
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

// Mock existing property data
const existingProperty = {
    id: 'PRP-1024',
    titleEn: 'Luxury Villa in Bole Atlas',
    titleAm: 'የቦሌ አትላስ ቪላ',
    descriptionEn: 'This stunning luxury villa in the heart of Bole Atlas offers a perfect blend of modern elegance and comfort.',
    descriptionAm: '',
    type: 'VILLA',
    price: '85000',
    bedrooms: '4',
    bathrooms: '3',
    area: '350',
    address: 'Bole, Addis Ababa',
    location: '',
    amenities: ['Parking', 'Garden', 'Generator', 'Security', 'WiFi', 'Furnished', 'Gym', 'Pool'],
    furnishingType: 'Fully Furnished',
    leaseDuration: '12',
    depositAmount: '170000',
    specialTerms: '',
    availableFrom: '',
    editCount: 0,
    status: 'Available',
    images: [
        { name: 'villa-1.jpg', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAenV_3qVcY9Qwk4wakHFXyVXSOEDbP8zpfnM2v9TbZZ2Dx6DLWg5WzQMyNUilW90Vq6f0sOyGmDlljmxE7SRGuPZ-mGD-mS_QOap5qzI1l0B9w5oqkoaVuzgP0alYz1POLq1Z7wdkOyl9G_RiBmtBc7JBDBBkBfJWkaugjSN-COItg-1H_5I30pLWoet3qEwRfjR7o65lqEoboTysrWFX5ACBJPW9fma8PplImAgccKF74CzCl70Hn_SR2cYk6Y1xVSWEP6nDHyYs' },
        { name: 'villa-2.jpg', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJmCVHHK5IgTYuMnEBX8RO1nOinrW0cnVikNmuGhYgY_CkHYI8gfpCp3SEvgug4SdZc7v6SX_o6N0eaXn-2EA9Z4xMqc9UosSSlqEGjec-0k91lXxF97pnVZ-EP6Vmf8WW4roVyCo5Am06bkxTHfotXf9mc3BScw9j6P4xBfjmzaQ5Z9Z9aX84jQ5oWmTUzI8Ifu0io--9zkixMk-fH4LdGKr80ZMqIQUK8K38xJmywgMq0LVHHEmKYxLMYGS6lfgFMprudQ4gCRcO' },
    ],
};

function EditPropertyPage() {
    const [form, setForm] = useState({ ...existingProperty });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const isEditLocked = form.editCount >= 1;

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
        const previews = files.map(f => ({ name: f.name, url: URL.createObjectURL(f) }));
        setForm(prev => ({ ...prev, images: [...prev.images, ...previews] }));
    };

    const removeImage = (index) => {
        setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsSaved(true);
            setForm(prev => ({ ...prev, editCount: prev.editCount + 1 }));
            setTimeout(() => setIsSaved(false), 3000);
        }, 1200);
    };

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <PageHeader
                title={`Edit: ${form.titleEn}`}
                description={`Property ID: #${form.id}`}
                backLink="/owner/properties"
            >
                <StatusBadge status={form.status} />
                <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium">
                    {form.editCount >= 1 ? (
                        <><Lock size={12} className="text-rose-500" /> <span className="text-rose-500">No edits remaining</span></>
                    ) : (
                        <><CheckCircle2 size={12} className="text-emerald-500" /> <span className="text-emerald-600">1 edit remaining</span></>
                    )}
                </div>
            </PageHeader>

            {/* Edit Lock Warning */}
            {isEditLocked && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 flex items-start gap-3 animate-in fade-in-0 duration-300">
                    <AlertTriangle size={20} className="text-rose-500 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-rose-700">Edit Limit Reached</p>
                        <p className="text-xs text-rose-600 mt-0.5">
                            You have already used your one allowed edit for this property. Contact admin if you need further changes.
                        </p>
                    </div>
                </div>
            )}

            {/* Form */}
            <Card className={isEditLocked ? 'opacity-60 pointer-events-none' : ''}>
                <CardContent className="space-y-6">
                    <h3 className="font-bold text-foreground text-lg">Property Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title (English)</label>
                            <Input className="mt-1.5" value={form.titleEn} onChange={e => updateForm('titleEn', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title (Amharic)</label>
                            <Input className="mt-1.5" value={form.titleAm} onChange={e => updateForm('titleAm', e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description (English)</label>
                            <textarea className="mt-1.5 w-full h-28 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20" value={form.descriptionEn} onChange={e => updateForm('descriptionEn', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description (Amharic)</label>
                            <textarea className="mt-1.5 w-full h-28 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20" value={form.descriptionAm} onChange={e => updateForm('descriptionAm', e.target.value)} />
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Property Type</label>
                            <Select value={form.type} onValueChange={v => updateForm('type', v)}>
                                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                                <SelectContent><SelectGroup>{propertyTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectGroup></SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1"><DollarSign size={12} /> Monthly Rent (ETB)</label>
                            <Input className="mt-1.5" type="number" value={form.price} onChange={e => updateForm('price', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Bed size={12} /> Bedrooms</label>
                            <Input className="mt-1.5" type="number" value={form.bedrooms} onChange={e => updateForm('bedrooms', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Bath size={12} /> Bathrooms</label>
                            <Input className="mt-1.5" type="number" value={form.bathrooms} onChange={e => updateForm('bathrooms', e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Maximize size={12} /> Area (m²)</label>
                            <Input className="mt-1.5" type="number" value={form.area} onChange={e => updateForm('area', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1"><MapPin size={12} /> Address</label>
                            <Input className="mt-1.5" value={form.address} onChange={e => updateForm('address', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Furnishing</label>
                            <Select value={form.furnishingType} onValueChange={v => updateForm('furnishingType', v)}>
                                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                                <SelectContent><SelectGroup>{furnishingOptions.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectGroup></SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Amenities</label>
                        <div className="flex flex-wrap gap-2">
                            {amenityOptions.map(a => (
                                <button
                                    key={a} type="button"
                                    onClick={() => toggleAmenity(a)}
                                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${form.amenities.includes(a) ? 'bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Photos */}
                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                            Photos ({form.images.length})
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {form.images.map((img, i) => (
                                <div key={i} className="relative group h-28 rounded-xl overflow-hidden border border-border">
                                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                        <button onClick={() => removeImage(i)} className="h-7 w-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-100 text-rose-500">
                                            <X size={12} />
                                        </button>
                                    </div>
                                    {i === 0 && <span className="absolute top-1 left-1 rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-bold text-primary-foreground">Cover</span>}
                                </div>
                            ))}
                            <label className="h-28 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/3 transition-all cursor-pointer">
                                <Upload size={18} />
                                <span className="text-[10px] font-medium">Add</span>
                                <input type="file" accept="image/*" multiple onChange={addImages} className="hidden" />
                            </label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    {form.editCount >= 1
                        ? 'This property can no longer be edited.'
                        : 'After saving, you will not be able to edit this property again.'}
                </p>
                <Button
                    className="gap-2"
                    onClick={handleSave}
                    disabled={isEditLocked || isSaving}
                >
                    {isSaving ? (
                        <><Loader2 size={14} className="animate-spin" /> Saving...</>
                    ) : isSaved ? (
                        <><CheckCircle2 size={14} /> Saved!</>
                    ) : (
                        <><Save size={14} /> Save Changes</>
                    )}
                </Button>
            </div>
        </div>
    );
}

export default EditPropertyPage;
