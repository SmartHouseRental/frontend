import { NavLink } from 'react-router';
import { 
  Calendar, 
  FileText, 
  Star, 
  Settings, 
  LogOut, 
  User,
  ChevronRight,
  Heart,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';
import { Bell } from 'lucide-react';

const menuItems = [
  {
    title: 'My Appointments',
    icon: Calendar,
    path: '/renter/appointments',
    description: 'Manage property visits'
  },
  {
    title: 'My Agreements',
    icon: FileText,
    path: '/renter/agreements',
    description: 'View and sign contracts'
  },
  {
    title: 'My Reviews',
    icon: Star,
    path: '/renter/reviews',
    description: 'Your feedback history'
  },
  {
    title: 'Notifications',
    icon: Bell,
    path: '/renter/notifications',
    description: 'System alerts and updates'
  },
  {
    title: 'Profile & Settings',
    icon: Settings,
    path: '/renter/profile',
    description: 'Personalize your account'
  }
];

export default function RenterSidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const logoutMutation = useLogout();
  const { data: notifications = [] } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const userName = user?.first_name || user?.last_name
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
    : (user?.fullName || user?.name || 'Renter');

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" 
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-[73px] bottom-0 z-40 w-72 border-r bg-white flex flex-col overflow-y-auto transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Renter Dashboard</h3>
              <p className="text-xs text-muted-foreground font-medium tracking-tighter">{userName}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => cn(
                  "group flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                )}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon className={cn(
                        "h-5 w-5 transition-transform group-hover:scale-110",
                        "text-current"
                      )} />
                      <span className="text-sm">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.title === 'Notifications' && unreadCount > 0 && (
                        <span className={cn(
                          "flex h-5 items-center justify-center rounded-full px-2 text-[10px] font-bold transition-colors",
                          isActive 
                            ? "bg-white text-primary" 
                            : "bg-primary text-primary-foreground"
                        )}>
                          {unreadCount}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t bg-slate-50/50">
          <button 
            className="flex items-center gap-3 w-full p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all font-medium"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm">{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
