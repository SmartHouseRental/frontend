import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const testimonials = [
    {
        name: 'Almaz Tesfaye',
        roleKey: 'landing.testimonials.items.almaz.role',
        rating: 5,
        textKey: 'landing.testimonials.items.almaz.text',
        initial: 'A',
    },
    {
        name: 'Samuel Bekele',
        roleKey: 'landing.testimonials.items.samuel.role',
        rating: 5,
        textKey: 'landing.testimonials.items.samuel.text',
        initial: 'S',
    },
    {
        name: 'Hana Girma',
        roleKey: 'landing.testimonials.items.hana.role',
        rating: 4,
        textKey: 'landing.testimonials.items.hana.text',
        initial: 'H',
    },
    {
        name: 'Dawit Alem',
        roleKey: 'landing.testimonials.items.dawit.role',
        rating: 5,
        textKey: 'landing.testimonials.items.dawit.text',
        initial: 'D',
    },
];

export default function Testimonials() {
    const { t } = useTranslation();

    return (
        <section className="px-6 py-20 lg:px-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <div className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest">
                        {t('landing.testimonials.badge')}
                    </div>
                    <h2 className="mb-3 text-4xl font-extrabold">
                        {t('landing.testimonials.titlePrefix')} <span className="text-primary">{t('landing.testimonials.titleAccent')}</span> {t('landing.testimonials.titleSuffix')}
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        {t('landing.testimonials.subtitle')}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {testimonials.map((item) => (
                        <Card
                            key={item.name}
                            className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <CardContent className="p-6">
                                <Quote className="text-primary/20 mb-4 h-8 w-8" />

                                <p className="text-muted-foreground mb-6 text-sm leading-relaxed italic">
                                    "{t(item.textKey)}"
                                </p>

                                <div className="mb-3 flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3.5 w-3.5 ${i < item.rating ? 'fill-primary text-primary' : 'text-muted'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                                        {item.initial}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{item.name}</p>
                                        <p className="text-muted-foreground text-xs">{t(item.roleKey)}</p>
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
