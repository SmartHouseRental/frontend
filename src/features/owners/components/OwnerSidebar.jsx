import { Home, LayoutDashboard, Calendar, MessageSquare, DollarSign } from 'lucide-react';
import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';

export default function OwnerSidebar() {
  const linkClass =
    'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-sidebar-accent';

  return (
    <aside className="bg-sidebar border-sidebar-border flex w-64 flex-col justify-between border-r p-5">
      <div>
        <div className="mb-8 flex items-center gap-2">
          <Home className="text-primary" />
          <span className="text-lg font-semibold">HabeshaHome</span>
        </div>

        <nav className="space-y-2">
          <NavLink to="/owner" className={linkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/owner/listings" className={linkClass}>
            <Home size={18} /> My Listings
          </NavLink>

          <NavLink to="/owner/bookings" className={linkClass}>
            <Calendar size={18} /> Bookings
          </NavLink>

          <NavLink to="/owner/messages" className={linkClass}>
            <MessageSquare size={18} /> Messages
          </NavLink>

          <NavLink to="/owner/earnings" className={linkClass}>
            <DollarSign size={18} /> Earnings
          </NavLink>
        </nav>
      </div>

      <Button className="bg-primary text-primary-foreground w-full">+ Add New Listing</Button>
    </aside>
  );
}
