export function SidebarInfo() {
  return (
    <div className="space-y-6">

      {/* WHY VERIFY */}
      <div className="bg-card rounded-xl border p-6">
        <h3 className="font-bold mb-6">Why verify?</h3>

        <ul className="space-y-4 text-sm">
          <li>✔ 3x More Inquiries</li>
          <li>✔ Trust Badge</li>
          <li>✔ Faster Payouts</li>
        </ul>
      </div>

      {/* REVIEW TIMELINE + FINAL STEP */}
      <div className="bg-foreground text-background rounded-xl p-6">
        <h4 className="font-bold mb-4">Review Timeline</h4>

        <p className="text-sm opacity-80 mb-4">
          Manual review by our team. After submission, your account enters a pending state for manual verification.
        </p>

        <div className="bg-background/10 p-4 rounded-lg mb-4">
          <p className="text-2xl font-black text-primary">24–48 Hours</p>
          <p className="text-xs uppercase opacity-60">Expected Wait Time</p>
        </div>

        <p className="text-xs opacity-60">
          You’ll get notified once approved.
        </p>
      </div>

      {/* SUPPORT */}
      <div className="bg-card rounded-xl border p-6">
        <h4 className="font-bold mb-4">Need Help?</h4>

        <p className="text-xs text-muted-foreground mb-4">
          Support is available during working hours.
        </p>

        <button className="w-full border py-3 rounded-lg text-xs font-bold">
          Contact Support
        </button>
      </div>
    </div>
  );
}