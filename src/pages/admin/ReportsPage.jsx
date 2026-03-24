import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  UserX,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';

const reports = [
  {
    id: 'RPT-7429',
    reporter: { name: 'Sarah Miller', initials: 'SM', color: 'bg-primary/10 text-primary' },
    reportedUser: {
      name: 'David Vance',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo23h_KguS-ROG8AAz4Hh75lsMt85_WPOlhWMXv4mmd98oGP2I8YcvMb-7qOmvd-l3Sj0e5TAPVHbKHXYo_95miDYERderalz4iloWyTeabX2SeiZ_v385qRFwyqBILvrx7hUGH8X1nQghHaNHJxAMusaCksdS0iE04z5DTpU2ak0lQirtw7DejH3uw5d_F6RloSIaUrptfzZljWB2XaokQQfEMnA2KF9JLcota_3YHMZAxRCsaQqb7lKjqYt26yLqgJcBcaZUWFW',
    },
    reason: 'false_advertising',
    reasonLabel: 'False Advertising',
    reasonStyle: 'bg-orange-100 text-orange-700',
    status: 'under_review',
    createdDate: 'Mar 22, 2026',
    createdTime: '14:20 PM',
  },
  {
    id: 'RPT-7430',
    reporter: { name: 'Abebe T.', initials: 'AT', color: 'bg-blue-100 text-blue-600' },
    reportedUser: { name: 'Dawit G.', initials: 'DG', color: 'bg-rose-100 text-rose-600' },
    reason: 'fraud',
    reasonLabel: 'Fraud',
    reasonStyle: 'bg-rose-100 text-rose-700',
    status: 'pending',
    createdDate: 'Mar 21, 2026',
    createdTime: '09:45 AM',
  },
  {
    id: 'RPT-7418',
    reporter: { name: 'Marta K.', initials: 'MK', color: 'bg-emerald-100 text-emerald-600' },
    reportedUser: { name: 'Yonas H.', initials: 'YH', color: 'bg-violet-100 text-violet-600' },
    reason: 'inappropriate_behavior',
    reasonLabel: 'Inappropriate',
    reasonStyle: 'bg-violet-100 text-violet-700',
    status: 'resolved',
    createdDate: 'Mar 18, 2026',
    createdTime: '16:30 PM',
  },
  {
    id: 'RPT-7405',
    reporter: { name: 'Henok B.', initials: 'HB', color: 'bg-amber-100 text-amber-600' },
    reportedUser: { name: 'Tigist M.', initials: 'TM', color: 'bg-pink-100 text-pink-600' },
    reason: 'spam',
    reasonLabel: 'Spam',
    reasonStyle: 'bg-slate-100 text-slate-700',
    status: 'dismissed',
    createdDate: 'Mar 15, 2026',
    createdTime: '11:00 AM',
  },
  {
    id: 'RPT-7398',
    reporter: { name: 'Sara A.', initials: 'SA', color: 'bg-teal-100 text-teal-600' },
    reportedUser: { name: 'Kiflom D.', initials: 'KD', color: 'bg-orange-100 text-orange-600' },
    reason: 'fraud',
    reasonLabel: 'Fraud',
    reasonStyle: 'bg-rose-100 text-rose-700',
    status: 'under_review',
    createdDate: 'Mar 12, 2026',
    createdTime: '08:15 AM',
  },
];

const statusStyles = {
  pending: { label: 'Pending', style: 'bg-amber-100 text-amber-700' },
  under_review: { label: 'Under Review', style: 'bg-blue-100 text-blue-700' },
  resolved: { label: 'Resolved', style: 'bg-emerald-100 text-emerald-700' },
  dismissed: { label: 'Dismissed', style: 'bg-slate-100 text-slate-600' },
};

function ReportsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 px-4 py-8">
      <div>
        <h2 className="text-3xl font-semibold">Reports</h2>
        <p className="text-muted-foreground text-sm">Review and manage platform reports</p>
      </div>
      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="relative max-w-2xl min-w-50 flex-1">
          <span className="text-muted-foreground/90 absolute top-1/2 left-3 -translate-y-1/2">
            <Search />
          </span>
          <Input
            className="py-2 pr-4 pl-10 outline-none focus:ring-2"
            placeholder="Search by ID, reporter, or target..."
            type="text"
          />
        </div>

        <div className="flex flex-row flex-wrap items-center gap-3">
          <Select>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="fraud">Fraud</SelectItem>
                <SelectItem value="false_advertising">False Advertising</SelectItem>
                <SelectItem value="inappropriate_behavior">Inappropriate</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
      </Card>

      <Card className="gap-0 overflow-visible p-0">
        <div className="overflow-x-auto overflow-y-visible">
          <Table className="w-full min-w-full border-collapse text-left">
            <TableHeader className="bg-muted/30 w-full">
              <TableRow>
                <TableHead className="px-6 py-4">ID</TableHead>
                <TableHead className="px-6 py-4">Reporter</TableHead>
                <TableHead className="px-6 py-4">Reported User</TableHead>
                <TableHead className="px-6 py-4">Reason</TableHead>
                <TableHead className="px-6 py-4">Status</TableHead>
                <TableHead className="px-6 py-4">Created</TableHead>
                <TableHead className="px-4 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => {
                const sState = statusStyles[report.status];
                return (
                  <TableRow
                    key={report.id}
                    className="cursor-pointer transition-colors hover:bg-muted/20"
                    onClick={() => navigate(`/admin/reports/${report.id}`)}
                  >
                    <TableCell className="px-6 py-4 text-sm font-bold">#{report.id}</TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${report.reporter.color}`}
                        >
                          {report.reporter.initials}
                        </div>
                        <span className="text-sm font-semibold">{report.reporter.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {report.reportedUser.avatar ? (
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={report.reportedUser.avatar}
                            alt={report.reportedUser.name}
                          />
                        ) : (
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${report.reportedUser.color}`}
                          >
                            {report.reportedUser.initials}
                          </div>
                        )}
                        <span className="text-sm font-semibold">{report.reportedUser.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`rounded px-2 py-1 text-[10px] font-extrabold whitespace-nowrap uppercase ${report.reasonStyle}`}
                      >
                        {report.reasonLabel}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${sState.style}`}
                      >
                        {sState.label}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <p className="text-muted-foreground text-[11px] font-medium uppercase">
                        {report.createdDate}
                      </p>
                      <p className="text-muted-foreground/40 text-[10px]">{report.createdTime}</p>
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
                            onClick={() => navigate(`/admin/reports/${report.id}`)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Investigate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-emerald-600 focus:text-emerald-600">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            <span>Resolve Report</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-amber-600 focus:text-amber-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Dismiss Report</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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
        </div>
        <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-6 py-4">
          <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Showing 1-{reports.length} of 124 Reports
          </span>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition-colors hover:bg-white">
              <ChevronLeft size={16} />
            </button>
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-xs font-bold text-stone-600 transition-colors hover:bg-white">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-xs font-bold text-stone-600 transition-colors hover:bg-white">
              3
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition-colors hover:bg-white">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ReportsPage;
