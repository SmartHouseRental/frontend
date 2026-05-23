import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
  Handshake,
  FileText,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import {
  useAdminAgreements,
} from '@/features/admin/hooks/useAdmin';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import { getAgreementStatusMeta } from '@/features/admin/mappers';
import { useAdminLookupMaps } from '@/features/admin/hooks/useAdminLookupMaps';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import DataTablePagination from '@/components/DataTablePagination';

function AgreementsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const params = {
    page,
    limit: 20,
    ...(search.trim() ? { search: search.trim() } : {}),
  };

  const { data, isLoading, isError, refetch } = useAdminAgreements(params);
  const { getUserName, getPropertyTitle } = useAdminLookupMaps();

  const agreements = getAdminListItems(data).filter((item) =>
    status === 'all' ? true : item.status === status
  );
  const meta = data?.meta || { page: 1, limit: 20, total: 0, totalPages: 1 };

  const formatDate = (value) => new Date(value).toLocaleDateString();

  return (
    <div className="space-y-6 px-4 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Agreements</h2>
          <p className="text-muted-foreground text-sm">
            Manage rental agreements between owners and renters
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-0 border-l-4 border-emerald-400 p-5">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Active</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-600">890</p>
        </Card>
        <Card className="border-0 border-l-4 border-amber-400 p-5">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Pending
          </p>
          <p className="mt-1 text-2xl font-extrabold text-amber-600">248</p>
        </Card>
        <Card className="border-0 border-l-4 border-slate-300 p-5">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Draft</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-600">146</p>
        </Card>
        <Card className="border-0 border-l-4 border-rose-400 p-5">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Terminated
          </p>
          <p className="mt-1 text-2xl font-extrabold text-rose-600">38</p>
        </Card>
      </div>

      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="relative max-w-xl flex-1">
          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
            <Search size={18} />
          </span>
          <Input
            placeholder="Search by ID, property, renter, or owner..."
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
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="payment_pending">Payment Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="proof_uploaded">Proof Uploaded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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
        <ErrorState title="Failed to load agreements" onRetry={refetch} />
      ) : agreements.length === 0 ? (
        <EmptyState title="No agreements found" description="Try another filter or search." />
      ) : (
      <Card className="gap-0 overflow-hidden p-0">
        <Table className="w-full min-w-full border-collapse text-left">
          <TableHeader className="bg-muted/30 w-full">
            <TableRow>
              <TableHead className="px-6 py-4">ID</TableHead>
              <TableHead className="px-6 py-4">Property</TableHead>
              <TableHead className="px-6 py-4">Parties</TableHead>
              <TableHead className="px-6 py-4">Rent</TableHead>
              <TableHead className="px-6 py-4">Duration</TableHead>
              <TableHead className="px-6 py-4">Status</TableHead>
              <TableHead className="px-6 py-4">Payment</TableHead>
              <TableHead className="px-4 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agreements.map((agreement) => {
              const sState = getAgreementStatusMeta(agreement.status);
              return (
                <TableRow
                  key={agreement.id}
                  className="cursor-pointer transition-colors hover:bg-muted/20"
                  onClick={() => navigate(`/admin/agreements/${agreement.id}`)}
                >
                  <TableCell className="px-6 py-4 text-sm font-bold">#{agreement.id}</TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-sm font-semibold">
                      {getPropertyTitle(agreement.propertyId)}
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-xs">
                      <span className="font-semibold">{getUserName(agreement.renterId, 'Renter')}</span>
                      <span className="text-muted-foreground"> → </span>
                      <span className="font-semibold">{getUserName(agreement.ownerId, 'Owner')}</span>
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm font-bold">{agreement.monthlyRent} ETB</TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-xs">{formatDate(agreement.startDate)}</p>
                    <p className="text-muted-foreground text-[10px]">to {formatDate(agreement.endDate)}</p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap uppercase ${sState.style}`}
                    >
                      {sState.label}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className="bg-slate-100 text-slate-600 rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap uppercase"
                    >
                      {agreement.status === 'payment_pending' ? 'Pending' : 'Confirmed'}
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
                          onClick={() => navigate(`/admin/agreements/${agreement.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Agreement</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Contract</span>
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
          itemLabel="agreements"
          onPageChange={setPage}
        />
      </Card>
      )}
    </div>
  );
}

export default AgreementsPage;
