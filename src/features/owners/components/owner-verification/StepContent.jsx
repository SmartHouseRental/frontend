import { IdentityProof } from "./IdentityProof";
import { ConfirmInfo } from "./ConfirmInfo";
import { FinalReview } from "./FinalReview";

export function StepContent({ step, setStep }) {
  if (step === 1) {
    return <ConfirmInfo setStep={setStep} />; // Step 1 → Identity Proof next
  }

  if (step === 2) {
    return <IdentityProof setStep={setStep} />; // Step 2 → Final Review next
  }

  if (step === 3) {
    return (
      <FinalReview
        setStep={setStep}
        onSubmit={() => {
          console.log("Final submission");
        }}
      />
    );
  }

  return null;
}