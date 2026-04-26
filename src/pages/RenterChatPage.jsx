import { useState } from "react";
import ConversationList from "@/features/chat/components/ConversationList";
import ChatPanel from "@/features/chat/components/ChatPanel";
import { useChat } from "@/features/chat/ChatContext";

export default function RenterChatPage() {
  const { activeConversationId } = useChat();
  // Mobile: show panel when a conversation is selected
  const [showPanel, setShowPanel] = useState(false);

  const handleSelectConversation = () => {
    setShowPanel(true);
  };

  const handleBack = () => {
    setShowPanel(false);
  };

  return (
    <div className="h-full flex overflow-hidden bg-background">
      {/* Sidebar — hidden on mobile when chat panel is open */}
      <div
        className={`${
          showPanel ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-auto`}
        onClick={handleSelectConversation}
      >
        <ConversationList />
      </div>

      {/* Chat Panel — hidden on mobile when sidebar is shown */}
      <div
        className={`${
          showPanel ? "flex" : "hidden md:flex"
        } flex-col flex-1`}
      >
        <ChatPanel onBack={handleBack} />
      </div>
    </div>
  );
}
