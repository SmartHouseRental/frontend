import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, KeyRound, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useResetPassword } from '../hooks/useResetPassword';

const resetPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    code: z.string().min(6, 'Code is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const defaultEmail = searchParams.get('email') || '';

    const [isSuccess, setIsSuccess] = useState(false);
    const resetPasswordMutation = useResetPassword();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: defaultEmail,
            code: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        resetPasswordMutation.mutate(data, {
            onSuccess: () => {
                setIsSuccess(true);
            },
        });
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                    <CheckCircle2 size={32} />
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-black text-foreground">Password Reset</h3>
                    <p className="text-muted-foreground mt-2 font-medium">
                        Your password has been successfully reset. You can now log in with your new credentials.
                    </p>
                </div>
                <Button onClick={() => navigate('/login')} className="w-full h-12 rounded-xl font-bold shadow-md mt-4">
                    Go to Login
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-400">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="email">
                    Email Address
                </label>
                <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className={`pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm ${errors.email ? 'border-destructive' : ''}`}
                        {...register('email')}
                    />
                </div>
                {errors.email && <p className="text-destructive text-xs ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="code">
                    Reset Code
                </label>
                <div className="relative group">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
                    <Input
                        id="code"
                        type="text"
                        placeholder="6-digit code"
                        className={`pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm ${errors.code ? 'border-destructive' : ''}`}
                        {...register('code')}
                    />
                </div>
                {errors.code && <p className="text-destructive text-xs ml-1">{errors.code.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="password">
                    New Password
                </label>
                <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className={`pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm ${errors.password ? 'border-destructive' : ''}`}
                        {...register('password')}
                    />
                </div>
                <p className="text-[11px] text-muted-foreground ml-1 mt-1 font-medium">At least 8 characters long</p>
                {errors.password && <p className="text-destructive text-xs ml-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-md text-[15px]" disabled={resetPasswordMutation.isPending}>
                {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
            </Button>

            <div className="mt-4 text-center">
                <Link to="/forgot-password" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                    Didn't receive a code? Try again
                </Link>
            </div>
        </form>
    );
}
