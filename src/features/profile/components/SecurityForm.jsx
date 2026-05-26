import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Save, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useChangePassword } from '../hooks/useChangePassword';

export function SecurityForm() {
    const { t } = useTranslation();
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const passwordSchema = z.object({
        currentPassword: z.string().min(1, t('owner.profile.securityForm.validation.currentPasswordRequired')),
        newPassword: z
            .string()
            .min(8, t('owner.profile.securityForm.validation.newPasswordMin'))
            .regex(/[A-Z]/, t('owner.profile.securityForm.validation.uppercase'))
            .regex(/[a-z]/, t('owner.profile.securityForm.validation.lowercase'))
            .regex(/[0-9]/, t('owner.profile.securityForm.validation.number'))
            .regex(/[^A-Za-z0-9]/, t('owner.profile.securityForm.validation.special')),
        confirmPassword: z.string().min(1, t('owner.profile.securityForm.validation.confirmPasswordRequired')),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: t('owner.profile.securityForm.validation.passwordsDoNotMatch'),
        path: ['confirmPassword'],
    }).refine((data) => data.newPassword !== data.currentPassword, {
        message: t('owner.profile.securityForm.validation.passwordMustDiffer'),
        path: ['newPassword'],
    });

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

    const strengthKey = newPasswordValue.length >= 12
        ? 'strong'
        : newPasswordValue.length >= 8
            ? 'medium'
            : 'weak';

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
                    <Lock size={16} /> {t('owner.profile.securityForm.title')}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
                    <div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                            {t('owner.profile.securityForm.labels.currentPassword')}
                        </label>
                        <div className="relative mt-1.5">
                            <Input
                                type={showCurrent ? 'text' : 'password'}
                                className="pr-10"
                                placeholder={t('owner.profile.securityForm.placeholders.currentPassword')}
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
                            {t('owner.profile.securityForm.labels.newPassword')}
                        </label>
                        <div className="relative mt-1.5">
                            <Input
                                type={showNew ? 'text' : 'password'}
                                className="pr-10"
                                placeholder={t('owner.profile.securityForm.placeholders.newPassword')}
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
                                    {t(`owner.profile.securityForm.strength.${strengthKey}`)} {t('owner.profile.securityForm.password')}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                            {t('owner.profile.securityForm.labels.confirmPassword')}
                        </label>
                        <Input
                            type="password"
                            className="mt-1.5"
                            placeholder={t('owner.profile.securityForm.placeholders.confirmPassword')}
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
                                <Loader2 size={14} className="animate-spin" /> {t('owner.profile.securityForm.updating')}
                            </>
                        ) : (
                            <>
                                <Save size={14} /> {t('owner.profile.securityForm.updatePassword')}
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
