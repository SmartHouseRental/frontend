import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router';
import {
    Search, Plus, Eye, Edit, Trash2, Building2, MapPin,
    ChevronLeft, ChevronRight, LayoutGrid, List,
    TrendingUp, BedDouble, Home, DollarSign, Filter,
    MoreVertical, Loader2,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMyProperties } from '@/features/properties/hooks/useMyProperties';
import { useDeleteProperty } from '@/features/properties/hooks/useDeleteProperty';

const statusColors = {
    AVAILABLE: 'bg-emerald-100 text-emerald-700',
    RENTED: 'bg-blue-100 text-blue-700',
    MAINTENANCE: 'bg-amber-100 text-amber-700',
    UNAVAILABLE: 'bg-slate-100 text-slate-600',
};

function MyPropertiesPage() {
    const { data: propertiesData, isLoading, error, refetch } = useMyProperties();
    const deletePropertyMutation = useDeleteProperty();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [viewMode, setViewMode] = useState('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const itemsPerPage = 5;

    const properties = propertiesData?.data || [];

    const handleDelete = (id) => {
        deletePropertyMutation.mutate(id, {
            onSuccess: () => {
                setDeleteConfirm(null);
                refetch();
            },
        });
    };

    const filtered = useMemo(() => {
        return properties.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter;
            const matchesType = typeFilter === 'all' || p.type.toLowerCase() === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [properties, searchQuery, statusFilter, typeFilter]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const stats = useMemo(() => ({
        total: properties.length,
        available: properties.filter(p => p.status === 'AVAILABLE').length,
        rented: properties.filter(p => p.status === 'RENTED').length,
        totalViews: properties.reduce((sum, p) => sum + (p.viewsCount || 0), 0),
    }), [properties]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">My Properties</h1>
                    <p className="text-muted-foreground mt-1">Manage and track all your rental listings.</p>
                </div>
                <Link to="/owner/add-property">
                    <Button className="gap-2 shadow-sm"><Plus size={16} /> Add Property</Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {[
                    { label: 'Total Properties', value: stats.total, icon: Building2, color: 'bg-primary/10 text-primary', change: '+2 this month' },
                    { label: 'Available', value: stats.available, icon: Home, color: 'bg-emerald-500/10 text-emerald-500' },
                    { label: 'Rented', value: stats.rented, icon: BedDouble, color: 'bg-blue-500/10 text-blue-500' },
                    { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: TrendingUp, color: 'bg-amber-500/10 text-amber-500', change: '+24% vs last month' },
                ].map((s) => {
                    const Icon = s.icon;
                    return (
                        <Card key={s.label} className="border-0 hover:shadow-md transition-shadow">
                            <CardHeader className="flex justify-between pb-2">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                                    <Icon size={18} />
                                </div>
                                {s.change && <span className="text-xs text-emerald-500 font-bold flex items-center gap-0.5"><TrendingUp size={12} /> {s.change}</span>}
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{s.label}</p>
                                <h3 className="mt-1 text-2xl font-extrabold">{s.value}</h3>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Search & Filters */}
            <Card className="flex-row flex-wrap items-center justify-between gap-4 p-4">
                <div className="relative min-w-60 flex-1 max-w-lg">
                    <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        className="pl-10"
                        placeholder="Search by name, location, or ID..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="rented">Rented</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-36"><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="studio">Studio</SelectItem>
                                <SelectItem value="penthouse">Penthouse</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex rounded-lg border border-border overflow-hidden">
                        <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}><List size={16} /></button>
                        <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}><LayoutGrid size={16} /></button>
                    </div>
                </div>
            </Card>

            {/* Results count */}
            {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' ? (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">{filtered.length}</span> {filtered.length === 1 ? 'property' : 'properties'} found
                        {searchQuery && <span> for "<span className="font-medium text-foreground">{searchQuery}</span>"</span>}
                    </p>
                    {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
                        <Button variant="ghost" size="sm" className="text-xs" onClick={() => { setSearchQuery(''); setStatusFilter('all'); setTypeFilter('all'); setCurrentPage(1); }}>
                            Clear Filters
                        </Button>
                    )}
                </div>
            ) : null}

            {/* Content */}
            {viewMode === 'list' ? (
                <Card className="gap-0 overflow-hidden p-0">
                    <Table className="w-full min-w-full text-left">
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="px-6 py-4">Property</TableHead>
                                <TableHead className="px-6 py-4">Type</TableHead>
                                <TableHead className="px-6 py-4">Rent</TableHead>
                                <TableHead className="px-6 py-4">Status</TableHead>
                                <TableHead className="px-6 py-4">Views</TableHead>
                                <TableHead className="px-6 py-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                        No properties match your filters
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginated.map((p) => (
                                    <TableRow key={p.id} className="hover:bg-muted/10 transition-colors">
                                        <TableCell className="px-6 py-4">
                                            <Link to="/owner/property-detail" className="flex items-center gap-3">
                                                <img src={p.img} alt={p.name} className="size-12 rounded-lg object-cover" />
                                                <div>
                                                    <p className="text-sm font-bold text-foreground hover:text-primary transition-colors">{p.name}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={10} /> {p.location}</p>
                                                    <p className="text-[10px] text-muted-foreground">{p.bedrooms} bed • {p.bathrooms} bath • {p.size}</p>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm font-medium">{p.type}</TableCell>
                                        <TableCell className="px-6 py-4 text-sm font-bold text-primary">{p.rent}</TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusColors[p.status]}`}>{p.status}</span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className="text-sm font-medium flex items-center gap-1"><Eye size={14} className="text-muted-foreground" /> {p.views.toLocaleString()}</span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground outline-none">
                                                        <MoreVertical size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-36">
                                                    <DropdownMenuItem asChild>
                                                        <Link to="/owner/property-detail" className="flex items-center gap-2 cursor-pointer">
                                                            <Eye size={14} /> View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link to="/owner/edit-property" className="flex items-center gap-2 cursor-pointer">
                                                            <Edit size={14} /> Edit Property
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                                                        onClick={() => setDeleteConfirm(p.id)}
                                                    >
                                                        <Trash2 size={14} /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            {deleteConfirm === p.id && (
                                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
                                                    <Card className="w-80 shadow-xl border-destructive/20">
                                                        <CardHeader className="pb-2">
                                                            <h4 className="text-sm font-bold text-foreground">Confirm Delete</h4>
                                                            <p className="text-xs text-muted-foreground mt-1">Are you sure you want to delete "{p.name}"? This action cannot be undone.</p>
                                                        </CardHeader>
                                                        <CardContent className="flex justify-end gap-2 pt-2">
                                                            <Button variant="ghost" size="sm" className="h-8 text-xs font-bold" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                                                            <Button variant="destructive" size="sm" className="h-8 text-xs font-bold" onClick={() => handleDelete(p.id)}>Yes, Delete</Button>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                            <p className="text-muted-foreground text-xs font-medium">
                                Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50 hover:bg-card" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                                    <ChevronLeft size={16} />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button key={page} onClick={() => setCurrentPage(page)} className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${currentPage === page ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-card'}`}>
                                        {page}
                                    </button>
                                ))}
                                <button className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50 hover:bg-card" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </Card>
            ) : (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {paginated.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-muted-foreground">No properties match your filters</p>
                        </div>
                    ) : (
                        paginated.map((p) => (
                            <Card key={p.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 p-0">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase shadow-sm ${statusColors[p.status]}`}>{p.status}</span>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <p className="text-white font-bold text-sm">{p.name}</p>
                                        <p className="text-white/70 text-xs flex items-center gap-1"><MapPin size={10} /> {p.location}</p>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-lg font-extrabold text-primary">{p.rent}</p>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye size={12} /> {p.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                                        <span>{p.bedrooms} Beds</span>
                                        <span className="text-border">•</span>
                                        <span>{p.bathrooms} Baths</span>
                                        <span className="text-border">•</span>
                                        <span>{p.size}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link to="/owner/property-detail" className="flex-1">
                                            <Button variant="outline" className="w-full gap-1 text-xs h-8"><Eye size={12} /> View</Button>
                                        </Link>
                                        <Link to="/owner/edit-property">
                                            <Button variant="outline" size="icon" className="h-8 w-8"><Edit size={12} /></Button>
                                        </Link>
                                        <Button variant="outline" size="icon" className="h-8 w-8 text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => handleDelete(p.id)}><Trash2 size={12} /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default MyPropertiesPage;
