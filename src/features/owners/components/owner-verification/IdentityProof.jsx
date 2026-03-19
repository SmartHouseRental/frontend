export function IdentityProof({ setStep }) {
  return (
    <div className="bg-card rounded-xl shadow-xl border overflow-hidden">
      <div className="h-1.5 w-full bg-primary"></div>

      <div className="p-8 space-y-10">
        {/* IDENTITY VERIFICATION */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6">
            Identity Verification
          </h2>

          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
            <p className="mb-4 font-semibold">
              Upload Kebele ID or Passport
            </p>
            <button className="border px-6 py-2 rounded-lg font-bold">
              Select File
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">
            Live Identity Confirmation
          </h2>

          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
            Camera preview here
          </div>
        </section>
      </div>

      {/* FOOT ACTIONS */}
      <div className="bg-muted border-t p-6 flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="text-sm font-bold"
        >
          Back
        </button>

        <button
          onClick={() => setStep(3)} // go directly to Final Review
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold"
        >
          Next
        </button>
      </div>
    </div>
  );
}