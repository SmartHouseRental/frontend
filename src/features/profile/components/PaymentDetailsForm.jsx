import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, Save, Loader2 } from 'lucide-react';
import { useUpdateBankDetails } from '../hooks/useUpdateBankDetails';

const bankDetailsSchema = z.object({
    bankName: z.string().min(2, 'Required').max(100),
    accountNumber: z.string().min(8, 'Required').max(50),
    holderName: z.string().min(2, 'Required').max(100),
    branch: z.string().max(100).optional(),
});

export function PaymentDetailsForm({ bankDetails }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(bankDetailsSchema),
        defaultValues: {
            bankName: bankDetails?.name || '',
            accountNumber: bankDetails?.accountNumber || '',
            holderName: bankDetails?.accountHolder || '',
            branch: bankDetails?.branch || '',
        },
    });

    const updateBankDetailsMutation = useUpdateBankDetails();

    const onSubmit = (data) => {
        updateBankDetailsMutation.mutate(data);
    };

    return (
        <Card>
            <CardContent className="space-y-5 pt-6">
                <h3 className="text-foreground flex items-center gap-2 font-bold">
                    <CreditCard size={16} /> Bank / Payment Details
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                Bank Name
                            </label>
                            <Input className="mt-1.5" {...register('bankName')} />
                            {errors.bankName && <p className="text-rose-500 text-xs mt-1">{errors.bankName.message}</p>}
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                Account Number
                            </label>
                            <Input className="mt-1.5" {...register('accountNumber')} />
                            {errors.accountNumber && <p className="text-rose-500 text-xs mt-1">{errors.accountNumber.message}</p>}
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                Account Holder
                            </label>
                            <Input className="mt-1.5" {...register('holderName')} />
                            {errors.holderName && <p className="text-rose-500 text-xs mt-1">{errors.holderName.message}</p>}
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                Branch
                            </label>
                            <Input className="mt-1.5" {...register('branch')} />
                            {errors.branch && <p className="text-rose-500 text-xs mt-1">{errors.branch.message}</p>}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button className="gap-2" type="submit" disabled={updateBankDetailsMutation.isPending}>
                            {updateBankDetailsMutation.isPending ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={14} /> Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
