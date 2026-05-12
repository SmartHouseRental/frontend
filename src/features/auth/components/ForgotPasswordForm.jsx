import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router';
import { useForgotPassword } from '../hooks/useForgotPassword';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export function ForgotPasswordForm() {
    const forgotPasswordMutation = useForgotPassword();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
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
                navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
            },
        });
    };

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
