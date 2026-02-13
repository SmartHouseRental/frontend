import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Newspaper } from 'lucide-react';
import { CircleDot } from 'lucide-react';
import { Filter } from 'lucide-react';

import { Download } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { Search } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

function AgreementsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-charcoal text-3xl font-extrabold dark:text-white">
            Agreements Management
          </h2>
          <p className="text-muted-foreground/60 mt-1 font-medium italic">
            Review and manage rental contracts across Ethiopia
          </p>
        </div>
        <div className="">
          <button className="border-primary/20 text-primary hover:bg-primary/5 flex items-center gap-2 rounded-lg border-2 px-4 py-2 font-bold transition-all">
            <Download /> Export CSV
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="mb-4 flex items-center justify-between">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <Newspaper />
            </div>
            <span className="rounded bg-green-500/10 px-2 py-1 text-xs font-bold text-green-500">
              +12%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground/60 text-sm font-medium">Total Agreements</p>
            <h3 className="text-charcoal mt-1 text-2xl font-extrabold dark:text-white">1,482</h3>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="mb-4 flex items-center justify-between">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <CircleCheckBig />
            </div>
            <span className="text-primary bg-primary/10 rounded px-2 py-1 text-xs font-bold">
              Target 90%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground/60 text-sm font-medium">Active Agreements</p>
            <h3 className="text-charcoal mt-1 text-2xl font-extrabold dark:text-white">86.4%</h3>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <CircleDot />{' '}
            </div>
            <span className="rounded bg-red-500/10 px-2 py-1 text-xs font-bold text-red-500">
              Priority
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground/60 text-sm font-medium">Pending Disputes</p>
            <h3 className="text-charcoal mt-1 text-2xl font-extrabold dark:text-white">14</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 overflow-hidden px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative col-span-2">
            <span className="text-muted-foreground/60 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              <Search />
            </span>
            <Input
              className="w-full py-3 pr-4 pl-10 text-sm font-medium"
              placeholder="Search ID or Name..."
              type="text"
            />
          </div>
          <div className="col-start-5 flex gap-2">
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="bg-secondary hover:bg-secondary/90 flex-1 rounded-lg py-2 text-sm font-bold text-white transition-all">
              <Filter />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="gap-0 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-full border-collapse text-left">
            <TableHeader className="bg-muted w-full">
              <TableRow>
                <TableHead className="px-6 py-4">ID</TableHead>
                <TableHead className="px-6 py-4">Property</TableHead>
                <TableHead className="px-6 py-4"> Renter / Owner</TableHead>
                <TableHead className="px-6 py-4"> Rent (ETB)</TableHead>
                <TableHead className="px-6 py-4">Duration</TableHead>
                <TableHead className="px-6 py-4">Status</TableHead>
                <TableHead className="px-4 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="px-6 py-4">
                  <span className="text-primary font-bold">#AG-9428</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        className="h-full w-full object-cover"
                        data-alt="Modern apartment exterior"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnMOprguOjuAF8Qrb9Zd77c1Dv3YD3zqIUHFferta0hg3M0BhOsuEjs4O_4XyLTcQeDis92itJDmNWfCf7sy2_GMPcRJGLNNoZi4RqrpfxnlK7WLDtwdFZGhxbku7hQ6YL-ASEw6-EE9YyfsL9N6Z6OXwn6g3wmL91rwoCvxYx3_AwAZMvS4ylMV7aDwjyFozB0ZAubsD-X1Ey6TZjkd3k7BMNUGWIWCQ-LXJf6xaPd6ggQzeLbaO9HZax_anf1nmVTEXakADTFq-C"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Bole Skyline Apt.</p>
                      <p className="text-muted-foreground/60 text-xs">Addis Ababa, Bole</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <p className="text-sm font-bold">Mulugeta K.</p>
                  <p className="text-muted-foreground/60 text-[10px]">Owner: Tadesse W.</p>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <p className="text-sm font-bold">45,000 ETB</p>
                  <p className="text-muted-foreground/60 text-[10px]">Dep: 90,000 ETB</p>
                </TableCell>
                <TableCell className="py-4text-sm px-6 font-medium">12 Months</TableCell>

                <TableCell className="px-6 py-4">
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-[10px] font-extrabold tracking-wider text-green-600 uppercase">
                    Active
                  </span>
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
        <div className="border-primary/10 flex flex-col items-center justify-between gap-4 border-t p-6 sm:flex-row">
          <p className="text-muted-foreground/60 text-sm font-medium">
            Showing <span className="text-charcoal font-bold dark:text-white">1 - 4</span> of 1,482
            agreements
          </p>
          <div className="flex items-center gap-2">
            <button className="border-primary/20 text-muted-foreground/60 hover:bg-primary flex h-8 w-8 items-center justify-center rounded border transition-all hover:text-white">
              <span className="material-icons-round text-sm">
                <ChevronLeft />
              </span>
            </button>
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded text-xs font-bold text-white">
              1
            </button>
            <button className="border-primary/20 text-muted-foreground/60 hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded border text-xs font-bold transition-all">
              2
            </button>
            <button className="border-primary/20 text-muted-foreground/60 hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded border text-xs font-bold transition-all">
              3
            </button>
            <span className="px-1">...</span>
            <button className="border-primary/20 text-muted-foreground/60 hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded border text-xs font-bold transition-all">
              42
            </button>
            <button className="border-primary/20 text-muted-foreground/60 hover:bg-primary flex h-8 w-8 items-center justify-center rounded border transition-all hover:text-white">
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

export default AgreementsPage;
