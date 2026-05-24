import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Bell,
    Send,
    CheckCircle2,
    Clock,
    AlertTriangle,
    FileText,
    Handshake,
    Home,
    Users,
    MessageCircle,
    Shield,
} from 'lucide-react';
import { useMemo } from 'react';
import { useAdminBroadcastNotification, useAdminNotifications } from '@/features/admin/hooks/useAdmin';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import TableSkeleton from '@/components/TableSkeleton';

function NotificationsPage() {
    const [broadcastTarget, setBroadcastTarget] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const { data, isLoading, isError, refetch } = useAdminNotifications({ page: 1, limit: 50 });
    const broadcastMutation = useAdminBroadcastNotification();
    const notifications = getAdminListItems(data);

    const typeMeta = {
      MESSAGE_NEW: { icon: MessageCircle, iconColor: 'text-violet-600 bg-violet-50' },
      APPOINTMENT_BOOKED: { icon: Handshake, iconColor: 'text-emerald-600 bg-emerald-50' },
      APPOINTMENT_UPDATED: { icon: Clock, iconColor: 'text-amber-600 bg-amber-50' },
      PAYMENT_RECEIVED: { icon: CheckCircle2, iconColor: 'text-emerald-600 bg-emerald-50' },
      PAYMENT_CONFIRMED: { icon: Shield, iconColor: 'text-blue-600 bg-blue-50' },
    };

    const stats = useMemo(() => {
      const unread = notifications.filter((item) => !item.readAt).length;
      const today = notifications.filter((item) => {
        const now = new Date();
        const created = new Date(item.createdAt);
        return created.toDateString() === now.toDateString();
      }).length;
      return { unread, today };
    }, [notifications]);

    const sendBroadcast = () => {
      if (!broadcastTarget || !title.trim() || !message.trim()) return;
      broadcastMutation.mutate({
        audience: broadcastTarget,
        title: title.trim(),
        message: message.trim(),
      });
    };

    return (
        <div className="space-y-8 p-8">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Notifications</h2>
                <p className="text-muted-foreground mt-1">
                    Manage platform notifications and send broadcasts to users.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Notifications List */}
                <div className="space-y-4 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">Recent Notifications</h3>
                        <Button variant="outline" size="sm" className="text-xs">
                            Mark All as Read
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {isLoading ? (
                          <TableSkeleton rows={4} columns={1} showHeader={false} />
                        ) : isError ? (
                          <ErrorState title="Failed to load notifications" onRetry={refetch} />
                        ) : notifications.length === 0 ? (
                          <EmptyState title="No notifications yet" description="Recent platform notifications will appear here." />
                        ) : notifications.map((notification) => {
                            const meta = typeMeta[notification.type] || {
                              icon: Bell,
                              iconColor: 'text-primary bg-primary/10',
                            };
                            const IconComp = meta.icon;
                            return (
                                <Card
                                    key={notification.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${!notification.readAt ? 'border-primary/20 bg-primary/[0.02]' : ''
                                        }`}
                                >
                                    <CardContent className="flex items-start gap-4 p-5">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.iconColor}`}
                                        >
                                            <IconComp size={18} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className={`text-sm ${!notification.readAt ? 'font-bold' : 'font-semibold'}`}>
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                                        {notification.body}
                                                    </p>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-2">
                                                    <span className="text-muted-foreground whitespace-nowrap text-[11px]">
                                                        {new Date(notification.createdAt).toLocaleString()}
                                                    </span>
                                                    {!notification.readAt && (
                                                        <span className="bg-primary h-2 w-2 rounded-full" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Broadcast Panel */}
                <div className="space-y-6">
                    <Card className="border-primary/20">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                                    <Send size={18} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold">Send Broadcast</h3>
                                    <p className="text-muted-foreground text-xs">
                                        Notify users platform-wide
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    Target Audience
                                </label>
                                <Select onValueChange={setBroadcastTarget} value={broadcastTarget}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select audience" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">
                                                <span className="flex items-center gap-2">
                                                    <Users size={14} /> All Users
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="renters">Renters Only</SelectItem>
                                            <SelectItem value="owners">Owners Only</SelectItem>
                                            <SelectItem value="verified_owners">Verified Owners</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    Notification Title
                                </label>
                                <Input
                                  placeholder="e.g. Platform Maintenance Notice"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    Message
                                </label>
                                <Textarea
                                    placeholder="Write your broadcast message..."
                                    className="min-h-[120px] resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <Button className="w-full gap-2" onClick={sendBroadcast}>
                                <Send size={16} />
                                Send Broadcast
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="p-5">
                        <h4 className="text-muted-foreground mb-4 text-xs font-bold uppercase tracking-wider">
                            Notification Stats
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Unread</span>
                                <span className="font-bold text-amber-600">
                                    {stats.unread}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Today</span>
                                <span className="font-bold">{stats.today}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">This Week</span>
                                <span className="font-bold">32</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Broadcasts Sent</span>
                                <span className="font-bold">4</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default NotificationsPage;
