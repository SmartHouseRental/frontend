import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, ChevronRight, Loader2, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeImage from '@/components/SafeImage';
import { useAgreements } from '../hooks/useAgreements';
import { AgreementStatusBadge } from '../agreements/statusBadge';
import { AGREEMENT_FILTER_TABS } from '../agreements/constants';

export default function AgreementList() {
  const [statusFilter, setStatusFilter] = useState('all');

  const queryParams =
    statusFilter === 'all' ? { limit: 50 } : { status: statusFilter, limit: 50 };

  const { data, isLoading, isFetching, isError, error, refetch } = useAgreements(queryParams);
  const agreements = data?.items ?? [];
  const isInitialLoad = isLoading && !data;

  if (isInitialLoad) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-destructive font-medium">Failed to load agreements</p>
        <p className="text-muted-foreground text-sm max-w-md">
          {error?.response?.data?.message || error?.message || 'Please try again.'}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {AGREEMENT_FILTER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="relative min-h-[120px]">
        {isFetching && (
          <div className="absolute right-0 top-0 z-10 flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="sr-only">Updating list</span>
          </div>
        )}

        {agreements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold text-lg">No agreements found</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">
              {statusFilter === 'all'
                ? 'When a property owner sends you a rental offer, it will appear here.'
                : 'No agreements match this filter.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {agreements.map((agreement) => (
              <Card
                key={agreement.id}
                className="border-slate-200 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row p-4 sm:p-5 gap-5">
                  <div className="w-full sm:w-56 lg:w-64 shrink-0">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl relative">
                      <SafeImage
                        src={agreement.propertyImage}
                        alt={agreement.propertyTitle}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <AgreementStatusBadge
                          status={agreement.status}
                          label={agreement.statusLabel}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold truncate">{agreement.propertyTitle}</h3>
                          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span className="line-clamp-2">{agreement.propertyAddress}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-2xl font-bold text-primary">
                            {agreement.monthlyRentFormatted}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">
                            per month
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-slate-100">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">
                            Owner
                          </p>
                          <span className="text-sm font-semibold">{agreement.ownerName}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">
                            Lease start
                          </p>
                          <span className="text-sm font-semibold">
                            {agreement.startDateFormatted}
                          </span>
                        </div>
                        {agreement.depositFormatted !== '—' && (
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">
                              Deposit
                            </p>
                            <span className="text-sm font-semibold">
                              {agreement.depositFormatted}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                      <Link to={`/renter/agreements/${agreement.id}`}>
                        <Button variant="ghost" className="font-bold text-primary">
                          View details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
