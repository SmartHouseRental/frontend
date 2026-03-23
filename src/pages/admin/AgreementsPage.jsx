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
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Handshake,
  FileText,
  CreditCard,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const agreements = [
  {
    id: 'AG-9428',
    property: 'Horizon Peak Villa',
    propertyId: 'PRP-9402',
    renter: 'Mulugeta K.',
    owner: 'Michael Chen',
    monthlyRent: '85,000 ETB',
    startDate: 'Mar 1, 2026',
    endDate: 'Aug 31, 2026',
    status: 'active',
    paymentStatus: 'confirmed',
  },
  {
    id: 'AG-9425',
    property: 'Urban Loft 42',
    propertyId: 'PRP-8210',
    renter: 'Tigist H.',
    owner: 'Sarah Jenkins',
    monthlyRent: '45,000 ETB',
    startDate: 'Feb 15, 2026',
    endDate: 'Feb 14, 2027',
    status: 'pending_renter',
    paymentStatus: 'proof_uploaded',
  },
  {
    id: 'AG-9418',
    property: 'Cottage by the Lake',
    propertyId: 'PRP-7731',
    renter: 'Abebe T.',
    owner: 'David Miller',
    monthlyRent: '32,000 ETB',
    startDate: 'Jan 1, 2026',
    endDate: 'Dec 31, 2026',
    status: 'pending_owner',
    paymentStatus: 'pending',
  },
  {
    id: 'AG-9410',
    property: 'Bole Skyline Apt',
    propertyId: 'PRP-8829',
    renter: 'Sara K.',
    owner: 'Dawit T.',
    monthlyRent: '55,000 ETB',
    startDate: 'Mar 1, 2026',
    endDate: 'Mar 1, 2027',
    status: 'draft',
    paymentStatus: 'pending',
  },
  {
    id: 'AG-7102',
    property: 'Megenagna Studio',
    propertyId: 'PRP-6210',
    renter: 'Henok B.',
    owner: 'Marta K.',
    monthlyRent: '28,000 ETB',
    startDate: 'Nov 1, 2025',
    endDate: 'Apr 30, 2026',
    status: 'terminated',
    paymentStatus: 'confirmed',
  },
  {
    id: 'AG-6891',
    property: 'CMC Area House',
    propertyId: 'PRP-5832',
    renter: 'Yonas G.',
    owner: 'Hana B.',
    monthlyRent: '120,000 ETB',
    startDate: 'Jun 1, 2025',
    endDate: 'May 31, 2026',
    status: 'expired',
    paymentStatus: 'confirmed',
  },
];

const statusStyles = {
  active: { label: 'Active', style: 'bg-emerald-100 text-emerald-700' },
  pending_renter: { label: 'Pending Renter', style: 'bg-amber-100 text-amber-700' },
  pending_owner: { label: 'Pending Owner', style: 'bg-orange-100 text-orange-700' },
  draft: { label: 'Draft', style: 'bg-slate-100 text-slate-600' },
  terminated: { label: 'Terminated', style: 'bg-rose-100 text-rose-700' },
  expired: { label: 'Expired', style: 'bg-red-100 text-red-700' },
};

const paymentStatusStyles = {
  confirmed: { label: 'Confirmed', style: 'bg-emerald-100 text-emerald-700' },
  proof_uploaded: { label: 'Proof Uploaded', style: 'bg-blue-100 text-blue-700' },
  pending: { label: 'Pending', style: 'bg-slate-100 text-slate-600' },
};

function AgreementsPage() {
  const navigate = useNavigate();

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
          />
        </div>
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending_renter">Pending Renter</SelectItem>
                <SelectItem value="pending_owner">Pending Owner</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
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

      <Card className="gap-0 overflow-hidden p-0">
        <Table className="w-full min-w-full border-collapse text-left">
          <TableHeader className="bg-muted w-full">
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
              const sState = statusStyles[agreement.status];
              const pState = paymentStatusStyles[agreement.paymentStatus];
              return (
                <TableRow
                  key={agreement.id}
                  className="cursor-pointer transition-colors hover:bg-slate-50/80"
                  onClick={() => navigate(`/admin/agreements/${agreement.id}`)}
                >
                  <TableCell className="px-6 py-4 text-sm font-bold">#{agreement.id}</TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-sm font-semibold">{agreement.property}</p>
                    <p className="text-muted-foreground text-[10px]">{agreement.propertyId}</p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-xs">
                      <span className="font-semibold">{agreement.renter}</span>
                      <span className="text-muted-foreground"> → </span>
                      <span className="font-semibold">{agreement.owner}</span>
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm font-bold">{agreement.monthlyRent}</TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-xs">{agreement.startDate}</p>
                    <p className="text-muted-foreground text-[10px]">to {agreement.endDate}</p>
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
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap uppercase ${pState.style}`}
                    >
                      {pState.label}
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
                        {agreement.paymentStatus === 'proof_uploaded' && (
                          <DropdownMenuItem className="cursor-pointer text-blue-600 focus:text-blue-600">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Verify Payment</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Terminate Agreement</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4">
          <span className="text-muted-foreground text-xs font-medium">
            Showing 1-{agreements.length} of 1,284 agreements
          </span>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white">
              <ChevronLeft size={16} />
            </button>
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white">
              3
            </button>
            <span className="text-muted-foreground px-1">...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white">
              214
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AgreementsPage;
