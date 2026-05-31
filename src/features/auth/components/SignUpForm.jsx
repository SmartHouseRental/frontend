import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRegister } from '../hooks/useRegister';

const registerSchema = z.object({
    first_name: z.string().min(2, 'First name is required'),
    last_name: z.string().min(2, 'Last name is required'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(6, 'Please enter a valid phone number'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});

const inputClass = (hasError) =>
    cn(
        'h-12 rounded-2xl border-[#E5E5E5] bg-[#FAFAF9] pl-11 transition-colors focus:border-[#0A0A0A] focus:bg-white',
        hasError && 'border-destructive',
    );

export function SignUpForm() {
    const { t } = useTranslation();
    const [role, setRole] = useState('renter');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        const payload = { ...data, role };
        registerMutation.mutate(payload, {
            onSuccess: () => {
                navigate('/verify-otp', { state: { role, email: data.email } });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
                <label className="ml-1 text-sm font-medium text-[#737373]">
                    {t('auth.iAmJoiningAs')}
                </label>
                <RadioGroup
                    value={role}
                    onValueChange={setRole}
                    className="grid grid-cols-2 gap-3"
                >
                    <label
                        htmlFor="renter"
                        className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all',
                            role === 'renter'
                                ? 'border-[#0A0A0A] bg-[#FAFAF9]'
                                : 'border-[#E5E5E5] bg-white hover:border-[#737373]',
                        )}
                    >
                        <RadioGroupItem value="renter" id="renter" className="size-4" />
                        <span className={cn('text-sm font-semibold', role === 'renter' ? 'text-[#111111]' : 'text-[#737373]')}>
                            {t('auth.renter')}
                        </span>
                    </label>

                    <label
                        htmlFor="owner"
                        className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all',
                            role === 'owner'
                                ? 'border-[#0A0A0A] bg-[#FAFAF9]'
                                : 'border-[#E5E5E5] bg-white hover:border-[#737373]',
                        )}
                    >
                        <RadioGroupItem value="owner" id="owner" className="size-4" />
                        <span className={cn('text-sm font-semibold', role === 'owner' ? 'text-[#111111]' : 'text-[#737373]')}>
                            {t('auth.owner')}
                        </span>
                    </label>
                </RadioGroup>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="col-span-2 space-y-2 sm:col-span-1">
                    <label className="ml-1 text-sm font-medium text-[#737373]" htmlFor="first_name">
                        {t('auth.firstName')}
                    </label>
                    <div className="group relative">
                        <User className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#737373] transition-colors group-focus-within:text-[#111111]" size={18} />
                        <Input
                            id="first_name"
                            placeholder="John"
                            className={inputClass(errors.first_name)}
                            {...register('first_name')}
                        />
                    </div>
                    {errors.first_name && <p className="ml-1 text-xs text-destructive">{errors.first_name.message}</p>}
                </div>

                <div className="col-span-2 space-y-2 sm:col-span-1">
                    <label className="ml-1 text-sm font-medium text-[#737373]" htmlFor="last_name">
                        {t('auth.lastName')}
                    </label>
                    <div className="group relative">
                        <User className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#737373] transition-colors group-focus-within:text-[#111111]" size={18} />
                        <Input
                            id="last_name"
                            placeholder="Doe"
                            className={inputClass(errors.last_name)}
                            {...register('last_name')}
                        />
                    </div>
                    {errors.last_name && <p className="ml-1 text-xs text-destructive">{errors.last_name.message}</p>}
                </div>

                <div className="col-span-2 space-y-2 sm:col-span-1">
                    <label className="ml-1 text-sm font-medium text-[#737373]" htmlFor="email">
                        {t('auth.emailAddress')}
                    </label>
                    <div className="group relative">
                        <Mail className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#737373] transition-colors group-focus-within:text-[#111111]" size={18} />
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className={inputClass(errors.email)}
                            {...register('email')}
                        />
                    </div>
                    {errors.email && <p className="ml-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>

                <div className="col-span-2 space-y-2 sm:col-span-1">
                    <label className="ml-1 text-sm font-medium text-[#737373]" htmlFor="phone">
                        {t('auth.phoneNumber')}
                    </label>
                    <div className="group relative">
                        <Phone className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#737373] transition-colors group-focus-within:text-[#111111]" size={18} />
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+251 911 234 567"
                            className={inputClass(errors.phone)}
                            {...register('phone')}
                        />
                    </div>
                    {errors.phone && <p className="ml-1 text-xs text-destructive">{errors.phone.message}</p>}
                </div>

                <div className="col-span-2 space-y-2">
                    <label className="ml-1 text-sm font-medium text-[#737373]" htmlFor="password">
                        {t('auth.password')}
                    </label>
                    <div className="group relative">
                        <Lock className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#737373] transition-colors group-focus-within:text-[#111111]" size={18} />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={cn(inputClass(errors.password), 'pr-11')}
                            {...register('password')}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#737373] transition-colors hover:text-[#111111]"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <p className="ml-1 text-[11px] font-medium text-[#737373]">{t('auth.passwordHint')}</p>
                    {errors.password && <p className="ml-1 text-xs text-destructive">{errors.password.message}</p>}
                </div>
            </div>

            <Button
                type="submit"
                className="h-12 w-full rounded-full bg-[#0A0A0A] text-sm font-semibold text-white shadow-luxury-md transition-colors hover:bg-[#171717]"
                disabled={registerMutation.isPending}
            >
                {registerMutation.isPending ? t('auth.creatingAccount') : t('auth.createAccount')}
            </Button>
        </form>
    );
}
