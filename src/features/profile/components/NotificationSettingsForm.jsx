import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Globe, Loader2 } from 'lucide-react';
import { useUpdateNotifications } from '../hooks/useUpdateNotifications';
import { useUpdateLanguage } from '../hooks/useUpdateLanguage';

export function NotificationSettingsForm({ profile }) {
    const { t } = useTranslation();
    const updateNotificationsMutation = useUpdateNotifications();
    const updateLanguageMutation = useUpdateLanguage();

    const notifSettings = [
        { key: 'appointments', labelKey: 'appointments', descKey: 'appointmentsDesc' },
        { key: 'agreements', labelKey: 'agreements', descKey: 'agreementsDesc' },
        { key: 'payments', labelKey: 'payments', descKey: 'paymentsDesc' },
        { key: 'reviews', labelKey: 'reviews', descKey: 'reviewsDesc' },
        { key: 'reports', labelKey: 'reports', descKey: 'reportsDesc' },
        { key: 'system', labelKey: 'system', descKey: 'systemDesc' },
    ];

    const languageOptions = [
        { value: 'en', labelKey: 'english' },
        { value: 'am', labelKey: 'amharic' },
        { value: 'or', labelKey: 'oromo' },
        { value: 'ti', labelKey: 'tigrinya' },
    ];

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
                        <Bell size={16} /> {t('owner.profile.notificationSettings.title')}
                        {updateNotificationsMutation.isPending && <Loader2 size={14} className="animate-spin ml-2" />}
                    </h3>
                    {notifSettings.map((pref) => {
                        const isChecked = profile?.notificationPreferences?.[pref.key] ?? false;
                        return (
                            <div key={pref.key} className="hover:bg-muted/30 flex items-center justify-between rounded-lg px-2 py-3 transition-colors">
                                <div>
                                    <p className="text-foreground text-sm font-semibold">{t(`owner.profile.notificationSettings.items.${pref.labelKey}`)}</p>
                                    <p className="text-muted-foreground text-xs">{t(`owner.profile.notificationSettings.items.${pref.descKey}`)}</p>
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
                        <Globe size={16} /> {t('owner.profile.notificationSettings.languageTitle')}
                        {updateLanguageMutation.isPending && <Loader2 size={14} className="animate-spin ml-2" />}
                    </h3>
                    <div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                            {t('owner.profile.notificationSettings.languageLabel')}
                        </label>
                        <select
                            value={profile?.language || 'en'}
                            onChange={handleLanguageChange}
                            className="border-border bg-background focus:ring-primary/20 mt-1.5 h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 md:w-64"
                        >
                            {languageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {t(`owner.profile.notificationSettings.languageOptions.${option.labelKey}`)}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
