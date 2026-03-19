import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, Send, Clock, CheckCircle2, MessageSquare, ChevronRight, Search } from 'lucide-react';

function HelpSupportPage() {
    const tickets = [
        { id: 'TKT-101', subject: 'Payment not reflecting in dashboard', category: 'Payments', status: 'Open', date: 'Mar 18, 2026', lastReply: 'Admin replied 2h ago' },
        { id: 'TKT-100', subject: 'Unable to upload property photos', category: 'Technical', status: 'Resolved', date: 'Mar 10, 2026', lastReply: 'Resolved on Mar 12' },
        { id: 'TKT-099', subject: 'How to verify my ownership documents?', category: 'Account', status: 'Resolved', date: 'Feb 25, 2026', lastReply: 'Resolved on Feb 26' },
    ];

    const statusColors = {
        Open: 'bg-amber-100 text-amber-700',
        Resolved: 'bg-emerald-100 text-emerald-700',
        'In Progress': 'bg-blue-100 text-blue-700',
    };

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Help & Support</h1>
                <p className="text-muted-foreground mt-1">Get help or submit a support ticket to the admin team.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Submit Ticket Form */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2">
                                <HelpCircle size={16} /> Submit New Ticket
                            </h3>

                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</label>
                                <Input className="mt-1.5" placeholder="Brief description of your issue" />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</label>
                                <Select>
                                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="technical">Technical Issue</SelectItem>
                                            <SelectItem value="payments">Payments</SelectItem>
                                            <SelectItem value="account">Account</SelectItem>
                                            <SelectItem value="properties">Properties</SelectItem>
                                            <SelectItem value="agreements">Agreements</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</label>
                                <textarea
                                    className="mt-1.5 w-full h-32 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Describe your issue in detail. Include any relevant property IDs, screenshots, or error messages."
                                />
                            </div>

                            <Button className="w-full gap-2">
                                <Send size={14} /> Submit Ticket
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Previous Tickets */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground">Previous Tickets</h3>
                        <div className="relative w-56">
                            <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                            <Input className="pl-9 h-9 text-sm" placeholder="Search tickets..." />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {tickets.map((ticket) => (
                            <Card key={ticket.id} className="group hover:shadow-md transition-shadow hover:border-primary/20">
                                <CardContent className="flex items-center gap-4">
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ticket.status === 'Open' ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                                        {ticket.status === 'Open' ? (
                                            <Clock size={18} className="text-amber-500" />
                                        ) : (
                                            <CheckCircle2 size={18} className="text-emerald-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-foreground text-sm">{ticket.subject}</p>
                                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusColors[ticket.status]}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <span className="text-xs text-muted-foreground">{ticket.id}</span>
                                            <span className="text-xs text-muted-foreground">•</span>
                                            <span className="text-xs text-muted-foreground">{ticket.category}</span>
                                            <span className="text-xs text-muted-foreground">•</span>
                                            <span className="text-xs text-muted-foreground">{ticket.date}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground/80 mt-1 flex items-center gap-1">
                                            <MessageSquare size={10} /> {ticket.lastReply}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-primary">
                                        <ChevronRight size={16} />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* FAQ Quick Links */}
                    <Card className="mt-6">
                        <CardContent>
                            <h3 className="font-bold text-foreground mb-4">Frequently Asked Questions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    'How do I add a new property?',
                                    'How to verify my identity?',
                                    'What are the payment methods?',
                                    'How to handle renter disputes?',
                                    'How are rental agreements created?',
                                    'How to update my bank details?',
                                ].map((faq, i) => (
                                    <button key={i} className="text-left text-sm text-primary hover:underline flex items-center gap-2 py-1.5">
                                        <HelpCircle size={12} /> {faq}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default HelpSupportPage;
