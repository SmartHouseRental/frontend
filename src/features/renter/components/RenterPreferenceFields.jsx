import { useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { Check, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import RenterLocationSelector from './RenterLocationSelector';
import {
  DEFAULT_RENTER_PREFERENCES,
  BEDROOM_OPTIONS,
  DEFAULT_AMENITIES,
  FURNISHING_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from '../utils/preferences';

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-sm font-medium text-destructive">{message}</p>;
}

export default function RenterPreferenceFields({ form, sections = 'all' }) {
  const [customAmenity, setCustomAmenity] = useState('');
  const values = useWatch({ control: form.control }) || DEFAULT_RENTER_PREFERENCES;
  const activeSections = Array.isArray(sections) ? sections : [sections];
  const showAll = sections === 'all';
  const shouldShow = (section) => showAll || activeSections.includes(section);
  const amenities = values.amenities || [];
  const displayAmenities = Array.from(new Set([...DEFAULT_AMENITIES, ...amenities]));

  const toggleAmenity = (amenity) => {
    const nextAmenities = amenities.includes(amenity)
      ? amenities.filter((item) => item !== amenity)
      : [...amenities, amenity];

    form.setValue('amenities', nextAmenities, { shouldDirty: true, shouldValidate: true });
  };

  const addCustomAmenity = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const value = customAmenity.trim();
    if (!value || amenities.includes(value)) return;
    form.setValue('amenities', [...amenities, value], { shouldDirty: true, shouldValidate: true });
    setCustomAmenity('');
  };

  return (
    <div className="space-y-8">
      {shouldShow('budget') && (
        <section className="space-y-5">
          <Controller
            control={form.control}
            name="budget"
            render={({ field }) => (
              <>
                <Slider
                  value={field.value}
                  min={5000}
                  max={200000}
                  step={1000}
                  onValueChange={field.onChange}
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border bg-muted/30 p-4 text-center">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      Minimum
                    </span>
                    <span className="text-2xl font-black text-foreground">
                      {field.value[0].toLocaleString()}
                    </span>
                    <span className="ml-1 text-sm font-bold text-muted-foreground">ETB</span>
                  </div>
                  <div className="rounded-2xl border-2 border-primary bg-primary/5 p-4 text-center">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-primary">
                      Maximum
                    </span>
                    <span className="text-2xl font-black text-foreground">
                      {field.value[1].toLocaleString()}
                    </span>
                    <span className="ml-1 text-sm font-bold text-primary">ETB</span>
                  </div>
                </div>
              </>
            )}
          />
          <FieldError message={form.formState.errors.budget?.message} />
        </section>
      )}

      {shouldShow('bedrooms') && (
        <section className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            {BEDROOM_OPTIONS.map(({ value, label, detail }) => {
              const isSelected = values.bedrooms === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => form.setValue('bedrooms', value, { shouldDirty: true, shouldValidate: true })}
                  className={`relative flex flex-col items-start gap-1.5 rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? 'scale-[1.02] border-primary bg-primary/5 text-primary shadow-md shadow-primary/10'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                  }`}
                >
                  <span className="text-3xl font-black">{label}</span>
                  <span className="text-[15px] font-bold leading-none">
                    {value === 1 ? 'Bedroom' : 'Bedrooms'}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{detail}</span>
                  {isSelected && (
                    <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check size={11} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <FieldError message={form.formState.errors.bedrooms?.message} />
        </section>
      )}

      {shouldShow('locations') && (
        <section className="space-y-3">
          <Controller
            control={form.control}
            name="preferredLocations"
            render={({ field }) => (
              <RenterLocationSelector
                selectedLocations={field.value || []}
                setSelectedLocations={(nextLocations) => {
                  const value =
                    typeof nextLocations === 'function' ? nextLocations(field.value || []) : nextLocations;
                  field.onChange(value);
                }}
              />
            )}
          />
          <FieldError message={form.formState.errors.preferredLocations?.message} />
        </section>
      )}

      {shouldShow('type') && (
        <section className="space-y-3">
          {PROPERTY_TYPE_OPTIONS.map(({ label, value }) => {
            const isSelected = values.preferredType === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => form.setValue('preferredType', value, { shouldDirty: true, shouldValidate: true })}
                className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 ${
                  isSelected
                    ? 'scale-[1.01] border-primary bg-primary/5 shadow-md shadow-primary/10'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                }`}
              >
                <span className={`flex-1 text-[16px] font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {label}
                </span>
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'}`}>
                  {isSelected && <Check size={12} />}
                </div>
              </button>
            );
          })}
          <FieldError message={form.formState.errors.preferredType?.message} />
        </section>
      )}

      {shouldShow('amenities') && (
        <section className="space-y-5">
          <div className="relative">
            <Input
              placeholder="Type a custom amenity and press Enter..."
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              onKeyDown={addCustomAmenity}
              className="h-12 rounded-2xl border-border/60 bg-card pl-4 pr-12 shadow-sm focus:border-primary"
            />
            <Plus className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
          <div className="flex flex-wrap gap-2.5">
            {displayAmenities.map((amenity) => {
              const isSelected = amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all duration-200 ${
                    isSelected
                      ? 'scale-105 border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                  }`}
                >
                  {isSelected && <Check size={13} />}
                  {amenity}
                </button>
              );
            })}
          </div>
          <p className="pt-2 text-center text-sm font-medium text-muted-foreground">
            {amenities.length} selected - you can always update later
          </p>
        </section>
      )}

      {shouldShow('furnishing') && (
        <section className="space-y-3">
          {FURNISHING_OPTIONS.map(({ label, value, detail }) => {
            const isSelected = values.furnishStatus === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => form.setValue('furnishStatus', value, { shouldDirty: true, shouldValidate: true })}
                className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-5 text-left transition-all duration-200 ${
                  isSelected
                    ? 'scale-[1.01] border-primary bg-primary/5 shadow-md shadow-primary/10'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                }`}
              >
                <div className="flex-1">
                  <p className={`text-[16px] font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {label}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">{detail}</p>
                </div>
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'}`}>
                  {isSelected && <Check size={12} />}
                </div>
              </button>
            );
          })}
          <FieldError message={form.formState.errors.furnishStatus?.message} />
        </section>
      )}
    </div>
  );
}
