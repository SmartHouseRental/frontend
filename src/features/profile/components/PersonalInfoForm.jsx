import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Camera, Save, Loader2, Clock, EyeOff, XCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { getImageUrl } from '@/lib/utils';

export function PersonalInfoForm({ profile }) {
    const { t } = useTranslation();

    const personalInfoSchema = z.object({
        fullName: z
            .string()
            .min(2, t('owner.profile.personalInfoForm.validation.fullNameMin'))
            .max(100, t('owner.profile.personalInfoForm.validation.fullNameMax')),
        phone: z.string().optional(),
        location: z
            .string()
            .max(200, t('owner.profile.personalInfoForm.validation.locationMax'))
            .optional(),
        bio: z
            .string()
            .max(500, t('owner.profile.personalInfoForm.validation.bioMax'))
            .optional(),
    });

    const currentFullName = profile?.firstName && profile?.lastName
        ? `${profile.firstName} ${profile.lastName}`
        : (profile?.firstName || profile?.lastName || '');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            fullName: currentFullName || '',
            phone: profile?.phone || '',
            location: profile?.location || '',
            bio: profile?.bio || '',
        },
    });

    const updateProfileMutation = useUpdateProfile();
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(
        profile?.image
            ? getImageUrl(profile.image)
            : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
    );
    const [selectedFile, setSelectedFile] = useState(null);

    const onSubmit = (data) => {
        const formData = new FormData();
        if (data.fullName) formData.append('fullName', data.fullName);
        if (data.phone) formData.append('phone', data.phone);
        if (data.location) formData.append('location', data.location);
        if (data.bio) formData.append('bio', data.bio);
        if (selectedFile) formData.append('image', selectedFile);

        updateProfileMutation.mutate(formData);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert(t('owner.profile.personalInfoForm.fileSizeWarning'));
                return;
            }
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const verificationState = profile?.verificationState;
    const verificationLabel = profile?.isVerified
        ? t('owner.profile.personalInfoForm.verifiedOwner')
        : verificationState
            ? t(`owner.profile.personalInfoForm.verificationStates.${verificationState}`, { defaultValue: verificationState })
            : t('owner.profile.personalInfoForm.notVerified');

    return (
        <Card>
            <CardContent className="space-y-6 pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="group relative cursor-pointer" onClick={handleImageClick}>
                            <div
                                className="bg-primary/10 ring-primary/20 size-20 rounded-full bg-cover bg-center ring-4"
                                style={{ backgroundImage: `url('${previewImage}')` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-colors group-hover:bg-black/40">
                                <Camera
                                    size={20}
                                    className="text-white opacity-0 transition-opacity group-hover:opacity-100"
                                />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/jpeg, image/jpg, image/png"
                            />
                        </div>
                        <div>
                            <h3 className="text-foreground text-lg font-bold">{currentFullName || t('owner.profile.personalInfoForm.defaultName')}</h3>
                            <p className="text-muted-foreground text-sm">{profile?.email}</p>
                            <p
                                className={`mt-1 flex items-center gap-1 text-xs font-semibold ${
                                    profile?.isVerified
                                        ? 'text-emerald-500'
                                        : verificationState === 'pending'
                                            ? 'text-amber-500'
                                            : verificationState === 'rejected'
                                                ? 'text-red-500'
                                                : verificationState === 'resubmit'
                                                    ? 'text-orange-500'
                                                    : 'text-muted-foreground'
                                }`}
                            >
                                {profile?.isVerified && <CheckCircle2 size={12} />}
                                {!profile?.isVerified && verificationState === 'pending' && <Clock size={12} />}
                                {!profile?.isVerified && verificationState === 'rejected' && <XCircle size={12} />}
                                {!profile?.isVerified && verificationState === 'resubmit' && <RefreshCw size={12} />}
                                {!profile?.isVerified && verificationState === 'under_review' && <EyeOff size={12} />}
                                {verificationLabel}
                            </p>
                        </div>
                    </div>
                    <div className="bg-border h-px"></div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                {t('owner.profile.personalInfoForm.labels.fullName')}
                            </label>
                            <Input className="mt-1.5" {...register('fullName')} />
                            {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName.message}</p>}
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                {t('owner.profile.personalInfoForm.labels.email')}
                            </label>
                            <Input className="mt-1.5 bg-muted/50 cursor-not-allowed" value={profile?.email || ''} disabled />
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                {t('owner.profile.personalInfoForm.labels.phone')}
                            </label>
                            <Input
                                className="mt-1.5"
                                {...register('phone')}
                                placeholder={t('owner.profile.personalInfoForm.placeholders.phone')}
                            />
                            {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                {t('owner.profile.personalInfoForm.labels.location')}
                            </label>
                            <Input className="mt-1.5" {...register('location')} />
                            {errors.location && <p className="text-rose-500 text-xs mt-1">{errors.location.message}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                {t('owner.profile.personalInfoForm.labels.bio')}
                            </label>
                            <textarea
                                className="border-border bg-background focus:ring-primary/20 mt-1.5 h-24 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2"
                                {...register('bio')}
                            />
                            {errors.bio && <p className="text-rose-500 text-xs mt-1">{errors.bio.message}</p>}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button className="gap-2" type="submit" disabled={updateProfileMutation.isPending}>
                            {updateProfileMutation.isPending ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" /> {t('owner.profile.personalInfoForm.saving')}
                                </>
                            ) : (
                                <>
                                    <Save size={14} /> {t('owner.profile.personalInfoForm.saveChanges')}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
