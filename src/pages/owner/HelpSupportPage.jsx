import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    HelpCircle, Send, Clock, CheckCircle2, MessageSquare, Search,
    Loader2, ChevronDown, MoreVertical, XCircle,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

const statusColors = {
    open: 'bg-amber-100 text-amber-700',
    resolved: 'bg-emerald-100 text-emerald-700',
    in_progress: 'bg-blue-100 text-blue-700',
};

function HelpSupportPage() {
    const { t } = useTranslation();

    const initialTickets = useMemo(() => [
        {
            id: 'TKT-101',
            subjectKey: 'owner.helpSupport.sampleTickets.paymentNotReflecting.subject',
            categoryKey: 'payments',
            status: 'open',
            date: 'Mar 18, 2026',
            lastReplyKey: 'owner.helpSupport.sampleTickets.paymentNotReflecting.lastReply',
            messages: [
                {
                    senderKey: 'you',
                    textKey: 'owner.helpSupport.sampleTickets.paymentNotReflecting.messages.first',
                    time: 'Mar 18, 10:00 AM',
                },
                {
                    senderKey: 'admin',
                    textKey: 'owner.helpSupport.sampleTickets.paymentNotReflecting.messages.second',
                    time: 'Mar 18, 12:00 PM',
                },
            ],
        },
        {
            id: 'TKT-100',
            subjectKey: 'owner.helpSupport.sampleTickets.uploadPhotos.subject',
            categoryKey: 'technical',
            status: 'resolved',
            date: 'Mar 10, 2026',
            lastReplyKey: 'owner.helpSupport.sampleTickets.uploadPhotos.lastReply',
            messages: [
                {
                    senderKey: 'you',
                    textKey: 'owner.helpSupport.sampleTickets.uploadPhotos.messages.first',
                    time: 'Mar 10, 9:00 AM',
                },
                {
                    senderKey: 'admin',
                    textKey: 'owner.helpSupport.sampleTickets.uploadPhotos.messages.second',
                    time: 'Mar 12, 11:00 AM',
                },
            ],
        },
        {
            id: 'TKT-099',
            subjectKey: 'owner.helpSupport.sampleTickets.verifyDocuments.subject',
            categoryKey: 'account',
            status: 'resolved',
            date: 'Feb 25, 2026',
            lastReplyKey: 'owner.helpSupport.sampleTickets.verifyDocuments.lastReply',
            messages: [],
        },
    ], [t]);

    const faqs = useMemo(() => [
        {
            questionKey: 'owner.helpSupport.faqItems.addProperty.question',
            answerKey: 'owner.helpSupport.faqItems.addProperty.answer',
        },
        {
            questionKey: 'owner.helpSupport.faqItems.verifyIdentity.question',
            answerKey: 'owner.helpSupport.faqItems.verifyIdentity.answer',
        },
        {
            questionKey: 'owner.helpSupport.faqItems.paymentMethods.question',
            answerKey: 'owner.helpSupport.faqItems.paymentMethods.answer',
        },
        {
            questionKey: 'owner.helpSupport.faqItems.renterDisputes.question',
            answerKey: 'owner.helpSupport.faqItems.renterDisputes.answer',
        },
        {
            questionKey: 'owner.helpSupport.faqItems.rentalAgreements.question',
            answerKey: 'owner.helpSupport.faqItems.rentalAgreements.answer',
        },
        {
            questionKey: 'owner.helpSupport.faqItems.updateBankDetails.question',
            answerKey: 'owner.helpSupport.faqItems.updateBankDetails.answer',
        },
    ], [t]);

    const [tickets, setTickets] = useState(initialTickets);
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [submitState, setSubmitState] = useState(null);
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
                subject: subject.trim(),
                categoryKey: category,
                status: 'open',
                date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
                lastReplyKey: 'owner.helpSupport.replyStates.awaitingResponse',
                messages: [{
                    senderKey: 'you',
                    text: description,
                    timeKey: 'owner.helpSupport.replyStates.justNow',
                }],
            };

            setTickets((prev) => [newTicket, ...prev]);
            setSubject('');
            setCategory('');
            setDescription('');
            setSubmitState('submitted');
            setTimeout(() => setSubmitState(null), 3000);
        }, 1000);
    };

    const handleReplyToTicket = (ticketId) => {
        if (!ticketReply.trim()) return;

        setTickets((prev) => prev.map((ticket) => ticket.id === ticketId
            ? {
                ...ticket,
                messages: [...ticket.messages, {
                    senderKey: 'you',
                    text: ticketReply,
                    timeKey: 'owner.helpSupport.replyStates.justNow',
                }],
                lastReplyKey: 'owner.helpSupport.replyStates.youRepliedJustNow',
            }
            : ticket));
        setTicketReply('');
    };

    const filteredTickets = tickets.filter((ticket) => {
        const subject = ticket.subjectKey ? t(ticket.subjectKey) : ticket.subject;
        return subject.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const getTicketSubject = (ticket) => ticket.subjectKey ? t(ticket.subjectKey) : ticket.subject;
    const getTicketCategory = (ticket) => t(`owner.helpSupport.categories.${ticket.categoryKey}`);
    const getStatusLabel = (status) => t(`owner.helpSupport.status.${status}`);
    const getSenderName = (senderKey) => t(`owner.helpSupport.senders.${senderKey}`);
    const getReplyText = (replyKey) => replyKey ? t(replyKey) : '';

    const getMessageText = (message) => message.textKey ? t(message.textKey) : message.text;
    const getMessageTime = (message) => message.timeKey ? t(message.timeKey) : message.time;

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{t('owner.helpSupport.title')}</h1>
                <p className="text-muted-foreground mt-1">{t('owner.helpSupport.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><HelpCircle size={16} /> {t('owner.helpSupport.submitNew')}</h3>

                            {submitState === 'submitted' ? (
                                <div className="text-center py-6 animate-in fade-in-0 duration-300">
                                    <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-3" />
                                    <p className="font-bold text-foreground">{t('owner.helpSupport.ticketSubmitted')}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{t('owner.helpSupport.respondWithin')}</p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('owner.helpSupport.subject')} <span className="text-rose-500">*</span></label>
                                        <Input className="mt-1.5" placeholder={t('owner.helpSupport.subjectPlaceholder')} value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('owner.helpSupport.category')} <span className="text-rose-500">*</span></label>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger className="mt-1.5"><SelectValue placeholder={t('owner.helpSupport.selectCategory')} /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="technical">{t('owner.helpSupport.categories.technical')}</SelectItem>
                                                    <SelectItem value="payments">{t('owner.helpSupport.categories.payments')}</SelectItem>
                                                    <SelectItem value="account">{t('owner.helpSupport.categories.account')}</SelectItem>
                                                    <SelectItem value="properties">{t('owner.helpSupport.categories.properties')}</SelectItem>
                                                    <SelectItem value="agreements">{t('owner.helpSupport.categories.agreements')}</SelectItem>
                                                    <SelectItem value="other">{t('owner.helpSupport.categories.other')}</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('owner.helpSupport.description')} <span className="text-rose-500">*</span></label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="mt-1.5 w-full h-32 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                            placeholder={t('owner.helpSupport.descPlaceholder')}
                                        />
                                        <p className="text-[10px] text-muted-foreground mt-1">{t('owner.helpSupport.charCount', { length: description.length })}</p>
                                    </div>
                                    <Button
                                        className="w-full gap-2"
                                        disabled={!subject.trim() || !category || !description.trim() || submitState === 'submitting'}
                                        onClick={handleSubmitTicket}
                                    >
                                        {submitState === 'submitting' ? (
                                            <>
                                                <Loader2 size={14} className="animate-spin" /> {t('owner.helpSupport.submitting')}
                                            </>
                                        ) : (
                                            <>
                                                <Send size={14} /> {t('owner.helpSupport.submitTicket')}
                                            </>
                                        )}
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-foreground">{t('owner.helpSupport.myTickets', { count: tickets.length })}</h3>
                            <div className="relative w-56">
                                <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                                <Input className="pl-9 h-9 text-sm" placeholder={t('owner.helpSupport.searchPlaceholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                        </div>

                        {filteredTickets.length === 0 ? (
                            <Card className="border-dashed">
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground text-sm">{t('owner.helpSupport.noTickets')}</p>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredTickets.map((ticket) => (
                                <Card key={ticket.id} className={`group transition-all duration-300 ${expandedTicket === ticket.id ? 'shadow-md border-primary/20' : 'hover:shadow-md hover:border-primary/10'}`}>
                                    <CardContent>
                                        <div className="flex items-center gap-4">
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ticket.status === 'open' ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                                                {ticket.status === 'open' ? <Clock size={18} className="text-amber-500" /> : <CheckCircle2 size={18} className="text-emerald-500" />}
                                            </div>
                                            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-foreground text-sm">{getTicketSubject(ticket)}</p>
                                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusColors[ticket.status]}`}>{getStatusLabel(ticket.status)}</span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs text-muted-foreground">{ticket.id}</span>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-xs text-muted-foreground">{getTicketCategory(ticket)}</span>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-xs text-muted-foreground">{ticket.date}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground/80 mt-1 flex items-center gap-1">
                                                    <MessageSquare size={10} /> {getReplyText(ticket.lastReplyKey)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground outline-none">
                                                            <MoreVertical size={16} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-44">
                                                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}>
                                                            <MessageSquare size={14} /> {expandedTicket === ticket.id ? t('owner.helpSupport.hideChat') : t('owner.helpSupport.viewChat')}
                                                        </DropdownMenuItem>
                                                        {ticket.status === 'open' && (
                                                            <DropdownMenuItem className="gap-2 cursor-pointer text-emerald-600 focus:text-emerald-600">
                                                                <CheckCircle2 size={14} /> {t('owner.helpSupport.markResolved')}
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                                                            <XCircle size={14} /> {t('owner.helpSupport.closeTicket')}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                <button onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)} className="p-1 hover:bg-muted rounded-full transition-colors">
                                                    <ChevronDown size={18} className={`text-muted-foreground transition-transform duration-200 ${expandedTicket === ticket.id ? 'rotate-180' : ''}`} />
                                                </button>
                                            </div>
                                        </div>

                                        {expandedTicket === ticket.id && (
                                            <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-200 space-y-3">
                                                {ticket.messages.map((msg, i) => (
                                                    <div key={i} className={`flex ${msg.senderKey === 'you' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[80%] rounded-xl px-3 py-2 ${msg.senderKey === 'you' ? 'bg-primary/10' : 'bg-muted'}`}>
                                                            <p className="text-xs font-bold mb-0.5">{getSenderName(msg.senderKey)}</p>
                                                            <p className="text-xs leading-relaxed text-foreground">{getMessageText(msg)}</p>
                                                            <p className="text-[10px] text-muted-foreground mt-1">{getMessageTime(msg)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {ticket.status === 'open' && (
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <input
                                                            type="text"
                                                            value={ticketReply}
                                                            onChange={(e) => setTicketReply(e.target.value)}
                                                            onKeyDown={(e) => e.key === 'Enter' && handleReplyToTicket(ticket.id)}
                                                            placeholder={t('owner.helpSupport.replyPlaceholder')}
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

                    <Card>
                        <CardContent>
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><HelpCircle size={16} /> {t('owner.helpSupport.faq')}</h3>
                            <div className="space-y-1">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                            className="w-full text-left flex items-center justify-between py-3 px-3 hover:bg-muted/30 rounded-lg transition-colors"
                                        >
                                            <span className="text-sm font-medium text-foreground flex items-center gap-2">
                                                <HelpCircle size={14} className="text-primary shrink-0" /> {t(faq.questionKey)}
                                            </span>
                                            <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 shrink-0 ${expandedFaq === i ? 'rotate-180' : ''}`} />
                                        </button>
                                        {expandedFaq === i && (
                                            <div className="px-3 pb-3 pl-9 animate-in slide-in-from-top-1 duration-200">
                                                <p className="text-sm text-muted-foreground leading-relaxed">{t(faq.answerKey)}</p>
                                            </div>
                                        )}
                                    </div>
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
