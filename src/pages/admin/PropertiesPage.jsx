import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Filter,
  MoreVertical,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import {
  useAdminApproveProperty,
  useAdminProperties,
  useAdminRejectProperty,
} from '@/features/admin/hooks/useAdmin';
import { useAdminPropertyStats } from '@/features/admin/hooks/useAdminPageStats';
import CardSkeleton from '@/components/CardSkeleton';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import { formatLocalizedText, formatPersonName, getPropertyStatusMeta } from '@/features/admin/mappers';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import DataTablePagination from '@/components/DataTablePagination';

function PropertiesPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const params = {
    page,
    limit: 20,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(status !== 'all' ? { status } : {}),
  };

  const { data, isLoading, isError, refetch } = useAdminProperties(params);
  const {
    data: propertyStats,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useAdminPropertyStats();
  const approveProperty = useAdminApproveProperty();
  const rejectProperty = useAdminRejectProperty();

  const properties = getAdminListItems(data);
  const meta = data?.meta || { page: 1, limit: 20, total: 0, totalPages: 1 };

  const handleApprove = (id) => approveProperty.mutate({ id });
  const handleReject = (id) =>
    rejectProperty.mutate({ id, reason: 'REJECTED_BY_ADMIN', note: 'Rejected by admin review' });

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Properties</h2>
          <p className="text-muted-foreground text-sm">
            Manage property listings across the platform
          </p>
        </div>
      </div>

      {statsLoading ? (
        <CardSkeleton count={4} />
      ) : statsError ? (
        <Card className="border-dashed p-4">
          <p className="text-muted-foreground text-sm">Could not load property summary.</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => refetchStats()}>
            Retry
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-0 border-l-4 border-emerald-400 p-5">
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Available
            </p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-600">
              {propertyStats?.available?.toLocaleString() ?? 0}
            </p>
          </Card>
          <Card className="border-0 border-l-4 border-amber-400 p-5">
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Pending Review
            </p>
            <p className="mt-1 text-2xl font-extrabold text-amber-600">
              {propertyStats?.pending?.toLocaleString() ?? 0}
            </p>
          </Card>
          <Card className="border-0 border-l-4 border-blue-400 p-5">
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Rented
            </p>
            <p className="mt-1 text-2xl font-extrabold text-blue-600">
              {propertyStats?.rented?.toLocaleString() ?? 0}
            </p>
          </Card>
          <Card className="border-0 border-l-4 border-slate-400 p-5">
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Total Listings
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-700">
              {propertyStats?.total?.toLocaleString() ?? 0}
            </p>
          </Card>
        </div>
      )}

      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="relative max-w-xl flex-1">
          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
            <Search size={18} />
          </span>
          <Input
            placeholder="Search by ID, title, owner, or location..."
            type="text"
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="condominium">Condominium</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="compound">Compound</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="RENTED">Rented</SelectItem>
                <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                <SelectItem value="RESTRICTED">Restricted</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
      </Card>

      {isLoading ? (
        <TableSkeleton rows={6} columns={8} />
      ) : isError ? (
        <ErrorState title="Failed to load properties" onRetry={refetch} />
      ) : properties.length === 0 ? (
        <EmptyState title="No properties found" description="Try changing search or status filters." />
      ) : (
      <Card className="gap-0 overflow-hidden p-0">
        <Table className="w-full min-w-full border-collapse text-left">
          <TableHeader className="bg-muted/30 w-full">
            <TableRow>
              <TableHead className="px-6 py-4">Property</TableHead>
              <TableHead className="px-6 py-4">Owner</TableHead>
              <TableHead className="px-6 py-4">Type</TableHead>
              <TableHead className="px-6 py-4">Price</TableHead>
              <TableHead className="px-6 py-4">Status</TableHead>
              <TableHead className="px-6 py-4">Edits</TableHead>
              <TableHead className="px-4 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {properties.map((property) => {
                const statusMeta = getPropertyStatusMeta(property.status);
                const title = formatLocalizedText(property.title, 'Untitled Property');
                const ownerName = formatPersonName(property.owner);
                const firstImage = property.images?.[0] || null;
              return (
                <TableRow
                  key={property.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/20 ${property.isDeleted ? 'opacity-60' : ''}`}
                  onClick={() => navigate(`/admin/properties/${property.id}`)}
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {firstImage ? (
                        <div
                          className="h-10 w-14 rounded-lg bg-slate-100 bg-cover bg-center"
                          style={{ backgroundImage: `url('${firstImage}')` }}
                        />
                      ) : (
                        <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-400">
                          No img
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold">{title}</p>
                        <p className="text-muted-foreground text-[10px]">{property.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">{ownerName}</span>
                      {property.owner?.isVerified && (
                        <ShieldCheck size={14} className="text-emerald-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                    {property.categoryType || '-'}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm font-bold">
                    {formatLocalizedText(property.price, '-')}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusMeta.style}`}
                    >
                      {statusMeta.label}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-bold ${(property.editCount || 0) >= 1
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-muted-foreground'
                        }`}
                    >
                      {property.editCount || 0}/1
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => navigate(`/admin/properties/${property.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {property.status === 'PENDING' && (
                          <>
                            <DropdownMenuItem
                              className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                              onClick={() => handleApprove(property.id)}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-rose-600 focus:text-rose-600"
                              onClick={() => handleReject(property.id)}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Reject</span>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Soft Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <DataTablePagination
          currentPage={meta.page || 1}
          totalPages={meta.totalPages || 1}
          totalItems={meta.total || 0}
          itemsPerPage={meta.limit || 20}
          itemLabel="properties"
          onPageChange={setPage}
        />
      </Card>
      )}
    </div>
  );
}

export default PropertiesPage;
