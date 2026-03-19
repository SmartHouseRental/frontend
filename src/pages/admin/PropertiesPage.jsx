import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Filter,
  MoreVertical,
  ChevronLeft,
  MapPin,
  ChevronRight,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  MessageSquare,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';

function PropertiesPage() {
  const navigate = useNavigate();
  return (
    <div className="scrollbar-hide h-screen space-y-8 overflow-y-auto p-8">
      <div className="space-y-8 pb-0">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Property Management</h1>
            <p className="text-muted-foreground mt-1">
              Review, approve, or manage residential listings in Addis Ababa.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-0">
            <CardContent>
              <p className="text-muted-foreground/90 text-sm font-medium tracking-wider uppercase">
                Total Listings
              </p>
              <p className="mt-1 text-2xl font-extrabold">1,284</p>
            </CardContent>
          </Card>

          <Card className="border-0">
            <CardContent>
              <p className="text-muted-foreground/90 text-sm font-medium tracking-wider uppercase">
                Available
              </p>
              <p className="mt-1 text-2xl font-extrabold text-green-600">842</p>
            </CardContent>
          </Card>

          <Card className="border-0">
            <CardContent>
              <p className="text-muted-foreground/90 text-sm font-medium tracking-wider uppercase">
                Pending
              </p>
              <p className="text-primary mt-1 text-2xl font-extrabold">24</p>
            </CardContent>
          </Card>

          <Card className="border-0">
            <CardContent>
              <p className="text-muted-foreground/90 text-sm font-medium tracking-wider uppercase">
                Rented
              </p>
              <p className="mt-1 text-2xl font-extrabold">418</p>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-row flex-wrap items-center justify-between gap-4 rounded-xl border p-4">
          <div className="relative max-w-2xl min-w-50 flex-1">
            <span className="text-muted-foreground/90 absolute top-1/2 left-3 -translate-y-1/2">
              <Search />
            </span>
            <Input
              className="py-2 pr-4 pl-10 outline-none focus:ring-2"
              placeholder="Search by ID, Title or Owner..."
              type="text"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartmenta">Apartment</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="full-compound">Full Compound</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="rounded-lg px-5 py-2">
              <Filter />
            </Button>
          </div>
        </Card>
      </div>

      <section className="">
        <Card className="border-primary/5 gap-0 overflow-hidden rounded-xl border p-0 shadow-sm">
          <Table className="w-full min-w-full border-collapse text-left">
            <TableHeader className="w-full bg-slate-50">
              <TableRow>
                <TableHead className="px-6 py-4">ID</TableHead>
                <TableHead className="px-6 py-4">Title / Location</TableHead>
                <TableHead className="px-6 py-4">Owner</TableHead>
                <TableHead className="px-6 py-4">Type</TableHead>
                <TableHead className="px-6 py-4">Price</TableHead>
                <TableHead className="px-6 py-4">Status</TableHead>
                <TableHead className="px-4 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="px-6 py-4">#PRP-1024</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Villa in Bole"
                      className="h-12 w-12 rounded-lg object-cover"
                      data-alt="Modern luxury villa with white exterior and large windows"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAenV_3qVcY9Qwk4wakHFXyVXSOEDbP8zpfnM2v9TbZZ2Dx6DLWg5WzQMyNUilW90Vq6f0sOyGmDlljmxE7SRGuPZ-mGD-mS_QOap5qzI1l0B9w5oqkoaVuzgP0alYz1POLq1Z7wdkOyl9G_RiBmtBc7JBDBBkBfJWkaugjSN-COItg-1H_5I30pLWoet3qEwRfjR7o65lqEoboTysrWFX5ACBJPW9fma8PplImAgccKF74CzCl70Hn_SR2cYk6Y1xVSWEP6nDHyYs"
                    />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">
                        Luxury Villa in Bole Atlas
                      </p>
                      <p className="text-muted-foreground/90 flex items-center gap-1 text-xs">
                        <span className="material-icons text-primary text-[12px]">
                          <MapPin className="h-3 w-3" />
                        </span>
                        Bole, Addis Ababa
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <p className="text-sm font-medium">Abebe Kebede</p>
                  <p className="text-muted-foreground/90 text-xs">abebe.k@email.com</p>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <p className="text-primary text-sm font-extrabold">85,000 ETB</p>
                  <p className="text-muted-foreground/90 text-[10px] uppercase">per month</p>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <p>Villa</p>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold tracking-tight text-orange-600 uppercase dark:bg-orange-500/20 dark:text-orange-400">
                    Pending
                  </span>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate('/admin/propertiesdetail')} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        <span>Approve Property</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Reject Property</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Contact Owner</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="dark:bg-background-dark/40 border-primary/5 flex items-center justify-between border-t bg-slate-50 px-6 py-4">
            <p className="text-muted-foreground text-xs font-medium">
              Showing 1-4 of 1,284 properties
            </p>
            <div className="flex items-center gap-2">
              <button
                className="text-muted-foreground/90 rounded-lg border border-slate-200 p-2 hover:bg-white disabled:opacity-50"
                disabled=""
              >
                <span className="material-icons text-sm">
                  <ChevronLeft />
                </span>
              </button>
              <button className="bg-primary rounded-lg px-3 py-1 text-xs font-bold text-white">
                1
              </button>
              <button className="text-muted-foreground rounded-lg px-3 py-1 text-xs font-bold hover:bg-white">
                2
              </button>
              <button className="text-muted-foreground rounded-lg px-3 py-1 text-xs font-bold hover:bg-white">
                3
              </button>
              <span className="text-muted-foreground/90 px-1">...</span>
              <button className="text-muted-foreground rounded-lg px-3 py-1 text-xs font-bold hover:bg-white">
                321
              </button>
              <button className="text-muted-foreground/90 rounded-lg border border-slate-200 p-2 hover:bg-white">
                <span className="material-icons text-sm">
                  <ChevronRight />
                </span>
              </button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default PropertiesPage;
