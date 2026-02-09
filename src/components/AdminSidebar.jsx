import { Users } from 'lucide-react';
import { Handshake } from 'lucide-react';
import { BugOff } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Gavel } from 'lucide-react';
import { Settings } from 'lucide-react';
import { ShieldUser } from 'lucide-react';
import { TableProperties } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, auth state, etc.)
    navigate('/login');
  };

  const navItems = [
    {
      to: 'overview',
      label: 'Dashboard',
      Icon: LayoutDashboard,
      end: true, // Only active on exact index route
    },
    {
      to: 'users',
      label: 'User Management',
      Icon: Users,
    },
    {
      to: 'properties',
      label: 'Properties',
      Icon: TableProperties,
    },
    {
      to: 'agreements',
      label: 'Agreements',
      Icon: Handshake,
    },
    {
      to: 'reports',
      label: 'Reports',
      Icon: Gavel,
    },
    {
      to: 'admins',
      label: 'Admins',
      Icon: ShieldUser,
    },
    {
      to: 'maintenance',
      label: 'Maintenance',
      Icon: BugOff,
    },
    {
      to: 'settings',
      label: 'Settings',
      Icon: Settings,
    },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <aside className="bg-primary fixed inset-y-0 left-0 z-50 flex w-72 flex-col text-white">
      <div className="flex items-center gap-3 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
          <Building2 size={24} />
        </div>
        <div>
          <h1 className="text-lg leading-tight font-bold">SmartRental</h1>
          <p className="text-[10px] tracking-widest text-white/60 uppercase">Admin Control</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navItems.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={getNavLinkClass}>
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/10">
          <div
            className="size-10 rounded-full bg-slate-300 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX')",
            }}
            aria-label="Headshot of system administrator"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Alex Rivera</p>
            <p className="truncate text-xs text-white/50">Super Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-white/70 transition-colors hover:text-white"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
