import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CalendarDays, Handshake, DollarSign, AlertTriangle, Settings, CheckCheck, Clock, Trash2, X } from 'lucide-react';

const typeConfig = {
    appointment: { icon: CalendarDays, color: 'bg-amber-500/10 text-amber-500' },
    agreement: { icon: Handshake, color: 'bg-emerald-500/10 text-emerald-500' },
    payment: { icon: DollarSign, color: 'bg-blue-500/10 text-blue-500' },
    report: { icon: AlertTriangle, color: 'bg-rose-500/10 text-rose-500' },
    system: { icon: Settings, color: 'bg-primary/10 text-primary' },
    message: { icon: Bell, color: 'bg-indigo-500/10 text-indigo-500' },
};

export default function NotificationsView({ 
    notifications = [], 
    unreadCount = 0, 
    onMarkAllRead, 
    onToggleRead, 
    onDismiss, 
    onClearAll 
}) {
    const [activeTab, setActiveTab] = useState('all');

    const getFiltered = (type) => {
        if (type === 'all') return notifications;
        return notifications.filter(n => n.type === type);
    };

    const NotificationItem = ({ n }) => {
        const config = typeConfig[n.type] || typeConfig.system;
        const Icon = config.icon;
        
        return (
            <div className={`flex items-start gap-4 rounded-xl p-4 transition-all duration-200 group ${n.read ? 'hover:bg-muted/30' : 'bg-primary/3 hover:bg-primary/5'}`}>
                <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.color} transition-transform group-hover:scale-110`}>
                    <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className={`text-sm ${n.read ? 'font-medium text-foreground' : 'font-bold text-foreground'}`}>{n.title}</p>
                        {!n.read && <span className="size-2 rounded-full bg-primary shrink-0 animate-pulse"></span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.desc || n.body}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-2 flex items-center gap-1">
                        <Clock size={10} /> {n.time || new Date(n.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" title={n.read ? 'Mark as unread' : 'Mark as read'} onClick={() => onToggleRead(n.id)}>
                        {n.read ? <Bell size={12} /> : <CheckCheck size={12} />}
                    </Button>
                    {onDismiss && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => onDismiss(n.id)} title="Dismiss">
                            <X size={12} />
                        </Button>
                    )}
                </div>
            </div>
        );
    };

    const tabs = [
        { value: 'all', label: 'All' },
        { value: 'appointment', label: 'Appointments' },
        { value: 'agreement', label: 'Agreements' },
        { value: 'payment', label: 'Payments' },
        { value: 'system', label: 'System' },
    ];

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Notifications</h1>
                    <p className="text-muted-foreground mt-1">Stay updated on your rental activities.</p>
                </div>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && onMarkAllRead && (
                        <Button variant="outline" className="gap-2 text-sm" onClick={onMarkAllRead}>
                            <CheckCheck size={14} /> Mark all read
                        </Button>
                    )}
                    {notifications.some(n => n.read) && onClearAll && (
                        <Button variant="ghost" className="gap-2 text-sm text-muted-foreground" onClick={onClearAll}>
                            <Trash2 size={14} /> Clear read
                        </Button>
                    )}
                </div>
            </div>

            {unreadCount > 0 && (
                <Card className="border-primary/20 bg-primary/3">
                    <CardContent className="flex items-center gap-3 py-3">
                        <div className="relative">
                            <Bell size={18} className="text-primary" />
                            <span className="absolute -top-1 -right-1 size-3.5 rounded-full bg-primary text-[8px] font-bold text-primary-foreground flex items-center justify-center">{unreadCount}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">You have <span className="font-bold text-primary">{unreadCount} unread</span> notification{unreadCount > 1 ? 's' : ''}</p>
                    </CardContent>
                </Card>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-muted/50 flex-wrap h-auto p-1">
                    {tabs.map(t => (
                        <TabsTrigger key={t.value} value={t.value}>
                            {t.label}
                            {getFiltered(t.value).filter(n => !n.read).length > 0 && (
                                <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                                    {getFiltered(t.value).filter(n => !n.read).length}
                                </span>
                            )}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabs.map(t => (
                    <TabsContent key={t.value} value={t.value} className="mt-4">
                        <Card className="gap-0 p-0 overflow-hidden">
                            {getFiltered(t.value).length === 0 ? (
                                <div className="p-12 text-center">
                                    <Bell size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                                    <p className="text-sm text-muted-foreground">No notifications</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-border">
                                    {getFiltered(t.value).map((n) => <NotificationItem key={n.id} n={n} />)}
                                </div>
                            )}
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
