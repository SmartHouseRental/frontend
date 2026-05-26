import { useTranslation } from 'react-i18next';
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeleteChatDialog({
  isOpen,
  subjectName,
  isDeleting,
  onConfirm,
  onCancel,
}) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label={t('chat.closeDialog')}
        onClick={onCancel}
        disabled={isDeleting}
      />
      <div
        role="dialog"
        aria-labelledby="delete-chat-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <h2 id="delete-chat-title" className="text-lg font-bold text-foreground">
          {t('chat.deleteChatTitle')}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('chat.deleteChatDescription', {
            subjectName: subjectName || t('chat.deleteChatTitle'),
          })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            {t('chat.cancel')}
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
                {t('chat.deleting')}
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                {t('chat.deleteChat')}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
