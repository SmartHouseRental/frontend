import { Button } from '@/components/ui/button';
import { ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router';

export default function CTASection() {
    return (
        <section className="px-6 py-20 lg:px-20">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#A47551] via-[#C96635] to-[#D97745] p-12 text-white shadow-2xl md:p-16">
                    {/* Decorative circles */}
                    <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

                    <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
                        <div className="flex-1">
                            <h2 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl">
                                Ready to Find Your Family's Next Home?
                            </h2>
                            <p className="max-w-lg text-white/80">
                                Join thousands of families who have found verified, safe, and comfortable homes
                                through Bet-Connect. Start your journey today.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button
                                size="lg"
                                asChild
                                className="h-14 gap-2 rounded-full bg-white px-8 text-lg font-bold text-[#A47551] shadow-xl transition-transform hover:scale-105 hover:bg-white/90"
                            >
                                <Link to="/explore">
                                    Browse Homes <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="h-14 gap-2 rounded-full border-2 border-white/30 bg-transparent px-8 text-lg font-bold text-white backdrop-blur-sm transition-transform hover:scale-105 hover:border-white hover:bg-white/10"
                            >
                                <Link to="/signup">
                                    <Home className="h-5 w-5" /> List Your Property
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
