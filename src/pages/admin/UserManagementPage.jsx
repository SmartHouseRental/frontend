import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-gray-600">Manage platform users, roles, and account status</p>
        </div>
        <Button >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card className="flex h-20 shrink-0 flex-row items-center justify-between p-8 shadow-none">
        <div className="relative max-w-xl flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <Search />
          </span>
          <Input
            placeholder="Search users by name, email, or ID..."
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
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="renter">Renter</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
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
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
      <div className="flex-1 overflow-auto pb-8">
        {isLoading ? (
          <TableSkeleton rows={6} columns={8} />
        ) : isError ? (
          <ErrorState title="Failed to load users" onRetry={refetch} />
        ) : users.length === 0 ? (
          <EmptyState title="No users found" description="Try adjusting filters or search." />
        ) : (
          <Card className="gap-0 overflow-hidden p-0">
            <Table className="w-full min-w-full border-collapse text-left">
              <TableHeader className="bg-muted/30 w-full">
                <TableRow>
                  <TableHead className="px-6 py-4">Avatar</TableHead>
                  <TableHead className="px-6 py-4">Name/Email</TableHead>
                  <TableHead className="px-6 py-4">Role</TableHead>
                  <TableHead className="px-6 py-4">Verification</TableHead>
                  <TableHead className="px-6 py-4">Status</TableHead>
                  <TableHead className="px-6 py-4">Joined Date</TableHead>
                  <TableHead className="px-4 py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const vState = getVerificationStateMeta(user.verificationState);
                  const sState = getUserStatusMeta(user.status);
                  const fullName =
                    `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email;
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
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <StatusBadge
                          status={vState.label}
                          statusMap={{ [vState.label]: vState.style }}
                        />
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${sState.style}`}
                        >
                          {sState.label}
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
                              <span>View Profile</span>
                            </DropdownMenuItem>
                            {user.role === 'owner' && user.verificationState === 'pending' && (
                              <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                <span>Verify Documents</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem
                                className="cursor-pointer text-amber-600 focus:text-amber-600"
                                onClick={() => handleStatusChange(user.id, 'suspended')}
                              >
                                <ShieldBan className="mr-2 h-4 w-4" />
                                <span>Suspend User</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                                onClick={() => handleStatusChange(user.id, 'active')}
                              >
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                <span>Reactivate User</span>
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
              itemLabel="users"
              onPageChange={setPage}
            />
          </Card>
        )}
      </div>
    </motion.div>
  );
}

export default UserManagementPage;
