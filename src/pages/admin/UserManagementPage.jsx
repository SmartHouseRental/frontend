import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
    role: 'renter',
    roleStyle: 'bg-blue-100 text-blue-700',
    verificationState: 'verified',
    status: 'active',
    joinedDate: 'Feb 02, 2025',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR',
  },
  {
    id: 'USR-1105',
    name: 'Mulugeta Tesfaye',
    email: 'mulugeta.t@email.com',
    role: 'owner',
    roleStyle: 'bg-primary/10 text-primary',
    verificationState: 'pending_documents',
    status: 'active',
    joinedDate: 'Feb 10, 2025',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR',
  },
  {
    id: 'USR-1156',
    name: 'Helen Girma',
    email: 'helen.g@email.com',
    role: 'renter',
    roleStyle: 'bg-blue-100 text-blue-700',
    verificationState: 'verified',
    status: 'suspended',
    statusStyle: 'bg-amber-100 text-amber-700',
    joinedDate: 'Feb 18, 2025',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR',
  },
  {
    id: 'USR-1200',
    name: 'Yonas Desta',
    email: 'yonas.d@email.com',
    role: 'owner',
    roleStyle: 'bg-primary/10 text-primary',
    verificationState: 'verified',
    status: 'active',
    joinedDate: 'Mar 01, 2025',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR',
  },
  {
    id: 'USR-1255',
    name: 'Sara Tesfaye',
    email: 'sara.t@email.com',
    role: 'renter',
    roleStyle: 'bg-blue-100 text-blue-700',
    verificationState: 'verified',
    status: 'active',
    joinedDate: 'Mar 05, 2025',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR',
  },
  {
    id: 'USR-1301',
    name: 'Daniel Worku',
    email: 'daniel.w@email.com',
    role: 'owner',
    roleStyle: 'bg-primary/10 text-primary',
    verificationState: 'verified',
    status: 'banned',
    statusStyle: 'bg-rose-100 text-rose-700',
    joinedDate: 'Mar 12, 2025',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR',
  },
];

function UserManagementPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const startItem = filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredUsers.length);

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
          <p className="text-gray-600 mt-1">Manage platform users, roles, and account status</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 border-b border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              All Roles
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" size="sm">
              All Status
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>

        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing {startItem} to {endItem} of {filteredUsers.length} users
          </p>
          <AnimatePresence mode="wait">
            {filteredUsers.length > 0 && (
              <motion.div
                key="per-page"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-700">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-700">per page</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence mode="popLayout">
                {paginatedUsers.length === 0 ? (
                  <motion.tr
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No users found matching your search.
                    </td>
                  </motion.tr>
                ) : (
                  paginatedUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center"
                        >
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.avatar}
                              alt={user.name}
                            />
                          </div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="ml-4"
                          >
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="text-sm font-medium text-gray-900"
                            >
                              {user.name}
                            </motion.div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </motion.div>
                        </motion.div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${user.roleStyle}`}
                        >
                          {user.role}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={user.status} customStyle={user.statusStyle} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joinedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>

        {filteredUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-4 border-t border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
              </motion.div>
              <motion.div className="flex items-center gap-1">
                {getPageNumbers().map((page) => (
                  <motion.div key={page} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className={currentPage === page ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    >
                      {page}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

export default UserManagementPage;
