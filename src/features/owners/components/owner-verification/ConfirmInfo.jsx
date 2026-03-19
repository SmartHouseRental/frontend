export  function ConfirmInfo({ setStep}) {
  return (
    <div className="bg-card rounded-xl shadow-xl border overflow-hidden relative">

      {/* TOP PATTERN */}
      <div className="h-2 w-full bg-primary opacity-20"></div>

      <div className="p-6 md:p-10">

        {/* ================= PROGRESS ================= */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              Verification Progress
            </h3>

            <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">
              66% Complete
            </span>
          </div>

          <div className="w-full bg-muted rounded-full h-3 border">
            <div className="bg-primary h-full rounded-full w-2/3 relative">
              <div className="absolute -right-1 -top-1 h-5 w-5 bg-white border-4 border-primary rounded-full"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4 text-xs font-bold uppercase">
            <div className="flex items-center gap-2 text-primary">
              ✓ Identity Verified
            </div>
            <div className="flex items-center gap-2 text-primary">
              ✓ Phone Confirmed
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              ⏳ Property Documents
            </div>
          </div>
        </section>

        <hr className="border-border mb-10" />

        {/* ================= PROFILE HEADER ================= */}
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative">
            <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxu8pLB7EvgbwMdSDwKzzKxcKFQMC2O_IaqfXIYbb_g_0_mOmZ6ghsKXXGK4BAFncOZ5HahEx5UjmAHWqtvV2ZRn_VZ3ZyBJLJiHixSqlW2ad4SbfiqXTM7Kdm0ten29dzr50MzevLPWNO45WGla0tNFQRO0JkpLMGSm93VyC7ojoLBM7mmWHpslAP3t_u7yBMoqGTihwewEJuUNssrNdlj1t22Ux4OvNeer7i03Zudim9E0ZfDuMc2qLoTwvf6lkLnDJ8XsDsRKY"
                className="h-full w-full object-cover"
              />
            </div>

            <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full">
              📷
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-extrabold">Abebe Bikila</h2>
            <p className="text-muted-foreground">
              Member since September 2023 • Addis Ababa
            </p>

            {/* BADGES */}
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="badge">Verified Owner</span>
              <span className="badge">Highly Rated</span>
              <span className="badge">Family Choice</span>
            </div>
          </div>
        </section>

        {/* ================= IDENTITY INFO ================= */}
        <section className="mb-12">
          <div className="flex justify-between mb-6">
            <h3 className="text-xl font-bold">Identity Information</h3>
            <button className="text-primary text-sm font-bold">
              Edit All
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard label="Full Name" value="Abebe Bikila" />
            <InfoCard label="Business Name" value="Bikila Rentals" />
            <InfoCard label="Phone Number" value="+251 911 234 567" />
            <InfoCard label="Email Address" value="abebe@email.com" />
          </div>
        </section>

        {/* ================= DOCUMENT CENTER ================= */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-2">Document Center</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Your documents are encrypted and secure.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* DOCUMENT CARD */}
            <DocumentCard
              title="National ID"
              status="approved"
            />

            <DocumentCard
              title="Property Deed"
              status="reviewing"
            />

            {/* UPLOAD */}
            <button className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-6 min-h-[160px] hover:bg-muted">
              <div className="bg-primary text-white h-12 w-12 rounded-full flex items-center justify-center mb-3">
                +
              </div>
              <span className="font-bold text-primary">Upload</span>
            </button>
          </div>
        </section>

        {/* ================= SETTINGS ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold mb-6">Account Settings</h3>

          <details className="bg-card border rounded-lg">
            <summary className="p-4 cursor-pointer font-bold">
              Security & Password
            </summary>

            <div className="p-4 border-t">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full border rounded p-2 mb-3"
              />

              <button className="bg-primary text-white px-6 py-2 rounded">
                Update Password
              </button>
            </div>
          </details>

          <details className="bg-card border rounded-lg">
            <summary className="p-4 cursor-pointer font-bold">
              Notifications
            </summary>

            <div className="p-4 border-t space-y-4">
              <Toggle label="Booking Requests" />
              <Toggle label="Verification Updates" />
            </div>
          </details>
        </section>
      </div>
        {/* Continue Button */}
            <div className="mt-10 mr-10 mb-5 flex justify-end">
                <button
                onClick={() => setStep(2)}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
                >
                Continue to Identity Proof
                </button>
            </div>
      

      {/* BOTTOM PATTERN */}
      <div className="h-2 w-full bg-muted opacity-20"></div>
    </div>
  );
}



function InfoCard({ label, value }) {
  return (
    <div className="bg-background p-4 rounded-lg border flex justify-between items-center">
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
          {label}
        </p>
        <p className="font-semibold">{value}</p>
      </div>
      <button className="text-muted-foreground hover:text-primary">✏️</button>
    </div>
  );
}

function DocumentCard({ title, status }) {
  const isApproved = status === "approved";

  return (
    <div className="bg-background p-3 rounded-xl border">
      <div className="aspect-video bg-muted mb-3 rounded"></div>

      <div className="flex justify-between">
        <div>
          <p className="font-bold text-sm">{title}</p>
          <p
            className={`text-xs font-bold ${
              isApproved ? "text-green-600" : "text-orange-500"
            }`}
          >
            {isApproved ? "Approved" : "Reviewing"}
          </p>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label }) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm font-medium">{label}</p>
      <input type="checkbox" defaultChecked />
    </div>
  );
}