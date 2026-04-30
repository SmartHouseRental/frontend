import { useState } from 'react';
import { useAuth } from '@/features/users/AuthContext';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('renter');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <main className="relative flex min-h-[calc(100vh-100px)] flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Pattern */}
      <div className="ethiopian-pattern pointer-events-none absolute top-0 left-0 h-64 w-64"></div>
      <div className="ethiopian-pattern pointer-events-none absolute right-0 bottom-0 h-64 w-64"></div>

      {/* Card */}
      <div className="bg-card/95 border-border w-full max-w-[480px] rounded-xl border p-8 shadow-2xl backdrop-blur-md md:p-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-primary/10 mb-4 inline-flex size-16 items-center justify-center rounded-2xl">
            <span className="material-symbols-outlined text-primary text-4xl">
              nest_remote_comfort_sensor
            </span>
          </div>

          <h2 className="text-foreground mb-1 text-2xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground italic">"Feels like home"</p>
        </div>

        {/* Role Selector */}
        <div className="bg-muted border-border mb-8 flex rounded-xl border p-1.5">
          {[
            { key: 'renter', label: 'Family/Renter' },
            { key: 'owner', label: 'Owner/Agent' },
            { key: 'admin', label: 'Admin' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setRole(item.key)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                role === item.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email / Phone */}
          <div>
            <label className="mb-2 ml-1 block text-sm font-bold">Phone or Email</label>

            <div className="relative">
              <span className="material-symbols-outlined text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2">
                person
              </span>

              <input
                type="text"
                placeholder="e.g. +251 9... or name@email.com"
                className="border-input bg-background focus:border-primary focus:ring-primary/10 w-full rounded-xl border py-4 pr-4 pl-12 transition-all outline-none focus:ring-4"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 ml-1 flex items-center justify-between">
              <label className="text-sm font-bold">Password</label>
              <button type="button" className="text-primary text-xs font-bold hover:underline">
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2">
                lock
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="border-input bg-background focus:border-primary focus:ring-primary/10 w-full rounded-xl border py-4 pr-12 pl-12 transition-all outline-none focus:ring-4"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-primary absolute top-1/2 right-4 -translate-y-1/2"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                login({ id: '1', name: 'User', email: email || 'user@example.com', role: role });
                navigate('/');
              }}
              className="bg-primary text-primary-foreground w-full rounded-xl py-4 font-bold shadow-lg transition-all active:scale-[0.98]"
            >
              Sign In to Your Home
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="border-border flex-grow border-t"></div>
            <span className="text-muted-foreground mx-4 text-xs font-medium tracking-widest uppercase">
              Or continue with
            </span>
            <div className="border-border flex-grow border-t"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="bg-card border-border hover:border-primary/40 flex w-full items-center justify-center gap-3 rounded-xl border py-3.5 shadow-sm transition-all"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>

            <span className="text-sm font-semibold">Sign in with Google</span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            New to Ethiopian Rentals?
            <span className="text-primary ml-1 cursor-pointer font-bold hover:underline">
              Create an Account
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 flex flex-col items-center gap-6 opacity-60">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">verified_user</span>
            <span className="text-xs font-semibold tracking-wider uppercase">Secure Hosting</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">gpp_good</span>
            <span className="text-xs font-semibold tracking-wider uppercase">
              Verified Listings
            </span>
          </div>
        </div>

        <p className="max-w-xs text-center text-xs">
          Finding long-term homes across Addis Ababa, Bahir Dar, Hawassa, and beyond.
        </p>
      </div>

      {/* Bottom bars */}
      <div className="bg-primary fixed bottom-0 left-0 h-2 w-full"></div>
      <div className="bg-muted fixed bottom-2 left-0 h-1 w-full"></div>
    </main>
  );
}
