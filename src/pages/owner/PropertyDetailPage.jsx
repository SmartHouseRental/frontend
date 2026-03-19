import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router';
import { ArrowLeft, Edit, Eye, Star, MapPin, Bed, Bath, Maximize, Calendar, DollarSign, TrendingUp, Camera, Upload, Trash2, Heart, Share2, Copy, CheckCircle2 } from 'lucide-react';

const allImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCAenV_3qVcY9Qwk4wakHFXyVXSOEDbP8zpfnM2v9TbZZ2Dx6DLWg5WzQMyNUilW90Vq6f0sOyGmDlljmxE7SRGuPZ-mGD-mS_QOap5qzI1l0B9w5oqkoaVuzgP0alYz1POLq1Z7wdkOyl9G_RiBmtBc7JBDBBkBfJWkaugjSN-COItg-1H_5I30pLWoet3qEwRfjR7o65lqEoboTysrWFX5ACBJPW9fma8PplImAgccKF74CzCl70Hn_SR2cYk6Y1xVSWEP6nDHyYs',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDJmCVHHK5IgTYuMnEBX8RO1nOinrW0cnVikNmuGhYgY_CkHYI8gfpCp3SEvgug4SdZc7v6SX_o6N0eaXn-2EA9Z4xMqc9UosSSlqEGjec-0k91lXxF97pnVZ-EP6Vmf8WW4roVyCo5Am06bkxTHfotXf9mc3BScw9j6P4xBfjmzaQ5Z9Z9aX84jQ5oWmTUzI8Ifu0io--9zkixMk-fH4LdGKr80ZMqIQUK8K38xJmywgMq0LVHHEmKYxLMYGS6lfgFMprudQ4gCRcO',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBHK4MBf-7UqrhDns85XvQ8rILU5gDaYMqKUfF9Wf5uB7jOthE-628mLKysKbIm1k6jW99udN3BX2TELrn_bQhFYQE4qiEKrxf9Uvwi94473iylGn2WS5r61GBMgRbO7vN-8WO902Pk_3LWwYfkGACDKym_P-aSaMjnt5XB3lL6_i562wLzPu0wKH5lnacfnK0J1c_n9mz4fslMIn6wohA3b1ddHEiYTpShBnbHAmhp5ifGDttU_5ZxLoR-BUPiZwEpwYOYUg1kB9Q2',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuoTFnm7eiUv3aKP_BJ5piF4y8mlzYH5ClM5cBXvCWiUBoKTyYq1fVvBa1ON_b343Lnm8gmkoCZu--XjCNHqF0C_MeQTDaVpBbPejgSOMxhesm8QdPtka1Sf7nq8DJL7UhC_eZs_rTsy4xIu6xuYQGKmdGUEc1F9lQPDNQ6jWkuyV_vzyE-JvOZVwndSvv4-arIqjshonMQ_Cvrc8GSp1iaQcWcbzTUNuOqCFGwTWZutx9kXsgtmfjULDan6j82KWu2NOo2-Z_dXl',
];

function PropertyDetailPage() {
    const [images, setImages] = useState(allImages);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDeleteImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        if (selectedImage >= images.length - 1) setSelectedImage(0);
    };

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/owner/properties">
                        <Button variant="outline" size="icon" className="h-9 w-9"><ArrowLeft size={16} /></Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Luxury Villa in Bole Atlas</h1>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin size={12} /> Bole, Addis Ababa • ID: #PRP-1024
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 uppercase text-xs font-bold">Available</Badge>
                    <Button variant="outline" size="icon" className={`h-9 w-9 ${isFavorited ? 'text-rose-500' : ''}`} onClick={() => setIsFavorited(!isFavorited)}>
                        <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleCopyLink}>
                        {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Share2 size={16} />}
                    </Button>
                    <Button variant="outline" className="gap-2"><Edit size={14} /> Edit</Button>
                </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList className="bg-muted/50">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="media">Media ({images.length})</TabsTrigger>
                    <TabsTrigger value="stats">Performance</TabsTrigger>
                </TabsList>

                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Image */}
                        <div className="lg:col-span-2">
                            <div className="h-80 rounded-2xl bg-cover bg-center border border-border overflow-hidden transition-all duration-500"
                                style={{ backgroundImage: `url('${images[selectedImage]}')` }}>
                            </div>
                            <div className="flex gap-3 mt-3">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`h-20 w-24 rounded-lg bg-cover bg-center border-2 cursor-pointer transition-all duration-200 ${selectedImage === i ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-border hover:border-primary/50'
                                            }`}
                                        style={{ backgroundImage: `url('${img}')` }}
                                    />
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
                                        {[
                                            { icon: Bed, value: '4', label: 'Bedrooms' },
                                            { icon: Bath, value: '3', label: 'Bathrooms' },
                                            { icon: Maximize, value: '350m²', label: 'Area' },
                                        ].map(({ icon: Icon, value, label }) => (
                                            <div key={label} className="text-center">
                                                <Icon size={18} className="mx-auto text-muted-foreground" />
                                                <p className="text-sm font-bold mt-1">{value}</p>
                                                <p className="text-[10px] text-muted-foreground">{label}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-px bg-border"></div>
                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="text-amber-400 fill-amber-400" />
                                        <span className="font-bold">4.8</span>
                                        <Link to="/owner/reviews" className="text-xs text-primary hover:underline">(24 reviews)</Link>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="space-y-3">
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Quick Stats</p>
                                    {[
                                        { icon: Eye, label: 'Total Views', value: '1,245', color: '' },
                                        { icon: Calendar, label: 'Appointments', value: '8', color: '' },
                                        { icon: DollarSign, label: 'Revenue', value: '510K ETB', color: 'text-primary' },
                                    ].map(({ icon: Icon, label, value, color }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground flex items-center gap-2"><Icon size={14} /> {label}</span>
                                            <span className={`font-bold text-sm ${color}`}>{value}</span>
                                        </div>
                                    ))}
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
                                {['Parking', 'Garden', 'Generator', 'Security', 'WiFi', 'Furnished', 'Gym', 'Pool'].map((tag) => (
                                    <span key={tag} className="rounded-full bg-primary/5 border border-primary/10 px-3 py-1 text-xs font-medium text-primary">{tag}</span>
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
                            <div key={i} className="group relative h-48 rounded-xl overflow-hidden cursor-pointer">
                                <img src={img} alt={`Property photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2">
                                    <button className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white" onClick={() => setSelectedImage(i)}>
                                        <Eye size={14} />
                                    </button>
                                    <button className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-100 text-rose-500" onClick={() => handleDeleteImage(i)}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                {i === selectedImage && (
                                    <div className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">Cover</div>
                                )}
                            </div>
                        ))}
                        <button className="h-48 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/3 transition-all">
                            <Upload size={24} />
                            <span className="text-xs font-medium">Add Photo</span>
                        </button>
                    </div>
                </TabsContent>

                {/* Performance Tab */}
                <TabsContent value="stats" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: 'Views This Month', value: '487', change: '+23%', up: true },
                            { label: 'Inquiry Rate', value: '12.4%', change: '+5%', up: true },
                            { label: 'Avg. Time on Page', value: '3m 42s', change: '', up: false },
                        ].map((s) => (
                            <Card key={s.label}>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
                                            <p className="text-2xl font-black mt-1">{s.value}</p>
                                        </div>
                                        {s.change && (
                                            <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                                                <TrendingUp size={14} /> {s.change}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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
                                {[{ x: 0, y: 150 }, { x: 250, y: 120 }, { x: 500, y: 90 }, { x: 750, y: 40 }, { x: 1000, y: 20 }].map((p, i) => (
                                    <circle key={i} cx={p.x} cy={p.y} r="4" fill="oklch(0.62 0.11 55)" stroke="#fff" strokeWidth="2.5" />
                                ))}
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
