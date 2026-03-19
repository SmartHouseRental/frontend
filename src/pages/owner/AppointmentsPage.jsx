import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, CheckCircle2, XCircle, User, MapPin, MessageSquare, ChevronRight, Phone, Mail, AlertCircle } from 'lucide-react';

const initialAppointments = [
    { id: 'APT-301', renter: 'Sara Tesfaye', phone: '+251 91 111 2222', email: 'sara.t@email.com', property: 'Luxury Villa in Bole Atlas', date: 'Mar 22, 2026', time: '10:00 AM', status: 'Pending', avatar: 'S', notes: '' },
    { id: 'APT-302', renter: 'Mulugeta Kebede', phone: '+251 91 234 5678', email: 'mulugeta.k@email.com', property: 'Bole Skyline Apartment', date: 'Mar 23, 2026', time: '2:00 PM', status: 'Confirmed', avatar: 'M', notes: 'Renter will bring a friend to help evaluate.' },
    { id: 'APT-303', renter: 'Helen Girma', phone: '+251 91 333 4444', email: 'helen.g@email.com', property: 'Cottage by the Lake', date: 'Mar 25, 2026', time: '11:30 AM', status: 'Pending', avatar: 'H', notes: '' },
    { id: 'APT-304', renter: 'Abebe Wolde', phone: '+251 91 555 6666', email: 'abebe.w@email.com', property: 'Modern Studio in Kazanchis', date: 'Mar 18, 2026', time: '3:00 PM', status: 'Completed', avatar: 'A', notes: 'Very interested. Follow up on agreement.' },
    { id: 'APT-305', renter: 'Tigist Haile', phone: '+251 91 777 8888', email: 'tigist.h@email.com', property: 'Penthouse Suite CMC', date: 'Mar 15, 2026', time: '9:00 AM', status: 'Cancelled', avatar: 'T', notes: 'Renter found another property.' },
    { id: 'APT-306', renter: 'Yonas Desta', phone: '+251 91 999 0000', email: 'yonas.d@email.com', property: 'Luxury Villa in Bole Atlas', date: 'Mar 12, 2026', time: '4:30 PM', status: 'Completed', avatar: 'Y', notes: 'Positive feedback, might sign agreement.' },
];

const statusConfig = {
    Pending: { color: 'bg-amber-100 text-amber-700', icon: Clock },
    Confirmed: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
    Completed: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 },
    Cancelled: { color: 'bg-rose-100 text-rose-700', icon: XCircle },
};

function AppointmentsPage() {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [expandedId, setExpandedId] = useState(null);
    const [noteInputs, setNoteInputs] = useState({});
    const [confirmAction, setConfirmAction] = useState(null); // { id, action }

    const handleAccept = (id) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Confirmed' } : a));
        setConfirmAction(null);
    };

    const handleReject = (id) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
        setConfirmAction(null);
    };

    const handleSaveNote = (id) => {
        const note = noteInputs[id];
        if (!note?.trim()) return;
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, notes: note } : a));
        setNoteInputs(prev => ({ ...prev, [id]: '' }));
    };

    const stats = useMemo(() => ({
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'Pending').length,
        confirmed: appointments.filter(a => a.status === 'Confirmed').length,
        completed: appointments.filter(a => a.status === 'Completed').length,
    }), [appointments]);

    const upcoming = appointments.filter(a => a.status === 'Pending' || a.status === 'Confirmed');
    const past = appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');

    const AppointmentCard = ({ apt }) => {
        const config = statusConfig[apt.status];
        const StatusIcon = config.icon;
        const isExpanded = expandedId === apt.id;
        const isConfirming = confirmAction?.id === apt.id;

        return (
            <Card className={`group transition-all duration-300 ${isExpanded ? 'shadow-md border-primary/20 ring-1 ring-primary/10' : 'hover:shadow-md hover:border-primary/10'}`}>
                <CardContent className="space-y-0">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                            {apt.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-foreground truncate">{apt.renter}</p>
                                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase inline-flex items-center gap-1 ${config.color}`}>
                                    <StatusIcon size={10} />
                                    {apt.status}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin size={10} /> {apt.property}
                            </p>
                            <div className="flex items-center gap-4 mt-1.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <CalendarDays size={12} /> {apt.date}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock size={12} /> {apt.time}
                                </span>
                                <span className="text-[10px] text-muted-foreground/60">{apt.id}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            {apt.status === 'Pending' && !isConfirming && (
                                <>
                                    <Button size="sm" className="h-8 text-xs gap-1" onClick={() => setConfirmAction({ id: apt.id, action: 'accept' })}>
                                        <CheckCircle2 size={12} /> Accept
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/5 gap-1" onClick={() => setConfirmAction({ id: apt.id, action: 'reject' })}>
                                        <XCircle size={12} /> Reject
                                    </Button>
                                </>
                            )}
                            {isConfirming && (
                                <div className="flex items-center gap-2 animate-in fade-in-0 duration-200">
                                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {confirmAction.action === 'accept' ? 'Confirm accept?' : 'Confirm reject?'}
                                    </span>
                                    <Button size="sm" variant={confirmAction.action === 'accept' ? 'default' : 'destructive'} className="h-7 text-xs"
                                        onClick={() => confirmAction.action === 'accept' ? handleAccept(apt.id) : handleReject(apt.id)}>
                                        Yes
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setConfirmAction(null)}>No</Button>
                                </div>
                            )}
                            {apt.status === 'Confirmed' && (
                                <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                                    <MessageSquare size={12} /> Notes
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setExpandedId(isExpanded ? null : apt.id)}>
                                <ChevronRight size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                            </Button>
                        </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-200 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone size={14} className="text-muted-foreground" />
                                    <a href={`tel:${apt.phone}`} className="text-primary hover:underline font-medium">{apt.phone}</a>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail size={14} className="text-muted-foreground" />
                                    <a href={`mailto:${apt.email}`} className="text-primary hover:underline font-medium">{apt.email}</a>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin size={14} className="text-muted-foreground" />
                                    <span className="font-medium text-foreground">{apt.property}</span>
                                </div>
                            </div>

                            {apt.notes && (
                                <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Notes</p>
                                    <p className="text-sm text-foreground">{apt.notes}</p>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={noteInputs[apt.id] || ''}
                                    onChange={(e) => setNoteInputs(prev => ({ ...prev, [apt.id]: e.target.value }))}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveNote(apt.id)}
                                    placeholder="Add a note about this appointment..."
                                    className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <Button size="sm" variant="outline" className="h-9 text-xs" onClick={() => handleSaveNote(apt.id)} disabled={!noteInputs[apt.id]?.trim()}>
                                    Save Note
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Appointments</h1>
                    <p className="text-muted-foreground mt-1">Manage property viewing appointments with potential renters.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: stats.total, icon: CalendarDays, bg: 'bg-primary/10', text: 'text-primary' },
                    { label: 'Pending', value: stats.pending, icon: Clock, bg: 'bg-amber-500/10', text: 'text-amber-500', valueColor: 'text-amber-600' },
                    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, bg: 'bg-emerald-500/10', text: 'text-emerald-500', valueColor: 'text-emerald-600' },
                    { label: 'Completed', value: stats.completed, icon: CheckCircle2, bg: 'bg-blue-500/10', text: 'text-blue-500', valueColor: 'text-blue-600' },
                ].map((s) => {
                    const Icon = s.icon;
                    return (
                        <Card key={s.label} className="border-0 hover:shadow-md transition-shadow">
                            <CardContent className="flex items-center gap-3">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
                                    <Icon size={18} className={s.text} />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{s.label}</p>
                                    <p className={`text-xl font-extrabold ${s.valueColor || ''}`}>{s.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="bg-muted/50">
                    <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
                    <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
                    <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-3 mt-4">
                    {upcoming.length === 0 ? (
                        <Card className="border-dashed"><CardContent className="text-center py-8"><p className="text-muted-foreground">No upcoming appointments</p></CardContent></Card>
                    ) : upcoming.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)}
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
