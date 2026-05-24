import SharedMessagesView from '@/features/chat/components/SharedMessagesView';

function MessagesPage() {
  return (
    <div className="h-[calc(100vh-140px)] min-h-[500px] flex flex-col">
      <SharedMessagesView role="owner" />
    </div>
  );
}

export default MessagesPage;
