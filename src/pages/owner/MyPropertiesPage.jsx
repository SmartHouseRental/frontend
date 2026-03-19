import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, Eye, Star, Edit, Trash2, ExternalLink, Building2, CheckCircle2, Clock, XCircle, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

function MyPropertiesPage() {
    const properties = [
        { id: '#PRP-1024', title: 'Luxury Villa in Bole Atlas', location: 'Bole, Addis Ababa', type: 'Villa', price: '85,000 ETB', status: 'Available', views: 1245, rating: 4.8, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAenV_3qVcY9Qwk4wakHFXyVXSOEDbP8zpfnM2v9TbZZ2Dx6DLWg5WzQMyNUilW90Vq6f0sOyGmDlljmxE7SRGuPZ-mGD-mS_QOap5qzI1l0B9w5oqkoaVuzgP0alYz1POLq1Z7wdkOyl9G_RiBmtBc7JBDBBkBfJWkaugjSN-COItg-1H_5I30pLWoet3qEwRfjR7o65lqEoboTysrWFX5ACBJPW9fma8PplImAgccKF74CzCl70Hn_SR2cYk6Y1xVSWEP6nDHyYs' },
        { id: '#PRP-1025', title: 'Bole Skyline Apartment', location: 'Bole, Addis Ababa', type: 'Apartment', price: '45,000 ETB', status: 'Rented', views: 892, rating: 4.5, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnMOprguOjuAF8Qrb9Zd77c1Dv3YD3zqIUHFferta0hg3M0BhOsuEjs4O_4XyLTcQeDis92itJDmNWfCf7sy2_GMPcRJGLNNoZi4RqrpfxnlK7WLDtwdFZGhxbku7hQ6YL-ASEw6-EE9YyfsL9N6Z6OXwn6g3wmL91rwoCvxYx3_AwAZMvS4ylMV7aDwjyFozB0ZAubsD-X1Ey6TZjkd3k7BMNUGWIWCQ-LXJf6xaPd6ggQzeLbaO9HZax_anf1nmVTEXakADTFq-C' },
        { id: '#PRP-1026', title: 'Cottage by the Lake', location: 'Hawassa', type: 'House', price: '32,000 ETB', status: 'Available', views: 678, rating: 4.9, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHK4MBf-7UqrhDns85XvQ8rILU5gDaYMqKUfF9Wf5uB7jOthE-628mLKysKbIm1k6jW99udN3BX2TELrn_bQhFYQE4qiEKrxf9Uvwi94473iylGn2WS5r61GBMgRbO7vN-8WO902Pk_3LWwYfkGACDKym_P-aSaMjnt5XB3lL6_i562wLzPu0wKH5lnacfnK0J1c_n9mz4fslMIn6wohA3b1ddHEiYTpShBnbHAmhp5ifGDttU_5ZxLoR-BUPiZwEpwYOYUg1kB9Q2' },
        { id: '#PRP-1027', title: 'Modern Studio in Kazanchis', location: 'Kazanchis, Addis Ababa', type: 'Apartment', price: '28,000 ETB', status: 'Pending', views: 321, rating: 4.3, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJmCVHHK5IgTYuMnEBX8RO1nOinrW0cnVikNmuGhYgY_CkHYI8gfpCp3SEvgug4SdZc7v6SX_o6N0eaXn-2EA9Z4xMqc9UosSSlqEGjec-0k91lXxF97pnVZ-EP6Vmf8WW4roVyCo5Am06bkxTHfotXf9mc3BScw9j6P4xBfjmzaQ5Z9Z9aX84jQ5oWmTUzI8Ifu0io--9zkixMk-fH4LdGKr80ZMqIQUK8K38xJmywgMq0LVHHEmKYxLMYGS6lfgFMprudQ4gCRcO' },
        { id: '#PRP-1028', title: 'Penthouse Suite CMC', location: 'CMC, Addis Ababa', type: 'Apartment', price: '120,000 ETB', status: 'Available', views: 1560, rating: 4.7, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuoTFnm7eiUv3aKP_BJ5piF4y8mlzYH5ClM5cBXvCWiUBoKTyYq1fVvBa1ON_b343Lnm8gmkoCZu--XjCNHqF0C_MeQTDaVpBbPejgSOMxhesm8QdPtka1Sf7nq8DJL7UhC_eZs_rTsy4xIu6xuYQGKmdGUEc1F9lQPDNQ6jWkuyV_vzyE-JvOZVwndSvv4-arIqjshonMQ_Cvrc8GSp1iaQcWcbzTUNuOqCFGwTWZutx9kXsgtmfjULDan6j82KWu2NOo2-Z_dXl' },
    ];

    const statusColors = {
        Available: 'bg-emerald-100 text-emerald-700',
        Rented: 'bg-blue-100 text-blue-700',
        Pending: 'bg-amber-100 text-amber-700',
        Deleted: 'bg-rose-100 text-rose-700',
    };

    return (
        <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">My Properties</h1>
                    <p className="text-muted-foreground mt-1">Manage all your rental property listings.</p>
                </div>
                <Button className="gap-2 shadow-sm">
                    <Plus size={16} /> Add New Property
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Building2 size={18} className="text-primary" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Total</p>
                            <p className="text-xl font-extrabold">12</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Available</p>
                            <p className="text-xl font-extrabold text-emerald-600">8</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                            <Eye size={18} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Rented</p>
                            <p className="text-xl font-extrabold text-blue-600">3</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                            <Clock size={18} className="text-amber-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Pending</p>
                            <p className="text-xl font-extrabold text-amber-600">1</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search & Filters */}
            <Card className="flex-row flex-wrap items-center justify-between gap-4 rounded-xl border p-4">
                <div className="relative max-w-2xl min-w-50 flex-1">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                        <Search size={18} />
                    </span>
                    <Input className="py-2 pr-4 pl-10 outline-none focus:ring-2" placeholder="Search by title, location, or ID..." type="text" />
                </div>
                <div className="flex items-center gap-3">
                    <Select>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="studio">Studio</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="rented">Rented</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon"><Filter size={16} /></Button>
                </div>
            </Card>

            {/* Properties Table */}
            <Card className="gap-0 overflow-hidden rounded-xl border p-0 shadow-sm">
                <Table className="w-full min-w-full border-collapse text-left">
                    <TableHeader className="w-full bg-muted/30">
                        <TableRow>
                            <TableHead className="px-6 py-4">Property</TableHead>
                            <TableHead className="px-6 py-4">Type</TableHead>
                            <TableHead className="px-6 py-4">Price</TableHead>
                            <TableHead className="px-6 py-4">Views</TableHead>
                            <TableHead className="px-6 py-4">Rating</TableHead>
                            <TableHead className="px-6 py-4">Status</TableHead>
                            <TableHead className="px-6 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {properties.map((p) => (
                            <TableRow key={p.id} className="hover:bg-muted/10 transition-colors">
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={p.img} alt={p.title} className="h-11 w-11 rounded-lg object-cover" />
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{p.title}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <MapPin size={10} /> {p.location}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm">{p.type}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <p className="text-sm font-bold text-primary">{p.price}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">per month</p>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <Eye size={14} className="text-muted-foreground" />
                                        <span className="text-sm font-semibold">{p.views.toLocaleString()}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="text-amber-400 fill-amber-400" />
                                        <span className="text-sm font-semibold">{p.rating}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusColors[p.status]}`}>
                                        {p.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <ExternalLink size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-500">
                                            <Edit size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                    <p className="text-muted-foreground text-xs font-medium">Showing 1-5 of 12 properties</p>
                    <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-card" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="bg-primary rounded-lg px-3 py-1 text-xs font-bold text-primary-foreground">1</button>
                        <button className="text-muted-foreground rounded-lg px-3 py-1 text-xs font-bold hover:bg-card">2</button>
                        <button className="text-muted-foreground rounded-lg px-3 py-1 text-xs font-bold hover:bg-card">3</button>
                        <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-card">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default MyPropertiesPage;
