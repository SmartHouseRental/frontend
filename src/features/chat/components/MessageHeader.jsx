import { Button } from '@/components/ui/button';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';

export default function MessageHeader({ activeConv, onBack, isTyping, className = '' }) {
  if (!activeConv) return null;

  return (
    <div className={`flex items-center justify-between px-6 py-3.5 border-b border-border bg-card ${className}`}>
      <div className="flex items-center gap-3">
        {/* Mobile Back Button */}
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden -ml-2 h-9 w-9 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
        )}

        <div className="relative">
          {activeConv.isAvatarImage ? (
            <img
              src={activeConv.avatar}
              alt={activeConv.name}
              className="h-10 w-10 rounded-full object-cover border border-border/50"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              {activeConv.avatar}
            </div>
          )}
          {(activeConv.online || isTyping) && (
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-card animate-in zoom-in-0 duration-200"></span>
          )}
        </div>
        
        <div>
          <p className="font-bold text-foreground text-sm md:text-base">{activeConv.name}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            {isTyping ? (
              <span className="text-emerald-500 font-semibold animate-pulse">typing...</span>
            ) : activeConv.online ? (
              <>
                <span className="size-1.5 rounded-full bg-emerald-500"></span> Online
              </>
            ) : (
              <>
                <span className="size-1.5 rounded-full bg-muted-foreground/30"></span> Offline
              </>
            )}
            <span className="mx-1">•</span> {activeConv.property}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <Phone size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <Video size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <MoreVertical size={16} />
        </Button>
      </div>
    </div>
  );
}
