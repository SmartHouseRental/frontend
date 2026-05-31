import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate, useLocation } from 'react-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogin } from '../hooks/useLogin';
import { getRenterLoginRedirect } from '../utils/renterRedirect';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});

export function LoginForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const loginMutation = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data, {
            onSuccess: (response) => {
                const userRole = response?.data?.user?.role || 'renter';

                if (userRole === 'admin') {
                    navigate('/admin');
                } else if (userRole === 'owner') {
                    navigate('/owner');
                } else {
                    navigate(getRenterLoginRedirect(location.state));
                }
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <label className="ml-1 text-sm font-medium text-[#737373]" htmlFor="email">
                    {t('auth.emailAddress')}
                </label>
                <div className="group relative">
                    <Mail className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#737373] transition-colors group-focus-within:text-[#111111]" size={18} />
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className={`h-12 rounded-2xl border-[#E5E5E5] bg-[#FAFAF9] pl-11 transition-colors focus:border-[#0A0A0A] focus:bg-white ${errors.email ? 'border-destructive' : ''}`}
                        {...register('email')}
                    />
                </div>
                {errors.email && <p className="ml-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <div className="ml-1 flex items-center justify-between">
                    <label className="text-sm font-medium text-[#737373]" htmlFor="password">
                        {t('auth.password')}
                    </label>
                    <Link to="/forgot-password" className="text-xs font-semibold text-[#111111] hover:underline">
                        {t('auth.forgotPassword')}
                    </Link>
                </div>
                <div className="group relative">
                    <Lock className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#737373] transition-colors group-focus-within:text-[#111111]" size={18} />
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className={`h-12 rounded-2xl border-[#E5E5E5] bg-[#FAFAF9] pr-11 pl-11 transition-colors focus:border-[#0A0A0A] focus:bg-white ${errors.password ? 'border-destructive' : ''}`}
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
                {errors.password && <p className="ml-1 text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <Button
                type="submit"
                className="h-12 w-full rounded-full bg-[#0A0A0A] text-sm font-semibold text-white shadow-luxury-md transition-colors hover:bg-[#171717]"
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? t('auth.signingIn') : t('auth.loginSecurely')}
            </Button>
        </form>
    );
}
