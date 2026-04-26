import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/users/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Camera, Save, ArrowLeft, Mail, Phone, 
  User as UserIcon, Shield, Bell, CheckCircle2,
  Lock, Eye, EyeOff, LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "Abebe Bikila",
    email: user?.email || "abebe@example.com",
    phone: user?.phone || "+251 911 123 456",
    bio: user?.bio || "I'm looking for a premium place to rent in Addis Ababa.",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    login({ ...user, ...formData });
    setIsSaving(false);
    // In a real app, I'd show a toast here
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password updated successfully!");
  };

  const tabs = [
    { id: "personal", label: "Personal Information", icon: UserIcon },
    { id: "security", label: "Security & Password", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 ethiopian-pattern pointer-events-none -z-10" />
      
      {/* Header / Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <button 
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group mb-2"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Profile</span>
            </button>
            <h1 className="text-4xl font-extrabold tracking-tight">Account Settings</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="size-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" />
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">Joined June 2024</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-card rounded-3xl border shadow-sm p-4 sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold transition-all duration-200",
                    activeTab === tab.id 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
              
              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="px-4 pb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Quick Stats</p>
                </div>
                <div className="space-y-4">
                  <div className="px-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Trust Score</span>
                    <span className="text-sm font-bold text-green-600 font-mono">98%</span>
                  </div>
                  <div className="px-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Saved Items</span>
                    <span className="text-sm font-bold">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Card className="rounded-[40px] border-none shadow-xl overflow-hidden min-h-[600px] flex flex-col">
              <div className="relative h-32 bg-primary/10 overflow-hidden">
                <div className="absolute inset-0 ethiopian-pattern opacity-20" />
                <div className="absolute -bottom-16 left-12">
                   <div className="relative group">
                    <Avatar className="size-32 border-8 border-card shadow-xl ring-1 ring-black/5">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                        {formData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform ring-4 ring-card">
                      <Camera size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-20 p-8 lg:p-12 flex-1">
                {activeTab === "personal" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10">
                      <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                      <p className="text-muted-foreground">General information about yourself and how owners can contact you.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                          <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input 
                              name="name" 
                              value={formData.name} 
                              onChange={handleChange} 
                              className="pl-12 h-14 rounded-2xl bg-muted/30 border-border/40 focus:bg-background transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input 
                              name="email" 
                              type="email"
                              value={formData.email} 
                              onChange={handleChange} 
                              className="pl-12 h-14 rounded-2xl bg-muted/30 border-border/40 focus:bg-background transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input 
                              name="phone" 
                              value={formData.phone} 
                              onChange={handleChange} 
                              className="pl-12 h-14 rounded-2xl bg-muted/30 border-border/40 focus:bg-background transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Verification Status</Label>
                          <div className="h-14 flex items-center px-6 rounded-2xl bg-green-500/5 text-green-700 border border-green-500/20">
                            <CheckCircle2 size={18} className="mr-2" />
                            <span className="text-sm font-bold">Verified Identity</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">About / Bio</Label>
                        <textarea 
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="w-full min-h-[120px] p-4 rounded-2xl bg-muted/30 border border-border/40 focus:bg-background transition-all resize-none outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Tell us a bit about yourself..."
                        />
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={isSaving}
                          className="px-10 h-14 rounded-2xl font-bold bg-[#D97745] hover:bg-[#C96635] shadow-lg shadow-[#D97745]/20 gap-2 transition-all active:scale-[0.98]"
                        >
                          {isSaving ? "Saving..." : <><Save size={18} /> Save Changes</>}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10">
                      <h2 className="text-2xl font-bold mb-2">Security Settings</h2>
                      <p className="text-muted-foreground">Keep your account secure by updating your password regularly.</p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="max-w-xl space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Current Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input 
                              type={showPassword ? "text" : "password"}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="pl-12 pr-12 h-14 rounded-2xl bg-muted/30 border-border/40"
                              required
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">New Password</Label>
                          <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input 
                              type={showPassword ? "text" : "password"}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="pl-12 h-14 rounded-2xl bg-muted/30 border-border/40"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Confirm New Password</Label>
                          <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input 
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="pl-12 h-14 rounded-2xl bg-muted/30 border-border/40"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                          <Shield size={16} className="text-primary"/>
                          Password Requirements
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1 list-disc ml-4">
                          <li>Minimum 8 characters long</li>
                          <li>Include at least one special character</li>
                          <li>Avoid using your email or name</li>
                        </ul>
                      </div>

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          disabled={isSaving}
                          className="w-full md:w-auto px-10 h-14 rounded-2xl font-bold bg-[#D97745] hover:bg-[#C96635] shadow-lg shadow-[#D97745]/20 gap-2 transition-all active:scale-[0.98]"
                        >
                          {isSaving ? "Updating..." : "Update Password"}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-20 flex flex-col items-center justify-center text-center">
                    <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-6">
                      <LayoutGrid size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Notification Preferences</h3>
                    <p className="text-muted-foreground max-w-sm mb-8">
                      Customize how you receive updates about your chat messages and visit requests.
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-muted/50 rounded-full text-xs font-bold text-muted-foreground uppercase tracking-widest">
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
