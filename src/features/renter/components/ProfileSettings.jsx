import { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, Camera, CheckCircle2, Lock, ChevronDown, Loader2, Edit3, MapPin, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfile, useUpdateProfile, useChangePassword } from '../hooks/useProfile';

export default function ProfileSettings() {
  const { data: profileResponse, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    bio: '',
    location: '',
    preferredLanguage: 'english',
    image: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);

  const user = profileResponse?.user || profileResponse;

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || user.firstName || user.name?.split(' ')[0] || '',
        last_name: user.last_name || user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
        preferredLanguage: user.preferredLanguage || user.language || 'english',
        image: user.image || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePersonalInfo = () => {
    updateProfileMutation.mutate({
      first_name: formData.first_name,
      last_name: formData.last_name,
      fullName: `${formData.first_name} ${formData.last_name}`.trim(),
      phone: formData.phone,
      bio: formData.bio,
      image: formData.image,
    }, {
      onSuccess: () => setIsEditingPersonalInfo(false)
    });
  };

  const handleSaveLocation = () => {
    updateProfileMutation.mutate({
      location: formData.location,
    }, {
      onSuccess: () => setIsEditingLocation(false)
    });
  };

  const handleSavePreferences = () => {
    updateProfileMutation.mutate({
      preferredLanguage: formData.preferredLanguage,
    }, {
      onSuccess: () => setIsEditingPreferences(false)
    });
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    changePasswordMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    }, {
      onSuccess: () => {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsPasswordExpanded(false);
      }
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading profile...</div>;
  }

  const emailVerified = user?.emailVerified ?? false;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your renter profile and settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: Avatar Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm bg-white text-center p-8">
            <div className="relative mx-auto w-32 h-32 mb-6 group">
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-slate-300" />
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {formData.first_name || formData.last_name
                ? `${formData.first_name} ${formData.last_name}`
                : user?.fullName || 'Renter'}
            </h3>
            <p className="text-sm text-muted-foreground font-medium mb-4">{user?.email || 'renter@example.com'}</p>
            
            {/* Email Verified Badge */}
            {emailVerified ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Email Verified</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                <span>Email Unverified</span>
              </div>
            )}
          </Card>
        </div>

        {/* Right Side: Editable Sections */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Section 1: Personal Information */}
          <Card className="border-none shadow-sm bg-white p-8">
            <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold text-slate-900">Personal Information</CardTitle>
              {!isEditingPersonalInfo ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditingPersonalInfo(true)}
                  className="text-muted-foreground hover:text-primary transition-colors border border-slate-200"
                  title="Edit Personal Information"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      // Reset and cancel
                      setFormData(prev => ({
                        ...prev,
                        first_name: user?.first_name || user?.firstName || '',
                        last_name: user?.last_name || user?.lastName || '',
                        phone: user?.phone || '',
                        bio: user?.bio || '',
                        image: user?.image || '',
                      }));
                      setIsEditingPersonalInfo(false);
                    }}
                    className="text-muted-foreground hover:text-slate-800"
                    title="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleSavePersonalInfo}
                    disabled={updateProfileMutation.isPending}
                    className="text-primary hover:bg-primary/5 border border-slate-200"
                    title="Save Changes"
                  >
                    {updateProfileMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {!isEditingPersonalInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">First Name</span>
                    <span className="text-sm font-semibold text-slate-800">{formData.first_name || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Last Name</span>
                    <span className="text-sm font-semibold text-slate-800">{formData.last_name || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Phone Number</span>
                    <span className="text-sm font-semibold text-slate-800">{formData.phone || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Avatar URL</span>
                    <span className="text-sm font-semibold text-slate-800 truncate block max-w-xs">{formData.image || '—'}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Bio</span>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{formData.bio || 'No bio written yet.'}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">First Name</Label>
                      <Input 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleProfileChange}
                        placeholder="John" 
                        className="h-12 rounded-xl" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Last Name</Label>
                      <Input 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleProfileChange}
                        placeholder="Doe" 
                        className="h-12 rounded-xl" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone Number</Label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleProfileChange}
                        placeholder="+251 (9) 00-00-00-00" 
                        className="h-12 rounded-xl" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Avatar Image URL</Label>
                      <Input 
                        name="image"
                        value={formData.image}
                        onChange={handleProfileChange}
                        placeholder="https://example.com/avatar.jpg" 
                        className="h-12 rounded-xl" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Bio</Label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleProfileChange}
                        placeholder="Write a short bio about yourself..." 
                        rows={4}
                        className="flex w-full rounded-xl border border-input bg-transparent px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 2: Address & Location */}
          <Card className="border-none shadow-sm bg-white p-8">
            <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-slate-400" />
                <CardTitle className="text-2xl font-bold text-slate-900">Address & Location</CardTitle>
              </div>
              {!isEditingLocation ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditingLocation(true)}
                  className="text-muted-foreground hover:text-primary transition-colors border border-slate-200"
                  title="Edit Location"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, location: user?.location || '' }));
                      setIsEditingLocation(false);
                    }}
                    className="text-muted-foreground hover:text-slate-800"
                    title="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleSaveLocation}
                    disabled={updateProfileMutation.isPending}
                    className="text-primary hover:bg-primary/5 border border-slate-200"
                    title="Save Changes"
                  >
                    {updateProfileMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {!isEditingLocation ? (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Current Location</span>
                  <span className="text-sm font-semibold text-slate-800">{formData.location || 'No location set yet.'}</span>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 max-w-md">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location / Address</Label>
                    <Input 
                      name="location"
                      value={formData.location}
                      onChange={handleProfileChange}
                      placeholder="e.g. Bole, Addis Ababa, Ethiopia" 
                      className="h-12 rounded-xl" 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 3: Preferences */}
          <Card className="border-none shadow-sm bg-white p-8">
            <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="h-5 w-5 text-slate-400" />
                <CardTitle className="text-2xl font-bold text-slate-900">Preferences</CardTitle>
              </div>
              {!isEditingPreferences ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditingPreferences(true)}
                  className="text-muted-foreground hover:text-primary transition-colors border border-slate-200"
                  title="Edit Preferences"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, preferredLanguage: user?.preferredLanguage || 'english' }));
                      setIsEditingPreferences(false);
                    }}
                    className="text-muted-foreground hover:text-slate-800"
                    title="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleSavePreferences}
                    disabled={updateProfileMutation.isPending}
                    className="text-primary hover:bg-primary/5 border border-slate-200"
                    title="Save Changes"
                  >
                    {updateProfileMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {!isEditingPreferences ? (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Preferred Language</span>
                  <span className="text-sm font-semibold text-slate-800 capitalize">{formData.preferredLanguage || 'English'}</span>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 max-w-xs">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Preferred Language</Label>
                    <select
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleProfileChange}
                      className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="english">English</option>
                      <option value="amharic">Amharic</option>
                    </select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 4: Security (Collapsable) */}
          <Card className="border-none shadow-sm bg-white p-8">
            <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold text-slate-900">Security</CardTitle>
              {isPasswordExpanded && (
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPasswordExpanded(false)}
                  className="text-muted-foreground hover:text-slate-800 rounded-xl"
                  title="Cancel"
                >
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {!isPasswordExpanded ? (
                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Password Settings</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Click the update icon to change your password</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPasswordExpanded(true)}
                    className="text-primary hover:bg-primary/5 rounded-xl h-10 w-10 border border-slate-200 bg-white shadow-sm"
                    title="Update Password"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2 max-w-md">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Current Password</Label>
                    <Input 
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password" 
                      className="h-12 rounded-xl" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">New Password</Label>
                      <Input 
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password" 
                        className="h-12 rounded-xl" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Confirm New Password</Label>
                      <Input 
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password" 
                        className="h-12 rounded-xl" 
                      />
                    </div>
                  </div>
                  
                  {/* Password Card Save Changes Button with text AND icon */}
                  <div className="pt-2">
                    <Button 
                      onClick={handleSavePassword}
                      disabled={changePasswordMutation.isPending || !passwordData.currentPassword || !passwordData.newPassword}
                      className="font-bold shadow-lg shadow-primary/10 rounded-xl px-5 h-12"
                      title="Save Changes"
                    >
                      {changePasswordMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
