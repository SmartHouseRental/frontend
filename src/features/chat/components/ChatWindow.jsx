import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, role, messagesEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10 scrollbar-hide">
      <div className="text-center mb-4">
        <span className="text-[10px] font-medium text-muted-foreground bg-muted/60 dark:bg-muted/30 px-3 py-1 rounded-full">
          Today
        </span>
      </div>
      
      {messages.map((m) => (
        <MessageBubble key={m.id} m={m} />
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
}
