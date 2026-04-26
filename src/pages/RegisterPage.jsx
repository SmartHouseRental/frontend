import { useState } from "react";
import { useAuth } from "@/features/users/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");

  return (
    <main className="flex flex-col lg:flex-row min-h-screen w-full">
      
      {/* LEFT SIDE (Hero) */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6c8c4e34yl_2_os0IxLR-f7eFfiFJU9f3_FKVbDGHJcj7ntds6ovXaLciQ0GG9psiOnNrRxSRiZyv0MmTbX6MS6UAKvSaG6DjfcOmZ471smFB8p36AET-LJEq19lYtLkWcRbTft4hl8--pyT1ODleB3fyh-sNGSbDx6utTPDvmLTOJpu19dWjK8fwJ_F9qZUEyHtCCJLhvFWmwjmljKmsggL_Uvw2HEqSqHtsdjm-hhDp5QK9gPvlCc516jIvcC7q76Iixin4teQ')",
          }}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        <div className="relative z-10 flex flex-col justify-between p-16 text-white w-full">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl">
              home_pin
            </span>
            <span className="text-2xl font-bold">Join the Family</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-black leading-tight mb-6">
              Find your forever home
            </h1>
            <p className="text-lg opacity-90">
              Experience a long-stay rental that feels like home in Ethiopia.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm opacity-80">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">
                verified_user
              </span>
              Verified Listings
            </span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">
                favorite
              </span>
              Family Focused
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col bg-background p-6 lg:p-12 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-end items-center mb-12">
          <div className="flex items-center gap-6">
            <button className="text-muted-foreground text-sm flex items-center gap-1 hover:text-primary">
              <span className="material-symbols-outlined text-base">
                language
              </span>
              አማርኛ / English
            </button>

            <button 
              className="bg-card border border-border px-4 py-2 rounded-lg text-sm font-bold hover:bg-muted transition-all"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="max-w-xl mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">
              Create your account
            </h2>
            <p className="text-muted-foreground">
              Join thousands of families finding their place in Ethiopia.
            </p>
          </div>

          <form className="space-y-8">

            {/* ROLE */}
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                I am joining as...
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: "seeker",
                    title: "Home Seeker",
                    desc: "Looking for a long-term stay",
                    icon: "house_with_shield",
                  },
                  {
                    key: "owner",
                    title: "Owner / Agent",
                    desc: "Listing a property",
                    icon: "handshake",
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRole(item.key)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      role === item.key
                        ? "border-primary ring-4 ring-primary/10 bg-card"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-3xl mb-3 block">
                      {item.icon}
                    </span>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* INPUTS */}
            <div className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="text-sm font-semibold ml-1">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <span className="material-symbols-outlined absolute left-4 top-3 text-muted-foreground">
                    person
                  </span>
                  <input
                    type="text"
                    placeholder="Abebe Bikila"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-card focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold ml-1">
                    Phone Number
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-4 top-3 text-sm font-bold text-muted-foreground">
                      +251
                    </span>
                    <input
                      type="tel"
                      placeholder="911 234 567"
                      className="w-full pl-16 pr-4 py-3 rounded-lg border border-input bg-card focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold ml-1">
                    Email
                  </label>
                  <div className="relative mt-1">
                    <span className="material-symbols-outlined absolute left-4 top-3 text-muted-foreground">
                      mail
                    </span>
                    <input
                      type="email"
                      placeholder="abebe@example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-card focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold ml-1">
                  Create Password
                </label>

                <div className="relative mt-1">
                  <span className="material-symbols-outlined absolute left-4 top-3 text-muted-foreground">
                    lock
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 rounded-lg border border-input bg-card focus:ring-2 focus:ring-primary"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-muted-foreground hover:text-primary"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                <p className="text-[10px] text-muted-foreground mt-1">
                  Must be at least 8 characters with one special character.
                </p>
              </div>
            </div>

            {/* INFO BOX */}
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <span className="material-symbols-outlined text-primary">
                verified
              </span>
              <div>
                <p className="text-sm font-bold text-primary">
                  Secure & Verified Profiles
                </p>
                <p className="text-xs text-muted-foreground">
                  Every profile is manually reviewed to ensure a safe environment.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button 
                type="button"
                onClick={() => {
                  login({ id: "1", name: name || "New User", email: "user@example.com", role: role });
                  navigate("/");
                }}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Join the Community
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </button>

              <p className="text-center text-xs text-muted-foreground mt-6">
                By joining, you agree to our Terms and Privacy Policy.
              </p>
            </div>
          </form>

          {/* FOOTER */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              Already a member?
            </p>
            <button className="text-primary font-bold hover:underline mt-1">
              Log in to your account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}