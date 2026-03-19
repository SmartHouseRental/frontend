import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shield, Bell, Globe, CreditCard, Upload, Camera, Save, Eye, EyeOff, Lock } from 'lucide-react';

function ProfilePage() {
    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Profile & Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your personal info, security, and preferences.</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="bg-muted/50">
                    <TabsTrigger value="profile">Personal Info</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                    <TabsTrigger value="payment">Payment Details</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* Personal Info */}
                <TabsContent value="profile" className="mt-6 space-y-6">
                    <Card>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div
                                        className="size-20 rounded-full bg-primary/10 bg-cover bg-center ring-4 ring-primary/20"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX')" }}
                                    />
                                    <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/40 transition-colors">
                                        <Camera size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">Dawit Mekonnen</h3>
                                    <p className="text-sm text-muted-foreground">dawit.m@email.com</p>
                                    <p className="text-xs text-emerald-500 font-semibold mt-1 flex items-center gap-1">
                                        <Shield size={12} /> Verified Owner
                                    </p>
                                </div>
                            </div>

                            <div className="h-px bg-border"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                                    <Input className="mt-1.5" defaultValue="Dawit Mekonnen" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                                    <Input className="mt-1.5" defaultValue="dawit.m@email.com" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
                                    <Input className="mt-1.5" defaultValue="+251 91 234 5678" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</label>
                                    <Input className="mt-1.5" defaultValue="Addis Ababa, Ethiopia" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bio</label>
                                    <textarea className="mt-1.5 w-full h-24 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20" defaultValue="Property owner with 5+ years of experience managing residential rentals in Addis Ababa. Specializing in premium villas and modern apartments." />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button className="gap-2"><Save size={14} /> Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Verification Docs */}
                <TabsContent value="verification" className="mt-6 space-y-6">
                    <Card>
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><Shield size={16} /> Verification Documents</h3>
                            <p className="text-sm text-muted-foreground">Upload documents to verify your identity and property ownership.</p>

                            {[
                                { label: 'National ID / Passport', status: 'Verified', file: 'national_id.pdf' },
                                { label: 'Business License', status: 'Verified', file: 'business_license.pdf' },
                                { label: 'Property Ownership Deed', status: 'Pending', file: null },
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{doc.label}</p>
                                        {doc.file && <p className="text-xs text-muted-foreground mt-0.5">{doc.file}</p>}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {doc.status}
                                        </span>
                                        <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                                            <Upload size={12} /> {doc.file ? 'Replace' : 'Upload'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Payment Details */}
                <TabsContent value="payment" className="mt-6 space-y-6">
                    <Card>
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><CreditCard size={16} /> Bank / Payment Details</h3>
                            <p className="text-sm text-muted-foreground">Add your bank details for manual transfer payments from renters.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bank Name</label>
                                    <Input className="mt-1.5" defaultValue="Commercial Bank of Ethiopia" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account Number</label>
                                    <Input className="mt-1.5" defaultValue="1000 **** **** 4521" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account Holder Name</label>
                                    <Input className="mt-1.5" defaultValue="Dawit Mekonnen" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Branch</label>
                                    <Input className="mt-1.5" defaultValue="Bole Branch" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button className="gap-2"><Save size={14} /> Save Payment Info</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Preferences */}
                <TabsContent value="notifications" className="mt-6 space-y-6">
                    <Card>
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><Bell size={16} /> Notification Preferences</h3>
                            {[
                                { label: 'New appointment requests', desc: 'Get notified when a renter requests a property viewing', checked: true },
                                { label: 'Agreement updates', desc: 'Notifications for new, signed, or terminated agreements', checked: true },
                                { label: 'Payment confirmations', desc: 'Alert when payment proof is uploaded or confirmed', checked: true },
                                { label: 'New reviews', desc: 'Get notified when a renter leaves a review', checked: false },
                                { label: 'Reports & complaints', desc: 'Alerts for reports filed against you or your properties', checked: true },
                                { label: 'System announcements', desc: 'Platform updates and new features', checked: false },
                            ].map((pref, i) => (
                                <div key={i} className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{pref.label}</p>
                                        <p className="text-xs text-muted-foreground">{pref.desc}</p>
                                    </div>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" className="peer sr-only" defaultChecked={pref.checked} />
                                        <div className="h-5 w-9 rounded-full bg-muted peer-checked:bg-primary transition-colors after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:after:translate-x-4"></div>
                                    </label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="space-y-4">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><Globe size={16} /> Language</h3>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Language</label>
                                <select className="mt-1.5 w-full md:w-64 h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                                    <option>English</option>
                                    <option>Amharic</option>
                                    <option>Afaan Oromo</option>
                                    <option>Tigrinya</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="mt-6 space-y-6">
                    <Card>
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><Lock size={16} /> Change Password</h3>
                            <div className="max-w-md space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Password</label>
                                    <div className="relative mt-1.5">
                                        <Input type="password" className="pr-10" placeholder="Enter current password" />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><EyeOff size={14} /></button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">New Password</label>
                                    <div className="relative mt-1.5">
                                        <Input type="password" className="pr-10" placeholder="Enter new password" />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Eye size={14} /></button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Confirm New Password</label>
                                    <Input type="password" className="mt-1.5" placeholder="Confirm new password" />
                                </div>
                                <Button className="gap-2"><Save size={14} /> Update Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ProfilePage;
