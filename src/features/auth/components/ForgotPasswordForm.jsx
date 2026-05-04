import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '../hooks/useForgotPassword';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export function ForgotPasswordForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const forgotPasswordMutation = useForgotPassword();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (data) => {
        forgotPasswordMutation.mutate(data, {
            onSuccess: () => {
                setIsSubmitted(true);
            },
        });
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 size={32} />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground">Check your inbox</h3>
                    <p className="text-muted-foreground mt-2 font-medium">
                        We've sent password reset instructions to <br />
                        <span className="font-bold text-foreground">{getValues('email')}</span>
                    </p>
                </div>
                {/* Placeholder if they want to enter the reset code manually, but usually it's a link */}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-md text-[15px]" disabled={forgotPasswordMutation.isPending}>
                {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
            </Button>
        </form>
    );
}
