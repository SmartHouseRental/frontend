import { useState, useRef, useEffect } from 'react';
import { Home } from 'lucide-react';
import { allConversations, allMessages } from '../mock/messages';
import ConversationSidebar from './ConversationSidebar';
import MessageHeader from './MessageHeader';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

export default function SharedMessagesView({ role }) {
  const [activeConversation, setActiveConversation] = useState(1);
  const [conversations, setConversations] = useState(allConversations);
  const [messages, setMessages] = useState(allMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      time: timeStr,
      isOwner: role === 'owner',
      status: 'sent',
    };

    setMessages((prev) => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation
          ? { ...c, lastMsg: newMessage, time: 'Just now' }
          : c
      )
    );

    setNewMessage('');
  };

  const handleSelectConversation = (id) => {
    setActiveConversation(id);
    setShowPanel(true);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const handleBack = () => {
    setShowPanel(false);
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConv = conversations.find((c) => c.id === activeConversation);
  const activeMessages = activeConversation ? messages[activeConversation] || [] : [];
  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">
      {/* Header section */}
      <div className="px-6 pt-6 pb-2 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Messages</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {totalUnread > 0
                ? `${totalUnread} unread conversation${totalUnread > 1 ? 's' : ''}`
                : 'All caught up!'}
            </p>
          </div>
        </div>
      </div>

      {/* Main chat box container */}
      <div className="flex flex-1 mx-6 mb-6 mt-2 rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative min-h-0">
        {/* Conversation List Sidebar */}
        <ConversationSidebar
          conversations={filteredConversations}
          activeConversation={activeConversation}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSelectConversation={handleSelectConversation}
          className={`w-full md:w-80 border-r border-border shrink-0 ${
            activeConversation && showPanel ? 'hidden md:flex' : 'flex'
          }`}
        />

        {/* Chat Area / Window */}
        <div
          className={`flex-1 flex flex-col min-w-0 h-full ${
            !activeConversation || !showPanel ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeConv ? (
            <>
              <MessageHeader activeConv={activeConv} onBack={handleBack} />
              <ChatWindow
                messages={activeMessages}
                role={role}
                messagesEndRef={messagesEndRef}
              />
              <MessageInput
                newMessage={newMessage}
                onNewMessageChange={setNewMessage}
                onSend={handleSendMessage}
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-muted/10 px-8 text-center animate-in fade-in-0 duration-300">
              <div className="bg-muted/60 dark:bg-muted/30 mb-6 flex size-24 items-center justify-center rounded-3xl">
                <Home className="text-muted-foreground/60 h-10 w-10" />
              </div>
              <h2 className="text-foreground/80 mb-2 text-xl font-bold">Select a Conversation</h2>
              <p className="text-muted-foreground max-w-sm text-sm">
                Choose a conversation from the sidebar, or start a new chat from any property listing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
