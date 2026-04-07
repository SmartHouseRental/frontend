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
import StatusBadge from '@/components/StatusBadge';
import PageHeader from '@/components/PageHeader';
import DataTablePagination from '@/components/DataTablePagination';
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    Flag,
    Trash2,
    Star,
    MessageSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const reviews = [
    {
        id: 'REV-2401',
        reviewer: { name: 'Mulugeta K.', initials: 'MK', color: 'bg-blue-100 text-blue-600' },
        targetType: 'property',
        target: 'Horizon Peak Villa',
        targetId: 'PRP-9402',
        rating: 5,
        comment: 'Outstanding property! The villa exceeded all our expectations. Spacious rooms, modern amenities, and the landlord was incredibly responsive.',
        date: 'Mar 22, 2026',
        status: 'published',
    },
    {
        id: 'REV-2398',
        reviewer: { name: 'Tigist H.', initials: 'TH', color: 'bg-rose-100 text-rose-600' },
        targetType: 'property',
        target: 'Urban Loft 42',
        targetId: 'PRP-8210',
        rating: 4,
        comment: 'Great location and reasonable price. The building is well-maintained. Only downside is limited parking space.',
        date: 'Mar 21, 2026',
        status: 'published',
    },
    {
        id: 'REV-2395',
        reviewer: { name: 'Abebe T.', initials: 'AT', color: 'bg-emerald-100 text-emerald-600' },
        targetType: 'owner',
        target: 'Michael Chen',
        targetId: 'USR-1001',
        rating: 5,
        comment: 'Michael is one of the best landlords I have worked with. Very professional, responds quickly, and keeps the property in excellent condition.',
        date: 'Mar 20, 2026',
        status: 'published',
    },
    {
        id: 'REV-2390',
        reviewer: { name: 'Sara K.', initials: 'SK', color: 'bg-violet-100 text-violet-600' },
        targetType: 'property',
        target: 'Bole Skyline Apt',
        targetId: 'PRP-8829',
        rating: 2,
        comment: 'The photos were misleading. The apartment looked much better online. Plumbing issues and noisy neighbors. Not worth the listed price.',
        date: 'Mar 19, 2026',
        status: 'flagged',
    },
    {
        id: 'REV-2385',
        reviewer: { name: 'Henok B.', initials: 'HB', color: 'bg-amber-100 text-amber-600' },
        targetType: 'owner',
        target: 'David Vance',
        targetId: 'USR-1203',
        rating: 1,
        comment: 'Terrible experience. The owner never responded to maintenance requests and tried to increase rent mid-lease without proper notice.',
        date: 'Mar 18, 2026',
        status: 'flagged',
    },
    {
        id: 'REV-2380',
        reviewer: { name: 'Dawit T.', initials: 'DT', color: 'bg-teal-100 text-teal-600' },
        targetType: 'property',
        target: 'Cottage by the Lake',
        targetId: 'PRP-7731',
        rating: 4,
        comment: 'Beautiful location and peaceful environment. Perfect for families. Would have given 5 stars if not for the occasional water supply issues.',
        date: 'Mar 15, 2026',
        status: 'published',
    },
    {
        id: 'REV-2370',
        reviewer: { name: 'Unknown', initials: '??', color: 'bg-slate-100 text-slate-400' },
        targetType: 'property',
        target: 'Suspicious Listing',
        targetId: 'PRP-5102',
        rating: 5,
        comment: 'Best apartment ever!!! Super cheap and amazing deal. Contact me for more details on WhatsApp.',
        date: 'Mar 12, 2026',
        status: 'removed',
    },
];

const statusMap = {
    published: { label: 'Published', style: 'bg-emerald-100 text-emerald-700' },
    flagged: { label: 'Flagged', style: 'bg-amber-100 text-amber-700' },
    removed: { label: 'Removed', style: 'bg-rose-100 text-rose-700' },
};

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={14}
                    className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                />
            ))}
            <span className="ml-1 text-xs font-bold">{rating}.0</span>
        </div>
    );
}

function ReviewsPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 p-8">
            <PageHeader
                title="Reviews"
                description="Moderate user reviews and ratings across the platform."
            >
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
                    <MessageSquare size={14} className="text-muted-foreground" />
                    <span className="font-bold">{reviews.length}</span>
                    <span className="text-muted-foreground">total reviews</span>
                </div>
            </PageHeader>

            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card className="border-0 border-l-4 border-emerald-400 p-5">
                    <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Published</p>
                    <p className="mt-1 text-2xl font-extrabold text-emerald-600">
                        {reviews.filter((r) => r.status === 'published').length}
                    </p>
                </Card>
                <Card className="border-0 border-l-4 border-amber-400 p-5">
                    <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Flagged</p>
                    <p className="mt-1 text-2xl font-extrabold text-amber-600">
                        {reviews.filter((r) => r.status === 'flagged').length}
                    </p>
                </Card>
                <Card className="border-0 border-l-4 border-rose-400 p-5">
                    <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Removed</p>
                    <p className="mt-1 text-2xl font-extrabold text-rose-600">
                        {reviews.filter((r) => r.status === 'removed').length}
                    </p>
                </Card>
                <Card className="border-0 border-l-4 border-primary p-5">
                    <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Avg Rating</p>
                    <div className="mt-1 flex items-center gap-2">
                        <p className="text-2xl font-extrabold">
                            {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                        </p>
                        <Star size={20} className="fill-amber-400 text-amber-400" />
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="flex flex-row flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="relative max-w-xl flex-1">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                        <Search size={18} />
                    </span>
                    <Input
                        placeholder="Search by reviewer, property, or comment..."
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
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="flagged">Flagged</SelectItem>
                                <SelectItem value="removed">Removed</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Ratings</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
                                <SelectItem value="4">4+ Stars</SelectItem>
                                <SelectItem value="3">3+ Stars</SelectItem>
                                <SelectItem value="2">2+ Stars</SelectItem>
                                <SelectItem value="1">1 Star</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="property">Property</SelectItem>
                                <SelectItem value="owner">Owner</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <Filter size={16} />
                    </Button>
                </div>
            </Card>

            {/* Table */}
            <Card className="gap-0 overflow-hidden p-0">
                <Table className="w-full min-w-full border-collapse text-left">
                    <TableHeader className="bg-muted/30 w-full">
                        <TableRow>
                            <TableHead className="px-6 py-4">Reviewer</TableHead>
                            <TableHead className="px-6 py-4">Target</TableHead>
                            <TableHead className="px-6 py-4">Rating</TableHead>
                            <TableHead className="px-6 py-4 max-w-xs">Comment</TableHead>
                            <TableHead className="px-6 py-4">Status</TableHead>
                            <TableHead className="px-6 py-4">Date</TableHead>
                            <TableHead className="px-4 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.map((review) => (
                            <TableRow
                                key={review.id}
                                className={`transition-colors hover:bg-muted/20 ${review.status === 'removed' ? 'opacity-50' : ''}`}
                            >
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${review.reviewer.color}`}
                                        >
                                            {review.reviewer.initials}
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold">{review.reviewer.name}</span>
                                            <p className="text-muted-foreground text-[10px]">{review.id}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <p className="text-sm font-semibold">{review.target}</p>
                                    <p className="text-muted-foreground text-[10px]">
                                        {review.targetType === 'property' ? '🏠' : '👤'} {review.targetId}
                                    </p>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <StarRating rating={review.rating} />
                                </TableCell>
                                <TableCell className="max-w-xs px-6 py-4">
                                    <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                                        {review.comment}
                                    </p>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <StatusBadge status={review.status} statusMap={statusMap} />
                                </TableCell>
                                <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                                    {review.date}
                                </TableCell>
                                <TableCell className="px-4 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Eye className="mr-2 h-4 w-4" />
                                                <span>View Full Review</span>
                                            </DropdownMenuItem>
                                            {review.status === 'published' && (
                                                <DropdownMenuItem className="cursor-pointer text-amber-600 focus:text-amber-600">
                                                    <Flag className="mr-2 h-4 w-4" />
                                                    <span>Flag Review</span>
                                                </DropdownMenuItem>
                                            )}
                                            {review.status !== 'removed' && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Remove Review</span>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <DataTablePagination
                    currentPage={1}
                    totalPages={1}
                    totalItems={reviews.length}
                    itemsPerPage={reviews.length}
                    itemLabel="reviews"
                />
            </Card>
        </div>
    );
}

export default ReviewsPage;
