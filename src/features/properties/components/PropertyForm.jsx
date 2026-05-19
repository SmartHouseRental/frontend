import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertyFormSchema } from '../schema';
import { useCreateProperty } from '../hooks/useCreateProperty';
import { useUpdateProperty } from '../hooks/useUpdateProperty';
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
import MapModal from '@/components/auth/MapModal';

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

export function PropertyForm({ onSuccess, onCancel, property, isEditMode = false }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  const createPropertyMutation = useCreateProperty();
  const updatePropertyMutation = useUpdateProperty();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      currency: 'ETB',
      areaUnit: 'm²',
      depositCurrency: 'ETB',
      amenities: [],
      images: [],
      videos: [],
    },
  });

  // Populate form with property data when in edit mode
  useEffect(() => {
    if (isEditMode && property) {
      const titleMap = property.title || {};
      const descriptionMap = property.description || {};
      const addressMap = property.address || {};
      const priceObj = property.price || {};
      const areaObj = property.area || {};
      const leaseTerms = property.leaseTerms || {};
      const secureDeposit = leaseTerms.secureDeposit || {};
      const conditions = leaseTerms.conditions || {};
      
      reset({
        titleEn: titleMap.en || '',
        titleAm: titleMap.am || '',
        descriptionEn: descriptionMap.en || '',
        descriptionAm: descriptionMap.am || '',
        type: property.type?.en || property.type || 'VILLA',
        price: priceObj.value || property.price || '',
        currency: priceObj.currency || 'ETB',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        area: areaObj.value || property.area || '',
        areaUnit: areaObj.unit || 'm²',
        address: addressMap.en || property.address || '',
        addressAm: addressMap.am || '',
        location: property.location || '',
        amenities: Array.isArray(property.amenities) ? property.amenities : [],
        furnishingType: property.furnishingType || '',
        leaseDuration: leaseTerms.minDuration || '',
        depositAmount: secureDeposit.value || '',
        depositCurrency: secureDeposit.currency || 'ETB',
        specialTerms: conditions.en || '',
        specialTermsAm: conditions.am || '',
        availableFrom: property.availableFrom || '',
        images: property.images || [],
        videos: property.video ? [property.video] : (property.videos || []),
      });

      // Set image previews for existing images
      if (property.images && property.images.length > 0) {
        setImagePreviews(property.images.map((url, i) => ({ name: `Image ${i + 1}`, url, isExisting: true })));
      }

      // Set video previews for existing videos
      if (property.video) {
        setVideoPreviews([{ name: 'Video', url: property.video, isExisting: true }]);
      } else if (property.videos && property.videos.length > 0) {
        setVideoPreviews(property.videos.map((url, i) => ({ name: `Video ${i + 1}`, url, isExisting: true })));
      }
    }
  }, [isEditMode, property, reset]);

  const amenities = watch('amenities') || [];
  const customAmenity = watch('customAmenity') || '';

  const toggleAmenity = (amenity) => {
    const currentAmenities = amenities || [];
    if (currentAmenities.includes(amenity)) {
      setValue('amenities', currentAmenities.filter((a) => a !== amenity));
    } else {
      setValue('amenities', [...currentAmenities, amenity]);
    }
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !amenities.includes(customAmenity.trim())) {
      setValue('amenities', [...amenities, customAmenity.trim()]);
      setValue('customAmenity', '');
    }
  };

  const removeCustomAmenity = (amenity) => {
    setValue('amenities', amenities.filter((a) => a !== amenity));
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setValue('address', location.name);
    setValue('location', `${location.lat},${location.lon}`);
  };

  const addImages = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f, isExisting: false }));
    setImagePreviews((prev) => [...prev, ...previews]);
    setValue('images', [...(watch('images') || []), ...files]);
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    const currentImages = watch('images') || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue('images', newImages);
  };

  const addVideos = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f, isExisting: false }));
    setVideoPreviews((prev) => [...prev, ...previews]);
    setValue('videos', [...(watch('videos') || []), ...files]);
  };

  const removeVideo = (index) => {
    const newPreviews = videoPreviews.filter((_, i) => i !== index);
    setVideoPreviews(newPreviews);
    const currentVideos = watch('videos') || [];
    const newVideos = currentVideos.filter((_, i) => i !== index);
    setValue('videos', newVideos);
  };

  const onSubmit = async (data) => {
    if (isEditMode) {
      // Edit mode: send JSON data
      const jsonData = {
        title: {
          en: data.titleEn,
          am: data.titleAm
        },
        description: {
          en: data.descriptionEn,
          am: data.descriptionAm
        },
        type: data.type,
        price: parseFloat(data.price),
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        area: data.area ? parseFloat(data.area) : null,
        address: data.address,
        location: data.location || '',
        amenities: data.amenities,
        furnishingType: data.furnishingType,
        images: imagePreviews.map(img => img.isExisting ? img.url : img.url),
        videos: videoPreviews.map(vid => vid.isExisting ? vid.url : vid.url),
        rentTerms: {
          minDuration: data.leaseDuration,
          secureDeposit: {
            value: parseFloat(data.depositAmount),
            currency: data.depositCurrency
          },
          conditions: {
            en: data.specialTerms || '',
            am: data.specialTermsAm || ''
          }
        },
        availableFrom: data.availableFrom || null
      };

      try {
        await updatePropertyMutation.mutate({ propertyId: property.id, formData: jsonData });
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error('Error updating property:', error);
      }
    } else {
      // Create mode: send FormData
      const formData = new FormData();

      formData.append('title', JSON.stringify({
        en: data.titleEn,
        am: data.titleAm
      }));
      formData.append('description', JSON.stringify({
        en: data.descriptionEn,
        am: data.descriptionAm
      }));
      formData.append('type', data.type);
      formData.append('price', data.price);
      formData.append('currency', data.currency);
      formData.append('bedrooms', data.bedrooms || '');
      formData.append('bathrooms', data.bathrooms || '');
      formData.append('area', data.area || '');
      formData.append('address', JSON.stringify({
        en: data.address,
        am: data.addressAm
      }));
      formData.append('location', data.location || '');
      formData.append('amenities', JSON.stringify(data.amenities));
      formData.append('furnishingType', data.furnishingType || '');
      formData.append('leaseDuration', data.leaseDuration || '');
      formData.append('depositAmount', data.depositAmount);
      formData.append('depositCurrency', data.depositCurrency);
      formData.append('specialTerms', JSON.stringify({
        en: data.specialTerms || '',
        am: data.specialTermsAm || ''
      }));
      formData.append('availableFrom', data.availableFrom || '');

      data.images.forEach((img) => {
        if (img && !img.isExisting) {
          formData.append('images', img);
        }
      });

      data.videos.forEach((vid) => {
        if (vid && !vid.isExisting) {
          formData.append('videos', vid);
        }
      });

      try {
        await createPropertyMutation.mutateAsync(formData);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error('Error creating property:', error);
      }
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return watch('titleEn') && watch('type') && watch('price') && watch('address');
    }
    if (currentStep === 1) {
      return (watch('images') || []).length > 0;
    }
    return true;
  };

  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step Progress */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = currentStep === i;
          const isCompleted = currentStep > i;
          return (
            <div key={i} className="flex items-center gap-2">
              <button
                type="button"
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

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Basic Info */}
        {currentStep === 0 && (
          <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            <CardContent className="space-y-6 pt-6">
              <h3 className="text-foreground text-lg font-bold">Property Details</h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Title (English) <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    className="mt-1.5"
                    placeholder="e.g. Luxury Villa in Bole Atlas"
                    {...register('titleEn')}
                  />
                  {errors.titleEn && <p className="text-rose-500 text-xs mt-1">{errors.titleEn.message}</p>}
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Title (Amharic)
                  </label>
                  <Input
                    className="mt-1.5"
                    placeholder="e.g. የቦሌ አትላስ ቪላ"
                    {...register('titleAm')}
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
                    {...register('descriptionEn')}
                  />
                  {errors.descriptionEn && <p className="text-rose-500 text-xs mt-1">{errors.descriptionEn.message}</p>}
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Description (Amharic)
                  </label>
                  <textarea
                    className="border-border bg-background focus:ring-primary/20 mt-1.5 h-28 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2"
                    placeholder="ንብረቱን በዝርዝር ይግለጹ..."
                    {...register('descriptionAm')}
                  />
                </div>
              </div>

              <div className="bg-border h-px" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Property Type <span className="text-rose-500">*</span>
                  </label>
                  <Select onValueChange={(value) => setValue('type', value)} defaultValue={watch('type')}>
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
                  {errors.type && <p className="text-rose-500 text-xs mt-1">{errors.type.message}</p>}
                </div>
                <div>
                  <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                    <DollarSign size={12} /> Monthly Rent <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Select onValueChange={(value) => setValue('currency', value)} defaultValue={watch('currency')}>
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
                      {...register('price')}
                    />
                  </div>
                  {errors.price && <p className="text-rose-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                    <Bed size={12} /> Bedrooms
                  </label>
                  <Input
                    className="mt-1.5"
                    type="number"
                    placeholder="e.g. 3"
                    {...register('bedrooms')}
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
                    {...register('bathrooms')}
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
                      {...register('area')}
                    />
                    <Select onValueChange={(value) => setValue('areaUnit', value)} defaultValue={watch('areaUnit')}>
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
                    onValueChange={(value) => setValue('furnishingType', value)}
                    defaultValue={watch('furnishingType')}
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
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-1.5 w-full justify-start text-left h-12"
                    onClick={() => setIsMapModalOpen(true)}
                  >
                    {watch('address') ? (
                      <span className="truncate">{watch('address')}</span>
                    ) : (
                      <span className="text-muted-foreground">Click to select location from map</span>
                    )}
                  </Button>
                  {selectedLocation && (
                    <p className="text-muted-foreground mt-1.5 text-[11px] font-mono">
                      Coordinates: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
                    </p>
                  )}
                  {errors.address && <p className="text-rose-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div>
                  <label className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
                    <MapPin size={12} /> Address (Amharic)
                  </label>
                  <Input
                    className="mt-1.5"
                    placeholder="e.g. ቦሌ, አዲስ አበባ"
                    {...register('addressAm')}
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
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${amenities.includes(a)
                        ? 'bg-primary text-primary-foreground ring-primary/20 shadow-sm ring-2'
                        : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                        }`}
                    >
                      {a}
                    </button>
                  ))}
                  {amenities.filter(a => !amenityOptions.includes(a)).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => removeCustomAmenity(a)}
                      className="rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-medium text-rose-700 transition-all duration-200 hover:bg-rose-100"
                    >
                      {a} <X size={10} className="ml-1 inline" />
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Input
                    placeholder="Add custom amenity..."
                    {...register('customAmenity')}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAmenity())}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCustomAmenity}
                    disabled={!customAmenity.trim()}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Media */}
        {currentStep === 1 && (
          <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            <CardContent className="space-y-6 pt-6">
              <h3 className="text-foreground text-lg font-bold">Property Photos & Videos</h3>
              <p className="text-muted-foreground -mt-4 text-sm">
                Upload at least 1 photo. High-quality images attract more renters.
              </p>

              {/* Image Upload */}
              <div>
                <label className="text-muted-foreground mb-3 block text-xs font-medium tracking-wider uppercase">
                  Photos <span className="text-rose-500">*</span>{' '}
                  <span className="text-muted-foreground/60 normal-case">
                    ({imagePreviews.length} uploaded)
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {imagePreviews.map((img, i) => (
                    <div
                      key={i}
                      className="group border-border relative h-40 overflow-hidden rounded-xl border"
                    >
                      <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                        <button
                          type="button"
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
                {errors.images && <p className="text-rose-500 text-xs mt-1">{errors.images.message}</p>}
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
                  <input type="file" accept="video/*" multiple onChange={addVideos} className="hidden" />
                </label>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Rent Terms */}
        {currentStep === 2 && (
          <Card className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            <CardContent className="space-y-6 pt-6">
              <h3 className="text-foreground text-lg font-bold">Rental Terms & Conditions</h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Minimum Lease Duration
                  </label>
                  <Select
                    onValueChange={(value) => setValue('leaseDuration', value)}
                    defaultValue={watch('leaseDuration')}
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
                      onValueChange={(value) => setValue('depositCurrency', value)}
                      defaultValue={watch('depositCurrency')}
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
                      {...register('depositAmount')}
                    />
                  </div>
                  {errors.depositAmount && <p className="text-rose-500 text-xs mt-1">{errors.depositAmount.message}</p>}
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Available From
                  </label>
                  <Input
                    className="mt-1.5"
                    type="date"
                    {...register('availableFrom')}
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
                    {...register('specialTerms')}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Special Terms & Conditions (Amharic)
                  </label>
                  <textarea
                    className="border-border bg-background focus:ring-primary/20 mt-1.5 h-32 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2"
                    placeholder="ለተከራዮች ሊያሳውቁ የሚፈልጉት ልዩ ሁኔታዎች፣ ሕጎች ወይም መስፈርቶች..."
                    {...register('specialTermsAm')}
                  />
                </div>
              </div>

              <div className="bg-border h-px" />

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
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={16} /> Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              className="gap-2"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canProceed()}
            >
              Next <ChevronRight size={16} />
            </Button>
          ) : (
            <Button type="submit" className="gap-2" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} {isEditMode ? 'Save Changes' : 'Publish Property'}
            </Button>
          )}
        </div>
      </form>

      {/* Map Modal */}
      {isMapModalOpen && (
        <MapModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          onConfirm={handleLocationSelect}
        />
      )}
    </div>
  );
}
