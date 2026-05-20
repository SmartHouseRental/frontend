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

  sendAttachment: async (conversationId, file, caption) => {
    const formData = new FormData();
    formData.append('file', file);
    if (caption) {
      formData.append('caption', caption);
    }
    const { data } = await apiClient.post(`/messaging/conversations/${conversationId}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data.message;
  },

  markAsRead: async (conversationId) => {
    const { data } = await apiClient.patch(`/messaging/conversations/${conversationId}/read`);
    return data.data; // contains success status
  },

  addReaction: async (messageId, emoji) => {
    const { data } = await apiClient.post(`/messaging/messages/${messageId}/reactions`, {
      emoji,
    });
    return data.data.message;
  },

  removeReaction: async (messageId, emoji) => {
    const { data } = await apiClient.delete(`/messaging/messages/${messageId}/reactions`, {
      data: { emoji },
    });
    return data.data.message;
  },

  deleteMessage: async (messageId) => {
    const { data } = await apiClient.delete(`/messaging/messages/${messageId}`);
    return data.data;
  },

  updateMessageStatus: async (messageId, status) => {
    const { data } = await apiClient.patch(`/messaging/messages/${messageId}/status`, {
      status,
    });
    return data.data.message;
  },
};
