import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Building2, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features/auth/components/LoginForm';

function LoginPage() {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen bg-background">
            {/* Left Column: Image Area */}
            <div className="relative hidden w-1/2 flex-col justify-end bg-slate-900 lg:flex">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Modern house exterior at dusk"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent mix-blend-multiply" />

                {/* Subtle top nav for going back */}
                <div className="absolute top-8 left-8 z-20">
                    <Link to="/" className="flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors gap-2">
                        <ChevronLeft size={16} /> {t('auth.backToHome')}
                    </Link>
                </div>

                <div className="relative z-10 p-12 text-white max-w-xl mx-auto mb-10 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl">
                            <Building2 size={32} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl mb-4">
                        {t('auth.welcomeBackTo')} <span className="text-blue-400">SmartHouseRental</span>
                    </h2>
                    <p className="text-lg font-medium text-slate-300">
                        {t('auth.loginHeroDesc')}
                    </p>
                </div>
            </div>

            {/* Right Column: Form Area */}
            <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
                <div className="w-full max-w-105">
                    {/* Mobile Back Button */}
                    <Link to="/" className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 lg:hidden gap-1 transition-colors">
                        <ChevronLeft size={16} /> {t('auth.home')}
                    </Link>

                    <div className="mb-8 flex flex-col items-start">
                        <h1 className="text-3xl font-black tracking-tight text-foreground">{t('auth.signIn')}</h1>
                        <p className="text-muted-foreground mt-2 font-medium">
                            {t('auth.signInIntro')}
                        </p>
                    </div>

                    <LoginForm />

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border/60"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                            <span className="bg-background px-3 text-muted-foreground/70">{t('auth.orContinueWith')}</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold gap-3 border-border bg-card hover:bg-muted/30 transition-all shadow-sm" type="button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        {t('auth.googleAccount')}
                    </Button>

                    <p className="mt-10 text-center text-[15px] font-medium text-muted-foreground">
                        {t('auth.dontHaveAccount')}{' '}
                        <Link to="/signup" className="font-bold text-primary hover:text-primary/80 transition-colors">
                            {t('auth.createAnAccount')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
