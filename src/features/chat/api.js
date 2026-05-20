import { apiClient } from '@/lib/apiClient';

export const chatApi = {
  getConversations: async () => {
    const { data } = await apiClient.get('/messaging/conversations');
    return data.data.conversations;
  },

  createConversation: async (ownerId, renterId, propertyId) => {
    const { data } = await apiClient.post('/messaging/conversations', {
      ownerId,
      renterId,
      propertyId,
    });
    return data.data.conversation;
  },

  getMessages: async (conversationId, limit = 50, cursor) => {
    const params = { limit };
    if (cursor) {
      params.cursor = cursor;
    }
    const { data } = await apiClient.get(`/messaging/conversations/${conversationId}/messages`, {
      params,
    });
    return data.data; // contains messages array and nextCursor
  },

  sendMessage: async (conversationId, content) => {
    const { data } = await apiClient.post(`/messaging/conversations/${conversationId}/messages`, {
      content,
    });
    return data.data.message;
  },

  markAsRead: async (conversationId) => {
    const { data } = await apiClient.patch(`/messaging/conversations/${conversationId}/read`);
    return data.data; // contains success status
  },
};
