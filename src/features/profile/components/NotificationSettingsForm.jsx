import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Globe, Loader2 } from 'lucide-react';
import { useUpdateNotifications } from '../hooks/useUpdateNotifications';
import { useUpdateLanguage } from '../hooks/useUpdateLanguage';

const notifSettings = [
    { key: 'appointments', label: 'New appointment requests', desc: 'Get notified when a renter requests a property viewing' },
    { key: 'agreements', label: 'Agreement updates', desc: 'Notifications for new, signed, or terminated agreements' },
    { key: 'payments', label: 'Payment confirmations', desc: 'Alert when payment proof is uploaded or confirmed' },
    { key: 'reviews', label: 'New reviews', desc: 'Get notified when a renter leaves a review' },
    { key: 'reports', label: 'Reports & complaints', desc: 'Alerts for reports filed against you or your properties' },
    { key: 'system', label: 'System announcements', desc: 'Platform updates and new features' },
];

export function NotificationSettingsForm({ profile }) {
    const updateNotificationsMutation = useUpdateNotifications();
    const updateLanguageMutation = useUpdateLanguage();

    const handleToggle = (key) => {
        const currentPrefs = profile?.notificationPreferences || {};
        const newPrefs = { ...currentPrefs, [key]: !currentPrefs[key] };
        updateNotificationsMutation.mutate(newPrefs);
    };

    const handleLanguageChange = (e) => {
        updateLanguageMutation.mutate({ language: e.target.value });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="space-y-1 pt-6">
                    <h3 className="text-foreground mb-4 flex items-center gap-2 font-bold">
                        <Bell size={16} /> Notification Preferences
                        {updateNotificationsMutation.isPending && <Loader2 size={14} className="animate-spin ml-2" />}
                    </h3>
                    {notifSettings.map((pref) => {
                        const isChecked = profile?.notificationPreferences?.[pref.key] ?? false;
                        return (
                            <div key={pref.key} className="hover:bg-muted/30 flex items-center justify-between rounded-lg px-2 py-3 transition-colors">
                                <div>
                                    <p className="text-foreground text-sm font-semibold">{pref.label}</p>
                                    <p className="text-muted-foreground text-xs">{pref.desc}</p>
                                </div>
                                <button
                                    onClick={() => handleToggle(pref.key)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${isChecked ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isChecked ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4 pt-6">
                    <h3 className="text-foreground flex items-center gap-2 font-bold">
                        <Globe size={16} /> Language
                        {updateLanguageMutation.isPending && <Loader2 size={14} className="animate-spin ml-2" />}
                    </h3>
                    <div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                            Preferred Language
                        </label>
                        <select
                            value={profile?.language || 'en'}
                            onChange={handleLanguageChange}
                            className="border-border bg-background focus:ring-primary/20 mt-1.5 h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 md:w-64"
                        >
                            <option value="en">English</option>
                            <option value="am">Amharic</option>
                            <option value="or">Afaan Oromo</option>
                            <option value="ti">Tigrinya</option>
                        </select>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
