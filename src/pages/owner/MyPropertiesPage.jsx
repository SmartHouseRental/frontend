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
    MoreVertical, Loader2, ShieldAlert, ArrowRight,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMyProperties } from '@/features/properties/hooks/useMyProperties';
import { useDeleteProperty } from '@/features/properties/hooks/useDeleteProperty';
import VerificationBanner from '@/components/VerificationBanner';
import { useOwnerVerificationState } from '@/features/owner/hooks/useOwnerVerificationState';
import { useNavigate } from 'react-router';
import { getLocalizedText } from '@/lib/utils/i18n';
import { useTranslation } from 'react-i18next';

const statusColors = {
    AVAILABLE: 'bg-emerald-100 text-emerald-700',
    RENTED: 'bg-blue-100 text-blue-700',
    MAINTENANCE: 'bg-amber-100 text-amber-700',
    UNAVAILABLE: 'bg-slate-100 text-slate-600',
};

function MyPropertiesPage() {
    const { data: propertiesData, isLoading, error, refetch } = useMyProperties();
    const deletePropertyMutation = useDeleteProperty();
    const { verificationState, isVerified, hasDocuments, docStatus, preferredLanguage } =
        useOwnerVerificationState();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [viewMode, setViewMode] = useState('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const itemsPerPage = 5;

    const handleAddProperty = () => {
        if (!isVerified) {
            setShowVerificationModal(true);
        } else {
            navigate('/owner/add-property');
        }
    };

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
            const name = getLocalizedText(p.title, preferredLanguage) || '';
            const location = getLocalizedText(p.address, preferredLanguage) || '';
            const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter;
            const matchesType = typeFilter === 'all' || (p.category?.en || '').toLowerCase() === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [properties, searchQuery, statusFilter, typeFilter, preferredLanguage]);

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
            <VerificationBanner verificationState={verificationState} />

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{t('owner.myProperties.title')}</h1>
                    <p className="text-muted-foreground mt-1">{t('owner.myProperties.subtitle')}</p>
                </div>
                <Button onClick={handleAddProperty} className="gap-2 shadow-sm"><Plus size={16} /> {t('owner.myProperties.addProperty')}</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {[
                    { label: t('owner.myProperties.stats.totalProperties'), value: stats.total, icon: Building2, color: 'bg-primary/10 text-primary', change: t('owner.myProperties.stats.thisMonth') },
                    { label: t('owner.myProperties.stats.available'), value: stats.available, icon: Home, color: 'bg-emerald-500/10 text-emerald-500' },
                    { label: t('owner.myProperties.stats.rented'), value: stats.rented, icon: BedDouble, color: 'bg-blue-500/10 text-blue-500' },
                    { label: t('owner.myProperties.stats.totalViews'), value: stats.totalViews.toLocaleString(), icon: TrendingUp, color: 'bg-amber-500/10 text-amber-500', change: t('owner.myProperties.stats.vsLastMonth') },
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
                        placeholder={t('owner.myProperties.filters.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-36"><SelectValue placeholder={t('owner.myProperties.filters.status')} /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">{t('owner.myProperties.filters.allStatuses')}</SelectItem>
                                <SelectItem value="available">{t('owner.myProperties.filters.available')}</SelectItem>
                                <SelectItem value="rented">{t('owner.myProperties.filters.rented')}</SelectItem>
                                <SelectItem value="maintenance">{t('owner.myProperties.filters.maintenance')}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-36"><SelectValue placeholder={t('owner.myProperties.filters.type')} /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">{t('owner.myProperties.filters.allTypes')}</SelectItem>
                                <SelectItem value="villa">{t('owner.myProperties.filters.villa')}</SelectItem>
                                <SelectItem value="apartment">{t('owner.myProperties.filters.apartment')}</SelectItem>
                                <SelectItem value="house">{t('owner.myProperties.filters.house')}</SelectItem>
                                <SelectItem value="studio">{t('owner.myProperties.filters.studio')}</SelectItem>
                                <SelectItem value="penthouse">{t('owner.myProperties.filters.penthouse')}</SelectItem>
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
                        {filtered.length === 1 ? (
                            t('owner.myProperties.resultFound', { count: filtered.length })
                        ) : (
                            t('owner.myProperties.resultsFound', { count: filtered.length })
                        )}
                        {searchQuery && t('owner.myProperties.forQuery', { query: searchQuery })}
                    </p>
                    {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
                        <Button variant="ghost" size="sm" className="text-xs" onClick={() => { setSearchQuery(''); setStatusFilter('all'); setTypeFilter('all'); setCurrentPage(1); }}>
                            {t('owner.myProperties.clearFilters')}
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
                                <TableHead className="px-6 py-4">{t('owner.myProperties.table.property')}</TableHead>
                                <TableHead className="px-6 py-4">{t('owner.myProperties.table.type')}</TableHead>
                                <TableHead className="px-6 py-4">{t('owner.myProperties.table.rent')}</TableHead>
                                <TableHead className="px-6 py-4">{t('owner.myProperties.table.status')}</TableHead>
                                <TableHead className="px-6 py-4">{t('owner.myProperties.table.views')}</TableHead>
                                <TableHead className="px-6 py-4">{t('owner.myProperties.table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                        {t('owner.myProperties.noProperties')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginated.map((p) => (
                                    <TableRow key={p.id} className="hover:bg-muted/10 transition-colors">
                                        <TableCell className="px-6 py-4">
                                            <Link to={`/owner/properties/${p.id}`} className="flex items-center gap-3">
                                                <img src={p.images?.[0]?.url || p.images?.[0]} alt={getLocalizedText(p.title, preferredLanguage)} className="size-12 rounded-lg object-cover" />
                                                <div>
                                                    <p className="text-sm font-bold text-foreground hover:text-primary transition-colors">{getLocalizedText(p.title, preferredLanguage)}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={10} /> {getLocalizedText(p.address, preferredLanguage)}</p>
                                                    <p className="text-[10px] text-muted-foreground">{p.bedrooms} {t('owner.myProperties.beds')} • {p.bathrooms} {t('owner.myProperties.baths')} • {p.area?.value} {p.area?.unit || 'm²'}</p>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm font-medium">{getLocalizedText(p.category, preferredLanguage)}</TableCell>
                                        <TableCell className="px-6 py-4 text-sm font-bold text-primary">{p.price?.value} {p.price?.currency || 'ETB'}</TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusColors[p.status]}`}>{p.status}</span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className="text-sm font-medium flex items-center gap-1"><Eye size={14} className="text-muted-foreground" /> {(p.viewCount || 0).toLocaleString()}</span>
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
                                                        <Link to={`/owner/properties/${p.id}`} className="flex items-center gap-2 cursor-pointer">
                                                            <Eye size={14} /> {t('owner.myProperties.menu.viewDetails')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link to={`/owner/properties/edit/${p.id}`} className="flex items-center gap-2 cursor-pointer">
                                                            <Edit size={14} /> {t('owner.myProperties.menu.editProperty')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                                                        onClick={() => setDeleteConfirm(p.id)}
                                                    >
                                                        <Trash2 size={14} /> {t('owner.myProperties.menu.delete')}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            {deleteConfirm === p.id && (
                                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
                                                    <Card className="w-80 shadow-xl border-destructive/20">
                                                        <CardHeader className="pb-2">
                                                            <h4 className="text-sm font-bold text-foreground">{t('owner.myProperties.confirmDelete.title')}</h4>
                                                            <p className="text-xs text-muted-foreground mt-1">{t('owner.myProperties.confirmDelete.desc', { title: getLocalizedText(p.title, preferredLanguage) })}</p>
                                                        </CardHeader>
                                                        <CardContent className="flex justify-end gap-2 pt-2">
                                                            <Button variant="ghost" size="sm" className="h-8 text-xs font-bold" onClick={() => setDeleteConfirm(null)}>{t('owner.myProperties.confirmDelete.cancel')}</Button>
                                                            <Button variant="destructive" size="sm" className="h-8 text-xs font-bold" onClick={() => handleDelete(p.id)}>{t('owner.myProperties.confirmDelete.confirm')}</Button>
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
                                {t('owner.myProperties.showing', {
                                    start: (currentPage - 1) * itemsPerPage + 1,
                                    end: Math.min(currentPage * itemsPerPage, filtered.length),
                                    total: filtered.length
                                })}
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
                            <p className="text-muted-foreground">{t('owner.myProperties.noProperties')}</p>
                        </div>
                    ) : (
                        paginated.map((p) => (
                            <Card key={p.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 p-0">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={p.images?.[0]?.url || p.images?.[0]} alt={getLocalizedText(p.title, preferredLanguage)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase shadow-sm ${statusColors[p.status]}`}>{p.status}</span>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <p className="text-white font-bold text-sm">{getLocalizedText(p.title, preferredLanguage)}</p>
                                        <p className="text-white/70 text-xs flex items-center gap-1"><MapPin size={10} /> {getLocalizedText(p.address, preferredLanguage)}</p>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-lg font-extrabold text-primary">{p.price?.value} {p.price?.currency || 'ETB'}</p>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye size={12} /> {(p.viewCount || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                                        <span>{p.bedrooms} {t('owner.myProperties.beds')}</span>
                                        <span className="text-border">•</span>
                                        <span>{p.bathrooms} {t('owner.myProperties.baths')}</span>
                                        <span className="text-border">•</span>
                                        <span>{p.area?.value} {p.area?.unit || 'm²'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link to={`/owner/properties/${p.id}`} className="flex-1">
                                            <Button variant="outline" className="w-full gap-1 text-xs h-8"><Eye size={12} /> {t('owner.myProperties.view')}</Button>
                                        </Link>
                                        <Link to={`/owner/properties/edit/${p.id}`}>
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

            {/* Verification Required Modal */}
            {showVerificationModal && !isVerified && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md shadow-2xl">
                        <CardContent className="space-y-6 pt-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 mx-auto">
                                <ShieldAlert size={32} className="text-amber-500" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-foreground text-xl font-extrabold">{t('owner.addProperty.verificationRequired')}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {hasDocuments ? (
                                        <>
                                            {docStatus === 'under_review' ? t('owner.addProperty.docStatusUnderReview') : docStatus === 'rejected' ? t('owner.addProperty.docStatusRejected') : t('owner.addProperty.docStatusProcessed')}
                                        </>
                                    ) : (
                                        <>
                                            {t('owner.addProperty.needUpload')}
                                        </>
                                    )}
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={() => {
                                        setShowVerificationModal(false);
                                        navigate('/owner/profile?tab=verification');
                                    }}
                                    className="w-full"
                                >
                                    {hasDocuments ? t('owner.addProperty.viewVerificationStatus') : t('owner.addProperty.uploadDocuments')} <ArrowRight size={16} className="ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowVerificationModal(false)}
                                    className="w-full"
                                >
                                    {t('owner.myProperties.cancel')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default MyPropertiesPage;
