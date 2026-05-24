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
import { useState } from 'react';
import {
  useAdminDeleteReview,
  useAdminReviews,
  useAdminUpdateReviewStatus,
} from '@/features/admin/hooks/useAdmin';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import { getReviewStatusMeta } from '@/features/admin/mappers';
import { useAdminLookupMaps } from '@/features/admin/hooks/useAdminLookupMaps';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';

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
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { data, isLoading, isError, refetch } = useAdminReviews({
      page,
      limit: 20,
      ...(search.trim() ? { search: search.trim() } : {}),
    });
    const updateReviewStatus = useAdminUpdateReviewStatus();
    const deleteReview = useAdminDeleteReview();

    const { getPropertyTitle } = useAdminLookupMaps();
    const reviews = getAdminListItems(data);
    const reviewItems = reviews.filter((item) =>
      statusFilter === 'all' ? true : item.status === statusFilter
    );
    const meta = data?.meta ?? { page: 1, limit: 20, total: 0, totalPages: 1 };

    const updateStatus = (id, status) => updateReviewStatus.mutate({ id, status });
    const removeReview = (id) => deleteReview.mutate({ id });

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
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setPage(1);
                        }}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
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
            {isLoading ? (
              <TableSkeleton rows={6} columns={7} />
            ) : isError ? (
              <ErrorState title="Failed to load reviews" onRetry={refetch} />
            ) : reviewItems.length === 0 ? (
              <EmptyState title="No reviews found" description="Try changing current filters." />
            ) : (
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
                        {reviewItems.map((review) => {
                            const reviewerName = review.reviewer
                              ? `${review.reviewer.first_name || ''} ${review.reviewer.last_name || ''}`.trim() || review.reviewer.email
                              : 'Unknown';
                            const initials = reviewerName
                              .split(' ')
                              .filter(Boolean)
                              .slice(0, 2)
                              .map((part) => part[0]?.toUpperCase())
                              .join('');
                            const statusMeta = getReviewStatusMeta(review.status);
                            return (
                            <TableRow
                                key={review.id}
                                className={`transition-colors hover:bg-muted/20 ${review.status === 'removed' ? 'opacity-50' : ''}`}
                            >
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold"
                                        >
                                            {initials || 'NA'}
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold">{reviewerName}</span>
                                            <p className="text-muted-foreground text-[10px]">{review.id}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <p className="text-sm font-semibold">
                                      {getPropertyTitle(review.propertyId)}
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
                                    <StatusBadge status={statusMeta.label} statusMap={{ [statusMeta.label]: statusMeta.style }} />
                                </TableCell>
                                <TableCell className="text-muted-foreground px-6 py-4 text-sm">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="px-4 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {review.status === 'published' && (
                                                <DropdownMenuItem
                                                  className="cursor-pointer text-amber-600 focus:text-amber-600"
                                                  onClick={() => updateStatus(review.id, 'flagged')}
                                                >
                                                    <Flag className="mr-2 h-4 w-4" />
                                                    <span>Flag Review</span>
                                                </DropdownMenuItem>
                                            )}
                                            {review.status !== 'removed' && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span onClick={() => removeReview(review.id)}>Remove Review</span>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
                <DataTablePagination
                    currentPage={meta.page || 1}
                    totalPages={meta.totalPages || 1}
                    totalItems={meta.total || 0}
                    itemsPerPage={meta.limit || 20}
                    itemLabel="reviews"
                    onPageChange={setPage}
                />
            </Card>
            )}
        </div>
    );
}

export default ReviewsPage;
