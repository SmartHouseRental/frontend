import { Search, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ConversationSidebar({
  conversations,
  activeConversation,
  searchQuery,
  onSearchQueryChange,
  onSelectConversation,
  className = '',
}) {
  return (
    <div className={`flex flex-col h-full bg-card ${className}`}>
      {/* Search Input */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 h-9 text-sm"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {conversations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No conversations found</p>
          </div>
        ) : (
          conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectConversation(c.id)}
              className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-200 border-b border-border/30 ${
                c.id === activeConversation
                  ? 'bg-primary/5 border-l-2 border-l-primary'
                  : 'hover:bg-muted/30 border-l-2 border-l-transparent'
              }`}
            >
              <div className="shrink-0">
                {c.isAvatarImage ? (
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-10 w-10 rounded-full object-cover border border-border/50"
                  />
                ) : (
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm ${
                      c.id === activeConversation
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {c.avatar}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm truncate ${
                      c.unread ? 'font-bold text-foreground' : 'font-medium text-foreground'
                    }`}
                  >
                    {c.name}
                  </p>
                  <span
                    className={`text-[10px] shrink-0 ${
                      c.unread ? 'text-primary font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    {c.time}
                  </span>
                </div>
                <p className="text-[10px] text-primary font-medium flex items-center gap-1 mt-0.5">
                  <Building2 size={8} /> {c.property}
                </p>
                <p
                  className={`text-xs truncate mt-0.5 ${
                    c.unread ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {c.lastMsg}
                </p>
              </div>
              
              {c.unread > 0 && (
                <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1">
                  {c.unread}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
