import { Link, useLocation } from 'react-router';
import { Bell, MessageCircle, Search } from 'lucide-react';

function OwnerHeader() {
    const location = useLocation();

    const segments = location.pathname.split('/').filter(Boolean);
    const ownerIndex = segments.indexOf('owner');
    const subSegments = ownerIndex !== -1 ? segments.slice(ownerIndex + 1) : [];

    const breadcrumbMap = {
        overview: 'Overview',
        properties: 'My Properties',
        'property-detail': 'Property Detail',
        appointments: 'Appointments',
        agreements: 'Agreements',
        'agreement-detail': 'Agreement Detail',
        messages: 'Messages',
        reviews: 'Reviews',
        notifications: 'Notifications',
        reports: 'Reports',
        analytics: 'Analytics',
        profile: 'Profile & Settings',
        payments: 'Payment History',
        help: 'Help & Support',
    };

    const breadcrumbs = [{ label: 'Owner Dashboard', to: '' }];
    let cumulativePath = '/owner';

    subSegments.forEach((segment) => {
        cumulativePath += `/${segment}`;
        const rawLabel = breadcrumbMap[segment];
        const label = rawLabel || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        breadcrumbs.push({ label, to: cumulativePath });
    });

    return (
        <header className="border-border bg-card sticky top-0 z-40 flex h-16 items-center justify-between border-b px-8">
            <div className="flex flex-1 items-center gap-6">
                <nav className="flex items-center text-sm font-medium">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {index > 0 && <span className="text-muted-foreground/40 mx-2">›</span>}
                            {index < breadcrumbs.length - 1 ? (
                                <Link
                                    to={crumb.to}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-foreground font-semibold">{crumb.label}</span>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 w-56 rounded-lg border border-border bg-muted/30 pl-9 pr-4 text-sm outline-none transition-all focus:w-72 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                    />
                </div>

                <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-card"></span>
                </button>
                <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                    <MessageCircle size={18} />
                </button>

                <div className="mx-1 h-8 w-px bg-border"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm leading-none font-bold text-foreground">Dawit M.</p>
                        <p className="text-xs font-medium text-muted-foreground">Owner</p>
                    </div>
                    <div
                        className="size-9 rounded-full border-2 border-primary/20 bg-primary/10 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX')",
                        }}
                        aria-label="Owner profile picture"
                    />
                </div>
            </div>
        </header>
    );
}

export default OwnerHeader;
