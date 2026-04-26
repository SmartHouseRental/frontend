import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../ChatContext";
import {
  Send,
  Home,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  Smile,
} from "lucide-react";

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateHeader(ts) {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

// Group messages by date
function groupByDate(messages) {
  const groups = [];
  let lastDate = null;
  for (const msg of messages) {
    const date = new Date(msg.timestamp).toDateString();
    if (date !== lastDate) {
      groups.push({ type: "date", date: msg.timestamp });
      lastDate = date;
    }
    groups.push({ type: "message", ...msg });
  }
  return groups;
}

export default function ChatPanel({ onBack }) {
  const navigate = useNavigate();
  const { activeConversation, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const prevMsgCountRef = useRef(0);

  // Auto-scroll on new messages
  useEffect(() => {
    if (activeConversation) {
      const count = activeConversation.messages.length;
      if (count > prevMsgCountRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      prevMsgCountRef.current = count;
    }
  }, [activeConversation?.messages.length]);

  // Show typing indicator when a user message was just sent (simulating owner typing)
  useEffect(() => {
    if (!activeConversation) return;
    const msgs = activeConversation.messages;
    const lastMsg = msgs[msgs.length - 1];
    if (lastMsg && lastMsg.sender === "user") {
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
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Empty state — no conversation selected
  if (!activeConversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-[#D97745]/3 via-background to-[#D97745]/5 text-center px-8">
        <div className="size-24 bg-muted/60 rounded-3xl flex items-center justify-center mb-6">
          <Home className="h-10 w-10 text-muted-foreground/60" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-foreground/80">
          Select a Conversation
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Choose a conversation from the sidebar, or start a new chat from any
          property listing.
        </p>
      </div>
    );
  }

  const items = groupByDate(activeConversation.messages);

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-[#FDF8F3] via-[#FAF6F0] to-[#F5EDE4]">
      {/* ─── Chat Header ─── */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-card/80 backdrop-blur-sm border-b border-border/60 flex-shrink-0">
        {/* Back button (mobile) */}
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        {/* Property thumbnail */}
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-border/40 flex-shrink-0">
          {activeConversation.propertyImage ? (
            <img
              src={activeConversation.propertyImage}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Home className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>

        <div 
          className="flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate(`/profile/o1`)}
        >
          <h3 className="font-bold text-sm truncate">
            {activeConversation.ownerName}
          </h3>
          <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
            {activeConversation.propertyTitle}
          </p>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Phone className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Video className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ─── Messages Area ─── */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 chat-messages-scroll">
        {activeConversation.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/40 max-w-xs">
              <div className="size-12 bg-[#D97745]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Home className="h-6 w-6 text-[#D97745]" />
              </div>
              <p className="text-sm font-semibold mb-1">
                {activeConversation.propertyTitle}
              </p>
              <p className="text-xs text-muted-foreground">
                Say hi to {activeConversation.ownerName}! Ask about this
                property.
              </p>
            </div>
          </div>
        )}

        {items.map((item, i) =>
          item.type === "date" ? (
            <div
              key={`date-${i}`}
              className="flex justify-center my-4"
            >
              <span className="bg-card/80 backdrop-blur-sm text-[10px] text-muted-foreground px-3 py-1 rounded-full border border-border/40 font-medium uppercase tracking-wider">
                {formatDateHeader(item.date)}
              </span>
            </div>
          ) : (
            <div
              key={item.id}
              className={`flex mb-3 chat-msg-enter ${
                item.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Owner avatar */}
              {item.sender === "owner" && (
                <div 
                  className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-auto mb-1 flex-shrink-0 cursor-pointer hover:bg-primary/30 transition-colors"
                  onClick={() => navigate(`/profile/o1`)}
                >
                  <span className="text-[10px] font-bold text-primary">
                    {activeConversation.ownerName.charAt(0)}
                  </span>
                </div>
              )}

              <div
                className={`max-w-[75%] md:max-w-[65%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  item.sender === "user"
                    ? "bg-[#D97745] text-white rounded-br-md"
                    : "bg-[#C9A882]/20 text-foreground border border-[#C9A882]/20 rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{item.text}</p>
                <p
                  className={`text-[10px] mt-1 text-right ${
                    item.sender === "user"
                      ? "text-white/60"
                      : "text-muted-foreground"
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
          <div className="flex justify-start mb-3">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-auto mb-1 flex-shrink-0">
              <span className="text-[10px] font-bold text-primary">
                {activeConversation.ownerName.charAt(0)}
              </span>
            </div>
            <div className="bg-[#C9A882]/20 border border-[#C9A882]/20 rounded-2xl rounded-bl-md px-5 py-3 shadow-sm">
              <div className="flex gap-1.5 items-center">
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/50" />
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/50 [animation-delay:0.15s]" />
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/50 [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ─── Input Area ─── */}
      <div className="px-4 md:px-6 py-3 bg-card/60 backdrop-blur-sm border-t border-border/60 flex-shrink-0">
        <div className="flex items-end gap-2">
          <button className="p-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0">
            <Smile className="h-5 w-5" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0">
            <ImageIcon className="h-5 w-5" />
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              className="w-full resize-none px-4 py-3 rounded-2xl bg-muted/50 border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97745]/20 focus:border-[#D97745]/40 transition-all max-h-32 overflow-y-auto"
              style={{ minHeight: "44px" }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-3 rounded-2xl flex-shrink-0 transition-all duration-200 ${
              input.trim()
                ? "bg-[#D97745] text-white shadow-lg shadow-[#D97745]/20 hover:shadow-xl hover:shadow-[#D97745]/30 active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
