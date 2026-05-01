import { Home, MessageCircle, Search } from "lucide-react";

// Stub: shows empty state until chat integration
export default function ConversationList() {
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
              0 conversations
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

      {/* Empty state */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20">
          <div className="size-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
            <Home className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold mb-1">No conversations yet</p>
          <p className="text-xs text-muted-foreground max-w-[200px]">
            Start a chat from any property listing or your saved properties.
          </p>
        </div>
      </div>
    </aside>
  );
}
