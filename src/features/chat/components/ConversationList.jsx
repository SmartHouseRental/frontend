import { useChat } from "../ChatContext";
import { Home, MessageCircle, Search } from "lucide-react";

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function ConversationList() {
  const { conversations, activeConversationId, setActiveConversationId } = useChat();

  return (
    <aside className="w-full md:w-[340px] lg:w-[380px] border-r border-border/60 bg-card/50 flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-border/60">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 bg-[#D97745]/10 rounded-xl flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-[#D97745]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Messages</h2>
            <p className="text-xs text-muted-foreground">
              {conversations.length} conversation{conversations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97745]/20 focus:border-[#D97745]/40 transition-all"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20">
            <div className="size-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
              <Home className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold mb-1">No conversations yet</p>
            <p className="text-xs text-muted-foreground max-w-[200px]">
              Start a chat from any property listing or your saved properties.
            </p>
          </div>
        ) : (
          conversations
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isActive = conv.id === activeConversationId;
              const isUnread = lastMsg && lastMsg.sender === "owner";

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`w-full text-left p-4 flex gap-3 border-b border-border/30 transition-all hover:bg-muted/40 ${
                    isActive
                      ? "bg-[#D97745]/5 border-l-[3px] border-l-[#D97745]"
                      : ""
                  }`}
                >
                  {/* Property thumbnail */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-border/40">
                    {conv.propertyImage ? (
                      <img
                        src={conv.propertyImage}
                        alt={conv.propertyTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Home className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3
                        className={`text-sm font-semibold truncate pr-2 ${
                          isUnread ? "text-foreground" : "text-foreground/80"
                        }`}
                      >
                        {conv.ownerName}
                      </h3>
                      {lastMsg && (
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {timeAgo(lastMsg.timestamp)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-1">
                      {conv.propertyTitle}
                    </p>
                    {lastMsg && (
                      <p
                        className={`text-xs truncate ${
                          isUnread
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {lastMsg.sender === "user" ? "You: " : ""}
                        {lastMsg.text}
                      </p>
                    )}
                  </div>

                  {/* Unread dot */}
                  {isUnread && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D97745]" />
                    </div>
                  )}
                </button>
              );
            })
        )}
      </div>
    </aside>
  );
}
