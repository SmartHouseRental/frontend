import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useChat } from '../ChatContext';
import {
  Send,
  Home,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  Smile,
} from 'lucide-react';

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateHeader(ts) {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

// Group messages by date
function groupByDate(messages) {
  const groups = [];
  let lastDate = null;
  for (const msg of messages) {
    const date = new Date(msg.timestamp).toDateString();
    if (date !== lastDate) {
      groups.push({ type: 'date', date: msg.timestamp });
      lastDate = date;
    }
    groups.push({ type: 'message', ...msg });
  }
  return groups;
}

export default function ChatPanel({ onBack }) {
  const navigate = useNavigate();
  const { activeConversation, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const prevMsgCountRef = useRef(0);

  // Auto-scroll on new messages
  useEffect(() => {
    if (activeConversation) {
      const count = activeConversation.messages.length;
      if (count > prevMsgCountRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      prevMsgCountRef.current = count;
    }
  }, [activeConversation?.messages.length]);

  // Show typing indicator when a user message was just sent (simulating owner typing)
  useEffect(() => {
    if (!activeConversation) return;
    const msgs = activeConversation.messages;
    const lastMsg = msgs[msgs.length - 1];
    if (lastMsg && lastMsg.sender === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1200 + Math.random() * 1500);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [activeConversation?.messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Empty state — no conversation selected
  if (!activeConversation) {
    return (
      <div className="via-background flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#D97745]/3 to-[#D97745]/5 px-8 text-center">
        <div className="bg-muted/60 mb-6 flex size-24 items-center justify-center rounded-3xl">
          <Home className="text-muted-foreground/60 h-10 w-10" />
        </div>
        <h2 className="text-foreground/80 mb-2 text-xl font-bold">Select a Conversation</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          Choose a conversation from the sidebar, or start a new chat from any property listing.
        </p>
      </div>
    );
  }

  const items = groupByDate(activeConversation.messages);

  return (
    <div className="flex h-full flex-1 flex-col bg-gradient-to-br from-[#FDF8F3] via-[#FAF6F0] to-[#F5EDE4]">
      {/* ─── Chat Header ─── */}
      <div className="bg-card/80 border-border/60 flex flex-shrink-0 items-center gap-3 border-b px-5 py-3.5 backdrop-blur-sm">
        {/* Back button (mobile) */}
        {onBack && (
          <button
            onClick={onBack}
            className="hover:bg-muted rounded-lg p-1.5 transition-colors md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        {/* Property thumbnail */}
        <div className="border-border/40 h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl border">
          {activeConversation.propertyImage ? (
            <img
              src={activeConversation.propertyImage}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-muted flex h-full w-full items-center justify-center">
              <Home className="text-muted-foreground h-4 w-4" />
            </div>
          )}
        </div>

        <div
          className="min-w-0 flex-1 cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => navigate(`/profile/o1`)}
        >
          <h3 className="truncate text-sm font-bold">{activeConversation.ownerName}</h3>
          <p className="text-muted-foreground flex items-center gap-1 truncate text-xs">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
            {activeConversation.propertyTitle}
          </p>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-1">
          <button className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl p-2 transition-colors">
            <Phone className="h-4 w-4" />
          </button>
          <button className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl p-2 transition-colors">
            <Video className="h-4 w-4" />
          </button>
          <button className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl p-2 transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ─── Messages Area ─── */}
      <div className="chat-messages-scroll flex-1 overflow-y-auto px-4 py-4 md:px-6">
        {activeConversation.messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="bg-card border-border/40 max-w-xs rounded-2xl border p-6 shadow-sm">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-[#D97745]/10">
                <Home className="h-6 w-6 text-[#D97745]" />
              </div>
              <p className="mb-1 text-sm font-semibold">{activeConversation.propertyTitle}</p>
              <p className="text-muted-foreground text-xs">
                Say hi to {activeConversation.ownerName}! Ask about this property.
              </p>
            </div>
          </div>
        )}

        {items.map((item, i) =>
          item.type === 'date' ? (
            <div key={`date-${i}`} className="my-4 flex justify-center">
              <span className="bg-card/80 text-muted-foreground border-border/40 rounded-full border px-3 py-1 text-[10px] font-medium tracking-wider uppercase backdrop-blur-sm">
                {formatDateHeader(item.date)}
              </span>
            </div>
          ) : (
            <div
              key={item.id}
              className={`chat-msg-enter mb-3 flex ${
                item.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Owner avatar */}
              {item.sender === 'owner' && (
                <div
                  className="bg-primary/20 hover:bg-primary/30 mt-auto mr-2 mb-1 flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors"
                  onClick={() => navigate(`/profile/o1`)}
                >
                  <span className="text-primary text-[10px] font-bold">
                    {activeConversation.ownerName.charAt(0)}
                  </span>
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm md:max-w-[65%] ${
                  item.sender === 'user'
                    ? 'rounded-br-md bg-[#D97745] text-white'
                    : 'text-foreground rounded-bl-md border border-[#C9A882]/20 bg-[#C9A882]/20'
                }`}
              >
                <p className="break-words whitespace-pre-wrap">{item.text}</p>
                <p
                  className={`mt-1 text-right text-[10px] ${
                    item.sender === 'user' ? 'text-white/60' : 'text-muted-foreground'
                  }`}
                >
                  {formatTime(item.timestamp)}
                </p>
              </div>
            </div>
          ),
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="mb-3 flex justify-start">
            <div className="bg-primary/20 mt-auto mr-2 mb-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
              <span className="text-primary text-[10px] font-bold">
                {activeConversation.ownerName.charAt(0)}
              </span>
            </div>
            <div className="rounded-2xl rounded-bl-md border border-[#C9A882]/20 bg-[#C9A882]/20 px-5 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="typing-dot bg-muted-foreground/50 h-2 w-2 rounded-full" />
                <span className="typing-dot bg-muted-foreground/50 h-2 w-2 rounded-full [animation-delay:0.15s]" />
                <span className="typing-dot bg-muted-foreground/50 h-2 w-2 rounded-full [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ─── Input Area ─── */}
      <div className="bg-card/60 border-border/60 flex-shrink-0 border-t px-4 py-3 backdrop-blur-sm md:px-6">
        <div className="flex items-end gap-2">
          <button className="hover:bg-muted text-muted-foreground hover:text-foreground flex-shrink-0 rounded-xl p-2.5 transition-colors">
            <Smile className="h-5 w-5" />
          </button>
          <button className="hover:bg-muted text-muted-foreground hover:text-foreground flex-shrink-0 rounded-xl p-2.5 transition-colors">
            <ImageIcon className="h-5 w-5" />
          </button>

          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              className="bg-muted/50 border-border/60 max-h-32 w-full resize-none overflow-y-auto rounded-2xl border px-4 py-3 text-sm transition-all focus:border-[#D97745]/40 focus:ring-2 focus:ring-[#D97745]/20 focus:outline-none"
              style={{ minHeight: '44px' }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`flex-shrink-0 rounded-2xl p-3 transition-all duration-200 ${
              input.trim()
                ? 'bg-[#D97745] text-white shadow-lg shadow-[#D97745]/20 hover:shadow-xl hover:shadow-[#D97745]/30 active:scale-95'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
