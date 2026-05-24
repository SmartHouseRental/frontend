import SharedMessagesView from '@/features/chat/components/SharedMessagesView';

export default function RenterChatPage() {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-background">
      <SharedMessagesView role="renter" />
    </div>
  );
}
