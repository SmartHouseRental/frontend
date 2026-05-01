import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Camera,
  Save,
  ArrowLeft,
  Mail,
  Phone,
  User as UserIcon,
  Shield,
  Bell,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  LayoutGrid,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Stub user data until auth integration
const dummyUser = {
  name: 'Abebe Bikila',
  email: 'abebe@example.com',
  phone: '+251 911 123 456',
  bio: "I'm looking for a premium place to rent in Addis Ababa.",
};

export default function EditProfilePage() {
  const navigate = useNavigate();
  const user = dummyUser;
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Abebe Bikila',
    email: user?.email || 'abebe@example.com',
    phone: user?.phone || '+251 911 123 456',
    bio: user?.bio || "I'm looking for a premium place to rent in Addis Ababa.",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Will save via API during integration
    setIsSaving(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password updated successfully!');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: UserIcon },
    { id: 'security', label: 'Security & Password', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="ethiopian-pattern pointer-events-none fixed inset-0 -z-10" />

      {/* Header / Navigation */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/profile')}
              className="text-muted-foreground hover:text-primary group mb-2 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back to Profile</span>
            </button>
            <h1 className="text-4xl font-extrabold tracking-tight">Account Settings</h1>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-background bg-muted size-8 overflow-hidden rounded-full border-2"
                >
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" />
                </div>
              ))}
            </div>
            <span className="text-muted-foreground text-xs font-semibold">Joined June 2024</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Sidebar */}
          <div className="space-y-2 lg:col-span-3">
            <div className="bg-card sticky top-24 rounded-3xl border p-4 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-sm font-bold transition-all duration-200',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-primary/20 scale-[1.02] shadow-lg'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}

              <div className="border-border/50 mt-8 border-t pt-8">
                <div className="px-4 pb-4">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
                    Quick Stats
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4">
                    <span className="text-muted-foreground text-sm">Trust Score</span>
                    <span className="font-mono text-sm font-bold text-green-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between px-4">
                    <span className="text-muted-foreground text-sm">Saved Items</span>
                    <span className="text-sm font-bold">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Card className="flex min-h-[600px] flex-col overflow-hidden rounded-[40px] border-none shadow-xl">
              <div className="bg-primary/10 relative h-32 overflow-hidden">
                <div className="ethiopian-pattern absolute inset-0 opacity-20" />
                <div className="absolute -bottom-16 left-12">
                  <div className="group relative">
                    <Avatar className="border-card size-32 border-8 shadow-xl ring-1 ring-black/5">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                        {formData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <button className="bg-primary ring-card absolute right-1 bottom-1 rounded-full p-2 text-white shadow-lg ring-4 transition-transform hover:scale-110">
                      <Camera size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8 pt-20 lg:p-12">
                {activeTab === 'personal' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10">
                      <h2 className="mb-2 text-2xl font-bold">Personal Information</h2>
                      <p className="text-muted-foreground">
                        General information about yourself and how owners can contact you.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-muted-foreground ml-1 text-xs font-bold tracking-widest uppercase">
                            Full Name
                          </Label>
                          <div className="relative">
                            <UserIcon
                              className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
                              size={18}
                            />
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="bg-muted/30 border-border/40 focus:bg-background h-14 rounded-2xl pl-12 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-muted-foreground ml-1 text-xs font-bold tracking-widest uppercase">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail
                              className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
                              size={18}
                            />
                            <Input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="bg-muted/30 border-border/40 focus:bg-background h-14 rounded-2xl pl-12 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-muted-foreground ml-1 text-xs font-bold tracking-widest uppercase">
                            Phone Number
                          </Label>
                          <div className="relative">
                            <Phone
                              className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
                              size={18}
                            />
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="bg-muted/30 border-border/40 focus:bg-background h-14 rounded-2xl pl-12 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-muted-foreground ml-1 text-xs font-bold tracking-widest uppercase">
                            Verification Status
                          </Label>
                          <div className="flex h-14 items-center rounded-2xl border border-green-500/20 bg-green-500/5 px-6 text-green-700">
                            <CheckCircle2 size={18} className="mr-2" />
                            <span className="text-sm font-bold">Verified Identity</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-muted-foreground ml-1 text-xs font-bold tracking-widest uppercase">
                          About / Bio
                        </Label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="bg-muted/30 border-border/40 focus:bg-background focus:ring-primary/20 min-h-[120px] w-full resize-none rounded-2xl border p-4 transition-all outline-none focus:ring-2"
                          placeholder="Tell us a bit about yourself..."
                        />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          disabled={isSaving}
                          className="h-14 gap-2 rounded-2xl bg-[#D97745] px-10 font-bold shadow-lg shadow-[#D97745]/20 transition-all hover:bg-[#C96635] active:scale-[0.98]"
                        >
                          {isSaving ? (
                            'Saving...'
                          ) : (
                            <>
                              <Save size={18} /> Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10">
                      <h2 className="mb-2 text-2xl font-bold">Security Settings</h2>
                      <p className="text-muted-foreground">
                        Keep your account secure by updating your password regularly.
                      </p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="max-w-xl space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-muted-foreground ml-1 text-xs font-bold tracking-widest uppercase">
                            Current Password
                          </Label>
                          <div className="relative">
                            <Lock
                              className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
                              size={18}
                            />
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="bg-muted/30 border-border/40 h-14 rounded-2xl pr-12 pl-12"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-muted-foreground ml-1 text-xs font-bold tracking-widest uppercase">
                            New Password
                          </Label>
                          <div className="relative">
                            <Shield
                              className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
                              size={18}
                            />
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="bg-muted/30 border-border/40 h-14 rounded-2xl pl-12"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-muted-foreground ml-1 text-xs font-bold tracking-widest uppercase">
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Shield
                              className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
                              size={18}
                            />
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="bg-muted/30 border-border/40 h-14 rounded-2xl pl-12"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary/5 border-primary/10 rounded-3xl border p-6">
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-bold">
                          <Shield size={16} className="text-primary" />
                          Password Requirements
                        </h4>
                        <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                          <li>Minimum 8 characters long</li>
                          <li>Include at least one special character</li>
                          <li>Avoid using your email or name</li>
                        </ul>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSaving}
                          className="h-14 w-full gap-2 rounded-2xl bg-[#D97745] px-10 font-bold shadow-lg shadow-[#D97745]/20 transition-all hover:bg-[#C96635] active:scale-[0.98] md:w-auto"
                        >
                          {isSaving ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center py-20 text-center duration-500">
                    <div className="bg-muted mb-6 flex size-20 items-center justify-center rounded-full">
                      <LayoutGrid size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Notification Preferences</h3>
                    <p className="text-muted-foreground mb-8 max-w-sm">
                      Customize how you receive updates about your chat messages and visit requests.
                    </p>
                    <div className="bg-muted/50 text-muted-foreground inline-flex items-center rounded-full px-4 py-2 text-xs font-bold tracking-widest uppercase">
                      Feature Coming Soon
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
