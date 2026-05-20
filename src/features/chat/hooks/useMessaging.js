import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '../api';
import normalizeConversation from '../utils/normalizeConversation';
import normalizeMessage from '../utils/normalizeMessage';

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
