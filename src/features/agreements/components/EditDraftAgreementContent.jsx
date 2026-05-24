import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/PageHeader';
import { Loader2, Calendar } from 'lucide-react';
import { useAgreementDetail, useUpdateDraftAgreement } from '../hooks/useAgreements';
import { updateDraftAgreementFormSchema } from '../schema';
import { datetimeLocalToIso, toDatetimeLocalValue } from '../utils';

export function EditDraftAgreementContent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: agreementResponse, isLoading } = useAgreementDetail(id);
    const agreement = agreementResponse?.data?.agreement;

    const form = useForm({
        resolver: zodResolver(updateDraftAgreementFormSchema),
        defaultValues: {
            startDate: '',
            endDate: '',
            monthlyRent: undefined,
            currency: '',
            ownerMessage: '',
            offerExpiresAt: '',
        },
    });

    const updateMutation = useUpdateDraftAgreement();

    useEffect(() => {
        if (!agreement || agreement.status !== 'draft') return;
        form.reset({
            startDate: agreement.startDate ? agreement.startDate.slice(0, 10) : '',
            endDate: agreement.endDate ? agreement.endDate.slice(0, 10) : '',
            monthlyRent: agreement.monthlyRent || undefined,
            currency: agreement.currency || 'ETB',
            ownerMessage: agreement.ownerMessage || '',
            offerExpiresAt: agreement.offerExpiresAt
                ? toDatetimeLocalValue(new Date(agreement.offerExpiresAt))
                : '',
        });
    }, [agreement, form]);

    const onSubmit = (values) => {
        const payload = {
            startDate: datetimeLocalToIso(`${values.startDate}T12:00:00`),
            endDate: datetimeLocalToIso(`${values.endDate}T12:00:00`),
            offerExpiresAt: datetimeLocalToIso(values.offerExpiresAt),
            ownerMessage: values.ownerMessage || undefined,
            ...(values.monthlyRent ? { monthlyRent: values.monthlyRent } : {}),
            ...(values.currency ? { currency: values.currency } : {}),
        };

        updateMutation.mutate(
            { agreementId: id, payload },
            {
                onSuccess: () => navigate(`/owner/agreements/${id}`),
            }
        );
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!agreement || agreement.status !== 'draft') {
        return (
            <div className="scrollbar-hide h-screen p-8 text-center">
                <p className="text-muted-foreground">Only draft agreements can be edited.</p>
                <Button asChild className="mt-4">
                    <Link to={`/owner/agreements/${id || ''}`}>Back to agreement</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
            <PageHeader
                title="Edit draft agreement"
                description="Update the lease period, rent, and expiry for this draft."
                backLink={`/owner/agreements/${id}`}
            />

            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Calendar size={18} /> Lease Details
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
                                placeholder="Welcome notes or special terms..."
                                {...form.register('ownerMessage')}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-fit">
                    <CardContent className="space-y-4 pt-6">
                        <p className="text-sm font-semibold">Ready to update?</p>
                        <p className="text-xs text-muted-foreground">
                            Updating a draft does not send it. You can send it to the renter from the agreement details page.
                        </p>
                        <Button
                            type="submit"
                            className="w-full gap-2"
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending && <Loader2 size={16} className="animate-spin" />}
                            Save changes
                        </Button>
                        <Button type="button" variant="outline" className="w-full" asChild>
                            <Link to={`/owner/agreements/${id}`}>Cancel</Link>
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
