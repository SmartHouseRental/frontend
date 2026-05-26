import { useTranslation } from 'react-i18next';
import SharedMessagesView from '@/features/chat/components/SharedMessagesView';

function MessagesPage() {
  const { t } = useTranslation();

  return (
    <div className="h-[calc(100vh-140px)] min-h-[500px] flex flex-col">
      <SharedMessagesView role="owner" headerTitle={t('messages')} />
    </div>
  );
}

export default MessagesPage;
