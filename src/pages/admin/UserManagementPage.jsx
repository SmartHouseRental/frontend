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

const users = [
  {
    id: 'USR-1001',
    name: 'Abebe Kebede',
    email: 'abebe.k@email.com',
    role: 'owner',
    roleStyle: 'bg-primary/10 text-primary',
    verificationState: 'verified',
    status: 'active',
    joinedDate: 'Jan 15, 2025',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR',
  },
  {
    id: 'USR-1042',
    name: 'Tigist Hailu',
    email: 'tigist.h@email.com',
    role: 'owner',
    roleStyle: 'bg-primary/10 text-primary',
    verificationState: 'pending_documents',
    status: 'active',
    joinedDate: 'Mar 16, 2026',
    avatar: null,
    avatarFallback: 'TH',
    avatarColor: 'bg-rose-100 text-rose-600',
  },
  {
    id: 'USR-1105',
    name: 'Mulugeta K.',
    email: 'mulugeta.k@email.com',
    role: 'renter',
    roleStyle: 'bg-slate-100 text-slate-600',
    verificationState: 'verified',
    status: 'active',
    joinedDate: 'Feb 08, 2025',
    avatar: null,
    avatarFallback: 'MK',
    avatarColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'USR-1203',
    name: 'David Vance',
    email: 'david.v@email.com',
    role: 'owner',
    roleStyle: 'bg-primary/10 text-primary',
    verificationState: 'rejected',
    status: 'suspended',
    joinedDate: 'Sep 22, 2024',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo23h_KguS-ROG8AAz4Hh75lsMt85_WPOlhWMXv4mmd98oGP2I8YcvMb-7qOmvd-l3Sj0e5TAPVHbKHXYo_95miDYERderalz4iloWyTeabX2SeiZ_v385qRFwyqBILvrx7hUGH8X1nQghHaNHJxAMusaCksdS0iE04z5DTpU2ak0lQirtw7DejH3uw5d_F6RloSIaUrptfzZljWB2XaokQQfEMnA2KF9JLcota_3YHMZAxRCsaQqb7lKjqYt26yLqgJcBcaZUWFW',
  },
  {
    id: 'USR-1312',
    name: 'Sara Kebede',
    email: 'sara.k@email.com',
    role: 'renter',
    roleStyle: 'bg-slate-100 text-slate-600',
    verificationState: 'pending_otp',
    status: 'active',
    joinedDate: 'Mar 22, 2026',
    avatar: null,
    avatarFallback: 'SK',
    avatarColor: 'bg-violet-100 text-violet-600',
  },
  {
    id: 'USR-0042',
    name: 'Alex Rivera',
    email: 'alex.r@admin.shr.et',
    role: 'admin',
    roleStyle: 'bg-amber-100 text-amber-700',
    verificationState: 'verified',
    status: 'active',
    joinedDate: 'Jun 01, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVENWs75X_DdjbXiQpbaXSUWlyKxPmt8aDZKyCIuwovO2HjYFN-y6uCBE3cH4ZMk5tI7eW-w7uohc-60we5mERDXP_iCeczYrWGoX53cLINdIMHe266Ay2cQI4ILueKSWooXkPTeJ350CkotirysPiF4RTufPQGsCI-2COXQRXM4hGBd6RGivTJPOn7YknQLATu5o3z6BUT2CZ-ZGOmUGf5KqPSfPDXNsSK4aXmBt9BV18DMxDDfMyv9QmZqvb-aXXLUVAXYzoT1EB',
  },
];

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
              {users.map((user) => {
                const vState = verificationStateStyles[user.verificationState];
                const sState = statusStyles[user.status];
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
                          className={`flex size-10 items-center justify-center rounded-lg text-xs font-bold ${user.avatarColor}`}
                        >
                          {user.avatarFallback}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <p className="text-sm font-bold">{user.name}</p>
                      <p className="text-muted-foreground text-xs">{user.email}</p>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className={`rounded-md px-2 py-1 text-xs font-semibold capitalize ${user.roleStyle}`}>
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
                      {user.joinedDate}
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
                          {user.role === 'owner' && user.verificationState === 'pending_documents' && (
                            <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              <span>Verify Documents</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem className="cursor-pointer text-amber-600 focus:text-amber-600">
                              <ShieldBan className="mr-2 h-4 w-4" />
                              <span>Suspend User</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              <span>Reactivate User</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Ban User</span>
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
            currentPage={1}
            totalPages={125}
            totalItems={12450}
            itemsPerPage={users.length}
            itemLabel="users"
          />
        </Card>
      </div>
    </div>
  );
}

export default UserManagementPage;
