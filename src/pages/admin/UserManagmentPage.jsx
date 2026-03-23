import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChevronLeft,
  Plus,
  ListFilter,
  ChevronDown,
  Search,
  ChevronRight,
  EllipsisVertical,
  User,
  Edit,
  ShieldBan,

  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';

function UserManagmentPage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-w-0 flex-1 flex-col gap-6 overflow-hidden p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <div>
          <h2 className="text-muted-foreground text-2xl font-bold dark:text-white">
            User List Management
          </h2>
          <p className="text-muted-foreground text-sm">Monitor and manage platform participants</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-800">
            <span className="text-sm font-bold">
              <Plus />
            </span>
            Add New User
          </button>
          <div className="mx-2 h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
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
            <span className="ml-2 text-slate-400">
              <ChevronDown />
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex cursor-pointer items-center rounded-lg border px-3 py-1.5 transition-all"
          >
            <span className="text-muted-foreground mr-2 text-xs font-medium tracking-wider uppercase">
              Status:
            </span>
            <span className="text-sm font-semibold">All Statuses</span>
            <span className="ml-2 text-slate-400">
              <ChevronDown />
            </span>
          </Button>
          <Button variant="outline" className="rounded-lg border p-2 transition-all">
            <span className="text-muted-foreground">
              <ListFilter />
            </span>
          </Button>
        </div>
      </Card>

      <div className="flex-1 overflow-auto pb-8">
        <Card className="gap-0 overflow-hidden p-0">
          <Table className="w-full min-w-full border-collapse text-left">
            <TableHeader className="bg-muted w-full">
              <TableRow>
                <TableHead className="px-6 py-4">
                  <input
                    className="text-primary focus:ring-primary rounded border-slate-300"
                    type="checkbox"
                  />
                </TableHead>
                <TableHead className="px-6 py-4">Avataer</TableHead>
                <TableHead className="px-6 py-4">Name/Email</TableHead>
                <TableHead className="px-6 py-4">Role</TableHead>
                <TableHead className="px-6 py-4">Status</TableHead>
                <TableHead className="px-6 py-4">Joined Date</TableHead>
                <TableHead className="px-4 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="px-6 py-4">
                  <input className="text-primary focus:ring-primary rounded" type="checkbox" />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div
                    className="size-10 rounded-lg bg-cover bg-center"
                    data-alt="Avatar of male renter"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR')",
                    }}
                  ></div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <p className="text-muted-foreground text-sm font-bold dark:text-white">
                    Johnathan Doe
                  </p>
                  <p className="text-muted-foreground text-xs">j.doe@example.com</p>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    Renter
                  </span>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span> Active
                  </span>
                </TableCell>

                <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                  Oct 24, 2023
                </TableCell>

                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600">
                      <EllipsisVertical />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">
                  <input
                    className="text-primary focus:ring-primary rounded border-slate-300"
                    type="checkbox"
                  />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div
                    className="size-10 rounded-lg bg-cover bg-center"
                    data-alt="Avatar of male renter"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR')",
                    }}
                  ></div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <p className="text-muted-foreground text-sm font-bold dark:text-white">
                    Johnathan Doe
                  </p>
                  <p className="text-muted-foreground text-xs">j.doe@example.com</p>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    Renter
                  </span>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span> Active
                  </span>
                </TableCell>

                <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                  Oct 24, 2023
                </TableCell>

                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600">
                      <EllipsisVertical />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">
                  <input
                    className="text-primary focus:ring-primary rounded border-slate-300"
                    type="checkbox"
                  />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div
                    className="size-10 rounded-lg bg-cover bg-center"
                    data-alt="Avatar of male renter"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR')",
                    }}
                  ></div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <p className="text-muted-foreground text-sm font-bold dark:text-white">
                    Johnathan Doe
                  </p>
                  <p className="text-muted-foreground text-xs">j.doe@example.com</p>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    Renter
                  </span>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span> Active
                  </span>
                </TableCell>

                <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                  Oct 24, 2023
                </TableCell>

                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600">
                      <EllipsisVertical />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex items-center justify-between bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-muted-foreground text-sm">
              Showing <span className="text-muted-foreground font-bold dark:text-white">1 - 4</span>{' '}
              of <span className="text-muted-foreground font-bold dark:text-white">1,248</span>{' '}
              users
            </p>
            <div className="flex items-center gap-2">
              <button className="hover:text-muted-foreground rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 dark:border-slate-700 dark:bg-slate-900">
                <span className="material-symbols-outlined">
                  <ChevronLeft />
                </span>
              </button>
              <button className="bg-primary size-8 rounded-lg text-xs font-bold text-white">
                1
              </button>
              <button className="text-muted-foreground size-8 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800">
                2
              </button>
              <button className="text-muted-foreground size-8 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800">
                3
              </button>
              <span className="mx-1 text-slate-400">...</span>
              <button className="text-muted-foreground size-8 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800">
                125
              </button>
              <button className="hover:text-muted-foreground rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 dark:border-slate-700 dark:bg-slate-900">
                <ChevronRight />{' '}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserManagmentPage;
