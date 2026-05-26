import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Edit3, Home, Loader2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RenterPreferenceFields from './RenterPreferenceFields';
import { useRenterPreferences, useUpdateRenterPreferences } from '../hooks/usePreferences';
import {
  DEFAULT_RENTER_PREFERENCES,
  FURNISHING_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  getOptionLabel,
  preferenceFormValuesFromApi,
  renterPreferenceFormSchema,
} from '../utils/preferences';

function SummaryTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

export default function RenterSearchPreferencesCard() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: preferences, isLoading, isError, refetch } = useRenterPreferences();
  const updatePreferences = useUpdateRenterPreferences();
  const formValues = useMemo(() => preferenceFormValuesFromApi(preferences), [preferences]);

  const form = useForm({
    resolver: zodResolver(renterPreferenceFormSchema),
    defaultValues: DEFAULT_RENTER_PREFERENCES,
    values: formValues,
    mode: 'onChange',
  });

  const handleCancel = () => {
    form.reset(formValues);
    setIsEditing(false);
  };

  const handleSave = form.handleSubmit(async (values) => {
    await updatePreferences.mutateAsync(values);
    setIsEditing(false);
  });

  const locations = formValues.preferredLocations || [];
  const amenities = formValues.amenities || [];

  return (
    <Card className="border-none bg-card p-8 shadow-sm">
      <CardHeader className="mb-8 flex flex-row items-center justify-between p-0">
        <div className="flex items-center gap-2.5">
          <Home className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-2xl font-bold">Home Search Preferences</CardTitle>
        </div>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="border"
            disabled={isLoading}
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              disabled={updatePreferences.isPending}
              className="border"
            >
              {updatePreferences.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-border/60 bg-muted/10 p-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
            <p className="font-semibold text-destructive">Could not load search preferences.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-4">
              Try again
            </Button>
          </div>
        ) : isEditing ? (
          <div className="rounded-2xl border border-border/60 bg-muted/10 p-6">
            <RenterPreferenceFields form={form} sections="all" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <SummaryTile
                label="Budget"
                value={`${formValues.budget[0].toLocaleString()} - ${formValues.budget[1].toLocaleString()} ETB`}
              />
              <SummaryTile label="Bedrooms" value={`${formValues.bedrooms}+ preferred`} />
              <SummaryTile
                label="Property type"
                value={getOptionLabel(PROPERTY_TYPE_OPTIONS, formValues.preferredType)}
              />
              <SummaryTile
                label="Furnishing"
                value={getOptionLabel(FURNISHING_OPTIONS, formValues.furnishStatus)}
              />
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Preferred locations
              </p>
              {locations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <span
                      key={`${location.name}-${location.lat}-${location.lng}`}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {location.name.split(',')[0]}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-muted-foreground">No preferred locations yet.</p>
              )}
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Amenities
              </p>
              {amenities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-semibold text-muted-foreground"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-muted-foreground">No must-have amenities selected.</p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
