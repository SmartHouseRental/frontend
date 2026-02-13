import { Link, useLocation } from 'react-router';
import { Bell, MessageCircle } from 'lucide-react';

function AdminHeader() {
  const location = useLocation();

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
        <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute top-2 right-2 size-2 rounded-full border-2 border-white bg-rose-500"></span>
        </button>
        <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100">
          <MessageCircle size={20} />
        </button>
        <div className="mx-2 h-8 w-px bg-slate-200"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm leading-none font-bold">Admin User</p>
            <p className="text-xs font-medium text-slate-500">System Manager</p>
          </div>
          <div
            className="border-accent/20 size-10 rounded-full border-2 bg-slate-200 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVENWs75X_DdjbXiQpbaXSUWlyKxPmt8aDZKyCIuwovO2HjYFN-y6uCBE3cH4ZMk5tI7eW-w7uohc-60we5mERDXP_iCeczYrWGoX53cLINdIMHe266Ay2cQI4ILueKSWooXkPTeJ350CkotirysPiF4RTufPQGsCI-2COXQRXM4hGBd6RGivTJPOn7YknQLATu5o3z6BUT2CZ-ZGOmUGf5KqPSfPDXNsSK4aXmBt9BV18DMxDDfMyv9QmZqvb-aXXLUVAXYzoT1EB')",
            }}
            aria-label="Admin profile picture"
          />
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
