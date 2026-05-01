import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { properties } from '@/lib/dummyData';
import HeartButton from '@/features/favorites/components/HeartButton';

export default function SimilarProperties({ currentId }) {
    const navigate = useNavigate();
    const similar = properties.filter((p) => p.id !== currentId).slice(0, 4);

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
                {similar.map((property) => (
                    <Card
                        key={property.id}
                        className="group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        onClick={() => navigate(`/property/${property.id}`)}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {property.tag && (
                                <Badge className="bg-primary text-primary-foreground absolute top-3 left-3 text-xs">
                                    {property.tag}
                                </Badge>
                            )}
                            <HeartButton property={property} className="absolute top-3 right-3 z-10" />
                            <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-bold">
                                {property.price}
                            </div>
                        </div>

                        <CardContent className="p-4">
                            <h4 className="group-hover:text-primary mb-1 font-bold transition-colors">
                                {property.title}
                            </h4>
                            <p className="text-muted-foreground mb-3 text-xs">{property.location}</p>

                            <div className="text-muted-foreground flex gap-3 border-t pt-2.5 text-xs">
                                <span className="flex items-center gap-1">
                                    <BedDouble className="h-3 w-3" /> {property.beds}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Bath className="h-3 w-3" /> {property.baths}
                                </span>
                                <span>{property.size}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
