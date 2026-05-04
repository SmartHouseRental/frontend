import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, RotateCcw } from 'lucide-react';
import { useVerifyEmail, useResendVerificationCode } from '../hooks/useVerifyEmail';

export function OTPVerificationForm({ email, role, onVerified }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const inputRefs = useRef([]);

    const verifyMutation = useVerifyEmail();
    const resendMutation = useResendVerificationCode();

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

        verifyMutation.mutate(
            { email, code: otpValue },
            {
                onSuccess: () => {
                    onVerified();
                }
            }
        );
    };

    const resendOTP = () => {
        resendMutation.mutate({ email }, {
            onSuccess: () => {
                setTimeLeft(60);
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        });
    };

    const isComplete = otp.join('').length === 6;
    const progress = Math.round((timeLeft / 60) * 100);

    return (
        <div>
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
                    <button onClick={resendOTP} disabled={resendMutation.isPending} className="ml-auto flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors shrink-0">
                        <RotateCcw size={14} /> {resendMutation.isPending ? 'Wait...' : 'Resend'}
                    </button>
                )}
            </div>

            <Button
                onClick={verifyOTP}
                className="w-full h-14 rounded-xl font-bold shadow-md text-[16px]"
                disabled={!isComplete || verifyMutation.isPending}
            >
                {verifyMutation.isPending ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Verifying…
                    </span>
                ) : (
                    <>Verify & Continue <ArrowRight size={18} className="ml-2" /></>
                )}
            </Button>
        </div>
    );
}
