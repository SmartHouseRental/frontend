import { useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import Header from '../features/landing/components/Header';
import RenterSidebar from '../features/renter/components/RenterSidebar';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useNotificationSocket } from '../features/notifications/hooks/useNotificationSocket';

export default function RenterLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Initialize real-time socket for notifications
  useNotificationSocket();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mobile Menu Trigger */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button 
          size="icon" 
          className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex">
        <RenterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 lg:ml-72 p-6 md:p-10">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
