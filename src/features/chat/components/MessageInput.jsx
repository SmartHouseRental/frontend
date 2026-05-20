import { Button } from '@/components/ui/button';
import { Paperclip, Image, Smile, Send } from 'lucide-react';

export default function MessageInput({
  newMessage,
  onNewMessageChange,
  onSend,
  placeholder = 'Type your message...',
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="px-6 py-4 border-t border-border bg-card">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0"
            title="Attach file"
          >
            <Paperclip size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0"
            title="Upload image"
          >
            <Image size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0"
            title="Insert emoji"
          >
            <Smile size={16} />
          </Button>
        </div>
        
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 h-10 rounded-xl border border-border bg-muted/30 px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/60"
        />
        
        <Button
          size="icon"
          className={`h-10 w-10 rounded-xl shrink-0 transition-all ${
            newMessage.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
          }`}
          onClick={onSend}
          disabled={!newMessage.trim()}
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
