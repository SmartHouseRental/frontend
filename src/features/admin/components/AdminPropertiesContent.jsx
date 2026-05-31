import { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
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
import { useAdminProperties } from '../hooks/useAdminProperties';
import { useAdminUpdatePropertyStatus } from '../hooks/useAdminUpdatePropertyStatus';

const statusStyles = {
  AVAILABLE: { label: 'Available', style: 'bg-emerald-100 text-emerald-700' },
  PENDING: { label: 'Pending', style: 'bg-amber-100 text-amber-700' },
  RENTED: { label: 'Rented', style: 'bg-blue-100 text-blue-700' },
  UNAVAILABLE: { label: 'Unavailable', style: 'bg-rose-100 text-rose-700' },
  MAINTENANCE: { label: 'Maintenance', style: 'bg-slate-100 text-slate-700' },
  RESTRICTED: { label: 'Restricted', style: 'bg-red-100 text-red-700 font-bold' },
};

export function AdminPropertiesContent() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');

  const queryParams = {
    page,
    limit: 20,
    ...(statusFilter !== 'all' ? { status: statusFilter } : {}),
  };

  const { data: propertiesData, isLoading, isError } = useAdminProperties(queryParams);
  const { mutate: updateStatus } = useAdminUpdatePropertyStatus();

  const handleStatusChange = (propertyId, newStatus) => {
    updateStatus({ propertyId, status: newStatus });
  };

  const properties = propertiesData?.data?.items || [];
  const meta = propertiesData?.data?.meta || { total: 0, page: 1, limit: 20, totalPages: 1 };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Properties</h2>
          <p className="text-muted-foreground text-sm">
            Manage property listings across the platform
          </p>
        </div>
      </div>

      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="relative max-w-xl flex-1">
          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
            <Search size={18} />
          </span>
          <Input
            placeholder="Search properties (Not implemented yet)..."
            type="text"
            className="pl-10"
            disabled
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setPage(1); }}>
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
          <Button variant="outline" size="icon" disabled>
            <Filter size={16} />
          </Button>
        </div>
      </Card>

      <Card className="gap-0 overflow-hidden p-0">
        <Table className="w-full min-w-full border-collapse text-left">
          <TableHeader className="bg-muted/30 w-full">
            <TableRow>
              <TableHead className="px-6 py-4">Property</TableHead>
              <TableHead className="px-6 py-4">Owner</TableHead>
              <TableHead className="px-6 py-4">Type</TableHead>
              <TableHead className="px-6 py-4">Price</TableHead>
              <TableHead className="px-6 py-4">Status</TableHead>
              <TableHead className="px-6 py-4">Location</TableHead>
              <TableHead className="px-4 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading properties...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-rose-500">
                  Failed to load properties.
                </TableCell>
              </TableRow>
            ) : properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => {
                const sState = statusStyles[property.status] || { label: property.status, style: 'bg-slate-100 text-slate-700' };
                const title = property.title?.en || property.title?.am || 'No title';
                const image = property.images?.[0];
                const location = property.address?.en || property.address?.am || 'Unknown location';
                const ownerName = property.owner ? `${property.owner.first_name} ${property.owner.last_name}` : 'Unknown';
                const price = property.price ? `${property.price.value} ${property.price.currency}` : 'N/A';

                return (
                  <TableRow
                    key={property.id}
                    className="cursor-pointer transition-colors hover:bg-muted/20"
                    onClick={() => navigate(`/admin/properties/${property.id}`)}
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {image ? (
                          <div
                            className="h-10 w-14 rounded-lg bg-slate-100 bg-cover bg-center"
                            style={{ backgroundImage: `url('${image}')` }}
                          />
                        ) : (
                          <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-400">
                            No img
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold line-clamp-1 max-w-[200px]" title={title}>{title}</p>
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
                      {property.type}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm font-bold">{price}</TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${sState.style}`}
                      >
                        {sState.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground px-6 py-4 text-xs">
                      <p className="line-clamp-1 max-w-[150px]" title={location}>{location}</p>
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
                                onClick={() => handleStatusChange(property.id, 'AVAILABLE')}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                <span>Approve (Available)</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-rose-600 focus:text-rose-600"
                                onClick={() => handleStatusChange(property.id, 'UNAVAILABLE')}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>Reject (Unavailable)</span>
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          {property.status !== 'RESTRICTED' && (
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600 focus:text-red-600"
                              onClick={() => handleStatusChange(property.id, 'RESTRICTED')}
                            >
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              <span>Restrict Property</span>
                            </DropdownMenuItem>
                          )}
                          {property.status === 'RESTRICTED' && (
                            <DropdownMenuItem
                              className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                              onClick={() => handleStatusChange(property.id, 'AVAILABLE')}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              <span>Lift Restriction</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleStatusChange(property.id, 'RENTED')}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Mark as Rented</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
          <span className="text-muted-foreground text-xs font-medium">
            Showing properties for page {meta.page} of {meta.totalPages} (Total: {meta.total})
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={meta.page <= 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm font-medium px-2">{meta.page}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={meta.page >= meta.totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
