import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageHeader from '@/components/PageHeader';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  Image as ImageIcon,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Maximize,
  Home,
  FileText,
  Loader2,
  Plus,
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
  'Parking',
  'Garden',
  'Generator',
  'Security',
  'WiFi',
  'Furnished',
  'Gym',
  'Pool',
  'Elevator',
  'Balcony',
  'CCTV',
  'Water Tank',
  'Laundry',
  'Air Conditioning',
  'Solar Power',
  'Intercom',
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
    titleEn: '',
    titleAm: '',
    descriptionEn: '',
    descriptionAm: '',
    type: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    areaUnit: 'm²',
    address: '',
    addressAm: '',
    location: '',
    amenities: [],
    furnishingType: '',
    images: [],
    videos: [],
    leaseDuration: '',
    depositAmount: '',
    depositCurrency: 'ETB',
    currency: 'ETB',
    specialTerms: '',
    specialTermsAm: '',
    availableFrom: '',
  });

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const addImages = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f }));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...previews] }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
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
        <div className="animate-in fade-in-0 flex flex-col items-center justify-center py-24 duration-500">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-foreground text-2xl font-extrabold">Property Listed Successfully!</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-center">
            Your property has been submitted. As a verified owner, your listing is automatically
            approved and now live.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                setForm({
                  titleEn: '',
                  titleAm: '',
                  descriptionEn: '',
                  descriptionAm: '',
                  type: '',
                  price: '',
                  bedrooms: '',
                  bathrooms: '',
                  area: '',
                  areaUnit: 'm²',
                  address: '',
                  addressAm: '',
                  location: '',
                  amenities: [],
                  furnishingType: '',
                  images: [],
                  videos: [],
                  leaseDuration: '',
                  depositAmount: '',
                  depositCurrency: 'ETB',
                  currency: 'ETB',
                  specialTerms: '',
                  specialTermsAm: '',
                  availableFrom: '',
                });
              }}
            >
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
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
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
                    ? 'cursor-pointer bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-muted text-muted-foreground'
                  }`}
              >
                {isCompleted ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`h-px w-8 transition-colors ${isCompleted ? 'bg-emerald-400' : 'bg-border'}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 0 && (
        <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
          <CardContent className="space-y-6">
            <h3 className="text-foreground text-lg font-bold">Property Details</h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Title (English) <span className="text-rose-500">*</span>
                </label>
                <Input
                  className="mt-1.5"
                  placeholder="e.g. Luxury Villa in Bole Atlas"
                  value={form.titleEn}
                  onChange={(e) => updateForm('titleEn', e.target.value)}
                />
              </div>
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Title (Amharic)
                </label>
                <Input
                  className="mt-1.5"
                  placeholder="e.g. የቦሌ አትላስ ቪላ"
                  value={form.titleAm}
                  onChange={(e) => updateForm('titleAm', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Description (English)
                </label>
                <textarea
                  className="border-border bg-background focus:ring-primary/20 mt-1.5 h-28 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2"
                  placeholder="Describe your property in detail..."
                  value={form.descriptionEn}
                  onChange={(e) => updateForm('descriptionEn', e.target.value)}
                />
              </div>
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Description (Amharic)
                </label>
                <textarea
                  className="border-border bg-background focus:ring-primary/20 mt-1.5 h-28 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2"
                  placeholder="ንብረቱን በዝርዝር ይግለጹ..."
                  value={form.descriptionAm}
                  onChange={(e) => updateForm('descriptionAm', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-border h-px" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Property Type <span className="text-rose-500">*</span>
                </label>
                <Select value={form.type} onValueChange={(v) => updateForm('type', v)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {propertyTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                  <DollarSign size={12} /> Monthly Rent <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Select value={form.currency} onValueChange={(v) => updateForm('currency', v)}>
                    <SelectTrigger className="mt-1.5 w-[100px]">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ETB">ETB</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    className="mt-1.5 flex-1"
                    type="number"
                    placeholder="e.g. 45000"
                    value={form.price}
                    onChange={(e) => updateForm('price', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                  <Bed size={12} /> Bedrooms
                </label>
                <Input
                  className="mt-1.5"
                  type="number"
                  placeholder="e.g. 3"
                  value={form.bedrooms}
                  onChange={(e) => updateForm('bedrooms', e.target.value)}
                />
              </div>
              <div>
                <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                  <Bath size={12} /> Bathrooms
                </label>
                <Input
                  className="mt-1.5"
                  type="number"
                  placeholder="e.g. 2"
                  value={form.bathrooms}
                  onChange={(e) => updateForm('bathrooms', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                  <Maximize size={12} /> Area
                </label>
                <div className="flex gap-2">
                  <Input
                    className="mt-1.5 flex-1"
                    type="number"
                    placeholder="e.g. 250"
                    value={form.area}
                    onChange={(e) => updateForm('area', e.target.value)}
                  />
                  <Select value={form.areaUnit} onValueChange={(v) => updateForm('areaUnit', v)}>
                    <SelectTrigger className="mt-1.5 w-[100px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="m²">m²</SelectItem>
                        <SelectItem value="sq ft">sq ft</SelectItem>
                        <SelectItem value="km²">km²</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Furnishing
                </label>
                <Select
                  value={form.furnishingType}
                  onValueChange={(v) => updateForm('furnishingType', v)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {furnishingOptions.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                  <MapPin size={12} /> Address (English) <span className="text-rose-500">*</span>
                </label>
                <Input
                  className="mt-1.5"
                  placeholder="e.g. Bole, Addis Ababa"
                  value={form.address}
                  onChange={(e) => updateForm('address', e.target.value)}
                />
              </div>
              <div>
                <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                  <MapPin size={12} /> Address (Amharic)
                </label>
                <Input
                  className="mt-1.5"
                  placeholder="e.g. ቦሌ, አዲስ አበባ"
                  value={form.addressAm}
                  onChange={(e) => updateForm('addressAm', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-border h-px" />

            <div>
              <label className="text-muted-foreground mb-3 block text-xs font-medium tracking-wider uppercase">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${form.amenities.includes(a)
                      ? 'bg-primary text-primary-foreground ring-primary/20 shadow-sm ring-2'
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
            <h3 className="text-foreground text-lg font-bold">Property Photos & Videos</h3>
            <p className="text-muted-foreground -mt-4 text-sm">
              Upload at least 1 photo. High-quality images attract more renters.
            </p>

            {/* Image Upload */}
            <div>
              <label className="text-muted-foreground mb-3 block text-xs font-medium tracking-wider uppercase">
                Photos <span className="text-rose-500">*</span>{' '}
                <span className="text-muted-foreground/60 normal-case">
                  ({form.images.length} uploaded)
                </span>
              </label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {form.images.map((img, i) => (
                  <div
                    key={i}
                    className="group border-border relative h-40 overflow-hidden rounded-xl border"
                  >
                    <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                      <button
                        onClick={() => removeImage(i)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-rose-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {i === 0 && (
                      <span className="bg-primary text-primary-foreground absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
                <label className="border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/3 flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all">
                  <Upload size={24} />
                  <span className="text-xs font-medium">Add Photos</span>
                  <span className="text-muted-foreground/60 text-[10px]">JPG, PNG up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={addImages}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="bg-border h-px" />

            {/* Video Upload */}
            <div>
              <label className="text-muted-foreground mb-3 block text-xs font-medium tracking-wider uppercase">
                Video Tour <span className="text-muted-foreground/60 normal-case">(optional)</span>
              </label>
              <label className="border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/3 flex h-32 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all">
                <Upload size={20} />
                <div>
                  <p className="text-sm font-medium">Upload a video tour</p>
                  <p className="text-muted-foreground/60 text-[10px]">MP4 up to 100MB</p>
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
            <h3 className="text-foreground text-lg font-bold">Rental Terms & Conditions</h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Minimum Lease Duration
                </label>
                <Select
                  value={form.leaseDuration}
                  onValueChange={(v) => updateForm('leaseDuration', v)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
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
                <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                  <DollarSign size={12} /> Security Deposit <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Select
                    value={form.depositCurrency}
                    onValueChange={(v) => updateForm('depositCurrency', v)}
                  >
                    <SelectTrigger className="mt-1.5 w-[100px]">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ETB">ETB</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    className="mt-1.5 flex-1"
                    type="number"
                    placeholder="e.g. 90000"
                    value={form.depositAmount}
                    onChange={(e) => updateForm('depositAmount', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Available From
                </label>
                <Input
                  className="mt-1.5"
                  type="date"
                  value={form.availableFrom}
                  onChange={(e) => updateForm('availableFrom', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Special Terms & Conditions (English)
                </label>
                <textarea
                  className="border-border bg-background focus:ring-primary/20 mt-1.5 h-32 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2"
                  placeholder="Any special conditions, rules, or requirements for potential renters..."
                  value={form.specialTerms}
                  onChange={(e) => updateForm('specialTerms', e.target.value)}
                />
              </div>
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Special Terms & Conditions (Amharic)
                </label>
                <textarea
                  className="border-border bg-background focus:ring-primary/20 mt-1.5 h-32 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2"
                  placeholder="ለተከራዮች ሊያሳውቁ የሚፈልጉት ልዩ ሁኔታዎች፣ ሕጎች ወይም መስፈርቶች..."
                  value={form.specialTermsAm}
                  onChange={(e) => updateForm('specialTermsAm', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-border h-px" />

            {/* Summary Preview */}
            <div>
              <h4 className="text-foreground mb-4 font-bold">Listing Summary</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  {
                    label: 'Type',
                    value: propertyTypes.find((t) => t.value === form.type)?.label || '—',
                  },
                  {
                    label: 'Monthly Rent',
                    value: form.price ? `${Number(form.price).toLocaleString()} ${form.currency}` : '—',
                  },
                  { label: 'Bedrooms', value: form.bedrooms || '—' },
                  { label: 'Bathrooms', value: form.bathrooms || '—' },
                  { label: 'Area', value: form.area ? `${form.area} ${form.areaUnit}` : '—' },
                  {
                    label: 'Deposit',
                    value: form.depositAmount
                      ? `${Number(form.depositAmount).toLocaleString()} ${form.depositCurrency}`
                      : '—',
                  },
                  { label: 'Photos', value: form.images.length },
                  { label: 'Amenities', value: form.amenities.length },
                ].map((item) => (
                  <div key={item.label} className="bg-muted/30 rounded-lg p-3">
                    <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                      {item.label}
                    </p>
                    <p className="text-foreground mt-0.5 text-sm font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-approve note */}
            <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
              <div>
                <p className="text-sm font-bold text-emerald-700">Auto-Approval Enabled</p>
                <p className="mt-0.5 text-xs text-emerald-600">
                  As a verified owner, your listing will be automatically approved and visible to
                  renters immediately.
                </p>
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
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={16} /> Previous
        </Button>
        <div className="text-muted-foreground text-xs font-medium">
          Step {currentStep + 1} of {steps.length}
        </div>
        {currentStep < steps.length - 1 ? (
          <Button
            className="gap-2"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={!canProceed()}
          >
            Next <ChevronRight size={16} />
          </Button>
        ) : (
          <Button className="gap-2" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Publishing...
              </>
            ) : (
              <>
                <Plus size={16} /> Publish Property
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default AddPropertyPage;
