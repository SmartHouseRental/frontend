export function FinalReview({ setStep, onSubmit }) {
  return (
    <div className="space-y-8">

      {/* ================= LEFT MAIN ================= */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-card rounded-xl shadow-xl border overflow-hidden">

          {/* TOP BAR */}
          <div className="h-1.5 w-full bg-primary opacity-20"></div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold flex items-center gap-2">
                Review Your Submission
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Double-check everything before submitting.
              </p>
            </div>

            <div className="space-y-6">

              {/* PERSONAL INFO */}
              <ReviewCard
                title="Personal Info"
                main="Abebe Bikila"
                sub="Business License: BL-ADD-2023-8892"
              />

              {/* IDENTITY */}
              <ReviewCard
                title="Identity"
                main="Kebele ID Uploaded"
                sub="kebele_id_front.jpg • 1.2 MB"
              />

              {/* PROPERTY */}
              <ReviewCard
                title="Property"
                main="Land Certificate Uploaded"
                sub="property_doc_2024.pdf • 2.4 MB"
              />
            </div>

            {/* CERTIFICATION */}
            <div className="mt-10 pt-8 border-t">
              <div className="flex items-start gap-3 bg-primary/5 p-5 rounded-xl border border-primary/10">
                <input
                  id="certify"
                  type="checkbox"
                  className="h-5 w-5 accent-primary mt-1"
                />

                <div>
                  <label htmlFor="certify" className="font-bold text-sm cursor-pointer">
                    I certify that all information is accurate
                  </label>

                  <p className="text-xs text-muted-foreground mt-1">
                    False information may result in disqualification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bg-muted border-t p-6 flex flex-col sm:flex-row justify-between gap-6">

            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-sm font-bold flex items-center gap-2"
            >
             Back
            </button>

            <button
              onClick={onSubmit}
              className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg"
            >
              Submit for Review
            </button>
          </div>
        </div>

        {/* SECURITY */}
        <div className="flex justify-center gap-8 text-xs font-bold opacity-50 uppercase">
          <span>🔒 256-bit Encryption</span>
          <span>✔ Verified Process</span>
        </div>
      </div>

     
    </div>
  );
}


function ReviewCard({ title, main, sub }) {
  return (
    <div className="flex justify-between items-start p-4 bg-muted/30 rounded-xl border">

      <div>
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {title}
        </p>

        <p className="text-base font-bold">{main}</p>

        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>

      <button className="text-xs font-bold text-primary hover:underline">
        Edit
      </button>
    </div>
  );
}