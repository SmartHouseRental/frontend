import Header from '@/features/landing/components/Header';
import Footer from '@/features/landing/components/Footer';
import { Outlet, useLocation } from 'react-router';

export default function MainLayout() {
  const location = useLocation();
  const isChat = location.pathname === '/chat';
  const isLanding = location.pathname === '/';

  return (
    <div className={`flex min-h-screen flex-col bg-background ${isChat ? 'h-screen overflow-hidden' : ''}`}>
      <Header />
      <main className={`flex-1 ${isChat ? 'h-[calc(100vh-73px)] overflow-hidden' : ''}`}>
        <Outlet />
      </main>
      {!isChat && !isLanding && <Footer />}
      {!isChat && isLanding && (
        <div className="bg-muted/50">
          <div className="mx-auto">
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
