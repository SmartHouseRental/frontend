import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Upload,
  Camera,
  Save,
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';

function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'Dawit Mekonnen',
    email: 'dawit.m@email.com',
    phone: '+251 91 234 5678',
    location: 'Addis Ababa, Ethiopia',
    bio: 'Property owner with 5+ years of experience managing residential rentals in Addis Ababa. Specializing in premium villas and modern apartments.',
  });
  const [bank, setBank] = useState({
    bankName: 'Commercial Bank of Ethiopia',
    accountNumber: '1000 **** **** 4521',
    holderName: 'Dawit Mekonnen',
    branch: 'Bole Branch',
  });
  const [notifications, setNotifications] = useState({
    appointments: true,
    agreements: true,
    payments: true,
    reviews: false,
    reports: true,
    system: false,
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false });
  const [saveStates, setSaveStates] = useState({}); // { profile: 'saving' | 'saved', bank: 'saving' | 'saved' }
  const [language, setLanguage] = useState('en');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'profile';

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);

    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleSave = (section) => {
    setSaveStates((prev) => ({ ...prev, [section]: 'saving' }));
    setTimeout(() => {
      setSaveStates((prev) => ({ ...prev, [section]: 'saved' }));
      setTimeout(() => setSaveStates((prev) => ({ ...prev, [section]: null })), 2000);
    }, 800);
  };

  const SaveButton = ({ section }) => {
    const state = saveStates[section];
    return (
      <Button className="gap-2" onClick={() => handleSave(section)} disabled={state === 'saving'}>
        {state === 'saving' ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Saving...
          </>
        ) : state === 'saved' ? (
          <>
            <CheckCircle2 size={14} /> Saved!
          </>
        ) : (
          <>
            <Save size={14} /> Save Changes
          </>
        )}
      </Button>
    );
  };

  const notifSettings = [
    {
      key: 'appointments',
      label: 'New appointment requests',
      desc: 'Get notified when a renter requests a property viewing',
    },
    {
      key: 'agreements',
      label: 'Agreement updates',
      desc: 'Notifications for new, signed, or terminated agreements',
    },
    {
      key: 'payments',
      label: 'Payment confirmations',
      desc: 'Alert when payment proof is uploaded or confirmed',
    },
    { key: 'reviews', label: 'New reviews', desc: 'Get notified when a renter leaves a review' },
    {
      key: 'reports',
      label: 'Reports & complaints',
      desc: 'Alerts for reports filed against you or your properties',
    },
    { key: 'system', label: 'System announcements', desc: 'Platform updates and new features' },
  ];

  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <div>
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
          Profile & Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal info, security, and preferences.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        defaultValue="profile"
        className="w-full"
      >
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
                <div className="group relative cursor-pointer">
                  <div
                    className="bg-primary/10 ring-primary/20 size-20 rounded-full bg-cover bg-center ring-4"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX')",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-colors group-hover:bg-black/40">
                    <Camera
                      size={20}
                      className="text-white opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-bold">{profile.fullName}</h3>
                  <p className="text-muted-foreground text-sm">{profile.email}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-500">
                    <Shield size={12} /> Verified Owner
                  </p>
                </div>
              </div>
              <div className="bg-border h-px"></div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Full Name
                  </label>
                  <Input
                    className="mt-1.5"
                    value={profile.fullName}
                    onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Email
                  </label>
                  <Input
                    className="mt-1.5"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Phone
                  </label>
                  <Input
                    className="mt-1.5"
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Location
                  </label>
                  <Input
                    className="mt-1.5"
                    value={profile.location}
                    onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Bio
                  </label>
                  <textarea
                    className="border-border bg-background focus:ring-primary/20 mt-1.5 h-24 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2"
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <SaveButton section="profile" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification */}
        <TabsContent value="verification" className="mt-6 space-y-6">
          {/* Verification State Timeline */}
          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-foreground flex items-center gap-2 font-bold">
                <Shield size={16} /> Verification Status
              </h3>
              <div className="flex items-center gap-0">
                {[
                  { label: 'Email Verified', status: 'complete' },
                  { label: 'Documents Uploaded', status: 'current' },
                  { label: 'Admin Review', status: 'pending' },
                  { label: 'Verified Owner', status: 'pending' },
                ].map((step, i, arr) => (
                  <div key={i} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          step.status === 'complete'
                            ? 'bg-emerald-500 text-white'
                            : step.status === 'current'
                              ? 'bg-primary text-primary-foreground ring-primary/20 ring-4'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step.status === 'complete' ? <CheckCircle2 size={14} /> : i + 1}
                      </div>
                      <p
                        className={`mt-1.5 max-w-16 text-[10px] font-semibold ${step.status === 'current' ? 'text-primary' : step.status === 'complete' ? 'text-emerald-600' : 'text-muted-foreground'}`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {i < arr.length - 1 && (
                      <div
                        className={`mx-1 h-0.5 flex-1 rounded-full ${step.status === 'complete' ? 'bg-emerald-400' : 'bg-muted'}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardContent className="space-y-5">
              <h3 className="text-foreground flex items-center gap-2 font-bold">
                <Shield size={16} /> Verification Documents
              </h3>
              <p className="text-muted-foreground text-sm">
                Upload documents to verify your identity and property ownership.
              </p>
              {[
                {
                  label: 'National ID - Front',
                  status: 'Pending',
                  file: null,
                  description: 'Government-issued photo ID',
                },
                {
                  label: 'National ID - Back',
                  status: 'Pending',
                  file: '',
                  description: 'Valid business or trade license',
                },
                {
                  label: 'Your Photo',
                  status: 'Pending',
                  file: null,
                  description: 'Proof of you own the ID',
                },
              ].map((doc, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-4 transition-all ${doc.status === 'Verified' ? 'border-emerald-200 bg-emerald-50/30' : 'border-amber-200 bg-amber-50/30'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {doc.status === 'Verified' ? (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      ) : (
                        <AlertCircle size={18} className="text-amber-500" />
                      )}
                      <div>
                        <p className="text-foreground text-sm font-bold">{doc.label}</p>
                        <p className="text-muted-foreground mt-0.5 text-xs">{doc.description}</p>
                        {doc.file && (
                          <p className="text-muted-foreground/70 mt-0.5 text-[10px]">
                            📎 {doc.file}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                      >
                        {doc.status}
                      </span>
                      <label className="cursor-pointer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="pointer-events-none h-7 gap-1 text-xs"
                        >
                          <Upload size={12} /> {doc.file ? 'Replace' : 'Upload'}
                        </Button>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </label>
                    </div>
                  </div>
                  {!doc.file && (
                    <label className="text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/3 mt-3 flex h-20 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-amber-300 transition-all">
                      <Upload size={16} />
                      <span className="text-xs font-medium">Drag & drop or click to upload</span>
                      <span className="text-muted-foreground/60 text-[10px]">
                        PDF, JPG, PNG up to 5MB
                      </span>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    </label>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Details */}
        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card>
            <CardContent className="space-y-5">
              <h3 className="text-foreground flex items-center gap-2 font-bold">
                <CreditCard size={16} /> Bank / Payment Details
              </h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Bank Name
                  </label>
                  <Input
                    className="mt-1.5"
                    value={bank.bankName}
                    onChange={(e) => setBank((b) => ({ ...b, bankName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Account Number
                  </label>
                  <Input
                    className="mt-1.5"
                    value={bank.accountNumber}
                    onChange={(e) => setBank((b) => ({ ...b, accountNumber: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Account Holder
                  </label>
                  <Input
                    className="mt-1.5"
                    value={bank.holderName}
                    onChange={(e) => setBank((b) => ({ ...b, holderName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Branch
                  </label>
                  <Input
                    className="mt-1.5"
                    value={bank.branch}
                    onChange={(e) => setBank((b) => ({ ...b, branch: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <SaveButton section="bank" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardContent className="space-y-1">
              <h3 className="text-foreground mb-4 flex items-center gap-2 font-bold">
                <Bell size={16} /> Notification Preferences
              </h3>
              {notifSettings.map((pref) => (
                <div
                  key={pref.key}
                  className="hover:bg-muted/30 flex items-center justify-between rounded-lg px-2 py-3 transition-colors"
                >
                  <div>
                    <p className="text-foreground text-sm font-semibold">{pref.label}</p>
                    <p className="text-muted-foreground text-xs">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({ ...prev, [pref.key]: !prev[pref.key] }))
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${notifications[pref.key] ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${notifications[pref.key] ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-foreground flex items-center gap-2 font-bold">
                <Globe size={16} /> Language
              </h3>
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Preferred Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
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
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardContent className="space-y-5">
              <h3 className="text-foreground flex items-center gap-2 font-bold">
                <Lock size={16} /> Change Password
              </h3>
              <div className="max-w-md space-y-4">
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Current Password
                  </label>
                  <div className="relative mt-1.5">
                    <Input
                      type={showPasswords.current ? 'text' : 'password'}
                      className="pr-10"
                      placeholder="Enter current password"
                      value={passwords.current}
                      onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                    />
                    <button
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={() => setShowPasswords((p) => ({ ...p, current: !p.current }))}
                    >
                      {showPasswords.current ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    New Password
                  </label>
                  <div className="relative mt-1.5">
                    <Input
                      type={showPasswords.new ? 'text' : 'password'}
                      className="pr-10"
                      placeholder="Enter new password"
                      value={passwords.new}
                      onChange={(e) => setPasswords((p) => ({ ...p, new: e.target.value }))}
                    />
                    <button
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
                    >
                      {showPasswords.new ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                  {passwords.new && (
                    <div className="mt-2">
                      <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                        <div
                          className={`h-full rounded-full transition-all ${passwords.new.length >= 12 ? 'w-full bg-emerald-500' : passwords.new.length >= 8 ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-rose-500'}`}
                        ></div>
                      </div>
                      <p className="text-muted-foreground mt-1 text-[10px]">
                        {passwords.new.length >= 12
                          ? 'Strong'
                          : passwords.new.length >= 8
                            ? 'Medium'
                            : 'Weak'}{' '}
                        password
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    className="mt-1.5"
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                  />
                  {passwords.confirm && passwords.new !== passwords.confirm && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                      <AlertCircle size={12} /> Passwords don't match
                    </p>
                  )}
                </div>
                <Button
                  className="gap-2"
                  disabled={
                    !passwords.current || !passwords.new || passwords.new !== passwords.confirm
                  }
                  onClick={() => handleSave('password')}
                >
                  {saveStates.password === 'saving' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Updating...
                    </>
                  ) : saveStates.password === 'saved' ? (
                    <>
                      <CheckCircle2 size={14} /> Updated!
                    </>
                  ) : (
                    <>
                      <Save size={14} /> Update Password
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
