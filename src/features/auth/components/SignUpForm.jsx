import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, ChevronLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegister } from '../hooks/useRegister';

const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(6, 'Please enter a valid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export function SignUpForm() {
    const [role, setRole] = useState('renter'); // Default role
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        // Add role into the payload
        const payload = { ...data, role };
        registerMutation.mutate(payload, {
            onSuccess: () => {
                navigate('/verify-otp', { state: { role, email: data.email } });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
            <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                    I am joining as a...
                </label>
                <RadioGroup
                    value={role}
                    onValueChange={setRole}
                    className="grid grid-cols-2 gap-3"
                >
                    <label
                        htmlFor="renter"
                        className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all cursor-pointer ${role === 'renter'
                            ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                            : 'border-border/60 bg-card hover:border-primary/40'
                            }`}
                    >
                        <RadioGroupItem value="renter" id="renter" className="h-4 w-4" />
                        <span className={`text-sm font-bold ${role === 'renter' ? 'text-primary' : 'text-foreground'}`}>Renter</span>
                    </label>

                    <label
                        htmlFor="owner"
                        className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all cursor-pointer ${role === 'owner'
                            ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                            : 'border-border/60 bg-card hover:border-primary/40'
                            }`}
                    >
                        <RadioGroupItem value="owner" id="owner" className="h-4 w-4" />
                        <span className={`text-sm font-bold ${role === 'owner' ? 'text-primary' : 'text-foreground'}`}>Owner</span>
                    </label>
                </RadioGroup>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="fullName">
                        Full Name
                    </label>
                    <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
                        <Input
                            id="fullName"
                            placeholder="John Doe"
                            className={`pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm ${errors.fullName ? 'border-destructive' : ''}`}
                            {...register('fullName')}
                        />
                    </div>
                    {errors.fullName && <p className="text-destructive text-xs ml-1">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2 col-span-2 sm:col-span-1">
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

                <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="phone">
                        Phone Number
                    </label>
                    <div className="relative group">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+251 911 234 567"
                            className={`pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm ${errors.phone ? 'border-destructive' : ''}`}
                            {...register('phone')}
                        />
                    </div>
                    {errors.phone && <p className="text-destructive text-xs ml-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="password">
                        Password
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
            </div>

            <div className="pt-2">
                <Button type="submit" className="w-full h-14 rounded-xl font-bold shadow-lg shadow-primary/20 text-[16px]" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                    {!registerMutation.isPending && <ChevronLeft className="ml-2 rotate-180" size={18} />}
                </Button>
            </div>
        </form>
    );
}
