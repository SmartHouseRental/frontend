import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Check,
  Home,
  Loader2,
  MapPin,
  Sofa,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import RenterPreferenceFields from './RenterPreferenceFields';
import { useRenterPreferences, useUpdateRenterPreferences } from '../hooks/usePreferences';
import {
  DEFAULT_RENTER_PREFERENCES,
  preferenceFormValuesFromApi,
  renterPreferenceFormSchema,
} from '../utils/preferences';

const QUESTIONS = [
  {
    id: 'budget',
    section: 'budget',
    fields: ['budget'],
    icon: Wallet,
    title: 'What is your monthly budget?',
    subtitle: 'Drag the slider to set your price range in ETB',
  },
  {
    id: 'bedrooms',
    section: 'bedrooms',
    fields: ['bedrooms'],
    icon: BedDouble,
    title: 'How many bedrooms do you need?',
    subtitle: 'Choose your preferred bedroom count',
  },
  {
    id: 'locations',
    section: 'locations',
    fields: ['preferredLocations'],
    icon: MapPin,
    title: 'Where would you like to live?',
    subtitle: 'Pick popular areas or drop a pin on the map',
  },
  {
    id: 'type',
    section: 'type',
    fields: ['preferredType'],
    icon: Home,
    title: 'Preferred property type?',
    subtitle: 'Select the kind of property you want',
  },
  {
    id: 'amenities',
    section: 'amenities',
    fields: ['amenities'],
    icon: Sparkles,
    title: 'Must-have amenities?',
    subtitle: 'Select or type your own - skip if unsure',
  },
  {
    id: 'furnishing',
    section: 'furnishing',
    fields: ['furnishStatus'],
    icon: Sofa,
    title: 'Furnishing preference?',
    subtitle: 'How would you like the property delivered?',
  },
];

function isCurrentStepComplete(step, values) {
  switch (QUESTIONS[step].id) {
    case 'budget':
      return Array.isArray(values.budget) && values.budget.length === 2;
    case 'bedrooms':
      return Number.isFinite(values.bedrooms);
    case 'locations':
      return (values.preferredLocations || []).length > 0;
    case 'type':
      return Boolean(values.preferredType);
    case 'amenities':
      return true;
    case 'furnishing':
      return Boolean(values.furnishStatus);
    default:
      return true;
  }
}

export default function RenterPreferencesWizardContent() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { data: savedPreferences, isLoading } = useRenterPreferences({
    refetchOnMount: false,
  });
  const updatePreferences = useUpdateRenterPreferences();
  const formValues = useMemo(
    () => preferenceFormValuesFromApi(savedPreferences),
    [savedPreferences]
  );

  const form = useForm({
    resolver: zodResolver(renterPreferenceFormSchema),
    defaultValues: DEFAULT_RENTER_PREFERENCES,
    values: formValues,
    mode: 'onChange',
  });

  const values = useWatch({ control: form.control }) || DEFAULT_RENTER_PREFERENCES;
  const currentQuestion = QUESTIONS[step];
  const StepIcon = currentQuestion.icon;
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const isSaving = updatePreferences.isPending;
  const canContinue = isCurrentStepComplete(step, values);

  const handleNext = async () => {
    const isValid = await form.trigger(currentQuestion.fields);
    if (!isValid) return;

    if (step < QUESTIONS.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    form.handleSubmit(async (submittedValues) => {
      await updatePreferences.mutateAsync(submittedValues);
      navigate('/welcome');
    })();
  };

  const handleBack = () => {
    if (step > 0) setStep((current) => current - 1);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tight text-foreground">Find Your Perfect Home</h1>
          <p className="mt-2 font-medium italic text-muted-foreground">
            Tell us what you are looking for in Addis Ababa
          </p>
          {isLoading && (
            <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading saved preferences
            </p>
          )}
        </div>

        <div className="mb-10 rounded-3xl border border-border bg-background/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground ${step === 0 ? 'invisible' : ''}`}
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="flex items-center gap-2">
              {QUESTIONS.map((question, index) => {
                const Icon = question.icon;
                return (
                  <div
                    key={question.id}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      index < step
                        ? 'scale-90 border-primary bg-primary text-primary-foreground'
                        : index === step
                          ? 'scale-110 border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30'
                          : 'scale-90 border-border bg-card text-muted-foreground/40'
                    }`}
                  >
                    {index < step ? <Check size={14} /> : <Icon size={14} />}
                  </div>
                );
              })}
            </div>

            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-black uppercase tracking-widest text-primary">
              Step {step + 1}
            </span>
          </div>

          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <form className="pb-20" onSubmit={(event) => event.preventDefault()}>
          {currentQuestion.id !== 'locations' && (
            <div className="mb-8 flex flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                <StepIcon size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground">
                  {currentQuestion.title}
                </h2>
                <p className="mt-1.5 font-medium text-muted-foreground">{currentQuestion.subtitle}</p>
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <RenterPreferenceFields form={form} sections={currentQuestion.section} />
          </div>

          <div className="mt-10">
            <Button
              type="button"
              onClick={handleNext}
              disabled={!canContinue || isSaving}
              className="h-14 w-full rounded-2xl text-base font-bold shadow-lg shadow-primary/20"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving preferences...
                </span>
              ) : step === QUESTIONS.length - 1 ? (
                <>
                  Save My Preferences <Check size={18} className="ml-2" />
                </>
              ) : (
                <>
                  Continue <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
