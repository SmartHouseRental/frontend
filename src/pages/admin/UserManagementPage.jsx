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
import {
  ChevronLeft,
  Plus,
  ChevronDown,
  Search,
  ChevronRight,
  MoreVertical,
  Eye,
  ShieldCheck,
  ShieldBan,
  UserX,
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import DataTablePagination from '@/components/DataTablePagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';
import { useUsers } from '@/features/user-managment/hooks/useUsers';
import { useUpdateUserStatus } from '@/features/user-managment/hooks/useUpdateUserStatus';

// Deleted static users mock

const verificationStateStyles = {
  verified: { label: 'Verified', style: 'bg-green-100 text-green-700' },
  pending_otp: { label: 'Pending OTP', style: 'bg-blue-100 text-blue-700' },
  pending_documents: { label: 'Pending Docs', style: 'bg-amber-100 text-amber-700' },
  rejected: { label: 'Rejected', style: 'bg-rose-100 text-rose-700' },
};

const statusStyles = {
  active: { label: 'Active', dotColor: 'bg-green-500', style: 'bg-green-100 text-green-700' },
  suspended: { label: 'Suspended', dotColor: 'bg-rose-500', style: 'bg-rose-100 text-rose-700' },
  banned: { label: 'Banned', dotColor: 'bg-red-600', style: 'bg-red-100 text-red-700' },
};

function UserManagementPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useUsers();
  const { mutate: updateStatus } = useUpdateUserStatus();

  const users = data?.items || [];
  const meta = data?.meta;

  const handleStatusChange = (id, newStatus) => {
    updateStatus({ id, status: newStatus });
  };

  return (
    <div className="relative flex min-w-0 flex-1 flex-col gap-6 overflow-hidden p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <div>
          <h2 className="text-2xl font-bold">User List Management</h2>
          <p className="text-muted-foreground text-sm">Monitor and manage platform participants</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-800">
            <Plus size={16} />
            Add New User
          </button>
        </div>
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
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex cursor-pointer items-center rounded-lg border px-3 py-1.5 transition-all"
          >
            <span className="text-muted-foreground mr-2 text-xs font-medium tracking-wider uppercase">
              Role:
            </span>
            <span className="text-sm font-semibold">All Roles</span>
            <ChevronDown className="ml-2 text-slate-400" size={16} />
          </Button>
          <Button
            variant="outline"
            className="flex cursor-pointer items-center rounded-lg border px-3 py-1.5 transition-all"
          >
            <span className="text-muted-foreground mr-2 text-xs font-medium tracking-wider uppercase">
              Status:
            </span>
            <span className="text-sm font-semibold">All Statuses</span>
            <ChevronDown className="ml-2 text-slate-400" size={16} />
          </Button>
        </div>
      </Card>

      <div className="flex-1 overflow-auto pb-8">
        <Card className="gap-0 overflow-hidden p-0">
          <Table className="w-full min-w-full border-collapse text-left">
            <TableHeader className="bg-muted/30 w-full">
              <TableRow>
                <TableHead className="px-6 py-4">
                  <input className="text-primary focus:ring-primary rounded border-slate-300" type="checkbox" />
                </TableHead>
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const vState = verificationStateStyles[user.verificationState] || { label: user.verificationState || 'Unknown', style: 'bg-slate-100 text-slate-700' };
                  const sState = statusStyles[user.status] || { label: user.status || 'Unknown', dotColor: 'bg-slate-500', style: 'bg-slate-100 text-slate-700' };

                  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
                  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown';
                  const avatarFallback = fullName.substring(0, 2).toUpperCase() || 'U';
                  const avatarColor = 'bg-primary/10 text-primary';
                  const roleStyle = user.role === 'admin' ? 'bg-amber-100 text-amber-700' : user.role === 'owner' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600';

                  return (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer transition-colors hover:bg-muted/20"
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                      <TableCell className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input className="text-primary focus:ring-primary rounded" type="checkbox" />
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {user.avatar ? (
                          <div
                            className="size-10 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url('${user.avatar}')` }}
                          />
                        ) : (
                          <div
                            className={`flex size-10 items-center justify-center rounded-lg text-xs font-bold ${avatarColor}`}
                          >
                            {avatarFallback}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <p className="text-sm font-bold">{fullName}</p>
                        <p className="text-muted-foreground text-xs">{user.email}</p>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className={`rounded-md px-2 py-1 text-xs font-semibold capitalize ${roleStyle}`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <StatusBadge status={user.verificationState} statusMap={verificationStateStyles} />
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${sState.style}`}>
                          <span className={`size-1.5 rounded-full ${sState.dotColor}`} />
                          {sState.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                        {joinedDate}
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
                            {user.role === 'owner' && (
                              <DropdownMenuItem
                                className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                                onClick={() => navigate(`/admin/users/${user.id}`)}
                              >
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
                            {user.status !== 'banned' && (
                              <DropdownMenuItem
                                className="cursor-pointer text-rose-600 focus:text-rose-600"
                                onClick={() => handleStatusChange(user.id, 'banned')}
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                <span>Ban User</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {meta && (
            <DataTablePagination
              currentPage={meta.page}
              totalPages={Math.ceil(meta.total / meta.limit) || 1}
              totalItems={meta.total}
              itemsPerPage={users.length}
              itemLabel="users"
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default UserManagementPage;
