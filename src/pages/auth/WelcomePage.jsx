import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { CheckCircle2, Search, CalendarCheck, FileSignature, ArrowRight, Sparkles } from 'lucide-react';

const NEXT_STEPS = [
    {
        icon: Search,
        title: 'Browse Matched Listings',
        description: 'See properties that match your budget, preferred areas, and amenities.',
        color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
        icon: CalendarCheck,
        title: 'Book a Viewing',
        description: 'Schedule a property visit directly with the verified owner — no agents needed.',
        color: 'text-violet-500 bg-violet-50 dark:bg-violet-900/20 dark:text-violet-400',
    },
    {
        icon: FileSignature,
        title: 'Sign a Digital Agreement',
        description: 'Seal the deal with a legally-sound digital rental contract.',
        color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400',
    },
];

function WelcomePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
            <div className="w-full max-w-[520px]">

                {/* Celebration header */}
                <div className="mb-10 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30">
                            <CheckCircle2 size={48} strokeWidth={2.5} />
                        </div>
                        <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-white shadow-lg">
                            <Sparkles size={16} />
                        </div>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-foreground mb-3">
                        You're all set! 🎉
                    </h1>
                    <p className="text-muted-foreground font-medium text-[16px] leading-relaxed max-w-sm">
                        Your preferences are saved. We're now ready to match you with perfect homes in Addis Ababa.
                    </p>
                </div>

                {/* Next steps card */}
                <div className="mb-8 rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-border bg-muted/20 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your journey starts here</p>
                    </div>
                    <div className="divide-y divide-border">
                        {NEXT_STEPS.map(({ icon: Icon, title, description, color }, i) => (
                            <div key={title} className="flex items-start gap-4 p-5 group hover:bg-muted/20 transition-colors">
                                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${color} shadow-sm`}>
                                    <Icon size={22} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">Step {i + 1}</span>
                                    </div>
                                    <p className="font-bold text-foreground text-[15px] mb-0.5">{title}</p>
                                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                    <Link to="/explore" className="block">
                        <Button className="w-full h-14 rounded-xl font-bold shadow-lg text-[16px] shadow-primary/20">
                            <Search size={20} className="mr-2" />
                            Browse Properties Now
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </Link>
                    <Link to="/renter" className="block">
                        <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-border bg-card hover:bg-muted/30">
                            Go to my Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
