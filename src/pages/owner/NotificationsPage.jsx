import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CalendarDays, Handshake, DollarSign, AlertTriangle, Settings, CheckCheck, Clock } from 'lucide-react';

function NotificationsPage() {
    const notifications = [
        { id: 1, type: 'appointment', title: 'New Appointment Request', desc: 'Sara Tesfaye wants to view Luxury Villa in Bole Atlas on Mar 22.', time: '5 minutes ago', read: false },
        { id: 2, type: 'agreement', title: 'Agreement Signed', desc: 'Mulugeta Kebede signed the rental agreement for Bole Skyline Apartment.', time: '2 hours ago', read: false },
        { id: 3, type: 'payment', title: 'Payment Received', desc: '45,000 ETB received for Bole Skyline Apartment — March rent.', time: '5 hours ago', read: false },
        { id: 4, type: 'report', title: 'Report Filed', desc: 'A noise complaint has been filed against your property at CMC Penthouse.', time: '1 day ago', read: true },
        { id: 5, type: 'system', title: 'Profile Verification Approved', desc: 'Your identity documents have been verified. Your account is now fully active.', time: '2 days ago', read: true },
        { id: 6, type: 'appointment', title: 'Appointment Cancelled', desc: 'Abebe Wolde cancelled the viewing for Modern Studio in Kazanchis.', time: '3 days ago', read: true },
        { id: 7, type: 'payment', title: 'Payment Confirmation Pending', desc: 'Payment proof uploaded for Cottage by the Lake — awaiting your confirmation.', time: '4 days ago', read: true },
        { id: 8, type: 'system', title: 'New Feature: Analytics Dashboard', desc: 'Check out the new analytics dashboard to track your property performance in real-time.', time: '1 week ago', read: true },
    ];

    const typeConfig = {
        appointment: { icon: CalendarDays, color: 'bg-amber-500/10 text-amber-500' },
        agreement: { icon: Handshake, color: 'bg-emerald-500/10 text-emerald-500' },
        payment: { icon: DollarSign, color: 'bg-blue-500/10 text-blue-500' },
        report: { icon: AlertTriangle, color: 'bg-rose-500/10 text-rose-500' },
        system: { icon: Settings, color: 'bg-primary/10 text-primary' },
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const NotificationItem = ({ n }) => {
        const config = typeConfig[n.type];
        const Icon = config.icon;
        return (
            <div className={`flex items-start gap-4 rounded-xl p-4 transition-colors ${n.read ? 'hover:bg-muted/30' : 'bg-primary/3 hover:bg-primary/5'}`}>
                <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.color}`}>
                    <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className={`text-sm ${n.read ? 'font-medium text-foreground' : 'font-bold text-foreground'}`}>{n.title}</p>
                        {!n.read && <span className="size-2 rounded-full bg-primary shrink-0"></span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.desc}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-2 flex items-center gap-1">
                        <Clock size={10} /> {n.time}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Notifications</h1>
                    <p className="text-muted-foreground mt-1">Stay updated on your property activities.</p>
                </div>
                <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                        <Button variant="outline" className="gap-2 text-sm">
                            <CheckCheck size={14} /> Mark all as read
                        </Button>
                    )}
                </div>
            </div>

            {unreadCount > 0 && (
                <Card className="border-primary/20 bg-primary/3">
                    <CardContent className="flex items-center gap-3 py-3">
                        <Bell size={18} className="text-primary" />
                        <p className="text-sm font-medium text-foreground">You have <span className="font-bold text-primary">{unreadCount} unread</span> notifications</p>
                    </CardContent>
                </Card>
            )}

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-muted/50">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="appointment">Appointments</TabsTrigger>
                    <TabsTrigger value="agreement">Agreements</TabsTrigger>
                    <TabsTrigger value="payment">Payments</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    <Card className="gap-0 p-0 overflow-hidden">
                        <div className="divide-y divide-border">
                            {notifications.map((n) => <NotificationItem key={n.id} n={n} />)}
                        </div>
                    </Card>
                </TabsContent>

                {['appointment', 'agreement', 'payment', 'system'].map((type) => (
                    <TabsContent key={type} value={type} className="mt-4">
                        <Card className="gap-0 p-0 overflow-hidden">
                            <div className="divide-y divide-border">
                                {notifications.filter(n => n.type === type).map((n) => <NotificationItem key={n.id} n={n} />)}
                            </div>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

export default NotificationsPage;
