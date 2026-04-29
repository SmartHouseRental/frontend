import { SidebarInfo } from '@/features/owners/components/owner-verification/SideBarInfo';
import { StepContent } from '@/features/owners/components/owner-verification/StepContent';
import { useState } from 'react';

export default function VerificationPage() {
  // Start from step 1 (since Property step is removed)
  const [step, setStep] = useState(1);

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-10">
      {/* Step tracker (updated to reflect 3 steps now) */}
      <StepTracker step={step} />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
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
