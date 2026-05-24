import { Check, X, FileText, ExternalLink, ImageIcon, IdCard, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminResolveVerification } from '@/features/admin/hooks/useAdmin';
import EmptyState from '@/components/EmptyState';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  under_review: 'bg-blue-100 text-blue-800 border-blue-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-800 border-rose-200',
};

function isImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /\.(jpe?g|png|gif|webp|bmp)(\?|$)/i.test(url) || url.includes('/image');
}

function DocumentPreviewCard({ label, url, icon: Icon }) {
  const showImage = isImageUrl(url);

  return (
    <Card className="border-primary/15 overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-muted/40 relative aspect-[4/3] overflow-hidden">
        {showImage ? (
          <img src={url} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-primary/50">
            <Icon size={36} strokeWidth={1.25} />
            <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
              Document
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
          <p className="text-xs font-bold text-white">{label}</p>
        </div>
      </div>
      <CardContent className="flex items-center justify-between gap-2 p-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
            <Icon size={16} />
          </div>
          <p className="truncate text-xs font-medium">{label}</p>
        </div>
        <Button variant="outline" size="sm" className="h-8 shrink-0 gap-1 text-xs" asChild>
          <a href={url} target="_blank" rel="noreferrer">
            <ExternalLink size={14} />
            View
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

function VerficationTab({ user }) {
  const resolveVerification = useAdminResolveVerification();
  const docs = user?.verificationDocs || [];

  if (docs.length === 0) {
    return (
      <EmptyState
        title="No verification documents"
        description="This user has not submitted verification documents yet."
      />
    );
  }

  return (
    <div className="space-y-8">
      {docs.map((doc) => {
        const files = [
          { key: 'front', label: 'National ID (Front)', url: doc.frontUrl, icon: IdCard },
          { key: 'back', label: 'National ID (Back)', url: doc.backUrl, icon: IdCard },
          { key: 'live', label: 'Live verification photo', url: doc.livePhotoUrl, icon: Camera },
        ].filter((f) => f.url);

        const statusStyle =
          STATUS_STYLES[doc.status] || 'bg-muted text-muted-foreground border-border';

        return (
          <div
            key={doc.id}
            className="border-primary/10 space-y-5 rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-primary font-bold">Verification submission</h4>
                    <Badge variant="outline" className={`text-[10px] font-bold uppercase ${statusStyle}`}>
                      {(doc.status || 'pending').replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Submitted{' '}
                    {doc.submittedAt
                      ? new Date(doc.submittedAt).toLocaleString()
                      : '—'}
                  </p>
                  {doc.note && (
                    <p className="text-muted-foreground mt-2 text-sm">
                      <span className="font-medium text-foreground">Note:</span> {doc.note}
                    </p>
                  )}
                </div>
              </div>

              {(doc.status === 'pending' || doc.status === 'under_review') && (
                <div className="flex shrink-0 gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      resolveVerification.mutate({ id: doc.id, status: 'approved' })
                    }
                  >
                    <Check size={16} /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      resolveVerification.mutate({ id: doc.id, status: 'rejected' })
                    }
                  >
                    <X size={16} /> Reject
                  </Button>
                </div>
              )}
            </div>

            {files.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {files.map((file) => (
                  <DocumentPreviewCard
                    key={`${doc.id}-${file.key}`}
                    label={file.label}
                    url={file.url}
                    icon={file.icon}
                  />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground flex items-center gap-2 rounded-lg border border-dashed p-6 text-sm">
                <ImageIcon size={18} />
                No document files attached to this submission.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default VerficationTab;
