import { useLocation, useNavigate, Link } from 'react-router';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { OTPVerificationForm } from '@/features/auth/components/OTPVerificationForm';

function OTPVerificationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state?.role || 'renter';
    const email = location.state?.email || 'your email';

    const handleVerified = () => {
        if (role === 'renter') {
            navigate('/preferences');
        } else {
            navigate('/owner');
        }
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* Left decorative panel */}
            <div className="hidden lg:flex w-5/12 relative flex-col justify-center items-center bg-secondary/30 border-r border-border">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Decorative grid dots */}
                    <div className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-8 p-12 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-2xl">
                        <ShieldCheck size={48} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black tracking-tight text-foreground leading-tight mb-3">
                            Two-step<br />verification
                        </h2>
                        <p className="text-muted-foreground font-medium leading-relaxed">
                            We protect your account by verifying your identity before granting access.
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 w-full max-w-xs">
                        {[
                            { label: 'No spam ever', detail: 'One code, one use only' },
                            { label: 'Instant delivery', detail: 'Arrives in under 30 seconds' },
                            { label: 'Expires in 10 minutes', detail: 'Request a new code if needed' },
                        ].map(({ label, detail }) => (
                            <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-card/80 border border-border shadow-sm">
                                <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                <div className="text-left">
                                    <p className="text-sm font-bold text-foreground">{label}</p>
                                    <p className="text-xs text-muted-foreground">{detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: OTP form */}
            <div className="flex w-full items-center justify-center p-6 lg:w-7/12">
                <div className="w-full max-w-[440px]">
                    <Link to="/signup" className="mb-8 flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft size={16} /> Back to Sign Up
                    </Link>

                    <OTPVerificationForm email={email} role={role} onVerified={handleVerified} />

                    <p className="mt-6 text-center text-sm text-muted-foreground font-medium">
                        Wrong email?{' '}
                        <Link to="/signup" className="font-bold text-primary hover:text-primary/80 transition-colors">
                            Go back and fix it
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OTPVerificationPage;
