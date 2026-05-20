import { useState } from 'react';
import { Check, CheckCheck, Trash2, FileText, Download } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function MessageBubble({ m, onReact, onDelete }) {
  const { user } = useAuth();
  const isMe = m.senderId === user?.id;

  return (
    <div className={`group relative flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-3 px-6 animate-in fade-in-0 duration-200`}>
      
      {/* Quick Actions Hover Menu */}
      <div
        className={`absolute -top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 z-10 bg-card border border-border/80 shadow-md rounded-full px-2 py-1 ${
          isMe ? 'right-12' : 'left-12'
        }`}
      >
        {['👍', '❤️', '👏', '😂'].map((emoji) => {
          const hasReacted = (m.reactions || []).find((r) => r.emoji === emoji)?.userIds.includes(user?.id);
          return (
            <button
              key={emoji}
              onClick={() => onReact(m.id, emoji, hasReacted)}
              className={`text-sm hover:scale-125 transition-transform p-0.5 ${
                hasReacted ? 'grayscale-[50%] scale-110' : ''
              }`}
            >
              {emoji}
            </button>
          );
        })}
        {isMe && (
          <button
            onClick={() => onDelete(m.id)}
            className="text-muted-foreground hover:text-destructive p-0.5 transition-colors ml-1 border-l border-border/80 pl-1.5"
            title="Delete message"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      {/* Bubble Wrapper */}
      <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
        
        {/* Main Text & Attachments Bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 shadow-sm w-full ${
            isMe
              ? 'bg-primary text-primary-foreground rounded-br-md animate-in slide-in-from-right-1'
              : 'bg-muted text-foreground rounded-bl-md animate-in slide-in-from-left-1'
          }`}
        >
          {m.text && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
          )}

          {/* Render File Attachments */}
          {m.attachments && m.attachments.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {m.attachments.map((att) => {
                const isImage = att.mimeType?.startsWith('image/');
                if (isImage) {
                  return (
                    <a
                      key={att.id}
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg overflow-hidden border border-border/10 max-h-48 hover:opacity-90 transition-opacity bg-black/5 dark:bg-white/5"
                    >
                      <img
                        src={att.url}
                        alt={att.fileName}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  );
                }
                return (
                  <a
                    key={att.id}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-colors text-xs font-medium ${
                      isMe
                        ? 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20'
                        : 'bg-card border-border hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    <FileText size={16} className={isMe ? 'text-primary-foreground' : 'text-primary'} />
                    <span className="truncate flex-1">{att.fileName}</span>
                    <Download size={14} className={isMe ? 'text-primary-foreground/75' : 'text-muted-foreground'} />
                  </a>
                );
              })}
            </div>
          )}

          {/* Timestamp and status checkmarks */}
          <div className={`flex items-center gap-1 mt-1.5 ${isMe ? 'justify-end' : ''}`}>
            <p className={`text-[10px] ${isMe ? 'text-primary-foreground/60' : 'text-muted-foreground/80'}`}>
              {m.time}
            </p>
            {isMe && (
              m.status === 'read' ? (
                <CheckCheck size={12} className="text-primary-foreground/70" />
              ) : (
                <Check size={12} className="text-primary-foreground/70" />
              )
            )}
          </div>
        </div>

        {/* Render Emoji Reactions Below Bubble */}
        {m.reactions && m.reactions.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
            {m.reactions.map((r) => {
              const hasReacted = r.userIds.includes(user?.id);
              return (
                <button
                  key={r.emoji}
                  onClick={() => onReact(m.id, r.emoji, hasReacted)}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] border transition-all ${
                    hasReacted
                      ? 'bg-primary/10 border-primary/30 text-primary font-semibold'
                      : 'bg-muted/50 border-border/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <span>{r.emoji}</span>
                  <span>{r.count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
