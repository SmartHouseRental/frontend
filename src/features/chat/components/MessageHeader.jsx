import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, Flag, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MessageHeader({
  activeConv,
  onBack,
  isTyping,
  /** Must be true only for renter chat — owners never see the report menu */
  showReportMenu = false,
  onReportOwner,
  className = '',
}) {
  const navigate = useNavigate();

  if (!activeConv) return null;

  const participantId = activeConv.ownerId;
  const canOpenProfile = Boolean(participantId);
  const renterReportMenu = showReportMenu === true;

  const openProfile = () => {
    if (participantId) {
      navigate(`/profile/${participantId}`, {
        state: {
          profileUser: {
            name: activeConv.name,
            role: 'owner',
          },
        },
      });
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-3.5 border-b border-border bg-card',
        className,
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden -ml-2 h-9 w-9 text-muted-foreground hover:text-foreground shrink-0"
          >
            <ArrowLeft size={20} />
          </Button>
        )}

        <button
          type="button"
          onClick={openProfile}
          disabled={!canOpenProfile}
          className={cn(
            'flex items-center gap-3 min-w-0 text-left',
            canOpenProfile && 'cursor-pointer rounded-lg hover:bg-muted/50 transition-colors pr-2 -ml-1 pl-1 py-1',
            !canOpenProfile && 'cursor-default',
          )}
          aria-label={canOpenProfile ? `View ${activeConv.name}'s profile` : undefined}
        >
          {activeConv.isAvatarImage ? (
            <img
              src={activeConv.avatar}
              alt={activeConv.name}
              className="h-10 w-10 shrink-0 rounded-full object-cover border border-border/50"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              {activeConv.avatar}
            </div>
          )}

          <div className="min-w-0">
            <p
              className={cn(
                'font-bold text-foreground text-sm md:text-base truncate',
                canOpenProfile && 'hover:text-primary transition-colors',
              )}
            >
              {activeConv.name}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
              {isTyping ? (
                <span className="text-primary font-semibold animate-pulse">typing...</span>
              ) : (
                <span>{activeConv.property}</span>
              )}
            </p>
          </div>
        </button>
      </div>

      {renterReportMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Conversation options"
            >
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={onReportOwner}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <Flag className="mr-2 size-4" />
              Report Owner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
