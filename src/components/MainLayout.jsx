import Header from '@/features/landing/components/Header';
import Footer from '@/features/landing/components/Footer';
import { useLocation } from 'react-router';
import { FavoritesProvider } from '@/features/favorites/FavoritesContext';
import { ChatProvider } from '@/features/chat/ChatContext';
import { AuthProvider } from '@/features/users/AuthContext';
import { VisitProvider } from '@/features/visits/VisitContext';

export default function MainLayout({ children }) {
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  return (
    <div className={`flex min-h-screen flex-col ${isChat ? 'h-screen overflow-hidden' : ''}`}>
      <FavoritesProvider>
        <ChatProvider>
          <AuthProvider>
            <VisitProvider>
              <Header />
              <main className={`flex-1 ${isChat ? 'h-[calc(100vh-73px)] overflow-hidden' : ''}`}>
                {children}
              </main>
            </VisitProvider>
          </AuthProvider>
        </ChatProvider>
      </FavoritesProvider>
      {!isChat && <Footer />}
    </div>
  );
}
