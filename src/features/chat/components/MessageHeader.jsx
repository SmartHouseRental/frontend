import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, Flag, MoreVertical, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MessageHeader({
  activeConv,
  onBack,
  isTyping,
  /** Renter-only: show Report Owner */
  showReportMenu = false,
  onReportOwner,
  onDeleteChat,
  className = '',
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!activeConv) return null;

  /** Other participant id (owner when renter chats; renter when owner chats) */
  const participantId = activeConv.ownerId;
  const canOpenProfile = Boolean(participantId && participantId !== 'unknown');
  const showMenu = Boolean(onDeleteChat || (showReportMenu && onReportOwner));

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
          aria-label={canOpenProfile ? t('chat.viewProfile', { name: activeConv.name }) : undefined}
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
                <span className="text-primary font-semibold animate-pulse">{t('chat.typing')}</span>
              ) : (
                <span>{activeConv.property}</span>
              )}
            </p>
          </div>
        </button>
      </div>

      {showMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
              aria-label={t('chat.conversationOptions')}
            >
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {showReportMenu && onReportOwner && (
              <>
                <DropdownMenuItem
                  onClick={onReportOwner}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <Flag className="mr-2 size-4" />
                  {t('chat.reportOwner')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {onDeleteChat && (
              <DropdownMenuItem
                onClick={onDeleteChat}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 size-4" />
                {t('chat.deleteChat')}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
