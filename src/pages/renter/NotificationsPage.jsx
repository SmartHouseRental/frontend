import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import NotificationsView from '@/features/notifications/components/NotificationsView';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';
import { useMarkNotificationRead } from '@/features/notifications/hooks/useMarkNotificationRead';
import { notificationKeys } from '@/features/notifications/constants';
import { Loader2 } from 'lucide-react';

export default function RenterNotificationsPage() {
    const { data: notifications = [], isLoading, isError, error } = useNotifications();
    const markAsReadMutation = useMarkNotificationRead();
    const queryClient = useQueryClient();

    const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

    // TODO: These are UI-only features until API support is added for bulk actions.
    const handleMarkAllRead = () => {
        // Optimistically update all to read
        queryClient.setQueryData(notificationKeys.lists(), (old) => {
            if (!old) return old;
            return old.map(n => ({ ...n, read: true, readAt: new Date().toISOString() }));
        });
        // In a real app, you'd trigger a bulk mutation here.
    };

    const handleToggleRead = (id) => {
        const notification = notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            markAsReadMutation.mutate(id);
        }
    };

    const handleDismiss = (id) => {
        // UI-only feature for now
        queryClient.setQueryData(notificationKeys.lists(), (old) => {
            if (!old) return old;
            return old.filter(n => n.id !== id);
        });
    };

    const handleClearAll = () => {
        // UI-only feature for now
        queryClient.setQueryData(notificationKeys.lists(), (old) => {
            if (!old) return old;
            return old.filter(n => !n.read);
        });
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm font-medium">Loading notifications...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="text-destructive font-semibold">Failed to load notifications</div>
                <p className="text-muted-foreground text-sm">{error?.message || 'Something went wrong.'}</p>
            </div>
        );
    }

    return (
        <NotificationsView 
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAllRead={handleMarkAllRead}
            onToggleRead={handleToggleRead}
            onDismiss={handleDismiss}
            onClearAll={handleClearAll}
        />
    );
}
