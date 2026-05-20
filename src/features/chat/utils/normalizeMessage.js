export function formatMessageTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function normalizeMessage(m) {
  if (!m) return null;
  return {
    id: m.id,
    text: m.content || '',
    time: formatMessageTime(m.createdAt),
    senderId: m.senderId,
    status: (m.status || 'SENT').toLowerCase(),
    type: m.type,
    raw: m,
  };
}
