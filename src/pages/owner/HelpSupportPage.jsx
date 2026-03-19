import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, Send, Clock, CheckCircle2, MessageSquare, ChevronRight, Search, Loader2, ChevronDown, AlertCircle } from 'lucide-react';

const initialTickets = [
    {
        id: 'TKT-101', subject: 'Payment not reflecting in dashboard', category: 'Payments', status: 'Open', date: 'Mar 18, 2026', lastReply: 'Admin replied 2h ago', messages: [
            { sender: 'You', text: 'I confirmed a payment from my renter on March 15, but it is not showing in my payment history.', time: 'Mar 18, 10:00 AM' },
            { sender: 'Admin', text: 'Thank you for reporting. We are looking into this and will update you shortly. Could you provide the payment ID?', time: 'Mar 18, 12:00 PM' },
        ]
    },
    {
        id: 'TKT-100', subject: 'Unable to upload property photos', category: 'Technical', status: 'Resolved', date: 'Mar 10, 2026', lastReply: 'Resolved on Mar 12', messages: [
            { sender: 'You', text: 'I cannot upload photos larger than 2MB to my property listings.', time: 'Mar 10, 9:00 AM' },
            { sender: 'Admin', text: 'We have increased the upload limit to 10MB. Please try again.', time: 'Mar 12, 11:00 AM' },
        ]
    },
    { id: 'TKT-099', subject: 'How to verify my ownership documents?', category: 'Account', status: 'Resolved', date: 'Feb 25, 2026', lastReply: 'Resolved on Feb 26', messages: [] },
];

const faqs = [
    { q: 'How do I add a new property?', a: 'Go to My Properties and click the "Add Property" button. Fill in all the required details including photos, description, and pricing.' },
    { q: 'How to verify my identity?', a: 'Navigate to Profile & Settings > Verification tab. Upload your National ID or Passport and Business License. Verification typically takes 1-2 business days.' },
    { q: 'What are the payment methods?', a: 'Renters can pay via bank transfer. They upload payment proof which you then confirm from your Payment History page.' },
    { q: 'How to handle renter disputes?', a: 'Use the Messages feature to communicate directly with your renter. If unresolved, submit a support ticket and our team will mediate.' },
    { q: 'How are rental agreements created?', a: 'Once a renter expresses interest and you both agree on terms, an agreement is generated. Both parties sign digitally through the platform.' },
    { q: 'How to update my bank details?', a: 'Go to Profile & Settings > Payment Details tab. Update your bank information and click Save. Changes take effect immediately.' },
];

const statusColors = {
    Open: 'bg-amber-100 text-amber-700',
    Resolved: 'bg-emerald-100 text-emerald-700',
    'In Progress': 'bg-blue-100 text-blue-700',
};

function HelpSupportPage() {
    const [tickets, setTickets] = useState(initialTickets);
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [submitState, setSubmitState] = useState(null); // 'submitting' | 'submitted'
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedTicket, setExpandedTicket] = useState(null);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [ticketReply, setTicketReply] = useState('');

    const handleSubmitTicket = () => {
        if (!subject.trim() || !category || !description.trim()) return;
        setSubmitState('submitting');
        setTimeout(() => {
            const newTicket = {
                id: `TKT-${102 + tickets.length}`,
                subject, category, status: 'Open',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                lastReply: 'Awaiting response',
                messages: [{ sender: 'You', text: description, time: 'Just now' }],
            };
            setTickets(prev => [newTicket, ...prev]);
            setSubject('');
            setCategory('');
            setDescription('');
            setSubmitState('submitted');
            setTimeout(() => setSubmitState(null), 3000);
        }, 1000);
    };

    const handleReplyToTicket = (ticketId) => {
        if (!ticketReply.trim()) return;
        setTickets(prev => prev.map(t => t.id === ticketId ? {
            ...t,
            messages: [...t.messages, { sender: 'You', text: ticketReply, time: 'Just now' }],
            lastReply: 'You replied just now',
        } : t));
        setTicketReply('');
    };

    const filteredTickets = tickets.filter(t =>
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Help & Support</h1>
                <p className="text-muted-foreground mt-1">Get help or submit a support ticket to the admin team.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Submit Ticket */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><HelpCircle size={16} /> Submit New Ticket</h3>

                            {submitState === 'submitted' ? (
                                <div className="text-center py-6 animate-in fade-in-0 duration-300">
                                    <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-3" />
                                    <p className="font-bold text-foreground">Ticket Submitted!</p>
                                    <p className="text-xs text-muted-foreground mt-1">We'll respond within 24 hours.</p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject <span className="text-rose-500">*</span></label>
                                        <Input className="mt-1.5" placeholder="Brief description of your issue" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category <span className="text-rose-500">*</span></label>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Technical">Technical Issue</SelectItem>
                                                    <SelectItem value="Payments">Payments</SelectItem>
                                                    <SelectItem value="Account">Account</SelectItem>
                                                    <SelectItem value="Properties">Properties</SelectItem>
                                                    <SelectItem value="Agreements">Agreements</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description <span className="text-rose-500">*</span></label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="mt-1.5 w-full h-32 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="Describe your issue in detail..."
                                        />
                                        <p className="text-[10px] text-muted-foreground mt-1">{description.length}/500 characters</p>
                                    </div>
                                    <Button
                                        className="w-full gap-2"
                                        disabled={!subject.trim() || !category || !description.trim() || submitState === 'submitting'}
                                        onClick={handleSubmitTicket}
                                    >
                                        {submitState === 'submitting' ? <><Loader2 size={14} className="animate-spin" /> Submitting...</> :
                                            <><Send size={14} /> Submit Ticket</>}
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Tickets + FAQ */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tickets */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-foreground">My Tickets ({tickets.length})</h3>
                            <div className="relative w-56">
                                <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                                <Input className="pl-9 h-9 text-sm" placeholder="Search tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                        </div>

                        {filteredTickets.length === 0 ? (
                            <Card className="border-dashed"><CardContent className="text-center py-8"><p className="text-muted-foreground text-sm">No tickets found</p></CardContent></Card>
                        ) : (
                            filteredTickets.map((ticket) => (
                                <Card key={ticket.id} className={`group transition-all duration-300 ${expandedTicket === ticket.id ? 'shadow-md border-primary/20' : 'hover:shadow-md hover:border-primary/10'}`}>
                                    <CardContent>
                                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}>
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ticket.status === 'Open' ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                                                {ticket.status === 'Open' ? <Clock size={18} className="text-amber-500" /> : <CheckCircle2 size={18} className="text-emerald-500" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-foreground text-sm">{ticket.subject}</p>
                                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusColors[ticket.status]}`}>{ticket.status}</span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs text-muted-foreground">{ticket.id}</span>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-xs text-muted-foreground">{ticket.category}</span>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-xs text-muted-foreground">{ticket.date}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground/80 mt-1 flex items-center gap-1"><MessageSquare size={10} /> {ticket.lastReply}</p>
                                            </div>
                                            <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${expandedTicket === ticket.id ? 'rotate-180' : ''}`} />
                                        </div>

                                        {/* Expanded Thread */}
                                        {expandedTicket === ticket.id && (
                                            <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-200 space-y-3">
                                                {ticket.messages.map((msg, i) => (
                                                    <div key={i} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[80%] rounded-xl px-3 py-2 ${msg.sender === 'You' ? 'bg-primary/10' : 'bg-muted'}`}>
                                                            <p className="text-xs font-bold mb-0.5">{msg.sender}</p>
                                                            <p className="text-xs leading-relaxed text-foreground">{msg.text}</p>
                                                            <p className="text-[10px] text-muted-foreground mt-1">{msg.time}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {ticket.status === 'Open' && (
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <input
                                                            type="text"
                                                            value={ticketReply}
                                                            onChange={(e) => setTicketReply(e.target.value)}
                                                            onKeyDown={(e) => e.key === 'Enter' && handleReplyToTicket(ticket.id)}
                                                            placeholder="Reply to this ticket..."
                                                            className="flex-1 h-8 rounded-lg border border-border bg-muted/30 px-3 text-xs outline-none focus:ring-1 focus:ring-primary/30"
                                                        />
                                                        <Button size="icon" className="h-8 w-8" onClick={() => handleReplyToTicket(ticket.id)} disabled={!ticketReply.trim()}>
                                                            <Send size={12} />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* FAQ */}
                    <Card>
                        <CardContent>
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><HelpCircle size={16} /> Frequently Asked Questions</h3>
                            <div className="space-y-1">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                            className="w-full text-left flex items-center justify-between py-3 px-3 hover:bg-muted/30 rounded-lg transition-colors"
                                        >
                                            <span className="text-sm font-medium text-foreground flex items-center gap-2">
                                                <HelpCircle size={14} className="text-primary shrink-0" /> {faq.q}
                                            </span>
                                            <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 shrink-0 ${expandedFaq === i ? 'rotate-180' : ''}`} />
                                        </button>
                                        {expandedFaq === i && (
                                            <div className="px-3 pb-3 pl-9 animate-in slide-in-from-top-1 duration-200">
                                                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}

export default HelpSupportPage;
