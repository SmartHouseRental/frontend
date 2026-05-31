import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import HeartButton from '@/features/favorites/components/HeartButton';
import { useRecommendations } from '@/features/recommendation/hooks/useRecommendations';
import { getPropertyCardFields } from '@/features/property/utils/propertyCardHelpers';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RenterRecommendationsPage() {
    const navigate = useNavigate();
    const { locale, t } = useLanguage();
    const { data: recommendations, isLoading, isError } = useRecommendations();

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-64 flex-col items-center justify-center text-center">
                <Sparkles className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                <h3 className="text-xl font-bold">{t('recommendations.error.title', 'Oops!')}</h3>
                <p className="text-muted-foreground mt-2">{t('recommendations.error.message', 'We could not load your recommendations right now.')}</p>
            </div>
        );
    }

    if (!recommendations || recommendations.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center text-center">
                <Sparkles className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                <h3 className="text-xl font-bold">{t('recommendations.empty.title', 'No Recommendations Yet')}</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    {t('recommendations.empty.message', 'Start exploring and saving properties to give us a better idea of what you like!')}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-7 w-7 text-primary" />
                    <h2 className="text-3xl font-black tracking-tight">{t('recommendations.pageTitle', 'Tailored For You')}</h2>
                </div>
                <p className="text-muted-foreground font-medium">{t('recommendations.pageSubtitle', 'Based on your activity and preferences, we think you\'ll love these properties.')}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recommendations.map((p) => {
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
                            <div className="relative h-48 overflow-hidden bg-slate-100">
                                <img
                                    src={image}
                                    alt={title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {type && (
                                    <Badge className="bg-primary text-primary-foreground absolute top-3 left-3 text-xs shadow-sm">
                                        {type}
                                    </Badge>
                                )}
                                <HeartButton property={p} className="absolute top-3 right-3 z-10" />
                                <div className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-sm">
                                    {priceValue} {priceCurrency} <span className="text-[10px] font-semibold text-muted-foreground">{t('perMonth', '/ mo')}</span>
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <h4 className="group-hover:text-primary mb-1 font-bold transition-colors line-clamp-1">
                                    {title}
                                </h4>
                                <p className="text-muted-foreground mb-3 text-xs line-clamp-1 font-medium">{address}</p>

                                <div className="text-muted-foreground flex gap-3 border-t border-border/50 pt-3 text-xs font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <BedDouble className="h-3.5 w-3.5" /> {p.bedrooms}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Bath className="h-3.5 w-3.5" /> {p.bathrooms}
                                    </span>
                                    <span className="flex items-center ml-auto">
                                        {areaValue} {t('sqm', 'm²')}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
