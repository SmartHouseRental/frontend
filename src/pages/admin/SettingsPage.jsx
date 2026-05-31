import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Mail,
    Shield,
    Clock,
    Globe,
    Save,
    RotateCcw,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ToggleSwitch({ defaultChecked = false, label }) {
    return (
        <label className="group flex cursor-pointer items-center gap-3">
            <div className="relative">
                <input type="checkbox" className="peer sr-only" defaultChecked={defaultChecked} />
                <div className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-primary" />
                <div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
            </div>
            <span className="text-sm font-medium">{label}</span>
        </label>
    );
}

function SettingsPage() {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">{t('adminSettings.title')}</h2>
                    <p className="text-muted-foreground mt-1">
                        {t('adminSettings.subtitle')}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <RotateCcw size={16} />
                        {t('adminSettings.buttons.resetToDefaults')}
                    </Button>
                    <Button className="gap-2">
                        <Save size={16} />
                        {t('adminSettings.buttons.saveChanges')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
                                <Globe size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">{t('adminSettings.sections.general.title')}</h3>
                                <p className="text-muted-foreground text-xs">{t('adminSettings.sections.general.description')}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.platformName')}
                            </label>
                            <Input defaultValue="Smart House Rental" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.supportEmail')}
                            </label>
                            <Input defaultValue="support@smarthouserent.et" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.defaultLanguage')}
                            </label>
                            <Select defaultValue="en">
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="en">{t('adminSettings.languages.english')}</SelectItem>
                                        <SelectItem value="am">{t('adminSettings.languages.amharic')}</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <ToggleSwitch defaultChecked label={t('adminSettings.toggles.maintenanceMode')} />
                        <ToggleSwitch defaultChecked={true} label={t('adminSettings.toggles.allowNewRegistrations')} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <Shield size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">{t('adminSettings.sections.verificationRules.title')}</h3>
                                <p className="text-muted-foreground text-xs">{t('adminSettings.sections.verificationRules.description')}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <ToggleSwitch defaultChecked={true} label={t('adminSettings.toggles.requireOtp')} />
                        <ToggleSwitch defaultChecked={true} label={t('adminSettings.toggles.requireDocumentUpload')} />
                        <ToggleSwitch
                            defaultChecked={true}
                            label={t('adminSettings.toggles.autoApproveVerifiedOwners')}
                        />
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.maxOwnerEdits')}
                            </label>
                            <Input type="number" defaultValue="1" className="w-32" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.requiredDocuments')}
                            </label>
                            <div className="mt-2 space-y-2">
                                <ToggleSwitch defaultChecked={true} label={t('adminSettings.documents.nationalId')} />
                                <ToggleSwitch defaultChecked={true} label={t('adminSettings.documents.businessLicense')} />
                                <ToggleSwitch defaultChecked label={t('adminSettings.documents.propertyTitleDeed')} />
                                <ToggleSwitch defaultChecked label={t('adminSettings.documents.taxCertificate')} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Mail size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">{t('adminSettings.sections.emailConfiguration.title')}</h3>
                                <p className="text-muted-foreground text-xs">{t('adminSettings.sections.emailConfiguration.description')}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.smtpHost')}
                            </label>
                            <Input defaultValue="smtp.gmail.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    {t('adminSettings.fields.smtpPort')}
                                </label>
                                <Input defaultValue="587" />
                            </div>
                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    {t('adminSettings.fields.tls')}
                                </label>
                                <Select defaultValue="true">
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="true">{t('adminSettings.options.enabled')}</SelectItem>
                                            <SelectItem value="false">{t('adminSettings.options.disabled')}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.fromEmail')}
                            </label>
                            <Input defaultValue="noreply@smarthouserent.et" />
                        </div>
                        <ToggleSwitch defaultChecked={true} label={t('adminSettings.toggles.sendEmailOnPropertyApproval')} />
                        <ToggleSwitch defaultChecked={true} label={t('adminSettings.toggles.sendEmailOnAgreementStatusChange')} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <Clock size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">{t('adminSettings.sections.rateLimits.title')}</h3>
                                <p className="text-muted-foreground text-xs">{t('adminSettings.sections.rateLimits.description')}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.otpExpiration')}
                            </label>
                            <Input type="number" defaultValue="10" className="w-32" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.maxOtpResendAttempts')}
                            </label>
                            <Input type="number" defaultValue="3" className="w-32" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.reviewDeletionWindow')}
                            </label>
                            <Input type="number" defaultValue="7" className="w-32" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                {t('adminSettings.fields.maxLoginAttempts')}
                            </label>
                            <Input type="number" defaultValue="5" className="w-32" />
                        </div>
                        <ToggleSwitch defaultChecked label={t('adminSettings.toggles.enableIpRateLimiting')} />
                        <ToggleSwitch defaultChecked={true} label={t('adminSettings.toggles.requireStrongPasswords')} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default SettingsPage;
