import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, MoreVertical, Eye, ShieldCheck, ShieldBan } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';
import { useAdminUpdateUserStatus, useAdminUsers } from '@/features/admin/hooks/useAdmin';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import { getUserStatusMeta, getVerificationStateMeta } from '@/features/admin/mappers';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import TableSkeleton from '@/components/TableSkeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DataTablePagination from '@/components/DataTablePagination';

function UserManagementPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');

  const query = {
    page,
    limit: 20,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(role !== 'all' ? { role } : {}),
    ...(status !== 'all' ? { status } : {}),
  };

  const { data, isLoading, isError, refetch } = useAdminUsers(query);
  const updateUserStatus = useAdminUpdateUserStatus();

  const users = getAdminListItems(data);
  const meta = data?.meta || { page: 1, total: 0, limit: 20, totalPages: 1 };

  const handleStatusChange = (id, nextStatus) => {
    updateUserStatus.mutate({ id, status: nextStatus });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('adminUsers.title')}</h1>
          <p className="mt-1 text-gray-600">{t('adminUsers.subtitle')}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('adminUsers.addUser')}
        </Button>
      </div>

      <Card className="flex h-20 shrink-0 flex-row items-center justify-between p-8 shadow-none">
        <div className="relative max-w-xl flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <Search />
          </span>
          <Input
            placeholder={t('adminUsers.searchPlaceholder')}
            type="text"
            className="relative pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={role}
            onValueChange={(value) => {
              setRole(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t('adminUsers.filters.role')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('adminUsers.filters.allRoles')}</SelectItem>
              <SelectItem value="renter">{t('adminUsers.filters.renter')}</SelectItem>
              <SelectItem value="owner">{t('adminUsers.filters.owner')}</SelectItem>
              <SelectItem value="admin">{t('adminUsers.filters.admin')}</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t('adminUsers.filters.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('adminUsers.filters.allStatuses')}</SelectItem>
              <SelectItem value="active">{t('adminUsers.filters.active')}</SelectItem>
              <SelectItem value="suspended">{t('adminUsers.filters.suspended')}</SelectItem>
              <SelectItem value="pending">{t('adminUsers.filters.pending')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
      <div className="flex-1 overflow-auto pb-8">
        {isLoading ? (
          <TableSkeleton rows={6} columns={8} />
        ) : isError ? (
          <ErrorState title={t('adminUsers.errors.failedToLoadUsers')} onRetry={refetch} />
        ) : users.length === 0 ? (
          <EmptyState title={t('adminUsers.empty.title')} description={t('adminUsers.empty.description')} />
        ) : (
          <Card className="gap-0 overflow-hidden p-0">
            <Table className="w-full min-w-full border-collapse text-left">
              <TableHeader className="bg-muted/30 w-full">
                <TableRow>
                  <TableHead className="px-6 py-4">{t('adminUsers.table.avatar')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminUsers.table.nameEmail')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminUsers.table.role')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminUsers.table.verification')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminUsers.table.status')}</TableHead>
                  <TableHead className="px-6 py-4">{t('adminUsers.table.joinedDate')}</TableHead>
                  <TableHead className="px-4 py-4">{t('adminUsers.table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const vState = getVerificationStateMeta(user.verificationState);
                  const sState = getUserStatusMeta(user.status);
                  const fullName =
                    `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email;
                  const roleLabel = t(`adminUsers.roles.${user.role}`, { defaultValue: user.role });
                  const verificationLabel = t(`adminUsers.verificationStates.${user.verificationState}`, {
                    defaultValue: vState.label,
                  });
                  const statusLabel = t(`adminUsers.statuses.${user.status}`, {
                    defaultValue: sState.label,
                  });

                  return (
                    <TableRow
                      key={user.id}
                      className="hover:bg-muted/20 cursor-pointer transition-colors"
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                      <TableCell className="px-6 py-4">
                        {user.image ? (
                          <div
                            className="size-10 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url('${user.image}')` }}
                          />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                            {(fullName || 'U')
                              .split(' ')
                              .filter(Boolean)
                              .slice(0, 2)
                              .map((part) => part[0]?.toUpperCase())
                              .join('')}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <p className="text-sm font-bold">{fullName}</p>
                        <p className="text-muted-foreground text-xs">{user.email}</p>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="bg-primary/10 text-primary rounded-md px-2 py-1 text-xs font-semibold capitalize">
                          {roleLabel}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <StatusBadge
                          status={verificationLabel}
                          statusMap={{ [verificationLabel]: vState.style }}
                        />
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${sState.style}`}
                        >
                          {statusLabel}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
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
                              onClick={() => navigate(`/admin/users/${user.id}`)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>{t('adminUsers.actions.viewProfile')}</span>
                            </DropdownMenuItem>
                            {user.role === 'owner' && user.verificationState === 'pending' && (
                              <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                <span>{t('adminUsers.actions.verifyDocuments')}</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem
                                className="cursor-pointer text-amber-600 focus:text-amber-600"
                                onClick={() => handleStatusChange(user.id, 'suspended')}
                              >
                                <ShieldBan className="mr-2 h-4 w-4" />
                                <span>{t('adminUsers.actions.suspendUser')}</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                                onClick={() => handleStatusChange(user.id, 'active')}
                              >
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                <span>{t('adminUsers.actions.reactivateUser')}</span>
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

            <DataTablePagination
              currentPage={meta.page || 1}
              totalPages={meta.totalPages || 1}
              totalItems={meta.total || 0}
              itemsPerPage={meta.limit || 20}
              itemLabel={t('adminUsers.pagination.itemLabel')}
              showingLabel={t('adminUsers.pagination.showing')}
              ofLabel={t('adminUsers.pagination.of')}
              onPageChange={setPage}
            />
          </Card>
        )}
      </div>
    </motion.div>
  );
}

export default UserManagementPage;
