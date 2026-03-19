export function StepTracker({ step }) {
  const steps = ["Confirm Info", "Identity Proof", "Final Review"];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-4xl mx-auto relative">

        {/* BACKGROUND LINE */}
        <div
          className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0"
          style={{ backgroundColor: "var(--primary)", opacity: 0.1 }}
        ></div>

        {/* PROGRESS LINE */}
        <div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 z-0 transition-all"
          style={{
            width: `${((step - 1) / (steps.length - 1)) * 100}%`,
            backgroundColor: "var(--accent)",
          }}
        ></div>

        {steps.map((label, index) => {
          const current = index + 1;
          let style = "step-inactive";
          if (current < step) style = "step-completed";
          if (current === step) style = "step-active";

          return (
            <div key={index} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${style}`}
              >
                {current < step ? "✓" : current}
              </div>
              <span className="text-xs font-bold">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}