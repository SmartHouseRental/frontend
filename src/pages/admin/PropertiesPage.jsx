import { Card } from '@/components/ui/card';
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
  Edit,
  Trash2,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const properties = [
  {
    id: 'PRP-9402',
    title: 'Horizon Peak Villa',
    owner: 'Michael Chen',
    ownerVerified: true,
    type: 'Villa',
    price: '85,000 ETB',
    status: 'pending',
    editCount: 0,
    isDeleted: false,
    location: 'Bole, Addis Ababa',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuoTFnm7eiUv3aKP_BJ5piF4y8mlzYH5ClM5cBXvCWiUBoKTyYq1fVvBa1ON_b343Lnm8gmkoCZu--XjCNHqF0C_MeQTDaVpBbPejgSOMxhesm8QdPtka1Sf7nq8DJL7UhC_eZs_rTsy4xIu6xuYQGKmdGUEc1F9lQPDNQ6jWkuyV_vzyE-JvOZVwndSvv4-arIqjshonMQ_Cvrc8GSp1iaQcWcbzTUNuOqCFGwTWZutx9kXsgtmfjULDan6j82KWu2NOo2-Z_dXl',
  },
  {
    id: 'PRP-8829',
    title: 'Bole Skyline Apartment',
    owner: 'Dawit Tesfaye',
    ownerVerified: true,
    type: 'Apartment',
    price: '55,000 ETB',
    status: 'available',
    editCount: 1,
    isDeleted: false,
    location: 'Bole, Addis Ababa',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJmCVHHK5IgTYuMnEBX8RO1nOinrW0cnVikNmuGhYgY_CkHYI8gfpCp3SEvgug4SdZc7v6SX_o6N0eaXn-2EA9Z4xMqc9UosSSlqEGjec-0k91lXxF97pnVZ-EP6Vmf8WW4roVyCo5Am06bkxTHfotXf9mc3BScw9j6P4xBfjmzaQ5Z9Z9aX84jQ5oWmTUzI8Ifu0io--9zkixMk-fH4LdGKr80ZMqIQUK8K38xJmywgMq0LVHHEmKYxLMYGS6lfgFMprudQ4gCRcO',
  },
  {
    id: 'PRP-8210',
    title: 'Urban Loft 42',
    owner: 'Sarah Jenkins',
    ownerVerified: false,
    type: 'Condominium',
    price: '45,000 ETB',
    status: 'rented',
    editCount: 0,
    isDeleted: false,
    location: 'Kazanchis, Addis Ababa',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHK4MBf-7UqrhDns85XvQ8rILU5gDaYMqKUfF9Wf5uB7jOthE-628mLKysKbIm1k6jW99udN3BX2TELrn_bQhFYQE4qiEKrxf9Uvwi94473iylGn2WS5r61GBMgRbO7vN-8WO902Pk_3LWwYfkGACDKym_P-aSaMjnt5XB3lL6_i562wLzPu0wKH5lnacfnK0J1c_n9mz4fslMIn6wohA3b1ddHEiYTpShBnbHAmhp5ifGDttU_5ZxLoR-BUPiZwEpwYOYUg1kB9Q2',
  },
  {
    id: 'PRP-7731',
    title: 'Cottage by the Lake',
    owner: 'David Miller',
    ownerVerified: true,
    type: 'Villa',
    price: '32,000 ETB',
    status: 'pending',
    editCount: 0,
    isDeleted: false,
    location: 'Hawassa',
    image: null,
  },
  {
    id: 'PRP-6210',
    title: 'Megenagna Studio',
    owner: 'Marta Kebede',
    ownerVerified: true,
    type: 'Apartment',
    price: '28,000 ETB',
    status: 'available',
    editCount: 1,
    isDeleted: false,
    location: 'Megenagna, Addis Ababa',
    image: null,
  },
  {
    id: 'PRP-5102',
    title: 'Suspicious Listing',
    owner: 'Unknown Account',
    ownerVerified: false,
    type: 'Apartment',
    price: '5,000 ETB',
    status: 'deleted',
    editCount: 0,
    isDeleted: true,
    location: 'N/A',
    image: null,
  },
];

const statusStyles = {
  available: { label: 'Available', style: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', style: 'bg-amber-100 text-amber-700' },
  rented: { label: 'Rented', style: 'bg-blue-100 text-blue-700' },
  deleted: { label: 'Deleted', style: 'bg-rose-100 text-rose-700' },
};

function PropertiesPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Properties</h2>
          <p className="text-muted-foreground text-sm">
            Manage property listings across the platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-0 border-l-4 border-emerald-400 p-5">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Available
          </p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-600">2,640</p>
        </Card>
        <Card className="border-0 border-l-4 border-amber-400 p-5">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Pending Review
          </p>
          <p className="mt-1 text-2xl font-extrabold text-amber-600">342</p>
        </Card>
        <Card className="border-0 border-l-4 border-blue-400 p-5">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Rented</p>
          <p className="mt-1 text-2xl font-extrabold text-blue-600">838</p>
        </Card>
        <Card className="border-0 border-l-4 border-rose-400 p-5">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Deleted
          </p>
          <p className="mt-1 text-2xl font-extrabold text-rose-600">42</p>
        </Card>
      </div>

      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="relative max-w-xl flex-1">
          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
            <Search size={18} />
          </span>
          <Input
            placeholder="Search by ID, title, owner, or location..."
            type="text"
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="condominium">Condominium</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="compound">Compound</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
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
          <TableHeader className="bg-muted/30 w-full">
            <TableRow>
              <TableHead className="px-6 py-4">Property</TableHead>
              <TableHead className="px-6 py-4">Owner</TableHead>
              <TableHead className="px-6 py-4">Type</TableHead>
              <TableHead className="px-6 py-4">Price</TableHead>
              <TableHead className="px-6 py-4">Status</TableHead>
              <TableHead className="px-6 py-4">Edits</TableHead>
              <TableHead className="px-6 py-4">Location</TableHead>
              <TableHead className="px-4 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => {
              const sState = statusStyles[property.status];
              return (
                <TableRow
                  key={property.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/20 ${property.isDeleted ? 'opacity-60' : ''}`}
                  onClick={() => navigate(`/admin/properties/${property.id}`)}
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {property.image ? (
                        <div
                          className="h-10 w-14 rounded-lg bg-slate-100 bg-cover bg-center"
                          style={{ backgroundImage: `url('${property.image}')` }}
                        />
                      ) : (
                        <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-400">
                          No img
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold">{property.title}</p>
                        <p className="text-muted-foreground text-[10px]">{property.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">{property.owner}</span>
                      {property.ownerVerified && (
                        <ShieldCheck size={14} className="text-emerald-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                    {property.type}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm font-bold">{property.price}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${sState.style}`}
                    >
                      {sState.label}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-bold ${property.editCount >= 1
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-muted-foreground'
                        }`}
                    >
                      {property.editCount}/1
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4 text-xs">
                    {property.location}
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
                          onClick={() => navigate(`/admin/properties/${property.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {property.status === 'pending' && (
                          <>
                            <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Reject</span>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Admin Override Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Soft Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
          <span className="text-muted-foreground text-xs font-medium">
            Showing 1-{properties.length} of 3,820 properties
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
              637
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

export default PropertiesPage;
