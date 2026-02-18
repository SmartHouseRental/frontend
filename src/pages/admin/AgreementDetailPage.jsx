// AgreementDetailPage.jsx
import React from 'react';
import {
  User,
  Building2,
  Gavel,
  Receipt,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Mail,
  XCircle,
  Printer,
  Download,
  ZoomIn,
  ZoomOut,
  RefreshCw,
} from 'lucide-react';

// shadcn/ui components
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function AgreementDetailPage() {
  return (
    <main className="mx-auto flex max-w-[1440px] gap-8 px-6 py-8">
      {/* Left Column - Main Content */}
      <div className="flex-1 space-y-6">
        {/* Summary Header - Parties + Property */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Renter Card */}
          <Card className="border-[#A47551]/20 shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#A47551]/10 text-[#A47551]">
                <User size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#A47551] uppercase">Renter / ተከራይ</p>
                <h3 className="text-lg font-bold">Abebe B.</h3>
                <Badge
                  variant="outline"
                  className="mt-1 border-green-200 bg-green-50 text-green-700"
                >
                  <CheckCircle2 size={14} className="mr-1" />
                  Verified Identity
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Owner Card */}
          <Card className="border-[#A47551]/20 shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#A47551]/10 text-[#A47551]">
                <Building2 size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#A47551] uppercase">Owner / አከራይ</p>
                <h3 className="text-lg font-bold">Martha K.</h3>
                <Badge
                  variant="outline"
                  className="mt-1 border-green-200 bg-green-50 text-green-700"
                >
                  <CheckCircle2 size={14} className="mr-1" />
                  Verified Owner
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Linked Property Card */}
          <Card className="border-primary/30 bg-primary/[0.02] shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                <img
                  alt="Modern luxury villa in Addis Ababa"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/.../..."
                />
              </div>
              <div>
                <p className="text-primary text-xs font-bold uppercase">Linked Property</p>
                <h3 className="text-base leading-tight font-bold">Modern Villa, Bole</h3>
                <p className="text-xs font-medium text-gray-500">Ref ID: VL-99-BOLE</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Overview & Terms (no tabs) */}
        <Card className="border-[#A47551]/20 shadow-sm">
          <CardContent className="space-y-8 p-8">
            {/* Core Terms + Payment Summary */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Core Lease Terms */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#A47551] uppercase">
                  <Gavel size={18} />
                  Core Lease Terms
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card className="border-[#A47551]/10 bg-[#F5F0E6]/50">
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-[#A47551]">Monthly Rent / ወርሃዊ ኪራይ</p>
                      <p className="text-primary text-2xl font-black">
                        60,000 <span className="text-sm">ETB</span>
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-[#A47551]/10 bg-[#F5F0E6]/50">
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-[#A47551]">Deposit / የቅድመ ክፍያ</p>
                      <p className="text-2xl font-black text-[#221610]">
                        120,000 <span className="text-sm">ETB</span>
                      </p>
                      <p className="mt-1 text-[10px] font-medium text-[#A47551] uppercase">
                        2 Months Equivalent
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#A47551] uppercase">
                  <Receipt size={18} />
                  Payment Summary
                </h4>
                <Card>
                  <CardContent className="flex items-center gap-4 p-3">
                    <div className="group relative flex h-24 w-20 cursor-zoom-in items-center justify-center overflow-hidden rounded border border-dashed border-[#A47551]/30 bg-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <ZoomIn size={20} className="text-white" />
                      </div>
                      <img
                        alt="Payment receipt"
                        className="h-full w-full object-cover grayscale"
                        src="https://lh3.googleusercontent.com/..."
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-500 uppercase">Proof of Payment</p>
                      <p className="text-sm font-bold">CBE Transfer: #TR-992120</p>
                      <p className="mt-1 text-xs text-[#A47551]">Uploaded: Jan 12, 2024</p>
                      <Button variant="link" className="text-primary mt-2 h-auto p-0">
                        Download Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contract Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#A47551] uppercase">
                  <Eye size={18} />
                  Contract Preview (የውል ቅድመ እይታ)
                </h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer size={16} className="mr-1.5" />
                    Print
                  </Button>
                  <Button size="sm">
                    <Download size={16} className="mr-1.5" />
                    PDF
                  </Button>
                </div>
              </div>

              <div className="relative flex aspect-[1/1.4] max-h-[800px] w-full flex-col overflow-hidden rounded-lg border-2 border-[#A47551]/20 bg-gray-500">
                {/* PDF Toolbar */}
                <div className="flex h-10 items-center justify-between bg-[#323639] px-4 text-sm text-white">
                  <div className="flex items-center gap-4">
                    <span>contract_draft_v2.pdf</span>
                    <span className="rounded bg-white/20 px-2 py-0.5 text-[10px]">1 / 12</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <ZoomOut size={18} />
                    <span>100%</span>
                    <ZoomIn size={18} />
                  </div>
                </div>

                {/* PDF Preview Content */}
                <div className="relative flex-1 overflow-y-auto bg-white p-12">
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
                    <div className="text-primary/10 -rotate-45 transform text-[6rem] font-black whitespace-nowrap uppercase">
                      PLATFORM DRAFT ONLY
                    </div>
                  </div>

                  <div className="mx-auto max-w-2xl space-y-8 opacity-80">
                    <div className="space-y-2 border-b-2 border-gray-900 pb-6 text-center">
                      <h5 className="text-2xl font-bold tracking-tighter uppercase">
                        Residential Lease Agreement
                      </h5>
                      <p className="text-sm font-medium">የመኖሪያ ቤት ኪራይ ውል ስምምነት</p>
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed">
                      <p>
                        <strong>1. PARTIES:</strong> This agreement is made between{' '}
                        <strong>MARTHA K.</strong> (hereinafter referred to as the "Lessor") and{' '}
                        <strong>ABEBE B.</strong> (hereinafter referred to as the "Lessee").
                      </p>
                      <p>
                        <strong>2. PROPERTY:</strong> The Lessor hereby leases to the Lessee the
                        property located at <strong>Bole Sub-city, Woreda 03, House #NEW</strong>,
                        Addis Ababa, Ethiopia.
                      </p>
                      <p>
                        <strong>3. TERM:</strong> The lease shall begin on Feb 1, 2024 and terminate
                        on Jan 31, 2025.
                      </p>
                      <p>
                        <strong>4. RENT:</strong> The monthly rent shall be 60,000 ETB payable in
                        advance on the first day of each month.
                      </p>

                      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400 italic">
                        - Additional terms continue below -
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar - Sticky Actions */}
      <aside className="w-80 space-y-6">
        <div className="sticky top-[84px] space-y-6">
          {/* Risk Alerts */}
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertTriangle size={18} className="h-5 w-5" />
            <AlertTitle className="mb-2 text-sm font-bold tracking-wider text-red-700 uppercase">
              Risk Alerts
            </AlertTitle>
            <AlertDescription>
              <div className="mt-3 flex items-start gap-3 rounded-lg border border-red-100 bg-white p-3">
                <Clock size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="text-xs leading-tight font-bold">Agreement pending &gt;7 days</p>
                  <p className="mt-1 text-[10px] text-gray-500 italic">
                    Action recommended to avoid timeout
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {/* Status Dropdown */}
          <Card className="border-[#A47551]/20 shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div>
                <label className="mb-1.5 block text-[10px] font-black text-[#A47551] uppercase">
                  Administrative Status
                </label>
                <Select defaultValue="active">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active / የጸና</SelectItem>
                    <SelectItem value="pending">Pending Verification</SelectItem>
                    <SelectItem value="disputed">Disputed / በክርክር ላይ</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="border-[#A47551]/20 shadow-sm">
            <CardContent className="space-y-3 p-5">
              <p className="mb-2 text-[10px] font-black tracking-widest text-[#A47551] uppercase">
                Platform Controls
              </p>

              <Button className="shadow-primary/20 w-full justify-center gap-2 shadow-md">
                <RefreshCw size={20} />
                Regenerate PDF Draft
              </Button>

              <Button
                variant="outline"
                className="border-primary text-primary w-full justify-center gap-2"
              >
                <CheckCircle2 size={20} />
                Mark Payment Confirmed
              </Button>

              <Button
                variant="secondary"
                className="w-full justify-center gap-2 bg-[#F5F0E6] text-[#A47551] hover:bg-[#A47551]/10"
              >
                <Mail size={20} />
                Notify All Parties
              </Button>

              <div className="mt-2 border-t border-[#A47551]/10 pt-4">
                <Button variant="destructive" className="w-full justify-center gap-2">
                  <XCircle size={20} />
                  Force Terminate Lease
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log Snippet */}
          <div className="px-2">
            <div className="mb-2 flex items-center justify-between text-[10px] font-bold text-[#A47551] uppercase">
              <span>Last System Audit</span>
              <a className="text-primary hover:underline" href="#">
                View All
              </a>
            </div>
            <div className="border-primary/20 space-y-2 border-l-2 pl-3 text-[11px] text-gray-500">
              <p>
                <strong className="text-gray-700">Jan 14:</strong> Payment metadata verified by
                System
              </p>
              <p>
                <strong className="text-gray-700">Jan 12:</strong> Renter uploaded CBE slip
                #TR-992120
              </p>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}

export default AgreementDetailPage;
