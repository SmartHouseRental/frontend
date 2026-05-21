import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Plus,
  Handshake,
  CheckCircle2,
  Clock,
  EllipsisVertical,
  Eye,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Send,
} from 'lucide-react';
import { getLocalizedText } from '@/lib/utils/i18n';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import { getApiErrorMessage, isSchemaSyncError } from '@/lib/apiErrors';
import { useOwnerAgreements } from '../hooks/useAgreements';
import { AgreementStatusBadge } from './AgreementStatusBadge';
import {
  unwrapOwnerAgreementsList,
  getRenterDisplayName,
  getPropertyImage,
  getDepositDisplay,
  formatShortDate,
  formatCurrency,
} from '../utils';
import { AGREEMENT_STATUS_OPTIONS } from '../constants';

export function OwnerAgreementsContent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(statusFilter !== 'all' ? { status: statusFilter } : {}),
      ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
    }),
    [page, limit, statusFilter, searchQuery]
  );

  const { data, isLoading, isError, error, refetch } = useOwnerAgreements(queryParams);
  const { items: agreements, meta } = useMemo(
    () => unwrapOwnerAgreementsList(data),
    [data]
  );

  const stats = useMemo(
    () => ({
      total: meta.total ?? agreements.length,
      completed: agreements.filter((a) => a.status === 'completed').length,
      pending: agreements.filter((a) =>
        ['draft', 'sent', 'payment_pending'].includes(a.status)
      ).length,
    }),
    [agreements, meta.total]
  );

  const totalPages = Math.max(1, Math.ceil((meta.total || 0) / limit));

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    const errMsg = getApiErrorMessage(error, 'Could not load agreements.');
    return (
      <div className="p-8">
        <ErrorState
          title={isSchemaSyncError(error) ? 'Agreements unavailable' : 'Could not load agreements'}
          message={
            isSchemaSyncError(error)
              ? 'The production API is out of sync with the database. Redeploy the latest backend build (with Prisma generate), then refresh.'
              : errMsg
          }
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">My Agreements</h2>
          <p className="mt-1 text-muted-foreground">
            Create lease offers, track renter responses, and security deposits.
          </p>
        </div>
        <Button asChild className="gap-2 shrink-0">
          <Link to="/owner/agreements/create">
            <Plus size={16} />
            New agreement
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Handshake size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <h3 className="mt-1 text-2xl font-extrabold">{stats.total}</h3>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <h3 className="mt-1 text-2xl font-extrabold text-emerald-600">{stats.completed}</h3>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Clock size={20} />
            </div>
            {stats.pending > 0 && (
              <span className="animate-pulse rounded bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-600">
                Action needed
              </span>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-muted-foreground">In progress</p>
            <h3 className="mt-1 text-2xl font-extrabold text-amber-600">{stats.pending}</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 p-4">
        <div className="relative min-w-[200px] max-w-lg flex-1">
          <Search
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="pl-10"
            placeholder="Search property, renter, or ID…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {AGREEMENT_STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Card>

      {agreements.length === 0 ? (
        <EmptyState
          icon={Handshake}
          title="No agreements yet"
          description="Create a lease offer for a renter who has visited one of your properties."
          actionLabel="Create agreement"
          onAction={() => navigate('/owner/agreements/create')}
        />
      ) : (
        <Card className="gap-0 overflow-hidden p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="px-4 py-3">Property</TableHead>
                <TableHead className="px-4 py-3">Renter</TableHead>
                <TableHead className="px-4 py-3">Rent</TableHead>
                <TableHead className="px-4 py-3">Deposit (ETB)</TableHead>
                <TableHead className="px-4 py-3">Status</TableHead>
                <TableHead className="px-4 py-3">Created</TableHead>
                <TableHead className="px-4 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agreements.map((a) => {
                const image = getPropertyImage(a.property);
                const title = getLocalizedText(a.property?.title);
                return (
                  <TableRow key={a.id} className="hover:bg-muted/10">
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                          {image ? (
                            <img src={image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                              —
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground line-clamp-1">
                            {title || 'Property'}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[140px]">
                            {a.id.slice(0, 12)}…
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-medium">
                      {getRenterDisplayName(a.renter)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-bold">
                      {formatCurrency(a.monthlyRent, a.currency)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {getDepositDisplay(a)}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <AgreementStatusBadge agreement={a} />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                      {formatShortDate(a.createdAt)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <EllipsisVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/owner/agreements/${a.id}`}
                              className="flex cursor-pointer items-center gap-2"
                            >
                              <Eye size={14} /> View details
                            </Link>
                          </DropdownMenuItem>
                          {a.status === 'draft' && (
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/owner/agreements/${a.id}`}
                                className="flex cursor-pointer items-center gap-2"
                              >
                                <Send size={14} /> Send offer
                              </Link>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
              <p className="text-xs font-medium text-muted-foreground">
                Page {page} of {totalPages} · {meta.total} total
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
