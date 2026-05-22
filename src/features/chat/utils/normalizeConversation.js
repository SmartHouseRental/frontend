export function formatTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  if (diffMs < 0) return 'Just now';

  const diffMins = Math.floor(diffMs / (60 * 1000));
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function normalizeConversation(c) {
  if (!c) return null;
  const p = c.participant || {};
  const firstName = p.first_name || '';
  const lastName = p.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'User';
  
  const initials = firstName && lastName
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : firstName
    ? firstName[0].toUpperCase()
    : fullName[0].toUpperCase();

  const propertyTitle = c.property?.title?.en || c.property?.title || 'General Chat';

  let lastMsg = 'No messages';
  if (c.lastMessage) {
    if (c.lastMessage.type === 'TEXT') {
      lastMsg = c.lastMessage.content;
    } else {
      lastMsg = `[${c.lastMessage.type}]`;
    }
  }

  const lastActivityTime = c.lastMessage?.createdAt || c.updatedAt || c.createdAt;

  return {
    id: c.id,
    name: fullName,
    property: propertyTitle,
    propertyId: c.property?.id || c.propertyId || null,
    ownerId: p.id || null,
    lastMsg,
    time: formatTime(lastActivityTime),
    unread: c.unreadCount || 0,
    avatar: p.image || initials,
    isAvatarImage: !!p.image,
    raw: c,
  };
}
