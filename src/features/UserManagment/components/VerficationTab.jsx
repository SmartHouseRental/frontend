import { Check, EyeOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function VerifyTab() {
  return (
    <div className="col-span-12 space-y-8 lg:col-span-8 xl:col-span-9">
      <div className="border-primary/10 rounded-xl border bg-white p-8 dark:bg-zinc-900">
        <h3 className="text-primary mb-8 text-sm font-bold tracking-widest uppercase">
          Verification Progress
        </h3>
        <div className="relative flex justify-between">
          <div className="bg-primary/10 absolute top-5 left-0 z-0 h-0.5 w-full"></div>
          <div className="bg-accent absolute top-5 left-0 z-0 h-0.5 w-1/2"></div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full shadow-lg">
              <Check size={18} className="text-white" />
            </div>
            <span className="text-primary text-xs font-bold">Submitted</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="bg-accent flex h-10 w-10 items-center justify-center rounded-full shadow-lg">
              <EyeOff className="text-white" size={18} />
            </div>
            <span className="text-accent text-xs font-bold">Under Review</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <Check className="text-white" size={10} />
            </div>
            <span className="text-primary/40 text-xs font-bold">Verified</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="border-primary/10 flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-zinc-900">
          <div className="bg-bg-warm group relative flex h-48 items-center justify-center overflow-hidden">
            <img
              alt="National ID"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzcO7UdpEQY41Px_4FnC9Aj8v5lfcisylZx0vVMtkk71HIHbU30NootZ8_h8xNAShEEiI8A8CHcy77tdUJyvCGLmUbxap8VWyTIEwsG_MtCFANipRg0X4ePSi-TFV7ibouiTK3xYBtSOTrVgh9iAlEblwOyAH9x9nRz2vZbT2ljkcDsbbi8xNlQ8IgLihUrWVU-8rftcNVmB8umZUU63m-dgLPNU9heU_Ts70AaxZIzPztFLJHTLkNEDdZYHLai81f4opVu5GqK5hB"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Button className="text-primary hover:bg-bg-warm rounded-full bg-white p-2">
                <span className="material-icons">zoom_in</span>
              </Button>
            </div>
            <div className="absolute top-3 right-3">
              <span className="rounded bg-yellow-100 px-2 py-1 text-[10px] font-bold text-yellow-700">
                PENDING REVIEW
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h4 className="text-primary mb-1 font-bold">National ID (Kebele)</h4>
            <p className="text-primary/40 mb-4 text-[10px] font-bold uppercase">
              Uploaded: Oct 24, 2023
            </p>
            <div className="mt-auto grid grid-cols-2 gap-2">
              <Button>
                <Check size={17} /> Approve
              </Button>
              <Button className="bg-destructive flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-white transition-all hover:bg-red-600">
                <X size={17} />
                Reject
              </Button>
            </div>
          </div>
        </div>
        <div className="border-primary/10 flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-zinc-900">
          <div className="bg-bg-warm group relative flex h-48 items-center justify-center overflow-hidden">
            <img
              alt="Business License"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwh_ocMjFsd5tkP3OXR4btW8gQBVw4jICpZtma1h_Rj28Hv6st0riPfGYbDNzTqU_eOObrvRo05N9oXww9T2kkjKlIWRzC_potEip0DpsQ8mjSFvLsLLlqvqotNJNa8BD5vkgFsS1Ia4GVNXAvtamQ48zjA_iphgQ8o2U7wc8ufC-kQkG1GuWnYXBBdHnUzApN7XL6JNWVCUxkWClbpsG7YQ9i7YIvWyPm9lAwLO0ADdmGpXiN-TRBHSS8KJIwtDhs1g9nDT4DhR6p"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Button className="text-primary hover:bg-bg-warm rounded-full bg-white p-2">
                <span className="material-icons">zoom_in</span>
              </Button>
            </div>
            <div className="absolute top-3 right-3">
              <span className="rounded bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                VERIFIED
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h4 className="text-primary mb-1 font-bold">Business License</h4>
            <p className="text-primary/40 mb-4 text-[10px] font-bold uppercase">
              Uploaded: Oct 20, 2023
            </p>
            <div className="mt-auto grid cursor-not-allowed grid-cols-2 gap-2 opacity-50">
              <Button
                className="flex items-center justify-center gap-1.5 rounded-lg bg-green-500 py-2 text-xs font-bold text-white"
                disabled=""
              >
                <Check size={17} /> Approve
              </Button>
              <Button
                className="bg-destructive flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-white"
                disabled=""
              >
                <X size={17} />
                Reject
              </Button>
            </div>
          </div>
        </div>
        <div className="border-primary/10 flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-zinc-900">
          <div className="bg-bg-warm group relative flex h-48 items-center justify-center overflow-hidden">
            <img
              alt="Property Title"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcrBDGtr8cfzsO7iEuBH_26p0J1R0vhkjkGwcXaDWkav7oNdEhhQKQc28nfR3z4ZWTME_rmArI2XMiBqEVP3RgpS-wBCSYvTwJc51q51G4wY2G0fwtao2hfhTwCpoF4gU36qVePVURCObdxGlZ3tDV9HV1HBrhWfrGpKz4vVkG9K-3cvpoMneQ8S8P3V44KWdhHUp-6X-u3UFtQPq6s84cLg-2oTpLcvTzu1qPwoxavabwbOM5Md7JQ1G9UXsLf0sm74yq2TIFmFIP"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Button className="text-primary hover:bg-bg-warm rounded-full bg-white p-2">
                <span className="material-icons">zoom_in</span>
              </Button>
            </div>
            <div className="absolute top-3 right-3">
              <span className="rounded bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
                UNDER REVIEW
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h4 className="text-primary mb-1 font-bold">Property Title Deed</h4>
            <p className="text-primary/40 mb-4 text-[10px] font-bold uppercase">
              Uploaded: Oct 22, 2023
            </p>
            <div className="mt-auto grid grid-cols-2 gap-2">
              <Button className="flex items-center justify-center gap-1.5 rounded-lg bg-green-500 py-2 text-xs font-bold text-white transition-all hover:bg-green-600">
                <Check size={17} /> Approve
              </Button>
              <Button className="bg-destructive flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-white transition-all hover:bg-red-600">
                <X size={17} />
                Reject
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyTab;
