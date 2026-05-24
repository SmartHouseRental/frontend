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
  { value: 'CONDO', label: 'Condo' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'HOUSE', label: 'House' },
  { value: 'PENTHOUSE', label: 'Penthouse' },
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

const formatDateForInput = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

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

  const syncImagesFormValue = (previews) => {
    setValue(
      'images',
      [
        ...previews.filter((p) => p.isExisting).map(() => 'existing'),
        ...previews.filter((p) => p.file instanceof File).map((p) => p.file),
      ],
      { shouldValidate: true }
    );
  };

  const syncVideosFormValue = (previews) => {
    setValue(
      'videos',
      [
        ...previews.filter((p) => p.isExisting).map(() => 'existing'),
        ...previews.filter((p) => p.file instanceof File).map((p) => p.file),
      ],
      { shouldValidate: true }
    );
  };

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
        category: property.category?.en || (typeof property.category === 'string' ? property.category : 'VILLA'),
        categoryAm: property.category?.am || '',
        price: (priceObj.value || property.price || '').toString(),
        currency: priceObj.currency || 'ETB',
        bedrooms: property.bedrooms ? property.bedrooms.toString() : '',
        bathrooms: property.bathrooms ? property.bathrooms.toString() : '',
        area: (areaObj.value || property.area || '').toString(),
        areaUnit: areaObj.unit || 'm²',
        address: addressMap.en || property.address || '',
        addressAm: addressMap.am || '',
        location: typeof property.location === 'object' && property.location 
          ? `${property.location.lat},${property.location.lng}` 
          : property.location || '',
        amenities: Array.isArray(property.amenities) ? property.amenities : [],
        furnishingType: property.furnishingStatus || property.furnishingType || undefined,
        leaseDuration: leaseTerms.minDuration ? String(leaseTerms.minDuration) : '',
        depositAmount: (secureDeposit.value || '').toString(),
        depositCurrency: secureDeposit.currency || 'ETB',
        specialTerms: conditions.en || '',
        specialTermsAm: conditions.am || '',
        availableFrom: formatDateForInput(leaseTerms.availableFrom || property.availableFrom),
        // Keep URLs for form validation only; uploads use imagePreviews + File instances
        images: property.images?.length ? property.images.map(() => 'existing') : [],
        videos: [],
      });

      // Set image previews for existing images
      if (property.images?.length > 0) {
        const previews = property.images.map((url, i) => ({
          id: `existing-${i}-${url}`,
          name: `Image ${i + 1}`,
          url,
          isExisting: true,
        }));
        setImagePreviews(previews);
        syncImagesFormValue(previews);
      } else {
        setImagePreviews([]);
        syncImagesFormValue([]);
      }

      // Set video previews for existing videos
      const existingVideoUrls = property.video
        ? [property.video]
        : property.videos?.length
          ? property.videos
          : [];
      if (existingVideoUrls.length > 0) {
        const previews = existingVideoUrls.map((url, i) => ({
          id: `existing-video-${i}-${url}`,
          name: `Video ${i + 1}`,
          url,
          isExisting: true,
        }));
        setVideoPreviews(previews);
        syncVideosFormValue(previews);
      } else {
        setVideoPreviews([]);
        syncVideosFormValue([]);
      }
    }
  }, [isEditMode, property, reset, setValue]);

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
    e.target.value = '';
    if (files.length === 0) return;

    const newPreviews = files.map((f) => ({
      id: `new-${f.name}-${f.lastModified}-${Date.now()}`,
      name: f.name,
      url: URL.createObjectURL(f),
      file: f,
      isExisting: false,
    }));

    setImagePreviews((prev) => {
      const next = [...prev, ...newPreviews];
      syncImagesFormValue(next);
      return next;
    });
  };

  const removeImage = (index) => {
    const removed = imagePreviews[index];
    if (removed?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(removed.url);
    }

    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    syncImagesFormValue(newPreviews);
  };

  const addVideos = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;

    const newPreviews = files.map((f) => ({
      id: `new-video-${f.name}-${f.lastModified}-${Date.now()}`,
      name: f.name,
      url: URL.createObjectURL(f),
      file: f,
      isExisting: false,
    }));

    setVideoPreviews((prev) => {
      const next = [...prev, ...newPreviews];
      syncVideosFormValue(next);
      return next;
    });
  };

  const removeVideo = (index) => {
    const removed = videoPreviews[index];
    if (removed?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(removed.url);
    }

    const newPreviews = videoPreviews.filter((_, i) => i !== index);
    setVideoPreviews(newPreviews);
    syncVideosFormValue(newPreviews);
  };

  const onSubmit = async (data) => {
    // Both Create and Edit now use FormData to support file uploads
    const formData = new FormData();

    formData.append('title', JSON.stringify({
      en: data.titleEn,
      am: data.titleAm
    }));
    formData.append('description', JSON.stringify({
      en: data.descriptionEn,
      am: data.descriptionAm
    }));
    formData.append('category', JSON.stringify({
      en: data.category,
      am: data.categoryAm?.trim() || data.category,
    }));
    formData.append('price', JSON.stringify({
      value: parseFloat(data.price),
      currency: data.currency
    }));
    
    if (data.bedrooms) formData.append('bedrooms', data.bedrooms);
    if (data.bathrooms) formData.append('bathrooms', data.bathrooms);
    
    if (data.area) {
      formData.append('area', JSON.stringify({
        value: parseFloat(data.area),
        unit: data.areaUnit
      }));
    }

    formData.append('address', JSON.stringify({
      en: data.address,
      am: data.addressAm
    }));

    if (data.location) {
      if (data.location.includes(',')) {
        const [lat, lng] = data.location.split(',');
        formData.append('location', JSON.stringify({
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }));
      } else {
        const match = data.location.match(/POINT\(([^ ]+)\s+([^)]+)\)/);
        if (match) {
          formData.append('location', JSON.stringify({
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2])
          }));
        } else {
          formData.append('location', JSON.stringify({ lat: 0, lng: 0 }));
        }
      }
    } else {
      formData.append('location', JSON.stringify({ lat: 0, lng: 0 }));
    }

    formData.append('amenities', JSON.stringify(data.amenities || []));
    if (data.furnishingType) formData.append('furnishingStatus', data.furnishingType);
    
    const leaseTerms = {};
    if (data.leaseDuration) {
      leaseTerms.minDuration = parseInt(data.leaseDuration, 10);
    }
    if (data.depositAmount) {
      leaseTerms.secureDeposit = {
        value: parseFloat(data.depositAmount),
        currency: data.depositCurrency,
      };
    }
    if (data.specialTerms || data.specialTermsAm) {
      leaseTerms.conditions = {
        en: data.specialTerms || '',
        am: data.specialTermsAm || '',
      };
    }
    if (data.availableFrom) {
      leaseTerms.availableFrom = data.availableFrom;
    }
    if (Object.keys(leaseTerms).length > 0) {
      formData.append('leaseTerms', JSON.stringify(leaseTerms));
    }

    if (data.availableFrom) {
      formData.append('availableFrom', data.availableFrom);
    }

    const keptImageUrls = imagePreviews.filter((img) => img.isExisting).map((img) => img.url);
    const newImageFiles = imagePreviews.filter((img) => img.file instanceof File).map((img) => img.file);

    if (isEditMode) {
      // Tell API which existing URLs to keep (empty array = all previous removed)
      formData.append('images', JSON.stringify(keptImageUrls));
    } else if (keptImageUrls.length > 0) {
      formData.append('images', JSON.stringify(keptImageUrls));
    }

    newImageFiles.forEach((file) => formData.append('images', file));

    const keptVideoUrls = videoPreviews.filter((vid) => vid.isExisting).map((vid) => vid.url);
    const newVideoFiles = videoPreviews.filter((vid) => vid.file instanceof File).map((vid) => vid.file);

    if (isEditMode) {
      formData.append('videos', JSON.stringify(keptVideoUrls));
    } else if (keptVideoUrls.length > 0) {
      formData.append('videos', JSON.stringify(keptVideoUrls));
    }

    newVideoFiles.forEach((file) => formData.append('videos', file));

    try {
      if (isEditMode) {
        await updatePropertyMutation.mutateAsync({ propertyId: property.id, formData: formData });
      } else {
        await createPropertyMutation.mutateAsync(formData);
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return watch('titleEn') && watch('category') && watch('price') && watch('address');
    }
    if (currentStep === 1) {
      return imagePreviews.length > 0;
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

      <form onSubmit={handleSubmit(onSubmit, (errors) => {
        console.error("Form validation errors:", errors);
        // Find which step contains the first validation error and navigate there
        if (errors.titleEn || errors.titleAm || errors.descriptionEn || errors.descriptionAm || errors.category || errors.address || errors.addressAm || errors.location) {
          setCurrentStep(0);
        } else if (errors.images || errors.videos) {
          setCurrentStep(1);
        } else if (errors.bedrooms || errors.bathrooms || errors.area || errors.areaUnit || errors.furnishingType || errors.amenities) {
          setCurrentStep(2);
        } else if (errors.price || errors.currency || errors.leaseDuration || errors.depositAmount || errors.depositCurrency || errors.specialTerms || errors.specialTermsAm || errors.availableFrom) {
          setCurrentStep(3);
        }
      })}>
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
                  <Select onValueChange={(value) => setValue('category', value)} value={watch('category')}>
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
                  {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category.message}</p>}
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
                {isEditMode
                  ? 'Remove existing photos with the × button or add new ones. At least one photo is required.'
                  : 'Upload at least 1 photo. High-quality images attract more renters.'}
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
                      key={img.id}
                      className="group border-border relative h-40 overflow-hidden rounded-xl border"
                    >
                      <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          aria-label={`Remove ${img.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-rose-600 shadow-md transition-opacity hover:bg-rose-50"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      {i === 0 && (
                        <span className="bg-primary text-primary-foreground absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold">
                          Cover
                        </span>
                      )}
                      {!img.isExisting && (
                        <span className="absolute top-2 right-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          New
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
                  {videoPreviews.length > 0 && (
                    <span className="text-muted-foreground/60 normal-case">
                      {' '}
                      ({videoPreviews.length} uploaded)
                    </span>
                  )}
                </label>
                {videoPreviews.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-3">
                    {videoPreviews.map((vid, i) => (
                      <div
                        key={vid.id}
                        className="border-border flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2"
                      >
                        <span className="max-w-[200px] truncate text-xs font-medium">{vid.name}</span>
                        {!vid.isExisting && (
                          <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            New
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeVideo(i)}
                          aria-label={`Remove ${vid.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-rose-600 hover:bg-rose-50"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                    value={watch('leaseDuration') || undefined}
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
                      value={watch('depositCurrency') || 'ETB'}
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
          <div className="flex items-center gap-2">
            {currentStep === 0 && (
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={16} /> Previous
            </Button>
          </div>
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              className="gap-2"
              onClick={(e) => { e.preventDefault(); setCurrentStep((prev) => prev + 1) }}
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
