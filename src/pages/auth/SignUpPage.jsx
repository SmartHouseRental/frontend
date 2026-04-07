import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, Key, Building2, UserRound, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

function SignUpPage() {
    const [role, setRole] = useState('renter'); // Default to renter
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            navigate('/verify-otp', { state: { role, email: formData.email } });
        }, 1000);
    };

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Left Column: Image Area */}
            <div className="relative hidden w-5/12 flex-col justify-end bg-slate-900 lg:flex">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Beautiful modern living room"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20 mix-blend-multiply" />

                <div className="absolute top-8 left-8 z-20">
                    <Link to="/" className="flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors gap-2">
                        <ChevronLeft size={16} /> Back to Home
                    </Link>
                </div>

                <div className="relative z-10 p-12 text-white">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mb-8">
                        <div className="flex items-center gap-3 mb-4 text-emerald-400">
                            <CheckCircle2 size={24} />
                            <h3 className="font-bold text-lg text-white">Trusted by Thousands</h3>
                        </div>
                        <p className="text-slate-300 font-medium leading-relaxed">
                            "SmartHouseRental made finding my new apartment in Bole incredibly easy. The digital contracts and verified owners gave me total peace of mind."
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-slate-700 overflow-hidden border border-white/20">
                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Betelhem T.</p>
                                <p className="text-xs text-slate-400">Verified Renter</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Form Area */}
            <div className="flex w-full items-center justify-center p-4 lg:w-7/12">
                <div className="w-full max-w-[480px]">
                    {/* Mobile Back Button */}
                    <Link to="/" className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 lg:hidden gap-1 transition-colors">
                        <ChevronLeft size={16} /> Home
                    </Link>

                    <div className="mb-10 text-left">
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Join the community
                        </h1>
                        <p className="text-muted-foreground mt-2 font-medium leading-relaxed">
                            Complete your details to get started with SmartHouseRental.
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleSignup} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
                            {/* Role Selection inside Form */}
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
                                            className="pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            required
                                        />
                                    </div>
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
                                            className="pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
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
                                            className="pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                    </div>
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
                                            className="pl-11 h-12 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors focus:bg-background border-border/60 focus:border-primary shadow-sm"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <p className="text-[11px] text-muted-foreground ml-1 mt-1 font-medium">At least 8 characters long</p>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" className="w-full h-14 rounded-xl font-bold shadow-lg shadow-primary/20 text-[16px]" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                                    {!isSubmitting && <ChevronLeft className="ml-2 rotate-180" size={18} />}
                                </Button>
                            </div>
                        </form>
                    </div>

                    <p className="mt-10 text-center text-[15px] font-medium text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
                            Log in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
