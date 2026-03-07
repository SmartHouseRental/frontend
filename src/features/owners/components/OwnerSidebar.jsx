import { Home, LayoutDashboard, Calendar, MessageSquare, DollarSign } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default function OwnerSidebar() {
  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-sidebar-accent";

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <Home className="text-primary" />
          <span className="font-semibold text-lg">HabeshaHome</span>
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

      <Button className="w-full bg-primary text-primary-foreground">
        + Add New Listing
      </Button>
    </aside>
  );
}