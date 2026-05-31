import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import HeartButton from '@/features/favorites/components/HeartButton';
import { useRecommendations } from '@/features/recommendation/hooks/useRecommendations';
import { getPropertyCardFields } from '@/features/property/utils/propertyCardHelpers';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RecommendedProperties() {
    const navigate = useNavigate();
    const { locale, t } = useLanguage();
    const { data: recommendations, isLoading, isError } = useRecommendations();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return null; // Silent fail for recommendations
    }

    if (!recommendations || recommendations.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-end justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">{t('recommendations.title', 'Recommended For You')}</h3>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {recommendations.slice(0, 4).map((p) => {
                    const {
                        title,
                        address,
                        priceValue,
                        priceCurrency,
                        areaValue,
                        type,
                        image,
                    } = getPropertyCardFields(p, locale);

                    return (
                        <Card
                            key={p.id}
                            className="group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            onClick={() => navigate(`/property/${p.id}`)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={image}
                                    alt={title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {type && (
                                    <Badge className="bg-primary text-primary-foreground absolute top-3 left-3 text-xs">
                                        {type}
                                    </Badge>
                                )}
                                <HeartButton property={p} className="absolute top-3 right-3 z-10" />
                                <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-bold shadow-sm">
                                    {priceValue} {priceCurrency} {t('perMonth', '/ month')}
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <h4 className="group-hover:text-primary mb-1 font-bold transition-colors line-clamp-1">
                                    {title}
                                </h4>
                                <p className="text-muted-foreground mb-3 text-xs line-clamp-1">{address}</p>

                                <div className="text-muted-foreground flex gap-3 border-t pt-2.5 text-xs">
                                    <span className="flex items-center gap-1">
                                        <BedDouble className="h-3 w-3" /> {p.bedrooms}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Bath className="h-3 w-3" /> {p.bathrooms}
                                    </span>
                                    <span>{areaValue} {t('sqm', 'sqm')}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}
