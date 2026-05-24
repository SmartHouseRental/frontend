import { Link } from 'react-router';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SignUpForm } from '@/features/auth/components/SignUpForm';

function SignUpPage() {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Left Column: Image Area */}
            <div className="relative hidden w-5/12 flex-col justify-end bg-slate-900 lg:flex">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Beautiful modern living room"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-slate-900/20 mix-blend-multiply" />

                <div className="absolute top-8 left-8 z-20">
                    <Link to="/" className="flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors gap-2">
                        <ChevronLeft size={16} /> {t('auth.backToHome')}
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
                <div className="w-full max-w-120">
                    {/* Mobile Back Button */}
                    <Link to="/" className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 lg:hidden gap-1 transition-colors">
                        <ChevronLeft size={16} /> {t('auth.home')}
                    </Link>

                    <div className="mb-10 text-left">
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            {t('auth.joinCommunity')}
                        </h1>
                        <p className="text-muted-foreground mt-2 font-medium leading-relaxed">
                            {t('auth.signupIntro')}
                        </p>
                    </div>

                    <div className="mt-8">
                        <SignUpForm />
                    </div>

                    <p className="mt-10 text-center text-[15px] font-medium text-muted-foreground">
                        {t('auth.alreadyHaveAccount')}{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
                            {t('auth.loginInstead')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
