import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { getToken } from '@/features/auth/utils';
import { apiClient } from '@/lib/apiClient';
import { toast } from 'sonner';
import { chatApi } from '../api';
import normalizeConversation from '../utils/normalizeConversation';
import normalizeMessage from '../utils/normalizeMessage';
import { getChatErrorMessage } from '../utils/chatErrors';

function getBaseUrl() {
  const configUrl = apiClient.defaults.baseURL || '';
  return configUrl.replace(/\/api\/v1\/?$/, '');
}

// -------------------------------------------------------------
// React Query Hooks
// -------------------------------------------------------------

export function useConversations(options = {}) {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: chatApi.getConversations,
    select: (data) => (data || []).map(normalizeConversation),
    ...options,
  });
}

export function useConversationMessages(conversationId, options = {}) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => chatApi.getMessages(conversationId),
    enabled: !!conversationId,
    select: (data) => {
      const messages = data?.messages || [];
      return messages.map(normalizeMessage);
    },
    ...options,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, content }) =>
      chatApi.sendMessage(conversationId, content),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.conversationId],
      });
    },
  });
}

export function useSendAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, file, caption }) =>
      chatApi.sendAttachment(conversationId, file, caption),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.conversationId],
      });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId) => chatApi.markAsRead(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ownerId, renterId, propertyId }) =>
      chatApi.createConversation(ownerId, renterId, propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useMessageReactions() {
  const queryClient = useQueryClient();

  const addReaction = useMutation({
    mutationFn: ({ messageId, emoji }) => chatApi.addReaction(messageId, emoji),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const removeReaction = useMutation({
    mutationFn: ({ messageId, emoji }) => chatApi.removeReaction(messageId, emoji),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  return { addReaction, removeReaction };
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId) => chatApi.deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId) => chatApi.deleteConversation(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.removeQueries({ queryKey: ['messages'] });
      toast.success('Chat deleted');
    },
    onError: (error) => {
      toast.error(getChatErrorMessage(error, 'Failed to delete chat'));
    },
  });
}

// -------------------------------------------------------------
// Socket.IO Integration Hook
// -------------------------------------------------------------

export function useChatSocket(conversationId, { onTypingStatusChange } = {}) {
  const queryClient = useQueryClient();
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    const token = getToken();
    if (!token) return;

    const socketUrl = getBaseUrl();
    const socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      // Join the room
      socket.emit('conversation:join', conversationId, (response) => {
        if (response && response.status === 'error') {
          console.error('Failed to join chat room:', response.message);
        }
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Real-time Event Listeners

    // 1. New Message
    socket.on('message:new', (message) => {
      if (message.conversationId !== conversationId) {
        // Update unread badge on side panel
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
        return;
      }

      // Sync React Query messages cache directly
      queryClient.setQueryData(['messages', conversationId], (oldData) => {
        if (!oldData) return oldData;
        const messagesList = oldData.messages || [];
        // Check if already in list (e.g. REST response or optimistic updates)
        if (messagesList.some((m) => m.id === message.id)) {
          return oldData;
        }
        return {
          ...oldData,
          messages: [...messagesList, message],
        };
      });

      // Update sidebar preview
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    });

    // 2. Message Updated (e.g., reaction added/removed, or status changed)
    socket.on('message:updated', (updatedMessage) => {
      if (updatedMessage.conversationId !== conversationId) return;

      queryClient.setQueryData(['messages', conversationId], (oldData) => {
        if (!oldData) return oldData;
        const messagesList = oldData.messages || [];
        return {
          ...oldData,
          messages: messagesList.map((m) =>
            m.id === updatedMessage.id ? updatedMessage : m
          ),
        };
      });
    });

    // 3. Message Deleted
    socket.on('message:deleted', (data) => {
      if (data.conversationId !== conversationId) return;

      queryClient.setQueryData(['messages', conversationId], (oldData) => {
        if (!oldData) return oldData;
        const messagesList = oldData.messages || [];
        return {
          ...oldData,
          messages: messagesList.filter((m) => m.id !== data.messageId),
        };
      });

      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    });

    // 4. Typing Status
    socket.on('message:typing', (data) => {
      if (data.conversationId === conversationId && onTypingStatusChange) {
        onTypingStatusChange(data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId, queryClient]);

  // Emitters

  const emitSendMessage = (content, replyToId) => {
    if (!socketRef.current || !isConnected) return false;
    socketRef.current.emit('message:send', { conversationId, content, replyToId });
    return true;
  };

  const emitTyping = (isTyping) => {
    if (!socketRef.current || !isConnected) return;
    socketRef.current.emit('conversation:typing', { conversationId, isTyping });
  };

  const emitReactionAdd = (messageId, emoji) => {
    if (!socketRef.current || !isConnected) return;
    socketRef.current.emit('message:reaction:add', { messageId, emoji });
  };

  const emitReactionRemove = (messageId, emoji) => {
    if (!socketRef.current || !isConnected) return;
    socketRef.current.emit('message:reaction:remove', { messageId, emoji });
  };

  const emitDelete = (messageId) => {
    if (!socketRef.current || !isConnected) return;
    socketRef.current.emit('message:delete', { messageId });
  };

  return {
    isConnected,
    emitSendMessage,
    emitTyping,
    emitReactionAdd,
    emitReactionRemove,
    emitDelete,
  };
}
