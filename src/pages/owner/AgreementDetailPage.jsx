import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Download, CheckCircle2, Clock, DollarSign, MessageSquare, Send, User, MapPin, Calendar } from 'lucide-react';

function AgreementDetailPage() {
    const messages = [
        { sender: 'Mulugeta K.', text: 'Hello, I have a question about the parking space. Is it included in the agreement?', time: '2 days ago', isOwner: false },
        { sender: 'You', text: 'Yes, parking for one vehicle is included. I can add a second spot for an additional 3,000 ETB/month.', time: '2 days ago', isOwner: true },
        { sender: 'Mulugeta K.', text: 'Perfect, one spot is enough. Thank you!', time: '1 day ago', isOwner: false },
    ];

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-9 w-9"><ArrowLeft size={16} /></Button>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Agreement #AG-2001</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">Bole Skyline Apartment — Mulugeta Kebede</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs font-bold uppercase">Active</Badge>
                    <Button variant="outline" className="gap-2"><Download size={14} /> Download PDF</Button>
                    <Button variant="outline" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/5">Terminate</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agreement Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><FileText size={16} /> Agreement Terms</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Property</p>
                                    <p className="text-sm font-bold mt-1">Bole Skyline Apartment</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin size={10} /> Bole, Addis Ababa</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Renter</p>
                                    <p className="text-sm font-bold mt-1">Mulugeta Kebede</p>
                                    <p className="text-xs text-muted-foreground">mulugeta.k@email.com</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Start Date</p>
                                    <p className="text-sm font-bold mt-1 flex items-center gap-1"><Calendar size={12} /> January 15, 2026</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">End Date</p>
                                    <p className="text-sm font-bold mt-1 flex items-center gap-1"><Calendar size={12} /> January 14, 2027</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Monthly Rent</p>
                                    <p className="text-sm font-bold mt-1 text-primary">45,000 ETB</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Security Deposit</p>
                                    <p className="text-sm font-bold mt-1">90,000 ETB</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Duration</p>
                                    <p className="text-sm font-bold mt-1">12 Months</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Payment Day</p>
                                    <p className="text-sm font-bold mt-1">5th of each month</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Confirmations */}
                    <Card>
                        <CardContent className="space-y-4">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><DollarSign size={16} /> Payment History</h3>
                            <div className="space-y-3">
                                {[
                                    { month: 'March 2026', amount: '45,000 ETB', date: 'Mar 5, 2026', status: 'Confirmed' },
                                    { month: 'February 2026', amount: '45,000 ETB', date: 'Feb 5, 2026', status: 'Confirmed' },
                                    { month: 'January 2026', amount: '45,000 ETB', date: 'Jan 15, 2026', status: 'Confirmed' },
                                ].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                                                <CheckCircle2 size={16} className="text-emerald-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">{p.month}</p>
                                                <p className="text-xs text-muted-foreground">Paid on {p.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-foreground">{p.amount}</p>
                                            <p className="text-[10px] font-bold text-emerald-500 uppercase">{p.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Renter Info */}
                    <Card>
                        <CardContent className="space-y-4">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><User size={16} /> Renter Info</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">M</div>
                                <div>
                                    <p className="font-bold text-foreground">Mulugeta Kebede</p>
                                    <p className="text-xs text-muted-foreground">mulugeta.k@email.com</p>
                                    <p className="text-xs text-muted-foreground">+251 91 234 5678</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardContent className="space-y-3">
                            <h3 className="font-bold text-foreground text-sm">Agreement Summary</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Total Paid</span>
                                <span className="font-bold text-sm text-primary">135,000 ETB</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Remaining</span>
                                <span className="font-bold text-sm">9 months</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Payment Status</span>
                                <span className="text-xs font-bold text-emerald-500">Up to date</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted mt-2">
                                <div className="h-full w-[25%] rounded-full bg-primary transition-all"></div>
                            </div>
                            <p className="text-[10px] text-muted-foreground text-center">3 of 12 payments completed</p>
                        </CardContent>
                    </Card>

                    {/* Communication */}
                    <Card>
                        <CardContent className="space-y-3">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><MessageSquare size={16} /> Messages</h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex flex-col ${m.isOwner ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[85%] rounded-xl px-3 py-2 ${m.isOwner ? 'bg-primary/10 text-foreground' : 'bg-muted text-foreground'}`}>
                                            <p className="text-xs font-semibold mb-0.5">{m.sender}</p>
                                            <p className="text-xs leading-relaxed">{m.text}</p>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-1">{m.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-border">
                                <input type="text" placeholder="Type a message..." className="flex-1 h-8 rounded-lg border border-border bg-muted/30 px-3 text-xs outline-none focus:ring-1 focus:ring-primary/30" />
                                <Button size="icon" className="h-8 w-8"><Send size={14} /></Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AgreementDetailPage;
