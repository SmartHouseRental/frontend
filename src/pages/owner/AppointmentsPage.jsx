import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, CheckCircle2, XCircle, User, MapPin, MessageSquare, ChevronRight } from 'lucide-react';

function AppointmentsPage() {
    const appointments = [
        { id: 'APT-301', renter: 'Sara Tesfaye', property: 'Luxury Villa in Bole Atlas', date: 'Mar 22, 2026', time: '10:00 AM', status: 'Pending', avatar: 'S' },
        { id: 'APT-302', renter: 'Mulugeta Kebede', property: 'Bole Skyline Apartment', date: 'Mar 23, 2026', time: '2:00 PM', status: 'Confirmed', avatar: 'M' },
        { id: 'APT-303', renter: 'Helen Girma', property: 'Cottage by the Lake', date: 'Mar 25, 2026', time: '11:30 AM', status: 'Pending', avatar: 'H' },
        { id: 'APT-304', renter: 'Abebe Wolde', property: 'Modern Studio in Kazanchis', date: 'Mar 18, 2026', time: '3:00 PM', status: 'Completed', avatar: 'A' },
        { id: 'APT-305', renter: 'Tigist Haile', property: 'Penthouse Suite CMC', date: 'Mar 15, 2026', time: '9:00 AM', status: 'Cancelled', avatar: 'T' },
        { id: 'APT-306', renter: 'Yonas Desta', property: 'Luxury Villa in Bole Atlas', date: 'Mar 12, 2026', time: '4:30 PM', status: 'Completed', avatar: 'Y' },
    ];

    const statusConfig = {
        Pending: { color: 'bg-amber-100 text-amber-700', icon: Clock },
        Confirmed: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
        Completed: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 },
        Cancelled: { color: 'bg-rose-100 text-rose-700', icon: XCircle },
    };

    const AppointmentCard = ({ apt }) => {
        const config = statusConfig[apt.status];
        const StatusIcon = config.icon;
        return (
            <Card className="group hover:shadow-md transition-shadow hover:border-primary/20">
                <CardContent className="flex items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                        {apt.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-foreground truncate">{apt.renter}</p>
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${config.color}`}>
                                <StatusIcon size={10} className="inline mr-1" />
                                {apt.status}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin size={10} /> {apt.property}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <CalendarDays size={12} /> {apt.date}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock size={12} /> {apt.time}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {apt.status === 'Pending' && (
                            <>
                                <Button size="sm" className="h-8 text-xs">Accept</Button>
                                <Button size="sm" variant="outline" className="h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/5">Reject</Button>
                            </>
                        )}
                        {apt.status === 'Confirmed' && (
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                                <MessageSquare size={12} /> Add Notes
                            </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    };

    const upcoming = appointments.filter(a => a.status === 'Pending' || a.status === 'Confirmed');
    const past = appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Appointments</h1>
                    <p className="text-muted-foreground mt-1">Manage property viewing appointments with potential renters.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <CalendarDays size={18} className="text-primary" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Total</p>
                            <p className="text-xl font-extrabold">24</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                            <Clock size={18} className="text-amber-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Pending</p>
                            <p className="text-xl font-extrabold text-amber-600">3</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Confirmed</p>
                            <p className="text-xl font-extrabold text-emerald-600">5</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0">
                    <CardContent className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                            <User size={18} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">This Month</p>
                            <p className="text-xl font-extrabold text-blue-600">8</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="bg-muted/50">
                    <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
                    <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
                    <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-3 mt-4">
                    {upcoming.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)}
                </TabsContent>

                <TabsContent value="past" className="space-y-3 mt-4">
                    {past.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)}
                </TabsContent>

                <TabsContent value="all" className="space-y-3 mt-4">
                    {appointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)}
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default AppointmentsPage;
