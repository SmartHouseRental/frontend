import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Building2 } from 'lucide-react';

function MessagesPage() {
    const conversations = [
        { id: 1, name: 'Mulugeta Kebede', property: 'Bole Skyline Apt', lastMsg: 'Thank you for confirming!', time: '2m ago', unread: 2, avatar: 'M' },
        { id: 2, name: 'Sara Tesfaye', property: 'Luxury Villa Bole', lastMsg: 'When can I schedule a viewing?', time: '1h ago', unread: 1, avatar: 'S' },
        { id: 3, name: 'Helen Girma', property: 'Cottage by the Lake', lastMsg: 'The lease terms look good.', time: '3h ago', unread: 0, avatar: 'H' },
        { id: 4, name: 'Abebe Wolde', property: 'Studio in Kazanchis', lastMsg: 'Is parking included?', time: 'Yesterday', unread: 0, avatar: 'A' },
        { id: 5, name: 'Tigist Haile', property: 'Penthouse Suite CMC', lastMsg: 'I sent the payment proof.', time: '2d ago', unread: 0, avatar: 'T' },
    ];

    const messages = [
        { id: 1, sender: 'Mulugeta Kebede', text: 'Hi, I wanted to ask about the maintenance request I submitted last week.', time: '10:15 AM', isOwner: false },
        { id: 2, sender: 'You', text: 'Hello Mulugeta! The plumber is scheduled to visit on Thursday between 9-11 AM. Will you be available?', time: '10:22 AM', isOwner: true },
        { id: 3, sender: 'Mulugeta Kebede', text: 'Thursday works perfectly. Should I be present during the visit?', time: '10:25 AM', isOwner: false },
        { id: 4, sender: 'You', text: "It would be best if you're there to show them the issue. If not, I can arrange access with the building management.", time: '10:30 AM', isOwner: true },
        { id: 5, sender: 'Mulugeta Kebede', text: "I'll make sure to be there. Thank you for confirming!", time: '10:32 AM', isOwner: false },
    ];

    return (
        <div className="h-screen flex flex-col">
            <div className="p-6 pb-0">
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Messages</h1>
                <p className="text-muted-foreground text-sm mt-1">Chat with renters about your properties.</p>
            </div>

            <div className="flex flex-1 m-6 mt-4 rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                {/* Conversation List */}
                <div className="w-80 border-r border-border flex flex-col shrink-0">
                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                            <Input className="pl-9 h-9 text-sm" placeholder="Search conversations..." />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map((c, i) => (
                            <div key={c.id} className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors border-b border-border/50 ${i === 0 ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-muted/30'}`}>
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                                    {c.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm truncate ${c.unread ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>{c.name}</p>
                                        <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                                    </div>
                                    <p className="text-[10px] text-primary font-medium flex items-center gap-1">
                                        <Building2 size={8} /> {c.property}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMsg}</p>
                                </div>
                                {c.unread > 0 && (
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{c.unread}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">M</div>
                            <div>
                                <p className="font-bold text-foreground">Mulugeta Kebede</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span className="size-1.5 rounded-full bg-emerald-500"></span> Online • Bole Skyline Apartment
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><Phone size={16} /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><Video size={16} /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><MoreVertical size={16} /></Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        <div className="text-center">
                            <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full">Today</span>
                        </div>
                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.isOwner ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${m.isOwner ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted text-foreground rounded-bl-md'}`}>
                                    <p className="text-sm leading-relaxed">{m.text}</p>
                                    <p className={`text-[10px] mt-1 ${m.isOwner ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{m.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="px-6 py-4 border-t border-border">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground shrink-0">
                                <Paperclip size={16} />
                            </Button>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 h-10 rounded-xl border border-border bg-muted/30 px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                            />
                            <Button size="icon" className="h-10 w-10 rounded-xl shrink-0">
                                <Send size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;
