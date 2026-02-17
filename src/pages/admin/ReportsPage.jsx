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
import { Filter } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { Search } from 'lucide-react';

function ReportsPage() {
  return (
    <div className="space-y-6 px-4 py-8">
      <div>
        <h2 className="text-3xl font-semibold">Reports</h2>
        <p className="text-foreground text-sm">Managing reports actively</p>
      </div>
      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6">
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

        <div className="flex flex-row flex-wrap items-center gap-3">
          <div>
            <Select className="w-fit">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select className="w-fit">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="fraud">Fraud</SelectItem>
                  <SelectItem value="false-advertising">False Advertising</SelectItem>
                  <SelectItem value="inappropriate-contentg">Inappropriate Content</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline">
            <span className="block text-sm">
              <Filter />
            </span>
          </Button>
        </div>
      </Card>

      <Card className="gap-0 overflow-visible p-0">
        <div className="overflow-x-auto overflow-y-visible">
          <Table className="w-full min-w-full border-collapse text-left">
            <TableHeader className="bg-muted w-full">
              <TableRow>
                <TableHead className="px-6 py-4">ID</TableHead>
                <TableHead className="px-6 py-4">Reporter</TableHead>
                <TableHead className="px-6 py-4"> Reported User</TableHead>
                <TableHead className="px-6 py-4">Reason</TableHead>
                <TableHead className="px-6 py-4"> Created Date</TableHead>
                <TableHead className="px-4 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="px-6 py-4">#PRP-1024</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold">
                      SM
                    </div>
                    <span className="text-sm font-semibold">Sarah Miller</span>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLo23h_KguS-ROG8AAz4Hh75lsMt85_WPOlhWMXv4mmd98oGP2I8YcvMb-7qOmvd-l3Sj0e5TAPVHbKHXYo_95miDYERderalz4iloWyTeabX2SeiZ_v385qRFwyqBILvrx7hUGH8X1nQghHaNHJxAMusaCksdS0iE04z5DTpU2ak0lQirtw7DejH3uw5d_F6RloSIaUrptfzZljWB2XaokQQfEMnA2KF9JLcota_3YHMZAxRCsaQqb7lKjqYt26yLqgJcBcaZUWFW"
                    />
                    <span className="text-sm font-semibold">David Vance</span>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <span className="rounded bg-orange-100 px-2 py-1 text-[10px] font-extrabold whitespace-nowrap text-orange-700 uppercase">
                    False Advertising
                  </span>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <p className="text-muted-foreground text-[11px] font-medium uppercase">
                    Oct 24, 2023
                  </p>
                  <p className="text-muted-foreground/40 text-[10px]">14:20 PM</p>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <Button className="bg-transparent" variant="outline">
                    <EllipsisVertical />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-6 py-4">
          <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Showing 1-10 of 124 Reports
          </span>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition-colors hover:bg-white">
              <span className="material-icons-round text-sm">
                <ChevronLeft />
              </span>
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
              <span className="material-icons-round text-sm">
                <ChevronRight />
              </span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ReportsPage;
