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

const notifications = [
    {
        id: 1,
        type: 'document_approval',
        title: 'New Document Submission',
        content: 'Mulugeta Abebe submitted verification documents for review.',
        time: '5 minutes ago',
        isRead: false,
        icon: FileText,
        iconColor: 'text-blue-600 bg-blue-50',
    },
    {
        id: 2,
        type: 'report',
        title: 'Urgent Fraud Report',
        content: 'A high-severity fraud report has been filed against property #PRP-2841.',
        time: '23 minutes ago',
        isRead: false,
        icon: AlertTriangle,
        iconColor: 'text-rose-600 bg-rose-50',
    },
    {
        id: 3,
        type: 'agreement_update',
        title: 'Agreement Activated',
        content: 'Agreement #AG-9428 between Mulugeta K. and Tadesse W. is now active after payment confirmation.',
        time: '1 hour ago',
        isRead: false,
        icon: Handshake,
        iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
        id: 4,
        type: 'property_update',
        title: 'Property Auto-Approved',
        content: 'Luxury Villa in Bole Atlas by verified owner Michael Chen was auto-approved.',
        time: '2 hours ago',
        isRead: true,
        icon: Home,
        iconColor: 'text-primary bg-primary/10',
    },
    {
        id: 5,
        type: 'payment_confirmation',
        title: 'Payment Proof Uploaded',
        content: 'Renter Abebe B. uploaded payment proof for agreement #AG-1024.',
        time: '3 hours ago',
        isRead: true,
        icon: CheckCircle2,
        iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
        id: 6,
        type: 'message',
        title: 'New Support Message',
        content: 'Tigist Hailu sent a message regarding her property verification delay.',
        time: '5 hours ago',
        isRead: true,
        icon: MessageCircle,
        iconColor: 'text-violet-600 bg-violet-50',
    },
    {
        id: 7,
        type: 'report',
        title: 'Report Resolved',
        content: 'Report #RPT-4521 against David Vance has been marked as resolved.',
        time: '1 day ago',
        isRead: true,
        icon: Shield,
        iconColor: 'text-emerald-600 bg-emerald-50',
    },
];

function NotificationsPage() {
    const [broadcastTarget, setBroadcastTarget] = useState('');

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
                        {notifications.map((notification) => {
                            const IconComp = notification.icon;
                            return (
                                <Card
                                    key={notification.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${!notification.isRead ? 'border-primary/20 bg-primary/[0.02]' : ''
                                        }`}
                                >
                                    <CardContent className="flex items-start gap-4 p-5">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notification.iconColor}`}
                                        >
                                            <IconComp size={18} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p
                                                        className={`text-sm ${!notification.isRead ? 'font-bold' : 'font-semibold'}`}
                                                    >
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                                        {notification.content}
                                                    </p>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-2">
                                                    <span className="text-muted-foreground whitespace-nowrap text-[11px]">
                                                        {notification.time}
                                                    </span>
                                                    {!notification.isRead && (
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
                                            <SelectItem value="pending_owners">Pending Owners</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    Notification Title
                                </label>
                                <Input placeholder="e.g. Platform Maintenance Notice" />
                            </div>

                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    Message
                                </label>
                                <Textarea
                                    placeholder="Write your broadcast message..."
                                    className="min-h-[120px] resize-none"
                                />
                            </div>

                            <Button className="w-full gap-2">
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
                                    {notifications.filter((n) => !n.isRead).length}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Today</span>
                                <span className="font-bold">6</span>
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
