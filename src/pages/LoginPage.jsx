import { useState } from "react";
import { useAuth } from "@/features/users/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("renter");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main className="relative flex flex-col items-center justify-center px-4 py-12 min-h-[calc(100vh-100px)] overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-64 h-64 ethiopian-pattern pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 ethiopian-pattern pointer-events-none"></div>

      {/* Card */}
      <div className="w-full max-w-[480px] bg-card/95 backdrop-blur-md rounded-xl shadow-2xl p-8 md:p-12 border border-border">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-2xl mb-4">
            <span className="material-symbols-outlined text-primary text-4xl">
              nest_remote_comfort_sensor
            </span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">
            Welcome Back
          </h2>
          <p className="text-muted-foreground italic">"Feels like home"</p>
        </div>

        {/* Role Selector */}
        <div className="flex p-1.5 bg-muted rounded-xl mb-8 border border-border">
          {[
            { key: "renter", label: "Family/Renter" },
            { key: "owner", label: "Owner/Agent" },
            { key: "admin", label: "Admin" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setRole(item.key)}
              className={`flex-1 py-2 text-sm rounded-lg transition-all font-semibold ${
                role === item.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
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
            <label className="block text-sm font-bold mb-2 ml-1">
              Phone or Email
            </label>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                person
              </span>

              <input
                type="text"
                placeholder="e.g. +251 9... or name@email.com"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-input bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-sm font-bold">Password</label>
              <button
                type="button"
                className="text-primary text-xs font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                lock
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 rounded-xl border border-input bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button 
              type="button"
              onClick={() => {
                login({ id: "1", name: "User", email: email || "user@example.com", role: role });
                navigate("/");
              }}
              className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              Sign In to Your Home
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-border"></div>
            <span className="mx-4 text-muted-foreground text-xs font-medium uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-card border border-border py-3.5 rounded-xl transition-all shadow-sm hover:border-primary/40"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>

            <span className="font-semibold text-sm">
              Sign in with Google
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            New to Ethiopian Rentals?
            <span className="text-primary font-bold ml-1 cursor-pointer hover:underline">
              Create an Account
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 flex flex-col items-center gap-6 opacity-60">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">
              verified_user
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider">
              Secure Hosting
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">
              gpp_good
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider">
              Verified Listings
            </span>
          </div>
        </div>

        <p className="text-xs text-center max-w-xs">
          Finding long-term homes across Addis Ababa, Bahir Dar, Hawassa, and beyond.
        </p>
      </div>

      {/* Bottom bars */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-primary"></div>
      <div className="fixed bottom-2 left-0 w-full h-1 bg-muted"></div>
    </main>
  );
}