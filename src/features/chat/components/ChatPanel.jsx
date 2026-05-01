import { Home } from 'lucide-react';

// Stub: shows empty state until chat integration
export default function ChatPanel({ onBack }) {
  return (
    <div className="via-background flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#D97745]/3 to-[#D97745]/5 px-8 text-center">
      <div className="bg-muted/60 mb-6 flex size-24 items-center justify-center rounded-3xl">
        <Home className="text-muted-foreground/60 h-10 w-10" />
      </div>
      <h2 className="text-foreground/80 mb-2 text-xl font-bold">Select a Conversation</h2>
      <p className="text-muted-foreground max-w-sm text-sm">
        Choose a conversation from the sidebar, or start a new chat from any property listing.
      </p>
    </div>
  );
}
