import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeleteChatDialog({
  isOpen,
  subjectName = 'this conversation',
  isDeleting,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="Close"
        onClick={onCancel}
        disabled={isDeleting}
      />
      <div
        role="dialog"
        aria-labelledby="delete-chat-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <h2 id="delete-chat-title" className="text-lg font-bold text-foreground">
          Delete chat?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This removes your conversation with {subjectName} from your inbox. You can start a
          new chat later from a property listing.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="font-semibold"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete chat
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
