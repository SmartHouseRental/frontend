import { useState } from "react"; 
import { StepTracker } from "../../features/owners/components/owner-verification/StepTracker";
import { StepContent } from "../../features/owners/components/owner-verification/StepContent";
import { SidebarInfo } from "../../features/owners/components/owner-verification/SidebarInfo";

export default function VerificationPage() {
  // Start from step 1 (since Property step is removed)
  const [step, setStep] = useState(1);

  return (
    <main className="max-w-[1100px] mx-auto py-10 px-4">
      
      {/* Step tracker (updated to reflect 3 steps now) */}
      <StepTracker step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        
        {/* LEFT SIDE (Dynamic Step Content) */}
        <div className="lg:col-span-2">
          <StepContent step={step} setStep={setStep} />
        </div>

        {/* RIGHT SIDE (Sidebar remains unchanged) */}
        <SidebarInfo />
      </div>
    </main>
  );
}