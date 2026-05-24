import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Bell, MessageCircle, ChevronDown, LogOut, User, Settings, HelpCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const notifications = [
    { id: 1, title: 'New appointment request', desc: 'Sara T. wants to view Luxury Villa', time: '5m ago', unread: true },
    { id: 2, title: 'Payment received', desc: '45,000 ETB — Bole Skyline Apt', time: '2h ago', unread: true },
    { id: 3, title: 'Agreement signed', desc: 'Mulugeta K. — Bole Skyline Apt', time: '5h ago', unread: false },
];

function OwnerHeader() {
    const location = useLocation();
    const [notifOpen, setNotifOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const unreadCount = notifications.filter(n => n.unread).length;

    const segments = location.pathname.split('/').filter(Boolean);
    const ownerIndex = segments.indexOf('owner');
    const subSegments = ownerIndex !== -1 ? segments.slice(ownerIndex + 1) : [];

    const breadcrumbMap = {
        overview: 'Overview',
        properties: 'My Properties',
        'property-detail': 'Property Detail',
        appointments: 'Appointments',
        agreements: 'Agreements',
        create: 'Create Agreement',
        'agreement-detail': 'Agreement Detail',
        messages: 'Messages',
        reviews: 'Reviews',
        notifications: 'Notifications',
        reports: 'Reports',
        analytics: 'Analytics',
        'add-property': 'Add Property',
        'edit-property': 'Edit Property',
        profile: 'Profile & Settings',
        payments: 'Payment History',
        help: 'Help & Support',
    };

    const breadcrumbs = [{ label: 'Owner Dashboard', to: '/owner' }];
    let cumulativePath = '/owner';

    subSegments.forEach((segment, index) => {
        cumulativePath += `/${segment}`;
        const prev = subSegments[index - 1];
        let label = breadcrumbMap[segment];
        if (!label && prev === 'agreements' && segment !== 'create') {
            label = 'Agreement details';
        }
        if (!label) {
            label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        }
        breadcrumbs.push({ label, to: cumulativePath });
    });

    return (
        <header className="border-border bg-card sticky top-0 z-40 flex h-16 items-center justify-between border-b px-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium">
                {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                        {index > 0 && <span className="text-muted-foreground/40 mx-1.5">›</span>}
                        {index < breadcrumbs.length - 1 ? (
                            <Link to={crumb.to} className="text-muted-foreground hover:text-foreground transition-colors">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-foreground font-semibold">{crumb.label}</span>
                        )}
                    </div>
                ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <button
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                {/* Notifications Dropdown */}
                <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
                    <DropdownMenuTrigger asChild>
                        <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground outline-none">
                            <Bell size={18} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Notifications</span>
                            {unreadCount > 0 && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                    {unreadCount} new
                                </span>
                            )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((n) => (
                            <DropdownMenuItem key={n.id} asChild className="cursor-pointer">
                                <Link to="/owner/notifications" className="flex items-start gap-3 py-2.5">
                                    <div className={`mt-0.5 size-2 shrink-0 rounded-full ${n.unread ? 'bg-primary' : 'bg-transparent'}`} />
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-sm truncate ${n.unread ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                                            {n.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">{n.desc}</p>
                                        <p className="text-[10px] text-muted-foreground/60 mt-0.5">{n.time}</p>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer justify-center">
                            <Link to="/owner/notifications" className="text-xs font-semibold text-primary">
                                View all notifications
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Messages */}
                <Link to="/owner/messages" className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                    <MessageCircle size={18} />
                    <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-500 px-1 text-[9px] font-bold text-white">
                        3
                    </span>
                </Link>

                <div className="mx-1.5 h-8 w-px bg-border" />

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/50 outline-none">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm leading-none font-bold text-foreground">Dawit M.</p>
                                <p className="text-[10px] font-medium text-muted-foreground">Owner</p>
                            </div>
                            <div
                                className="size-9 rounded-full border-2 border-primary/20 bg-primary/10 bg-cover bg-center"
                                style={{
                                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX')",
                                }}
                            />
                            <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer gap-2">
                            <Link to="/owner/profile"><User size={14} /> Profile & Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer gap-2">
                            <Link to="/owner/help"><HelpCircle size={14} /> Help & Support</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                            <LogOut size={14} /> Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

export default OwnerHeader;
