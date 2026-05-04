import { Link } from 'react-router';
import { ChevronLeft, LockKeyhole } from 'lucide-react';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Left Column: Image Area */}
            <div className="relative hidden w-5/12 flex-col justify-center bg-slate-900 lg:flex items-center">
                <img
                    src="https://images.unsplash.com/photo-1549517045-bc93de0ce788?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Secure locks"
                    className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20 mix-blend-multiply" />

                <div className="absolute top-8 left-8 z-20">
                    <Link to="/login" className="flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors gap-2">
                        <ChevronLeft size={16} /> Back to Login
                    </Link>
                </div>

                <div className="relative z-10 p-12 text-center text-white max-w-sm">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl mx-auto mb-6 border border-white/20">
                        <LockKeyhole size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight mb-4">
                        Security first
                    </h2>
                    <p className="text-slate-300 font-medium leading-relaxed">
                        Your safety is our priority. We'll help you securely get back into your account in just a few steps.
                    </p>
                </div>
            </div>

            {/* Right Column: Form Area */}
            <div className="flex w-full items-center justify-center p-4 lg:w-7/12">
                <div className="w-full max-w-[420px]">
                    {/* Mobile Back Button */}
                    <Link to="/login" className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 lg:hidden gap-1 transition-colors">
                        <ChevronLeft size={16} /> Login
                    </Link>

                    <div className="mb-10 text-left">
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Forgot password?
                        </h1>
                        <p className="text-muted-foreground mt-2 font-medium leading-relaxed">
                            No worries, we'll send you reset instructions. Please enter the email associated with your account.
                        </p>
                    </div>

                    <div className="mt-8">
                        <ForgotPasswordForm />
                    </div>

                    <p className="mt-10 text-center text-[15px] font-medium text-muted-foreground">
                        Remember your password?{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
                            Log in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
