export const allConversations = [
  { id: 1, name: 'Mulugeta Kebede', property: 'Bole Skyline Apt', lastMsg: 'Thank you for confirming!', time: '2m ago', unread: 2, avatar: 'M', online: true },
  { id: 2, name: 'Sara Tesfaye', property: 'Luxury Villa Bole', lastMsg: 'When can I schedule a viewing?', time: '1h ago', unread: 1, avatar: 'S', online: true },
  { id: 3, name: 'Helen Girma', property: 'Cottage by the Lake', lastMsg: 'The lease terms look good.', time: '3h ago', unread: 0, avatar: 'H', online: false },
  { id: 4, name: 'Abebe Wolde', property: 'Studio in Kazanchis', lastMsg: 'Is parking included?', time: 'Yesterday', unread: 0, avatar: 'A', online: false },
  { id: 5, name: 'Tigist Haile', property: 'Penthouse Suite CMC', lastMsg: 'I sent the payment proof.', time: '2d ago', unread: 0, avatar: 'T', online: true },
  { id: 6, name: 'Yonas Desta', property: 'Luxury Villa Bole', lastMsg: 'Looking forward to the viewing.', time: '3d ago', unread: 0, avatar: 'Y', online: false },
];

export const allMessages = {
  1: [
    { id: 1, text: 'Hi, I wanted to ask about the maintenance request I submitted last week.', time: '10:15 AM', isOwner: false, status: 'read' },
    { id: 2, text: 'Hello Mulugeta! The plumber is scheduled to visit on Thursday between 9-11 AM. Will you be available?', time: '10:22 AM', isOwner: true, status: 'read' },
    { id: 3, text: 'Thursday works perfectly. Should I be present during the visit?', time: '10:25 AM', isOwner: false, status: 'read' },
    { id: 4, text: "It would be best if you're there to show them the issue. If not, I can arrange access with the building management.", time: '10:30 AM', isOwner: true, status: 'read' },
    { id: 5, text: "I'll make sure to be there. Thank you for confirming!", time: '10:32 AM', isOwner: false, status: 'read' },
  ],
  2: [
    { id: 1, text: 'Hello, I am interested in the Luxury Villa in Bole. Is it still available?', time: '9:00 AM', isOwner: false, status: 'read' },
    { id: 2, text: 'Yes, the villa is available! Would you like to schedule a viewing?', time: '9:15 AM', isOwner: true, status: 'read' },
    { id: 3, text: 'When can I schedule a viewing?', time: '9:20 AM', isOwner: false, status: 'unread' },
  ],
  3: [
    { id: 1, text: 'I reviewed the agreement and the lease terms look good.', time: '2:00 PM', isOwner: false, status: 'read' },
  ],
  4: [
    { id: 1, text: 'Good afternoon. I have a quick question about the studio.', time: '11:00 AM', isOwner: false, status: 'read' },
    { id: 2, text: 'Is parking included in the rental?', time: '11:01 AM', isOwner: false, status: 'read' },
  ],
  5: [
    { id: 1, text: 'I have just transferred the rent for this month.', time: '8:30 AM', isOwner: false, status: 'read' },
    { id: 2, text: 'I sent the payment proof via the app.', time: '8:31 AM', isOwner: false, status: 'read' },
  ],
  6: [
    { id: 1, text: 'Looking forward to the viewing on Saturday.', time: '4:00 PM', isOwner: false, status: 'read' },
  ],
};
