import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';
import { ArrowLeft, FileText, Download, CheckCircle2, Clock, DollarSign, MessageSquare, Send, User, MapPin, Calendar, AlertCircle } from 'lucide-react';

const paymentHistory = [
    { month: 'March 2026', amount: '45,000 ETB', date: 'Mar 5, 2026', status: 'Confirmed' },
    { month: 'February 2026', amount: '45,000 ETB', date: 'Feb 5, 2026', status: 'Confirmed' },
    { month: 'January 2026', amount: '45,000 ETB', date: 'Jan 15, 2026', status: 'Confirmed' },
];

const initialMessages = [
    { id: 1, sender: 'Mulugeta K.', text: 'Hello, I have a question about the parking space. Is it included in the agreement?', time: '2 days ago', isOwner: false },
    { id: 2, sender: 'You', text: 'Yes, parking for one vehicle is included. I can add a second spot for an additional 3,000 ETB/month.', time: '2 days ago', isOwner: true },
    { id: 3, sender: 'Mulugeta K.', text: 'Perfect, one spot is enough. Thank you!', time: '1 day ago', isOwner: false },
];

function AgreementDetailPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [showTerminateConfirm, setShowTerminateConfirm] = useState(false);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages(prev => [...prev, {
            id: Date.now(), sender: 'You', text: newMessage,
            time: 'Just now', isOwner: true,
        }]);
        setNewMessage('');
    };

    const totalPaid = 135000;
    const totalContract = 540000;
    const progressPercent = Math.round((totalPaid / totalContract) * 100);

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/owner/agreements">
                        <Button variant="outline" size="icon" className="h-9 w-9"><ArrowLeft size={16} /></Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Agreement #AG-2001</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">Bole Skyline Apartment — Mulugeta Kebede</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs font-bold uppercase">Active</Badge>
                    <Button variant="outline" className="gap-2"><Download size={14} /> Download PDF</Button>
                    {!showTerminateConfirm ? (
                        <Button variant="outline" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => setShowTerminateConfirm(true)}>Terminate</Button>
                    ) : (
                        <div className="flex items-center gap-2 animate-in fade-in-0">
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><AlertCircle size={12} /> Are you sure?</span>
                            <Button variant="destructive" size="sm" className="h-8 text-xs">Yes, Terminate</Button>
                            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setShowTerminateConfirm(false)}>Cancel</Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agreement Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><FileText size={16} /> Agreement Terms</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Property', value: 'Bole Skyline Apartment', sub: 'Bole, Addis Ababa', subIcon: MapPin },
                                    { label: 'Renter', value: 'Mulugeta Kebede', sub: 'mulugeta.k@email.com' },
                                    { label: 'Start Date', value: 'January 15, 2026', icon: Calendar },
                                    { label: 'End Date', value: 'January 14, 2027', icon: Calendar },
                                    { label: 'Monthly Rent', value: '45,000 ETB', highlight: true },
                                    { label: 'Security Deposit', value: '90,000 ETB' },
                                    { label: 'Duration', value: '12 Months' },
                                    { label: 'Payment Day', value: '5th of each month' },
                                ].map((item, i) => {
                                    const SubIcon = item.subIcon;
                                    const ItemIcon = item.icon;
                                    return (
                                        <div key={i}>
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                                            <p className={`text-sm font-bold mt-1 flex items-center gap-1 ${item.highlight ? 'text-primary' : 'text-foreground'}`}>
                                                {ItemIcon && <ItemIcon size={12} />} {item.value}
                                            </p>
                                            {item.sub && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">{SubIcon && <SubIcon size={10} />} {item.sub}</p>}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment History */}
                    <Card>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-foreground flex items-center gap-2"><DollarSign size={16} /> Payment History</h3>
                                <Link to="/owner/payments" className="text-xs text-primary font-bold hover:underline">View All</Link>
                            </div>
                            <div className="space-y-3">
                                {paymentHistory.map((p, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/20 rounded-lg px-2 -mx-2 transition-colors">
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
                            <Link to="/owner/messages">
                                <Button variant="outline" className="w-full gap-2 mt-2"><MessageSquare size={14} /> Send Message</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Agreement Summary */}
                    <Card>
                        <CardContent className="space-y-3">
                            <h3 className="font-bold text-foreground text-sm">Agreement Summary</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Total Paid</span>
                                    <span className="font-bold text-sm text-primary">{totalPaid.toLocaleString()} ETB</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Remaining</span>
                                    <span className="font-bold text-sm">9 months</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Payment Status</span>
                                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Up to date</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                                    <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                                <p className="text-[10px] text-muted-foreground text-center mt-1.5">3 of 12 payments completed ({progressPercent}%)</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Messages */}
                    <Card>
                        <CardContent className="space-y-3">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><MessageSquare size={16} /> Messages</h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                                {messages.map((m) => (
                                    <div key={m.id} className={`flex flex-col ${m.isOwner ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[85%] rounded-xl px-3 py-2 ${m.isOwner ? 'bg-primary/10 text-foreground' : 'bg-muted text-foreground'}`}>
                                            <p className="text-xs font-semibold mb-0.5">{m.sender}</p>
                                            <p className="text-xs leading-relaxed">{m.text}</p>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-1">{m.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-border">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 h-8 rounded-lg border border-border bg-muted/30 px-3 text-xs outline-none focus:ring-1 focus:ring-primary/30"
                                />
                                <Button size="icon" className="h-8 w-8" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                                    <Send size={14} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AgreementDetailPage;
