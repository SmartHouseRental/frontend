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
    Settings as SettingsIcon,
    Mail,
    Shield,
    Clock,
    Globe,
    Save,
    RotateCcw,
} from 'lucide-react';

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
    return (
        <div className="space-y-8 p-8">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Platform Settings</h2>
                    <p className="text-muted-foreground mt-1">
                        Configure platform behavior, verification rules, and email settings.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <RotateCcw size={16} />
                        Reset to Defaults
                    </Button>
                    <Button className="gap-2">
                        <Save size={16} />
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* General Settings */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
                                <Globe size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">General Settings</h3>
                                <p className="text-muted-foreground text-xs">Core platform configuration</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                Platform Name
                            </label>
                            <Input defaultValue="Smart House Rental" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                Support Email
                            </label>
                            <Input defaultValue="support@smarthouserent.et" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                Default Language
                            </label>
                            <Select defaultValue="en">
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="am">Amharic (አማርኛ)</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <ToggleSwitch defaultChecked label="Enable maintenance mode" />
                        <ToggleSwitch defaultChecked={true} label="Allow new registrations" />
                    </CardContent>
                </Card>

                {/* Verification Rules */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <Shield size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">Verification Rules</h3>
                                <p className="text-muted-foreground text-xs">Owner verification workflow</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <ToggleSwitch defaultChecked={true} label="Require email OTP verification" />
                        <ToggleSwitch defaultChecked={true} label="Require document upload for owners" />
                        <ToggleSwitch
                            defaultChecked={true}
                            label="Auto-approve properties from verified owners"
                        />
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                Max Owner Edits Per Property
                            </label>
                            <Input type="number" defaultValue="1" className="w-32" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                Required Documents
                            </label>
                            <div className="mt-2 space-y-2">
                                <ToggleSwitch defaultChecked={true} label="National ID" />
                                <ToggleSwitch defaultChecked={true} label="Business License" />
                                <ToggleSwitch defaultChecked label="Property Title Deed" />
                                <ToggleSwitch defaultChecked label="Tax Certificate" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Email Settings */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Mail size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">Email Configuration</h3>
                                <p className="text-muted-foreground text-xs">SMTP and notification emails</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                SMTP Host
                            </label>
                            <Input defaultValue="smtp.gmail.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    SMTP Port
                                </label>
                                <Input defaultValue="587" />
                            </div>
                            <div>
                                <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                    TLS
                                </label>
                                <Select defaultValue="true">
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="true">Enabled</SelectItem>
                                            <SelectItem value="false">Disabled</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                From Email
                            </label>
                            <Input defaultValue="noreply@smarthouserent.et" />
                        </div>
                        <ToggleSwitch defaultChecked={true} label="Send email on property approval" />
                        <ToggleSwitch defaultChecked={true} label="Send email on agreement status change" />
                    </CardContent>
                </Card>

                {/* Rate Limits */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <Clock size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">Rate Limits & Security</h3>
                                <p className="text-muted-foreground text-xs">API and authentication limits</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                OTP Expiration (minutes)
                            </label>
                            <Input type="number" defaultValue="10" className="w-32" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                Max OTP Resend Attempts
                            </label>
                            <Input type="number" defaultValue="3" className="w-32" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                Review Deletion Window (days)
                            </label>
                            <Input type="number" defaultValue="7" className="w-32" />
                        </div>
                        <div>
                            <label className="text-muted-foreground mb-1.5 block text-xs font-bold uppercase tracking-wider">
                                Max Login Attempts
                            </label>
                            <Input type="number" defaultValue="5" className="w-32" />
                        </div>
                        <ToggleSwitch defaultChecked label="Enable IP-based rate limiting" />
                        <ToggleSwitch defaultChecked={true} label="Require strong passwords" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default SettingsPage;
