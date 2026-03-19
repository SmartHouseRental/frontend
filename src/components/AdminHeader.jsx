import { Link, useLocation, useNavigate } from 'react-router';
import {
  Bell,
  MessageCircle,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const segments = location.pathname.split('/').filter(Boolean);
  const adminIndex = segments.indexOf('admin');
  const subSegments = adminIndex !== -1 ? segments.slice(adminIndex + 1) : [];

  const breadcrumbMap = {
    overview: 'Overview',
    users: 'Users Managment',
    properties: 'Properties',
    agreements: 'Agreements',
    reports: 'Reports',
    admins: 'Admins',
    maintenance: 'Maintenance',
    settings: 'Settings',
    detail: 'Detail',
    edit: 'Edit',
  };

  const breadcrumbs = [
    {
      label: 'Dashboard',
      to: '',
    },
  ];

  let cumulativePath = '/admin';

  subSegments.forEach((segment) => {
    cumulativePath += `/${segment}`;

    const rawLabel = breadcrumbMap[segment];
    const label = rawLabel || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    breadcrumbs.push({
      label,
      to: cumulativePath,
    });
  });

  return (
    <header className="border-border bg-sidebar sticky top-0 z-40 flex h-19.5 items-center justify-between border-b px-8">
      <div className="flex flex-1 items-center gap-6">
        <nav className="flex items-center text-sm font-medium">
          {breadcrumbs.map((crumb, index) => {
            let crumbClass = 'text-muted-foreground hover:text-foreground transition-colors';

            return (
              <div key={index} className="flex items-center gap-3">
                {index > 0 && <span className="text-muted-foreground mx-3">{'>'}</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className={crumbClass}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">{crumb.label}</span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 rounded-full border-2 border-white bg-rose-500"></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex w-full justify-between">
                  <span className="font-bold">New Property Submission</span>
                  <span className="text-muted-foreground text-[10px]">2m ago</span>
                </div>
                <p className="text-muted-foreground text-xs">Horizon Peak Villa is awaiting review.</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex w-full justify-between">
                  <span className="font-bold">Urgent Report</span>
                  <span className="text-muted-foreground text-[10px]">1h ago</span>
                </div>
                <p className="text-muted-foreground text-xs">A new fraud report has been filed.</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center font-bold text-blue-600">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100">
          <MessageCircle size={20} />
        </button>
        <div className="mx-2 h-8 w-px bg-slate-200"></div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg p-1 pr-2 transition-colors hover:bg-slate-50">
              <div
                className="border-accent/20 size-10 rounded-full border-2 bg-slate-200 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVENWs75X_DdjbXiQpbaXSUWlyKxPmt8aDZKyCIuwovO2HjYFN-y6uCBE3cH4ZMk5tI7eW-w7uohc-60we5mERDXP_iCeczYrWGoX53cLINdIMHe266Ay2cQI4ILueKSWooXkPTeJ350CkotirysPiF4RTufPQGsCI-2COXQRXM4hGBd6RGivTJPOn7YknQLATu5o3z6BUT2CZ-ZGOmUGf5KqPSfPDXNsSK4aXmBt9BV18DMxDDfMyv9QmZqvb-aXXLUVAXYzoT1EB')",
                }}
                aria-label="Admin profile picture"
              />
              <div className="hidden text-right md:block">
                <p className="text-sm leading-none font-bold">Admin User</p>
                <p className="text-xs font-medium text-slate-500">System Manager</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
              <User size={16} className="mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
              <Settings size={16} className="mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-rose-600">
              <LogOut size={16} className="mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;
