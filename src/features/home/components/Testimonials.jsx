import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
    {
        name: 'Almaz Tesfaye',
        role: 'Renter • Bole',
        rating: 5,
        text: "We found the perfect home for our family within a week! The verification process gave us complete peace of mind. Our kids love the neighborhood.",
        initial: 'A',
        stay: '1 year tenant',
    },
    {
        name: 'Samuel Bekele',
        role: 'Renter • Kazanchis',
        rating: 5,
        text: "The AI-powered search understood exactly what we needed — a quiet place near schools with reliable internet. Bet-Connect delivered!",
        initial: 'S',
        stay: '8 months tenant',
    },
    {
        name: 'Hana Girma',
        role: 'Property Owner',
        rating: 4,
        text: "Listing my property was incredibly simple. I had verified tenants reaching out within days. The platform handles everything professionally.",
        initial: 'H',
        stay: '2 years hosting',
    },
    {
        name: 'Dawit Alem',
        role: 'Renter • CMC',
        rating: 5,
        text: "After trying many platforms, Bet-Connect was the only one where every listing was real and verified. No surprises, no scams. Just honest homes.",
        initial: 'D',
        stay: '6 months tenant',
    },
];

export default function Testimonials() {
    return (
        <section className="px-6 py-20 lg:px-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <div className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest">
                        What People Say
                    </div>
                    <h2 className="mb-3 text-4xl font-extrabold">
                        Trusted by <span className="text-primary">Families</span> Across Addis
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Real stories from renters and owners who found their perfect match through Bet-Connect.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {testimonials.map((t) => (
                        <Card
                            key={t.name}
                            className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <CardContent className="p-6">
                                <Quote className="text-primary/20 mb-4 h-8 w-8" />

                                <p className="text-muted-foreground mb-6 text-sm leading-relaxed italic">
                                    "{t.text}"
                                </p>

                                <div className="mb-3 flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3.5 w-3.5 ${i < t.rating ? 'fill-primary text-primary' : 'text-muted'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                                        {t.initial}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{t.name}</p>
                                        <p className="text-muted-foreground text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </CardContent>

                            {/* Subtle accent line on hover */}
                            <div className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
