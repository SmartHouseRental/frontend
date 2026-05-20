import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate, useLocation } from 'react-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogin } from '../hooks/useLogin';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});

export function LoginForm() {
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
                    const from = location.state?.from || '/welcome';
                    navigate(from);
                }
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                <div className="flex items-center justify-between ml-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground" htmlFor="password">
                        Password
                    </label>
                    <Link to="/forgot-password" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                        Forgot Password?
                    </Link>
                </div>
                <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className={`pl-11 pr-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm ${errors.password ? 'border-destructive' : ''}`}
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && <p className="text-destructive text-xs ml-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-md text-[15px]" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Signing In...' : 'Login securely'}
            </Button>
        </form>
    );
}
