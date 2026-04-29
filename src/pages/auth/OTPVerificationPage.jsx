import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate, Link } from 'react-router';
import { Mail, ArrowRight, ChevronLeft, RotateCcw, ShieldCheck } from 'lucide-react';

function OTPVerificationPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isVerifying, setIsVerifying] = useState(false);
    const inputRefs = useRef([]);

    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state?.role || 'renter';
    const email = location.state?.email || 'your email';

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ''); // digits only
        if (!value && e.nativeEvent.inputType !== 'deleteContentBackward') return;

        const newOtp = [...otp];

        // Handle paste
        if (value.length > 1) {
            const pastedData = value.slice(0, 6).split('');
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i] || '';
            }
            setOtp(newOtp);
            const focusIndex = Math.min(pastedData.length, 5);
            inputRefs.current[focusIndex]?.focus();
            return;
        }

        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-advance
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const verifyOTP = () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 6) return;
        setIsVerifying(true);
        setTimeout(() => {
            if (role === 'renter') {
                navigate('/preferences');
            } else {
                navigate('/owner');
            }
        }, 1500);
    };

    const resendOTP = () => {
        setTimeLeft(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
    };

    const isComplete = otp.join('').length === 6;
    const progress = Math.round((timeLeft / 60) * 100);

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

                    <div className="mb-10 flex flex-col items-start">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Mail size={32} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Check your inbox</h1>
                        <p className="text-muted-foreground mt-3 text-base font-medium leading-relaxed">
                            We sent a 6-digit verification code to{' '}
                            <span className="font-bold text-foreground">{email}</span>
                        </p>
                    </div>

                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-3 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={(e) => e.target.select()}
                                className={`h-16 w-full rounded-2xl border-2 bg-muted/30 text-center text-2xl font-black tracking-widest text-foreground shadow-sm transition-all outline-none
                  ${digit ? 'border-primary bg-primary/5 text-primary scale-105' : 'border-border hover:border-muted-foreground/40'}
                  focus:border-primary focus:bg-primary/5 focus:scale-105 focus:ring-0`}
                            />
                        ))}
                    </div>

                    {/* Timer arc */}
                    <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                            <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/50" />
                                <circle
                                    cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2.5"
                                    strokeDasharray={`${progress} 100`} strokeLinecap="round"
                                    className={timeLeft > 0 ? 'text-primary transition-all duration-1000' : 'text-muted-foreground'}
                                />
                            </svg>
                            <span className="absolute text-[11px] font-black text-foreground">
                                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">
                                {timeLeft > 0 ? 'Code expires soon' : 'Code expired'}
                            </p>
                            <p className="text-xs text-muted-foreground font-medium">
                                {timeLeft > 0
                                    ? `Didn't get it? Resend in ${timeLeft}s`
                                    : 'Request a fresh verification code below'}
                            </p>
                        </div>
                        {timeLeft === 0 && (
                            <button onClick={resendOTP} className="ml-auto flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors shrink-0">
                                <RotateCcw size={14} /> Resend
                            </button>
                        )}
                    </div>

                    <Button
                        onClick={verifyOTP}
                        className="w-full h-14 rounded-xl font-bold shadow-md text-[16px]"
                        disabled={!isComplete || isVerifying}
                    >
                        {isVerifying ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                Verifying…
                            </span>
                        ) : (
                            <>Verify & Continue <ArrowRight size={18} className="ml-2" /></>
                        )}
                    </Button>

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
