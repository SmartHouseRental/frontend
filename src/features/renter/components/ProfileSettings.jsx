import { useState, useEffect, useRef } from 'react';
import {
  User,
  Save,
  CheckCircle2,
  Lock,
  Loader2,
  Edit3,
  MapPin,
  Globe,
  X,
  AlertCircle,
  Camera,
  Bell,
  Eye,
  EyeOff,
} from 'lucide-react';
import SafeImage from '@/components/SafeImage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useProfile,
  useUpdateProfile,
  useChangePassword,
  useUpdateLanguage,
  useUpdateNotificationPreferences,
} from '../hooks/useProfile';
import {
  profileFromApi,
  buildPersonalInfoFormData,
  buildLocationFormData,
  LANGUAGE_OPTIONS,
  NOTIFICATION_FIELDS,
  languageLabel,
} from '../utils/profileMappers';
import { getApiErrorMessage } from '../utils/apiErrors';

function PasswordField({ label, name, value, onChange, show, onToggleShow }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="h-12 rounded-xl pr-11"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function ProfileErrorState({ message, onRetry }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-6">
      <div className="bg-destructive/10 rounded-full p-4">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <p className="text-destructive font-medium">Failed to load profile</p>
      <p className="text-sm text-muted-foreground max-w-md">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export default function ProfileSettings() {
  const { data: profileData, isLoading, isError, error, refetch } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();
  const updateLanguageMutation = useUpdateLanguage();
  const updateNotificationsMutation = useUpdateNotificationPreferences();

  const profile = profileFromApi(profileData);
  const avatarInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    location: '',
    language: 'en',
    image: '',
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    agreements: true,
    payments: true,
    reviews: false,
    reports: true,
    system: false,
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [settingsTab, setSettingsTab] = useState('general');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      bio: profile.bio,
      location: profile.location,
      language: profile.language,
      image: profile.image,
    });
    setNotifications(profile.notificationPreferences);
    setAvatarFile(null);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
    }
  }, [profileData]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowed.includes(file.type)) {
      toast.error('Avatar must be a JPEG or PNG image');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Avatar must be 5 MB or smaller');
      return;
    }

    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const resetPersonalForm = () => {
    if (!profile) return;
    setFormData((prev) => ({
      ...prev,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      bio: profile.bio,
      image: profile.image,
    }));
    setAvatarFile(null);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
    }
  };

  const handleSavePersonalInfo = async () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    if (fullName.length < 2) {
      toast.error('Please enter your first and last name (at least 2 characters total).');
      return;
    }

    try {
      const fd = buildPersonalInfoFormData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        bio: formData.bio,
        avatarFile,
      });
      await updateProfileMutation.mutateAsync(fd);
      setIsEditingPersonalInfo(false);
      setAvatarFile(null);
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
        setAvatarPreview(null);
      }
    } catch {
      // toast handled in hook
    }
  };

  const handleSaveLocation = async () => {
    try {
      await updateProfileMutation.mutateAsync(buildLocationFormData(formData.location));
      setIsEditingLocation(false);
    } catch {
      // toast handled in hook
    }
  };

  const handleSavePreferences = async () => {
    try {
      await Promise.all([
        updateLanguageMutation.mutateAsync(formData.language),
        updateNotificationsMutation.mutateAsync(notifications),
      ]);
      setIsEditingPreferences(false);
    } catch {
      // toasts handled in hooks
    }
  };

  const handleSavePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch {
      // toast handled in hook
    }
  };

  const isSavingPersonal = updateProfileMutation.isPending;
  const isSavingLocation = updateProfileMutation.isPending;
  const isSavingPreferences =
    updateLanguageMutation.isPending || updateNotificationsMutation.isPending;

  const handleSaveAvatarOnly = async () => {
    if (!avatarFile) return;
    try {
      const fd = buildPersonalInfoFormData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        bio: formData.bio,
        avatarFile,
      });
      await updateProfileMutation.mutateAsync(fd);
      setAvatarFile(null);
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
        setAvatarPreview(null);
      }
    } catch {
      /* toast in hook */
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <ProfileErrorState
        message={getApiErrorMessage(error, 'Unable to load your profile.')}
        onRetry={() => refetch()}
      />
    );
  }

  if (!profile) {
    return (
      <ProfileErrorState
        message="Profile data was empty. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const displayImage = avatarPreview || formData.image;
  const displayName =
    formData.firstName || formData.lastName
      ? `${formData.firstName} ${formData.lastName}`.trim()
      : 'Renter';

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your renter profile and settings.</p>
      </div>

      <Tabs value={settingsTab} onValueChange={setSettingsTab} className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm bg-card text-center p-8">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-md overflow-hidden">
                {displayImage ? (
                  <SafeImage src={displayImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
                onChange={handleAvatarSelect}
              />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                title="Change photo"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            {avatarFile && (
              <Button
                size="sm"
                className="mb-4 rounded-xl w-full"
                onClick={handleSaveAvatarOnly}
                disabled={isSavingPersonal}
              >
                {isSavingPersonal ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save photo
              </Button>
            )}
            <h3 className="text-xl font-bold text-foreground">{displayName}</h3>
            <p className="text-sm text-muted-foreground font-medium mb-4">{profile.email}</p>

            {profile.emailVerified ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Email Verified</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border">
                <span>Email Unverified</span>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {/* Personal Information */}
          <Card className="border-none shadow-sm bg-card p-8">
            <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
              {!isEditingPersonalInfo ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingPersonalInfo(true)}
                  className="border"
                  title="Edit"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      resetPersonalForm();
                      setIsEditingPersonalInfo(false);
                    }}
                    title="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSavePersonalInfo}
                    disabled={isSavingPersonal}
                    className="border"
                    title="Save"
                  >
                    {isSavingPersonal ? (
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      First Name
                    </span>
                    <span className="text-sm font-semibold">{formData.firstName || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Last Name
                    </span>
                    <span className="text-sm font-semibold">{formData.lastName || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Phone
                    </span>
                    <span className="text-sm font-semibold">{formData.phone || '—'}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Bio
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {formData.bio || 'No bio written yet.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleProfileChange}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleProfileChange}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Phone</Label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleProfileChange}
                        placeholder="+251911223344"
                        className="h-12 rounded-xl"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use international format, e.g. +251911223344
                      </p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Bio</Label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleProfileChange}
                        rows={4}
                        maxLength={500}
                        className="flex w-full rounded-xl border border-input bg-transparent px-3 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border-none shadow-sm bg-card p-8">
            <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-2xl font-bold">Address & Location</CardTitle>
              </div>
              {!isEditingLocation ? (
                <Button variant="ghost" size="icon" onClick={() => setIsEditingLocation(true)} className="border">
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, location: profile.location }));
                      setIsEditingLocation(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSaveLocation}
                    disabled={isSavingLocation}
                    className="border"
                  >
                    {isSavingLocation ? (
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
                <span className="text-sm font-semibold">
                  {formData.location || 'No location set yet.'}
                </span>
              ) : (
                <div className="max-w-md space-y-2">
                  <Label>Location / Address</Label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleProfileChange}
                    placeholder="e.g. Bole, Addis Ababa"
                    className="h-12 rounded-xl"
                    maxLength={200}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-none shadow-sm bg-card p-8">
            <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-2xl font-bold">Preferences</CardTitle>
              </div>
              {!isEditingPreferences ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingPreferences(true)}
                  className="border"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, language: profile.language }));
                      setNotifications(profile.notificationPreferences);
                      setIsEditingPreferences(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSavePreferences}
                    disabled={isSavingPreferences}
                    className="border"
                  >
                    {isSavingPreferences ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              {!isEditingPreferences ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Language
                    </p>
                    <p className="text-base font-semibold">{languageLabel(formData.language)}</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 sm:col-span-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <Bell className="h-3.5 w-3.5" />
                      Email notifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {NOTIFICATION_FIELDS.map(({ key, label }) => (
                        <span
                          key={key}
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            notifications[key]
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'bg-muted text-muted-foreground border border-border/60'
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 rounded-2xl border border-border/60 bg-muted/10 p-6">
                  <div className="max-w-xs space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Preferred language
                    </Label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleProfileChange}
                      className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm"
                    >
                      {LANGUAGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-bold">Email notifications</h4>
                    </div>
                    <p className="text-xs text-muted-foreground -mt-2">
                      Choose which updates you want to receive by email.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {NOTIFICATION_FIELDS.map(({ key, label }) => (
                        <label
                          key={key}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 py-3.5 cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-colors"
                        >
                          <span className="text-sm font-medium">{label}</span>
                          <Checkbox
                            checked={notifications[key]}
                            onCheckedChange={(checked) =>
                              setNotifications((prev) => ({ ...prev, [key]: Boolean(checked) }))
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <Card className="border-none shadow-sm bg-card p-8 max-w-2xl">
            <CardHeader className="p-0 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Change password</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Min 8 characters with upper, lower, number, and special character
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <PasswordField
                label="Current password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                show={showCurrentPassword}
                onToggleShow={() => setShowCurrentPassword((v) => !v)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PasswordField
                  label="New password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  show={showNewPassword}
                  onToggleShow={() => setShowNewPassword((v) => !v)}
                />
                <PasswordField
                  label="Confirm new password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  show={showConfirmPassword}
                  onToggleShow={() => setShowConfirmPassword((v) => !v)}
                />
              </div>
              <Button
                onClick={handleSavePassword}
                disabled={
                  changePasswordMutation.isPending ||
                  !passwordData.currentPassword ||
                  !passwordData.newPassword
                }
                className="rounded-xl h-12"
              >
                {changePasswordMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
