import ChatSidebar from "@/features/owners/components/chatpage/ChatSidebar";
import ChatWindow from "@/features/owners/components/chatpage/ChatWindow";
import PropertyPanel from "@/features/owners/components/chatpage/PropertyPanel";

export default function ChatPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* Left Sidebar */}
      <ChatSidebar />

      {/* Main Chat */}
      <ChatWindow />

      {/* Right Panel */}
      <PropertyPanel />
    </div>
  );
}