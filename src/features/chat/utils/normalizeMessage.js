import { apiClient } from '@/lib/apiClient';

export function formatMessageTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function getBaseUrl() {
  const configUrl = apiClient.defaults.baseURL || '';
  return configUrl.replace(/\/api\/v1\/?$/, '');
}

export default function normalizeMessage(m) {
  if (!m) return null;

  const baseUrl = getBaseUrl();
  const normalizedAttachments = (m.attachments || []).map((att) => {
    let fileUrl = att.url || '';
    if (fileUrl.startsWith('/')) {
      fileUrl = `${baseUrl}${fileUrl}`;
    }
    return {
      ...att,
      url: fileUrl,
    };
  });

  // Group reactions: { emoji: '👍', count: 2, userIds: [...] }
  const reactionMap = {};
  (m.reactions || []).forEach((r) => {
    if (!reactionMap[r.emoji]) {
      reactionMap[r.emoji] = {
        emoji: r.emoji,
        count: 0,
        userIds: [],
      };
    }
    reactionMap[r.emoji].count += 1;
    reactionMap[r.emoji].userIds.push(r.userId);
  });
  const reactionsList = Object.values(reactionMap);

  return {
    id: m.id,
    text: m.content || '',
    time: formatMessageTime(m.createdAt),
    senderId: m.senderId,
    status: (m.status || 'SENT').toLowerCase(),
    type: m.type,
    attachments: normalizedAttachments,
    reactions: reactionsList,
    raw: m,
  };
}
