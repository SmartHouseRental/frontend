import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageHeader from '@/components/PageHeader';
import { Loader2, Building2, User, Shield, Calendar } from 'lucide-react';
import { getLocalizedText } from '@/lib/utils/i18n';
import { useMyProperties } from '@/features/properties/hooks/useMyProperties';
import { useOwnerAppointments } from '@/features/appointments/hooks/useAppointments';
import { unwrapAppointments } from '@/features/appointments/utils';
import { getRenterDisplayName } from '../utils';
import { createAgreementFormSchema } from '../schema';
import { useCreateAgreement } from '../hooks/useAgreements';
import { datetimeLocalToIso, toDatetimeLocalValue, formatCurrency } from '../utils';

function defaultOfferExpiry() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return toDatetimeLocalValue(d);
}

function defaultLeaseEnd() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function CreateAgreementContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillPropertyId = searchParams.get('propertyId') || '';
  const prefillAppointmentId = searchParams.get('appointmentId') || '';
  const prefillRenterId = searchParams.get('renterId') || '';

  const { data: propertiesResponse, isLoading: propertiesLoading } = useMyProperties();
  const properties = propertiesResponse?.data ?? [];

  const form = useForm({
    resolver: zodResolver(createAgreementFormSchema),
    defaultValues: {
      propertyId: prefillPropertyId,
      renterId: prefillRenterId,
      appointmentId: prefillAppointmentId || undefined,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: defaultLeaseEnd(),
      monthlyRent: undefined,
      currency: undefined,
      ownerMessage: '',
      offerExpiresAt: defaultOfferExpiry(),
      send: false,
    },
  });

  const propertyId = form.watch('propertyId');
  const createMutation = useCreateAgreement();

  const { data: appointmentsResponse, isLoading: appointmentsLoading } = useOwnerAppointments(
    propertyId ? { propertyId, status: 'ACCEPTED', limit: 50 } : {},
    { enabled: Boolean(propertyId) }
  );

  const appointmentOptions = useMemo(() => {
    const list = unwrapAppointments(appointmentsResponse);
    const seen = new Set();
    return list
      .filter((a) => {
        if (!a.renterId || seen.has(a.renterId)) return false;
        seen.add(a.renterId);
        return true;
      })
      .map((a) => ({
        appointmentId: a.id,
        renterId: a.renterId,
        label: getRenterDisplayName(a.renter),
        email: a.renter?.email,
      }));
  }, [appointmentsResponse]);

  const selectedProperty = properties.find((p) => p.id === propertyId);
  const price = selectedProperty?.price;
  const deposit = selectedProperty?.leaseTerms?.secureDeposit;

  useEffect(() => {
    if (!selectedProperty) return;
    if (price?.value) {
      form.setValue('monthlyRent', price.value);
      form.setValue('currency', price.currency || 'ETB');
    }
  }, [selectedProperty?.id, price?.value, price?.currency, form]);

  useEffect(() => {
    if (prefillPropertyId) form.setValue('propertyId', prefillPropertyId);
    if (prefillRenterId) form.setValue('renterId', prefillRenterId);
    if (prefillAppointmentId) form.setValue('appointmentId', prefillAppointmentId);
  }, [prefillPropertyId, prefillRenterId, prefillAppointmentId, form]);

  const onSubmit = (values) => {
    const payload = {
      propertyId: values.propertyId,
      renterId: values.renterId,
      startDate: datetimeLocalToIso(`${values.startDate}T12:00:00`),
      endDate: datetimeLocalToIso(`${values.endDate}T12:00:00`),
      offerExpiresAt: datetimeLocalToIso(values.offerExpiresAt),
      ownerMessage: values.ownerMessage || undefined,
      send: values.send,
      ...(values.appointmentId ? { appointmentId: values.appointmentId } : {}),
      ...(values.monthlyRent ? { monthlyRent: values.monthlyRent } : {}),
      ...(values.currency ? { currency: values.currency } : {}),
    };

    createMutation.mutate(payload, {
      onSuccess: (res) => {
        const id = res?.data?.agreement?.id;
        if (id) navigate(`/owner/agreements/${id}`);
        else navigate('/owner/agreements');
      },
    });
  };

  if (propertiesLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <PageHeader
        title="Create agreement"
        description="Send a lease offer with terms and security deposit from your listing."
        backLink="/owner/agreements"
      />

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 size={18} /> Property & renter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyId">Property</Label>
                  <Select
                    value={form.watch('propertyId')}
                    onValueChange={(v) => form.setValue('propertyId', v, { shouldValidate: true })}
                  >
                    <SelectTrigger id="propertyId">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {getLocalizedText(p.title) || p.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.propertyId && (
                    <p className="text-xs text-destructive">{form.formState.errors.propertyId.message}</p>
                  )}
                </div>

                {propertyId && (
                  <div className="space-y-2">
                    <Label htmlFor="renterId">Renter</Label>
                    {appointmentsLoading ? (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 size={14} className="animate-spin" /> Loading visitors…
                      </p>
                    ) : appointmentOptions.length === 0 ? (
                      <p className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-sm text-amber-700">
                        No confirmed visits for this property.{' '}
                        <Link to="/owner/appointments" className="font-semibold underline">
                          Review appointments
                        </Link>{' '}
                        first.
                      </p>
                    ) : (
                      <Select
                        value={form.watch('renterId')}
                        onValueChange={(renterId) => {
                          form.setValue('renterId', renterId, { shouldValidate: true });
                          const match = appointmentOptions.find((o) => o.renterId === renterId);
                          if (match) form.setValue('appointmentId', match.appointmentId);
                        }}
                      >
                        <SelectTrigger id="renterId">
                          <SelectValue placeholder="Select renter" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentOptions.map((o) => (
                            <SelectItem key={o.renterId} value={o.renterId}>
                              {o.label}
                              {o.email ? ` · ${o.email}` : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Renters with a confirmed visit on this property.
                    </p>
                    {form.formState.errors.renterId && (
                      <p className="text-xs text-destructive">{form.formState.errors.renterId.message}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar size={18} /> Lease period
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start date</Label>
                  <Input type="date" id="startDate" {...form.register('startDate')} />
                  {form.formState.errors.startDate && (
                    <p className="text-xs text-destructive">{form.formState.errors.startDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End date</Label>
                  <Input type="date" id="endDate" {...form.register('endDate')} />
                  {form.formState.errors.endDate && (
                    <p className="text-xs text-destructive">{form.formState.errors.endDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly rent</Label>
                  <Input type="number" min={1} step="0.01" id="monthlyRent" {...form.register('monthlyRent')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" placeholder="ETB" {...form.register('currency')} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="offerExpiresAt">Offer expires at</Label>
                  <Input type="datetime-local" id="offerExpiresAt" {...form.register('offerExpiresAt')} />
                  <p className="text-xs text-muted-foreground">
                    The renter must accept before this date (you set the TTL).
                  </p>
                  {form.formState.errors.offerExpiresAt && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.offerExpiresAt.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="ownerMessage">Message to renter (optional)</Label>
                  <Textarea
                    id="ownerMessage"
                    rows={3}
                    placeholder="Welcome notes or special terms…"
                    {...form.register('ownerMessage')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield size={18} /> From listing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {selectedProperty ? (
                  <>
                    <div>
                      <p className="text-xs font-medium uppercase text-muted-foreground">Property</p>
                      <p className="font-semibold">{getLocalizedText(selectedProperty.title)}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {getLocalizedText(selectedProperty.address)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase text-muted-foreground">
                        Security deposit (listing)
                      </p>
                      <p className="font-bold text-primary">
                        {deposit?.value != null
                          ? formatCurrency(deposit.value, deposit.currency || 'ETB')
                          : 'Not set on property'}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        ETB amount is calculated on the server when you create the offer (FX if needed).
                      </p>
                    </div>
                    {selectedProperty.leaseTerms?.conditions && (
                      <div>
                        <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
                          Conditions (EN)
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-4">
                          {getLocalizedText(selectedProperty.leaseTerms.conditions, 'en')}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground">Select a property to preview lease terms.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="send"
                    checked={form.watch('send')}
                    onCheckedChange={(v) => form.setValue('send', Boolean(v))}
                  />
                  <div>
                    <Label htmlFor="send" className="font-semibold">
                      Send to renter immediately
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      If unchecked, the agreement is saved as a draft you can send later.
                    </p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={createMutation.isPending || !propertyId}
                >
                  {createMutation.isPending && <Loader2 size={16} className="animate-spin" />}
                  {form.watch('send') ? 'Create & send offer' : 'Save as draft'}
                </Button>
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link to="/owner/agreements">Cancel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
      </form>
    </div>
  );
}
