import { useMemo, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationsView from '@/features/notifications/components/NotificationsView';
import { useNotifications, getUnreadCount } from '@/features/notifications/hooks/useNotifications';
import {
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from '@/features/notifications/hooks/useMarkNotificationRead';
import { getNotificationErrorMessage } from '@/features/notifications/utils/apiErrors';
import { useTranslation } from 'react-i18next';

const HIDDEN_STORAGE_KEY = 'shr_owner_hidden_notifications';

function loadHiddenIds() {
  try {
    const raw = sessionStorage.getItem(HIDDEN_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveHiddenIds(set) {
  try {
    sessionStorage.setItem(HIDDEN_STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

function NotificationsPage() {
  const { data: notifications = [], isLoading, isError, error, refetch } = useNotifications();
  const markAsReadMutation = useMarkNotificationRead();
  const markAllMutation = useMarkAllNotificationsRead();
  const { t } = useTranslation();
  const pageTitle = t('owner.notifications.title');

  const [hiddenIds, setHiddenIds] = useState(loadHiddenIds);

  const visibleNotifications = useMemo(
    () => notifications.filter((n) => !hiddenIds.has(n.id)),
    [notifications, hiddenIds],
  );

  const unreadCount = useMemo(
    () => getUnreadCount(visibleNotifications),
    [visibleNotifications],
  );

  const hideNotification = useCallback((id) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      saveHiddenIds(next);
      return next;
    });
  }, []);

  const handleMarkAllRead = () => {
    const unreadIds = visibleNotifications.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    markAllMutation.mutate(unreadIds);
  };

  const handleToggleRead = (id) => {
    const notification = visibleNotifications.find((n) => n.id === id);
    if (notification && !notification.read) {
      markAsReadMutation.mutate(id);
    }
  };

  const handleDismiss = (id) => {
    const notification = visibleNotifications.find((n) => n.id === id);
    if (!notification) return;

    if (!notification.read) {
      markAsReadMutation.mutate(id, {
        onSuccess: () => hideNotification(id),
      });
    } else {
      hideNotification(id);
      toast.success(t('owner.notifications.toastHidden'));
    }
  };

  const handleClearAll = () => {
    const readIds = visibleNotifications.filter((n) => n.read).map((n) => n.id);
    if (readIds.length === 0) {
      toast.info(t('owner.notifications.toastNoReadClear'));
      return;
    }
    setHiddenIds((prev) => {
      const next = new Set(prev);
      readIds.forEach((id) => next.add(id));
      saveHiddenIds(next);
      return next;
    });
    toast.success(t('owner.notifications.toastCleared'));
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm font-medium">{t('owner.notifications.loading')}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="bg-destructive/10 rounded-full p-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <p className="text-destructive font-semibold">{t('owner.notifications.failed')}</p>
        <p className="text-sm text-muted-foreground max-w-md">
          {getNotificationErrorMessage(error, t('owner.notifications.unableToLoad'))}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          {t('owner.notifications.tryAgain')}
        </Button>
      </div>
    );
  }

  return (
    <NotificationsView
      notifications={visibleNotifications}
      unreadCount={unreadCount}
      onMarkAllRead={handleMarkAllRead}
      onToggleRead={handleToggleRead}
      onDismiss={handleDismiss}
      onClearAll={handleClearAll}
      isMarkingAll={markAllMutation.isPending}
      isMarkingOne={markAsReadMutation.isPending}
      title={pageTitle}
      subtitle={t('owner.notifications.subtitle')}
    />
  );
}

export default NotificationsPage;
