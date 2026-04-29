import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Building2, Image, Smile, Check, CheckCheck } from 'lucide-react';

const allConversations = [
    { id: 1, name: 'Mulugeta Kebede', property: 'Bole Skyline Apt', lastMsg: 'Thank you for confirming!', time: '2m ago', unread: 2, avatar: 'M', online: true },
    { id: 2, name: 'Sara Tesfaye', property: 'Luxury Villa Bole', lastMsg: 'When can I schedule a viewing?', time: '1h ago', unread: 1, avatar: 'S', online: true },
    { id: 3, name: 'Helen Girma', property: 'Cottage by the Lake', lastMsg: 'The lease terms look good.', time: '3h ago', unread: 0, avatar: 'H', online: false },
    { id: 4, name: 'Abebe Wolde', property: 'Studio in Kazanchis', lastMsg: 'Is parking included?', time: 'Yesterday', unread: 0, avatar: 'A', online: false },
    { id: 5, name: 'Tigist Haile', property: 'Penthouse Suite CMC', lastMsg: 'I sent the payment proof.', time: '2d ago', unread: 0, avatar: 'T', online: true },
    { id: 6, name: 'Yonas Desta', property: 'Luxury Villa Bole', lastMsg: 'Looking forward to the viewing.', time: '3d ago', unread: 0, avatar: 'Y', online: false },
];

const allMessages = {
    1: [
        { id: 1, text: 'Hi, I wanted to ask about the maintenance request I submitted last week.', time: '10:15 AM', isOwner: false, status: 'read' },
        { id: 2, text: 'Hello Mulugeta! The plumber is scheduled to visit on Thursday between 9-11 AM. Will you be available?', time: '10:22 AM', isOwner: true, status: 'read' },
        { id: 3, text: 'Thursday works perfectly. Should I be present during the visit?', time: '10:25 AM', isOwner: false, status: 'read' },
        { id: 4, text: "It would be best if you're there to show them the issue. If not, I can arrange access with the building management.", time: '10:30 AM', isOwner: true, status: 'read' },
        { id: 5, text: "I'll make sure to be there. Thank you for confirming!", time: '10:32 AM', isOwner: false, status: 'read' },
    ],
    2: [
        { id: 1, text: 'Hello, I am interested in the Luxury Villa in Bole. Is it still available?', time: '9:00 AM', isOwner: false, status: 'read' },
        { id: 2, text: 'Yes, the villa is available! Would you like to schedule a viewing?', time: '9:15 AM', isOwner: true, status: 'read' },
        { id: 3, text: 'When can I schedule a viewing?', time: '9:20 AM', isOwner: false, status: 'unread' },
    ],
    3: [
        { id: 1, text: 'I reviewed the agreement and the lease terms look good.', time: '2:00 PM', isOwner: false, status: 'read' },
    ],
    4: [
        { id: 1, text: 'Good afternoon. I have a quick question about the studio.', time: '11:00 AM', isOwner: false, status: 'read' },
        { id: 2, text: 'Is parking included in the rental?', time: '11:01 AM', isOwner: false, status: 'read' },
    ],
    5: [
        { id: 1, text: 'I have just transferred the rent for this month.', time: '8:30 AM', isOwner: false, status: 'read' },
        { id: 2, text: 'I sent the payment proof via the app.', time: '8:31 AM', isOwner: false, status: 'read' },
    ],
    6: [
        { id: 1, text: 'Looking forward to the viewing on Saturday.', time: '4:00 PM', isOwner: false, status: 'read' },
    ],
};

function MessagesPage() {
    const [activeConversation, setActiveConversation] = useState(1);
    const [conversations, setConversations] = useState(allConversations);
    const [messages, setMessages] = useState(allMessages);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeConversation]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const newMsg = { id: Date.now(), text: newMessage, time: timeStr, isOwner: true, status: 'sent' };

        setMessages(prev => ({
            ...prev,
            [activeConversation]: [...(prev[activeConversation] || []), newMsg],
        }));

        setConversations(prev => prev.map(c =>
            c.id === activeConversation ? { ...c, lastMsg: newMessage, time: 'Just now' } : c
        ));

        setNewMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSelectConversation = (id) => {
        setActiveConversation(id);
        setConversations(prev => prev.map(c =>
            c.id === id ? { ...c, unread: 0 } : c
        ));
    };

    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.property.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeConv = conversations.find(c => c.id === activeConversation);
    const activeMessages = messages[activeConversation] || [];
    const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

    return (
        <div className="h-screen flex flex-col">
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Messages</h1>
                        <p className="text-muted-foreground text-sm mt-0.5">
                            {totalUnread > 0 ? `${totalUnread} unread conversation${totalUnread > 1 ? 's' : ''}` : 'All caught up!'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 mx-6 mb-6 mt-2 rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                {/* Conversation List */}
                <div className="w-80 border-r border-border flex flex-col shrink-0">
                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="pl-9 h-9 text-sm"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        {filteredConversations.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-sm text-muted-foreground">No conversations found</p>
                            </div>
                        ) : (
                            filteredConversations.map((c) => (
                                <div
                                    key={c.id}
                                    onClick={() => handleSelectConversation(c.id)}
                                    className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-200 border-b border-border/30 ${c.id === activeConversation
                                            ? 'bg-primary/5 border-l-2 border-l-primary'
                                            : 'hover:bg-muted/30 border-l-2 border-l-transparent'
                                        }`}
                                >
                                    <div className="relative shrink-0">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm ${c.id === activeConversation ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                                            }`}>
                                            {c.avatar}
                                        </div>
                                        {c.online && (
                                            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-card"></span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm truncate ${c.unread ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>{c.name}</p>
                                            <span className={`text-[10px] shrink-0 ${c.unread ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{c.time}</span>
                                        </div>
                                        <p className="text-[10px] text-primary font-medium flex items-center gap-1 mt-0.5">
                                            <Building2 size={8} /> {c.property}
                                        </p>
                                        <p className={`text-xs truncate mt-0.5 ${c.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{c.lastMsg}</p>
                                    </div>
                                    {c.unread > 0 && (
                                        <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1">{c.unread}</span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-card">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                    {activeConv?.avatar}
                                </div>
                                {activeConv?.online && (
                                    <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-card"></span>
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-foreground">{activeConv?.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    {activeConv?.online ? (
                                        <><span className="size-1.5 rounded-full bg-emerald-500"></span> Online</>
                                    ) : (
                                        <><span className="size-1.5 rounded-full bg-muted-foreground/30"></span> Offline</>
                                    )}
                                    <span className="mx-1">•</span> {activeConv?.property}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground"><Phone size={16} /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground"><Video size={16} /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground"><MoreVertical size={16} /></Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-hide">
                        <div className="text-center mb-4">
                            <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full">Today</span>
                        </div>
                        {activeMessages.map((m) => (
                            <div key={m.id} className={`flex ${m.isOwner ? 'justify-end' : 'justify-start'} animate-in fade-in-0 duration-200`}>
                                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${m.isOwner
                                        ? 'bg-primary text-primary-foreground rounded-br-md'
                                        : 'bg-muted text-foreground rounded-bl-md'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{m.text}</p>
                                    <div className={`flex items-center gap-1 mt-1 ${m.isOwner ? 'justify-end' : ''}`}>
                                        <p className={`text-[10px] ${m.isOwner ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{m.time}</p>
                                        {m.isOwner && (
                                            m.status === 'read' ? <CheckCheck size={12} className="text-primary-foreground/60" /> : <Check size={12} className="text-primary-foreground/60" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="px-6 py-4 border-t border-border bg-card">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0">
                                    <Paperclip size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0">
                                    <Image size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0">
                                    <Smile size={16} />
                                </Button>
                            </div>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                                className="flex-1 h-10 rounded-xl border border-border bg-muted/30 px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                            />
                            <Button
                                size="icon"
                                className={`h-10 w-10 rounded-xl shrink-0 transition-all ${newMessage.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                            >
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
