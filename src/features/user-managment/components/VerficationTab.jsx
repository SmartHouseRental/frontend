import { useState } from 'react';
import { Check, EyeOff, X, ZoomIn, ExternalLink, ShieldCheck, Clock, ShieldX, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router';
import { useUserDocuments } from '@/features/user-managment/hooks/useUserDocuments';
import { useResolveVerification } from '@/features/user-managment/hooks/useResolveVerification';
import { getImageUrl } from '@/lib/utils';

// ─── Lightbox Modal ───────────────────────────────────────────────────────────
function DocModal({ url, title, onClose }) {
  if (!url) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card relative max-h-[90vh] max-w-3xl w-full overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h4 className="text-primary font-bold">{title}</h4>
          <div className="flex gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-muted rounded-lg p-2 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
            <button onClick={onClose} className="hover:bg-muted rounded-lg p-2 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center overflow-auto bg-zinc-950 p-4">
          <img
            src={url}
            alt={title}
            className="max-h-[70vh] w-auto rounded-lg object-contain shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Document Card ─────────────────────────────────────────────────────────────
function DocumentCard({ title, url, status }) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!url) {
    return (
      <div className="border-dashed border-primary/10 flex flex-col items-center justify-center rounded-xl border-2 bg-muted/20 p-8 text-center">
        <p className="text-muted-foreground text-xs font-medium">Not uploaded</p>
        <p className="text-muted-foreground/60 mt-1 text-[10px]">{title}</p>
      </div>
    );
  }

  const statusBadge = {
    approved: { label: 'Approved', cls: 'bg-green-100 text-green-700' },
    rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-700' },
    pending: { label: 'Pending', cls: 'bg-yellow-100 text-yellow-700' },
    resubmit: { label: 'Resubmit', cls: 'bg-orange-100 text-orange-700' },
    under_review: { label: 'Under Review', cls: 'bg-blue-100 text-blue-700' },
  }[status] ?? { label: status ?? 'Unknown', cls: 'bg-muted text-muted-foreground' };

  return (
    <>
      {modalOpen && <DocModal url={url} title={title} onClose={() => setModalOpen(false)} />}
      <div className="border-primary/10 group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-zinc-900">
        <div
          className="relative h-52 cursor-pointer overflow-hidden bg-zinc-100 dark:bg-zinc-800"
          onClick={() => setModalOpen(true)}
        >
          <img
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={url}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-zinc-800">
              <ZoomIn size={14} /> View Full Size
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase shadow ${statusBadge.cls}`}>
              {statusBadge.label}
            </span>
          </div>
        </div>
        <div className="flex flex-col p-4">
          <h4 className="text-primary font-bold">{title}</h4>
          <p className="text-muted-foreground mt-0.5 text-[11px]">Click image to view full size</p>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
function VerficationTab() {
  const { id } = useParams();
  const { data: docs = [], isLoading, isError, refetch } = useUserDocuments(id);
  const { mutate: resolveDoc, isPending: isResolving } = useResolveVerification();
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col items-center justify-center gap-3 py-20">
        <Loader2 className="animate-spin text-primary" size={28} />
        <p className="text-muted-foreground text-sm">Fetching documents…</p>
      </div>
    );
  }

  // ── Error ──
  if (isError) {
    return (
      <div className="col-span-12 lg:col-span-8 xl:col-span-9 rounded-xl border border-red-200 bg-red-50/40 p-10 text-center">
        <ShieldX className="mx-auto mb-3 text-red-400" size={28} />
        <p className="font-bold text-red-700">Failed to load documents</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
          <RefreshCw size={14} className="mr-2" /> Retry
        </Button>
      </div>
    );
  }

  // ── No docs submitted ──
  const latestDoc = docs.length > 0 ? docs[0] : null;

  if (!latestDoc) {
    return (
      <div className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col items-center gap-4 rounded-xl border p-12 text-center">
        <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
          <ShieldX className="text-muted-foreground" size={28} />
        </div>
        <div>
          <p className="font-bold">No Documents Submitted</p>
          <p className="text-muted-foreground mt-1 text-sm">
            This owner has not uploaded their verification documents yet.
          </p>
        </div>
      </div>
    );
  }

  const { status, frontUrl, backUrl, livePhotoUrl, id: docId, submittedAt } = latestDoc;
  const isPendingStatus = status === 'pending';
  const isUnderReview = status === 'under_review';
  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';
  const isResubmit = status === 'resubmit';

  const handleResolve = (resolution) => {
    resolveDoc({ id: docId, status: resolution, note: note.trim() || undefined });
    setNote('');
    setShowNoteInput(false);
  };

  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Unknown';

  const uploadedCount = [frontUrl, backUrl, livePhotoUrl].filter(Boolean).length;

  return (
    <div className="col-span-12 space-y-6 lg:col-span-8 xl:col-span-9">

      {/* ── Progress Bar ── */}
      <div className="border-primary/10 rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <h3 className="text-primary mb-6 text-sm font-bold uppercase tracking-widest">
          Verification Progress
        </h3>
        <div className="relative flex justify-between">
          <div className="bg-primary/10 absolute top-5 left-0 z-0 h-0.5 w-full" />
          <div
            className={`absolute top-5 left-0 z-0 h-0.5 transition-all ${isApproved ? 'w-full bg-green-500' : isRejected || isResubmit ? 'w-full bg-red-400' : isUnderReview ? 'w-2/3 bg-blue-400' : 'w-1/3 bg-primary'
              }`}
          />
          {[
            { label: 'Submitted', done: true, icon: <Check size={16} className="text-white" /> },
            { label: 'Under Review', done: isUnderReview || isApproved || isRejected || isResubmit, icon: <EyeOff size={16} className="text-white" /> },
            { label: isApproved ? 'Verified' : isRejected ? 'Rejected' : isResubmit ? 'Resubmit' : 'Decision', done: isApproved, icon: <Check size={16} className="text-white" /> },
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all ${step.done
                  ? isRejected && i === 2 ? 'bg-red-400' : isResubmit && i === 2 ? 'bg-orange-400' : isUnderReview && i === 1 ? 'bg-blue-400' : 'bg-green-500'
                  : i === 0 ? 'bg-primary' : 'bg-muted'
                  }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-xs font-bold transition-all ${step.done
                  ? isRejected && i === 2 ? 'text-red-500' : isResubmit && i === 2 ? 'text-orange-500' : isUnderReview && i === 1 ? 'text-blue-500' : 'text-green-600'
                  : i === 0 ? 'text-primary' : 'text-muted-foreground'
                  }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Action Panel ── */}
      <div
        className={`rounded-xl border p-5 ${isApproved
          ? 'border-green-200 bg-green-50/50 dark:bg-green-950/20'
          : isRejected
            ? 'border-red-200 bg-red-50/50 dark:bg-red-950/20'
            : isResubmit
              ? 'border-orange-200 bg-orange-50/50 dark:bg-orange-950/20'
              : isUnderReview
                ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20'
                : 'border-primary/10 bg-white dark:bg-zinc-900'
          }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              {isApproved && <ShieldCheck className="text-green-600" size={18} />}
              {isRejected && <ShieldX className="text-red-500" size={18} />}
              {isResubmit && <RefreshCw className="text-orange-500" size={18} />}
              {isUnderReview && <Clock className="text-blue-500" size={18} />}
              {isPendingStatus && <Clock className="text-amber-500" size={18} />}
              <p className="font-bold">
                {isApproved ? 'Documents Approved' : isRejected ? 'Documents Rejected' : isResubmit ? 'Resubmission Required' : isUnderReview ? 'Under Review' : 'Awaiting Review'}
              </p>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Submitted {formattedDate} · {uploadedCount}/3 documents uploaded
            </p>
          </div>

          {isPendingStatus && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <Button
                  onClick={() => handleResolve('under_review')}
                  disabled={isResolving}
                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2 text-sm font-bold text-white hover:bg-blue-600 transition-all"
                >
                  <EyeOff size={16} /> Start Review
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="text-xs font-bold"
              >
                {showNoteInput ? 'Hide Note' : 'Add Note'}
              </Button>
            </div>
          )}

          {isUnderReview && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <Button
                  onClick={() => handleResolve('rejected')}
                  disabled={isResolving}
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2 text-sm font-bold text-white hover:bg-red-600 transition-all"
                >
                  <X size={16} /> Reject
                </Button>
                <Button
                  onClick={() => handleResolve('resubmit')}
                  disabled={isResolving}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2 text-sm font-bold text-white hover:bg-orange-600 transition-all"
                >
                  <RefreshCw size={16} /> Request Resubmit
                </Button>
                <Button
                  onClick={() => handleResolve('approved')}
                  disabled={isResolving}
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2 text-sm font-bold text-white hover:bg-green-600 transition-all"
                >
                  <Check size={16} /> Approve
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="text-xs font-bold"
              >
                {showNoteInput ? 'Hide Note' : 'Add Note'}
              </Button>
            </div>
          )}

          {!isPendingStatus && !isUnderReview && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleResolve('pending')}
                disabled={isResolving}
                className="text-xs font-bold"
              >
                Reset to Pending
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="text-xs font-bold"
              >
                {showNoteInput ? 'Hide Note' : 'Add Note'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ── Note Input Panel ── */}
      {showNoteInput && (
        <div className="border-primary/10 rounded-xl border bg-white p-5 dark:bg-zinc-900">
          <h4 className="text-primary mb-3 text-xs font-bold uppercase tracking-widest">
            Admin Note (Optional)
          </h4>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note explaining your decision (e.g., reason for rejection, additional requirements, etc.)..."
            className="w-full rounded-lg border border-primary/20 bg-muted/50 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-zinc-800"
            rows={3}
            maxLength={1000}
          />
          <p className="text-muted-foreground mt-1 text-[10px]">
            {note.length}/1000 characters
          </p>
        </div>
      )}

      {/* ── Document Grid ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DocumentCard title="National ID — Front" url={getImageUrl(frontUrl)} status={status} />
        <DocumentCard title="National ID — Back" url={getImageUrl(backUrl)} status={status} />
        <DocumentCard title="Live Photo" url={getImageUrl(livePhotoUrl)} status={status} />
      </div>

      {/* ── Previous submissions (if any) ── */}
      {docs.length > 1 && (
        <div className="border-primary/10 rounded-xl border bg-white p-5 dark:bg-zinc-900">
          <h4 className="text-primary mb-3 text-xs font-bold uppercase tracking-widest">
            Previous Submissions ({docs.length - 1})
          </h4>
          <div className="space-y-2">
            {docs.slice(1).map((d, i) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                <span className="text-xs font-medium">Submission #{docs.length - 1 - i}</span>
                <span className="text-muted-foreground text-[10px]">
                  {d.submittedAt ? new Date(d.submittedAt).toLocaleDateString() : '—'}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${d.status === 'approved' ? 'bg-green-100 text-green-700'
                    : d.status === 'rejected' ? 'bg-red-100 text-red-700'
                      : d.status === 'resubmit' ? 'bg-orange-100 text-orange-700'
                        : d.status === 'under_review' ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VerficationTab;
