import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const ChatContext = createContext(null);

// Mock user — replace with your real auth later
const MOCK_USER = { id: "u1", name: "Abebe", avatar: null };

// Simulated owner auto-replies
const AUTO_REPLIES = [
  "Thanks for reaching out! I'd be happy to help.",
  "The property is available for viewing this weekend.",
  "Yes, the rent includes water and internet.",
  "Feel free to ask any questions about the neighborhood!",
  "I can arrange a visit at your convenience.",
  "The deposit is one month's rent, refundable when you leave.",
  "There's a nice park within walking distance.",
  "Glad you're interested! Let me know when you're free.",
];

function getStorageKey(userId) {
  return `chat_conversations_${userId}`;
}

export function ChatProvider({ children }) {
  const [user] = useState(MOCK_USER);
  const [conversations, setConversations] = useState(() => {
    try {
      const stored = localStorage.getItem(getStorageKey(user.id));
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [activeConversationId, setActiveConversationId] = useState(null);
  const replyTimeoutRef = useRef(null);

  // Persist conversations
  useEffect(() => {
    localStorage.setItem(getStorageKey(user.id), JSON.stringify(conversations));
  }, [conversations, user.id]);

  // Get or create a conversation for a property+owner pair
  const openConversation = useCallback(
    ({ propertyId, propertyTitle, propertyImage, ownerName, ownerAvatar }) => {
      setConversations((prev) => {
        const existing = prev.find((c) => c.propertyId === propertyId);
        if (existing) {
          setActiveConversationId(existing.id);
          return prev;
        }
        const newConv = {
          id: `conv-${propertyId}-${Date.now()}`,
          propertyId,
          propertyTitle: propertyTitle || "Property",
          propertyImage: propertyImage || null,
          ownerName: ownerName || "Owner",
          ownerAvatar: ownerAvatar || null,
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setActiveConversationId(newConv.id);
        return [newConv, ...prev];
      });
    },
    [],
  );

  // Send a message in the active conversation
  const sendMessage = useCallback(
    (text) => {
      if (!text.trim() || !activeConversationId) return;

      const msg = {
        id: `msg-${Date.now()}`,
        text: text.trim(),
        sender: "user",
        senderName: user.name,
        timestamp: Date.now(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, messages: [...c.messages, msg], updatedAt: Date.now() }
            : c,
        ),
      );

      // Simulate owner reply after a short delay
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = setTimeout(() => {
        const reply = {
          id: `msg-${Date.now()}`,
          text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
          sender: "owner",
          senderName: "Owner",
          timestamp: Date.now(),
        };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversationId
              ? { ...c, messages: [...c.messages, reply], updatedAt: Date.now() }
              : c,
          ),
        );
      }, 1200 + Math.random() * 1500);
    },
    [activeConversationId, user.name],
  );

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );

  const unreadCount = conversations.reduce((acc, c) => {
    const lastMsg = c.messages[c.messages.length - 1];
    if (lastMsg && lastMsg.sender === "owner") return acc + 1;
    return acc;
  }, 0);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        activeConversationId,
        setActiveConversationId,
        openConversation,
        sendMessage,
        user,
        unreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
