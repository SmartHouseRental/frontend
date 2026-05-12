import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import HeartButton from '@/features/favorites/components/HeartButton';
import { useSimilarProperties } from '@/features/property/hooks/useSimilarProperties';

export default function SimilarProperties({ currentId }) {
    const navigate = useNavigate();
    const { data: similar, isLoading, isError } = useSimilarProperties(currentId);

    if (isLoading) {
        return (
            <div className="mt-16 flex items-center justify-center border-t pt-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !similar || similar.length === 0) return null;

    return (
        <section className="mt-16 border-t pt-12">
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h3 className="mb-1 text-2xl font-bold">Similar Properties</h3>
                    <p className="text-muted-foreground text-sm">
                        Other homes you might love
                    </p>
                </div>
                <Button variant="ghost" className="text-primary gap-1 font-bold" asChild>
                    <Link to="/explore">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {similar.map((p) => {
                    const title = typeof p.title === 'object' ? p.title.en : p.title;
                    const image = p.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';
                    
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
                                {p.type && (
                                    <Badge className="bg-primary text-primary-foreground absolute top-3 left-3 text-xs">
                                        {p.type}
                                    </Badge>
                                )}
                                <HeartButton property={p} className="absolute top-3 right-3 z-10" />
                                <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-bold">
                                    {p.price} ETB
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <h4 className="group-hover:text-primary mb-1 font-bold transition-colors line-clamp-1">
                                    {title}
                                </h4>
                                <p className="text-muted-foreground mb-3 text-xs line-clamp-1">{p.address || p.location}</p>

                                <div className="text-muted-foreground flex gap-3 border-t pt-2.5 text-xs">
                                    <span className="flex items-center gap-1">
                                        <BedDouble className="h-3 w-3" /> {p.bedrooms}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Bath className="h-3 w-3" /> {p.bathrooms}
                                    </span>
                                    <span>{p.area} sqm</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}
