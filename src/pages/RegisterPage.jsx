import { useState } from 'react';
import { useAuth } from '@/features/users/AuthContext';
import { useNavigate } from 'react-router';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('seeker');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* LEFT SIDE (Hero) */}
      <div className="bg-primary relative hidden overflow-hidden lg:flex lg:w-1/2">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6c8c4e34yl_2_os0IxLR-f7eFfiFJU9f3_FKVbDGHJcj7ntds6ovXaLciQ0GG9psiOnNrRxSRiZyv0MmTbX6MS6UAKvSaG6DjfcOmZ471smFB8p36AET-LJEq19lYtLkWcRbTft4hl8--pyT1ODleB3fyh-sNGSbDx6utTPDvmLTOJpu19dWjK8fwJ_F9qZUEyHtCCJLhvFWmwjmljKmsggL_Uvw2HEqSqHtsdjm-hhDp5QK9gPvlCc516jIvcC7q76Iixin4teQ')",
          }}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        <div className="relative z-10 flex w-full flex-col justify-between p-16 text-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl">home_pin</span>
            <span className="text-2xl font-bold">Join the Family</span>
          </div>

          <div className="max-w-md">
            <h1 className="mb-6 text-5xl leading-tight font-black">Find your forever home</h1>
            <p className="text-lg opacity-90">
              Experience a long-stay rental that feels like home in Ethiopia.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm opacity-80">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">verified_user</span>
              Verified Listings
            </span>
            <span className="h-1 w-1 rounded-full bg-white"></span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">favorite</span>
              Family Focused
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-background flex flex-1 flex-col overflow-y-auto p-6 lg:p-12">
        {/* Header */}
        <div className="mb-12 flex items-center justify-end">
          <div className="flex items-center gap-6">
            <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm">
              <span className="material-symbols-outlined text-base">language</span>
              አማርኛ / English
            </button>

            <button
              className="bg-card border-border hover:bg-muted rounded-lg border px-4 py-2 text-sm font-bold transition-all"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-10">
            <h2 className="mb-2 text-3xl font-bold">Create your account</h2>
            <p className="text-muted-foreground">
              Join thousands of families finding their place in Ethiopia.
            </p>
          </div>

          <form className="space-y-8">
            {/* ROLE */}
            <div className="space-y-4">
              <label className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
                I am joining as...
              </label>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  {
                    key: 'seeker',
                    title: 'Home Seeker',
                    desc: 'Looking for a long-term stay',
                    icon: 'house_with_shield',
                  },
                  {
                    key: 'owner',
                    title: 'Owner / Agent',
                    desc: 'Listing a property',
                    icon: 'handshake',
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRole(item.key)}
                    className={`rounded-xl border-2 p-6 text-left transition-all ${
                      role === item.key
                        ? 'border-primary ring-primary/10 bg-card ring-4'
                        : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary mb-3 block text-3xl">
                      {item.icon}
                    </span>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-muted-foreground mt-1 text-xs">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* INPUTS */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="ml-1 text-sm font-semibold">Full Name</label>
                <div className="relative mt-1">
                  <span className="material-symbols-outlined text-muted-foreground absolute top-3 left-4">
                    person
                  </span>
                  <input
                    type="text"
                    placeholder="Abebe Bikila"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-input bg-card focus:ring-primary w-full rounded-lg border py-3 pr-4 pl-12 focus:ring-2"
                  />
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="ml-1 text-sm font-semibold">Phone Number</label>
                  <div className="relative mt-1">
                    <span className="text-muted-foreground absolute top-3 left-4 text-sm font-bold">
                      +251
                    </span>
                    <input
                      type="tel"
                      placeholder="911 234 567"
                      className="border-input bg-card focus:ring-primary w-full rounded-lg border py-3 pr-4 pl-16 focus:ring-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="ml-1 text-sm font-semibold">Email</label>
                  <div className="relative mt-1">
                    <span className="material-symbols-outlined text-muted-foreground absolute top-3 left-4">
                      mail
                    </span>
                    <input
                      type="email"
                      placeholder="abebe@example.com"
                      className="border-input bg-card focus:ring-primary w-full rounded-lg border py-3 pr-4 pl-12 focus:ring-2"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="ml-1 text-sm font-semibold">Create Password</label>

                <div className="relative mt-1">
                  <span className="material-symbols-outlined text-muted-foreground absolute top-3 left-4">
                    lock
                  </span>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="border-input bg-card focus:ring-primary w-full rounded-lg border py-3 pr-12 pl-12 focus:ring-2"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-primary absolute top-3 right-4"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                <p className="text-muted-foreground mt-1 text-[10px]">
                  Must be at least 8 characters with one special character.
                </p>
              </div>
            </div>

            {/* INFO BOX */}
            <div className="bg-primary/5 border-primary/10 flex items-start gap-3 rounded-lg border p-4">
              <span className="material-symbols-outlined text-primary">verified</span>
              <div>
                <p className="text-primary text-sm font-bold">Secure & Verified Profiles</p>
                <p className="text-muted-foreground text-xs">
                  Every profile is manually reviewed to ensure a safe environment.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                type="button"
                onClick={() => {
                  login({
                    id: '1',
                    name: name || 'New User',
                    email: 'user@example.com',
                    role: role,
                  });
                  navigate('/');
                }}
                className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold shadow-lg transition-all active:scale-[0.98]"
              >
                Join the Community
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <p className="text-muted-foreground mt-6 text-center text-xs">
                By joining, you agree to our Terms and Privacy Policy.
              </p>
            </div>
          </form>

          {/* FOOTER */}
          <div className="border-border mt-12 border-t pt-8 text-center">
            <p className="text-muted-foreground">Already a member?</p>
            <button className="text-primary mt-1 font-bold hover:underline">
              Log in to your account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
