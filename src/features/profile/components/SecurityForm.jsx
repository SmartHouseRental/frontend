import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Save, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useChangePassword } from '../hooks/useChangePassword';

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
}).refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ['newPassword'],
});

export function SecurityForm() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const changePasswordMutation = useChangePassword();
    const newPasswordValue = watch('newPassword');

    const onSubmit = (data) => {
        changePasswordMutation.mutate({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }, {
            onSuccess: () => reset()
        });
    };

    return (
        <Card>
            <CardContent className="space-y-5 pt-6">
                <h3 className="text-foreground flex items-center gap-2 font-bold">
                    <Lock size={16} /> Change Password
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
                    <div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                            Current Password
                        </label>
                        <div className="relative mt-1.5">
                            <Input
                                type={showCurrent ? 'text' : 'password'}
                                className="pr-10"
                                placeholder="Enter current password"
                                {...register('currentPassword')}
                            />
                            <button
                                type="button"
                                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                                onClick={() => setShowCurrent(!showCurrent)}
                            >
                                {showCurrent ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                        </div>
                        {errors.currentPassword && <p className="text-rose-500 text-xs mt-1">{errors.currentPassword.message}</p>}
                    </div>

                    <div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                            New Password
                        </label>
                        <div className="relative mt-1.5">
                            <Input
                                type={showNew ? 'text' : 'password'}
                                className="pr-10"
                                placeholder="Enter new password"
                                {...register('newPassword')}
                            />
                            <button
                                type="button"
                                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                                onClick={() => setShowNew(!showNew)}
                            >
                                {showNew ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                        </div>
                        {errors.newPassword && <p className="text-rose-500 text-xs mt-1">{errors.newPassword.message}</p>}

                        {newPasswordValue && !errors.newPassword && (
                            <div className="mt-2">
                                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                                    <div
                                        className={`h-full rounded-full transition-all ${newPasswordValue.length >= 12 ? 'w-full bg-emerald-500'
                                                : newPasswordValue.length >= 8 ? 'w-2/3 bg-amber-500'
                                                    : 'w-1/3 bg-rose-500'
                                            }`}
                                    ></div>
                                </div>
                                <p className="text-muted-foreground mt-1 text-[10px]">
                                    {newPasswordValue.length >= 12 ? 'Strong' : newPasswordValue.length >= 8 ? 'Medium' : 'Weak'} password
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                            Confirm New Password
                        </label>
                        <Input
                            type="password"
                            className="mt-1.5"
                            placeholder="Confirm new password"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                                <AlertCircle size={12} /> {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button className="gap-2" type="submit" disabled={changePasswordMutation.isPending}>
                        {changePasswordMutation.isPending ? (
                            <>
                                <Loader2 size={14} className="animate-spin" /> Updating...
                            </>
                        ) : (
                            <>
                                <Save size={14} /> Update Password
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
