import { useState, useRef, useEffect } from 'react';
import { Home, Loader2 } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import ReportModal from '@/features/reports/components/ReportModal';
import {
  useConversations,
  useConversationMessages,
  useSendMessage,
  useSendAttachment,
  useMarkAsRead,
  useMessageReactions,
  useDeleteMessage,
  useChatSocket,
} from '../hooks/useMessaging';
import ConversationSidebar from './ConversationSidebar';
import MessageHeader from './MessageHeader';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';


export default function SharedMessagesView({ role }) {
  const { user, isAuthenticated } = useAuth();
  const currentUserId = user?.id;
  const location = useLocation();
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState(null);
  const [reportModal, setReportModal] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (location.state?.conversationId) {
      setActiveConversation(location.state.conversationId);
      setShowPanel(true);
      
      // Remove it from state so it doesn't keep triggering on page refresh
      const state = { ...location.state };
      delete state.conversationId;
      window.history.replaceState({ ...window.history.state, usr: state }, '');
    }
  }, [location.state?.conversationId]);

  // Phase 1: Fetch conversations (HTTP polling as background fallback)
  const { data: conversations = [], isLoading: isLoadingConversations } = useConversations({
    refetchInterval: 10000, // slower polling now that sockets handle real-time sync
  });

  // Phase 1: Fetch messages
  const { data: messages = [], isLoading: isLoadingMessages } = useConversationMessages(activeConversation);

  // Phase 2 REST Mutations
  const sendMessageMutation = useSendMessage();
  const sendAttachmentMutation = useSendAttachment();
  const markAsReadMutation = useMarkAsRead();
  const { addReaction, removeReaction } = useMessageReactions();
  const deleteMessageMutation = useDeleteMessage();

  // Phase 2 WebSocket Sync Hook
  const {
    isConnected,
    emitSendMessage,
    emitTyping,
    emitReactionAdd,
    emitReactionRemove,
    emitDelete,
  } = useChatSocket(activeConversation, {
    onTypingStatusChange: (data) => {
      if (data.userId !== currentUserId) {
        setIsTyping(data.isTyping);
      }
    },
  });

  // Reset typing indicator when switching chats
  useEffect(() => {
    setIsTyping(false);
  }, [activeConversation]);

  // Typing Emitter Debounce
  useEffect(() => {
    if (!activeConversation || !isConnected) return;
    if (newMessage.trim()) {
      emitTyping(true);
      const timeout = setTimeout(() => {
        emitTyping(false);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      emitTyping(false);
    }
  }, [newMessage, activeConversation, isConnected]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, activeConversation]);

  // Mark messages as read when user selects a conversation or receives new messages
  useEffect(() => {
    if (activeConversation) {
      const activeConv = conversations.find((c) => c.id === activeConversation);
      if (activeConv && activeConv.unread > 0) {
        markAsReadMutation.mutate(activeConversation);
      }
    }
  }, [activeConversation, conversations, messages.length]);

  const handleSendMessage = async (text, file) => {
    if (!activeConversation) return;

    if (file) {
      try {
        await sendAttachmentMutation.mutateAsync({
          conversationId: activeConversation,
          file,
          caption: text,
        });
      } catch (error) {
        console.error('Failed to send attachment:', error);
      }
      return;
    }

    if (!text.trim()) return;

    if (isConnected) {
      emitSendMessage(text);
      setNewMessage('');
    } else {
      try {
        await sendMessageMutation.mutateAsync({
          conversationId: activeConversation,
          content: text,
        });
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleReact = (messageId, emoji, hasReacted) => {
    if (isConnected) {
      if (hasReacted) {
        emitReactionRemove(messageId, emoji);
      } else {
        emitReactionAdd(messageId, emoji);
      }
    } else {
      if (hasReacted) {
        removeReaction.mutate({ messageId, emoji });
      } else {
        addReaction.mutate({ messageId, emoji });
      }
    }
  };

  const handleDeleteMessage = (messageId) => {
    if (isConnected) {
      emitDelete(messageId);
    } else {
      deleteMessageMutation.mutate(messageId);
    }
  };

  const handleSelectConversation = (id) => {
    setActiveConversation(id);
    setShowPanel(true);
    markAsReadMutation.mutate(id);
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
  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  const handleReportOwner = () => {
    if (!activeConv?.ownerId) return;

    if (!isAuthenticated || user?.role?.toLowerCase() !== 'renter') {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!activeConv.ownerId) {
      return;
    }

    setReportModal({
      targetType: 'user',
      targetId: activeConv.ownerId,
      subjectName: activeConv.name,
    });
  };

  if (isLoadingConversations) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading chats...</p>
        </div>
      </div>
    );
  }

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
              <MessageHeader
                activeConv={activeConv}
                onBack={handleBack}
                isTyping={isTyping}
                showReportMenu={role === 'renter'}
                onReportOwner={handleReportOwner}
              />
              {isLoadingMessages && messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center bg-muted/10">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                <ChatWindow
                  messages={messages}
                  messagesEndRef={messagesEndRef}
                  onReact={handleReact}
                  onDelete={handleDeleteMessage}
                />
              )}
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

      {reportModal && (
        <ReportModal
          isOpen
          onClose={() => setReportModal(null)}
          targetType={reportModal.targetType}
          targetId={reportModal.targetId}
          subjectName={reportModal.subjectName}
        />
      )}
    </div>
  );
}

