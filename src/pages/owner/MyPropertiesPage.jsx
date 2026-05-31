import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router';
import {
    Plus, Eye, Edit, Trash2, Building2, MapPin,
    ChevronLeft, ChevronRight,
    TrendingUp, BedDouble, Home, DollarSign,
    MoreVertical, Loader2, ShieldAlert, ArrowRight,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    PageContainer,
    PageHeader,
    KpiCard,
    DataTableToolbar,
    PropertyCard,
    PropertyStatusBadge,
} from '@/components/design-system';
import { useMyProperties } from '@/features/properties/hooks/useMyProperties';
import { useDeleteProperty } from '@/features/properties/hooks/useDeleteProperty';
import VerificationBanner from '@/components/VerificationBanner';
import { useOwnerVerificationState } from '@/features/owner/hooks/useOwnerVerificationState';
import { useNavigate } from 'react-router';
import { getLocalizedText } from '@/lib/utils/i18n';
import { useTranslation } from 'react-i18next';

const statusColors = {
    AVAILABLE: 'bg-[#22C55E]/10 text-[#15803d] dark:text-[#22C55E]',
    RENTED: 'bg-[#262626]/10 text-[#171717] dark:text-[#a3a3a3]',
    MAINTENANCE: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    UNAVAILABLE: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
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
        <PageContainer>
            <VerificationBanner verificationState={verificationState} />

            <PageHeader
                title={t('owner.myProperties.title')}
                description={t('owner.myProperties.subtitle')}
            >
                <Button onClick={handleAddProperty} className="gap-2 shadow-sm">
                    <Plus size={16} /> {t('owner.myProperties.addProperty')}
                </Button>
            </PageHeader>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: t('owner.myProperties.stats.totalProperties'), value: stats.total, icon: Building2, accent: 'primary', subtitle: t('owner.myProperties.stats.thisMonth') },
                    { label: t('owner.myProperties.stats.available'), value: stats.available, icon: Home, accent: 'success' },
                    { label: t('owner.myProperties.stats.rented'), value: stats.rented, icon: BedDouble, accent: 'indigo' },
                    { label: t('owner.myProperties.stats.totalViews'), value: stats.totalViews.toLocaleString(), icon: TrendingUp, accent: 'warning', change: t('owner.myProperties.stats.vsLastMonth'), trend: 'up' },
                ].map((s, i) => (
                    <KpiCard
                        key={s.label}
                        title={s.label}
                        value={s.value}
                        subtitle={s.subtitle}
                        icon={s.icon}
                        accent={s.accent}
                        change={s.change}
                        trend={s.trend}
                        index={i}
                    />
                ))}
            </div>

            <DataTableToolbar
                searchValue={searchQuery}
                onSearchChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                searchPlaceholder={t('owner.myProperties.filters.searchPlaceholder')}
                onClearSearch={() => { setSearchQuery(''); setCurrentPage(1); }}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                filters={
                    <>
                        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                            <SelectTrigger className="h-9 w-32"><SelectValue placeholder={t('owner.myProperties.filters.status')} /></SelectTrigger>
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
                            <SelectTrigger className="h-9 w-32"><SelectValue placeholder={t('owner.myProperties.filters.type')} /></SelectTrigger>
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
                    </>
                }
            />

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
                                            <PropertyStatusBadge status={p.status} />
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
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {paginated.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-muted-foreground">{t('owner.myProperties.noProperties')}</p>
                        </div>
                    ) : (
                        paginated.map((p, i) => (
                            <PropertyCard
                                key={p.id}
                                id={p.id}
                                title={getLocalizedText(p.title, preferredLanguage)}
                                address={getLocalizedText(p.address, preferredLanguage)}
                                image={p.images?.[0]?.url || p.images?.[0]}
                                price={p.price?.value}
                                currency={p.price?.currency || 'ETB'}
                                status={p.status}
                                bedrooms={p.bedrooms}
                                bathrooms={p.bathrooms}
                                area={p.area?.value}
                                areaUnit={p.area?.unit || 'm²'}
                                views={p.viewCount || 0}
                                detailPath={`/owner/properties/${p.id}`}
                                editPath={`/owner/properties/edit/${p.id}`}
                                onDelete={() => setDeleteConfirm(p.id)}
                                index={i}
                            />
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
        </PageContainer>
    );
}

export default MyPropertiesPage;
