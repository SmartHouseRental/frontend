import { Button } from '@/components/ui/button';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';

export default function MessageHeader({ activeConv, onBack, className = '' }) {
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            {activeConv.avatar}
          </div>
          {activeConv.online && (
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-card"></span>
          )}
        </div>
        
        <div>
          <p className="font-bold text-foreground text-sm md:text-base">{activeConv.name}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            {activeConv.online ? (
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
