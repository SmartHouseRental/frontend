import { Check, CheckCheck } from 'lucide-react';

export default function MessageBubble({ m, role }) {
  const isMe = (role === 'owner' && m.isOwner) || (role === 'renter' && !m.isOwner);

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in-0 duration-200`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
          isMe
            ? 'bg-primary text-primary-foreground rounded-br-md animate-in slide-in-from-right-1'
            : 'bg-muted text-foreground rounded-bl-md animate-in slide-in-from-left-1'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
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
    </div>
  );
}
