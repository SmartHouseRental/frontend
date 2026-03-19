import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Eye, Star, MapPin, Bed, Bath, Maximize, Calendar, DollarSign, TrendingUp, Camera, Upload } from 'lucide-react';

function PropertyDetailPage() {
    const images = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCAenV_3qVcY9Qwk4wakHFXyVXSOEDbP8zpfnM2v9TbZZ2Dx6DLWg5WzQMyNUilW90Vq6f0sOyGmDlljmxE7SRGuPZ-mGD-mS_QOap5qzI1l0B9w5oqkoaVuzgP0alYz1POLq1Z7wdkOyl9G_RiBmtBc7JBDBBkBfJWkaugjSN-COItg-1H_5I30pLWoet3qEwRfjR7o65lqEoboTysrWFX5ACBJPW9fma8PplImAgccKF74CzCl70Hn_SR2cYk6Y1xVSWEP6nDHyYs',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDJmCVHHK5IgTYuMnEBX8RO1nOinrW0cnVikNmuGhYgY_CkHYI8gfpCp3SEvgug4SdZc7v6SX_o6N0eaXn-2EA9Z4xMqc9UosSSlqEGjec-0k91lXxF97pnVZ-EP6Vmf8WW4roVyCo5Am06bkxTHfotXf9mc3BScw9j6P4xBfjmzaQ5Z9Z9aX84jQ5oWmTUzI8Ifu0io--9zkixMk-fH4LdGKr80ZMqIQUK8K38xJmywgMq0LVHHEmKYxLMYGS6lfgFMprudQ4gCRcO',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBHK4MBf-7UqrhDns85XvQ8rILU5gDaYMqKUfF9Wf5uB7jOthE-628mLKysKbIm1k6jW99udN3BX2TELrn_bQhFYQE4qiEKrxf9Uvwi94473iylGn2WS5r61GBMgRbO7vN-8WO902Pk_3LWwYfkGACDKym_P-aSaMjnt5XB3lL6_i562wLzPu0wKH5lnacfnK0J1c_n9mz4fslMIn6wohA3b1ddHEiYTpShBnbHAmhp5ifGDttU_5ZxLoR-BUPiZwEpwYOYUg1kB9Q2',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuoTFnm7eiUv3aKP_BJ5piF4y8mlzYH5ClM5cBXvCWiUBoKTyYq1fVvBa1ON_b343Lnm8gmkoCZu--XjCNHqF0C_MeQTDaVpBbPejgSOMxhesm8QdPtka1Sf7nq8DJL7UhC_eZs_rTsy4xIu6xuYQGKmdGUEc1F9lQPDNQ6jWkuyV_vzyE-JvOZVwndSvv4-arIqjshonMQ_Cvrc8GSp1iaQcWcbzTUNuOqCFGwTWZutx9kXsgtmfjULDan6j82KWu2NOo2-Z_dXl',
    ];

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                        <ArrowLeft size={16} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Luxury Villa in Bole Atlas</h1>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin size={12} /> Bole, Addis Ababa • ID: #PRP-1024
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 uppercase text-xs font-bold">Available</Badge>
                    <Button variant="outline" className="gap-2"><Edit size={14} /> Edit Property</Button>
                </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList className="bg-muted/50">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="stats">Performance</TabsTrigger>
                </TabsList>

                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Image */}
                        <div className="lg:col-span-2">
                            <div className="h-80 rounded-2xl bg-cover bg-center border border-border overflow-hidden" style={{ backgroundImage: `url('${images[0]}')` }}></div>
                            <div className="flex gap-3 mt-3">
                                {images.slice(1).map((img, i) => (
                                    <div key={i} className="h-20 w-24 rounded-lg bg-cover bg-center border border-border cursor-pointer hover:ring-2 hover:ring-primary transition-all" style={{ backgroundImage: `url('${img}')` }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="space-y-4">
                            <Card>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Monthly Rent</p>
                                        <p className="text-2xl font-black text-primary mt-1">85,000 ETB</p>
                                    </div>
                                    <div className="h-px bg-border"></div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <Bed size={18} className="mx-auto text-muted-foreground" />
                                            <p className="text-sm font-bold mt-1">4</p>
                                            <p className="text-[10px] text-muted-foreground">Bedrooms</p>
                                        </div>
                                        <div className="text-center">
                                            <Bath size={18} className="mx-auto text-muted-foreground" />
                                            <p className="text-sm font-bold mt-1">3</p>
                                            <p className="text-[10px] text-muted-foreground">Bathrooms</p>
                                        </div>
                                        <div className="text-center">
                                            <Maximize size={18} className="mx-auto text-muted-foreground" />
                                            <p className="text-sm font-bold mt-1">350m²</p>
                                            <p className="text-[10px] text-muted-foreground">Area</p>
                                        </div>
                                    </div>
                                    <div className="h-px bg-border"></div>
                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="text-amber-400 fill-amber-400" />
                                        <span className="font-bold">4.8</span>
                                        <span className="text-xs text-muted-foreground">(24 reviews)</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="space-y-3">
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Quick Stats</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground flex items-center gap-2"><Eye size={14} /> Total Views</span>
                                        <span className="font-bold text-sm">1,245</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar size={14} /> Appointments</span>
                                        <span className="font-bold text-sm">8</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign size={14} /> Revenue</span>
                                        <span className="font-bold text-sm text-primary">510K ETB</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Description */}
                    <Card>
                        <CardContent>
                            <h3 className="font-bold text-foreground mb-2">Description</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                This stunning luxury villa in the heart of Bole Atlas offers a perfect blend of modern elegance and comfort. Featuring 4 spacious bedrooms, 3 modern bathrooms, a gourmet kitchen, and a beautiful garden with outdoor seating area. The property includes 24/7 security, dedicated parking for 3 vehicles, high-speed internet, and backup generator. Perfectly located near international schools, shopping centers, and major business districts.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {['Parking', 'Garden', 'Generator', 'Security', 'WiFi', 'Furnished'].map((tag) => (
                                    <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{tag}</span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground">Property Photos ({images.length})</h3>
                        <Button variant="outline" className="gap-2"><Upload size={14} /> Upload Photos</Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((img, i) => (
                            <div key={i} className="group relative h-48 rounded-xl bg-cover bg-center border border-border overflow-hidden cursor-pointer" style={{ backgroundImage: `url('${img}')` }}>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <Camera size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        ))}
                        <button className="h-48 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                            <Upload size={24} />
                            <span className="text-xs font-medium">Add Photo</span>
                        </button>
                    </div>
                </TabsContent>

                {/* Performance Tab */}
                <TabsContent value="stats" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Views This Month</p>
                                        <p className="text-2xl font-black mt-1">487</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                                        <TrendingUp size={14} /> +23%
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Inquiry Rate</p>
                                        <p className="text-2xl font-black mt-1">12.4%</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                                        <TrendingUp size={14} /> +5%
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Avg. Time on Page</p>
                                        <p className="text-2xl font-black mt-1">3m 42s</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h4 className="font-bold text-foreground mb-4">Views Over Time</h4>
                        <div className="h-48">
                            <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                                <defs>
                                    <linearGradient id="propViewsGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="oklch(0.62 0.11 55)" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="oklch(0.62 0.11 55)" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path d="M0,150 C100,140 200,160 300,120 C400,80 500,100 600,60 C700,40 800,50 900,30 L1000,20 L1000,200 L0,200 Z" fill="url(#propViewsGradient)" />
                                <path d="M0,150 C100,140 200,160 300,120 C400,80 500,100 600,60 C700,40 800,50 900,30 L1000,20" fill="none" stroke="oklch(0.62 0.11 55)" strokeLinecap="round" strokeWidth="3" />
                            </svg>
                        </div>
                        <div className="flex justify-between px-2 mt-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default PropertyDetailPage;
