import { Card } from '@/components/ui/card';
import {
  MailCheck,
  ChartBar,
  Mail,
  CircleUserRound,
  MoveLeft,
  ShieldBan,
  ShieldCheck,
  BadgeCheck,
} from 'lucide-react';
import Overview from './Overview';

import { Button } from '@/components/ui/button';
import UserDetailTabs from '@/features/UserManagment/components/UserDetailTabs';

function USerDetailPage() {
  return (
    <div className="p-8 pt-4">
      <div className="flex items-center gap-4">
        <butto className="hover:bg-primary/10 rounded-lg p-2 transition-colors">
          <MoveLeft className="text-primary" />
        </butto>
        <h1 className="text-primary text-xl font-bold tracking-tight">Admin Control Panel</h1>
      </div>

      <div className="mx-auto mt-5 max-w-400">
        <Card className="border-primary/10 mb-10 p-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative">
                <img
                  className="border-primary/10 h-32 w-32 rounded-full border-4 object-cover"
                  data-alt="User profile portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL8yIjaWw-SQJnRJtjgRuWFP9YrNTUdAjazpYXG4k2erZkNpDkDcTXbpNQhnU4nz0t7uanx75chxQXEFAwy7JIWEFvSJSIs8huv56v3M9WB2JyN1kdQ1vrGzhGEpcCagIUXWC3D_IPYrDvG6CeUnrhX0djVcXc87kMkyXIlpoFvTv3gWCyI4cXHk3vXsTfBljBvW9hKMv6EFh7EbOA3kKsEmGwae4jhRELLSRAoCa-tKuv6WnJCxQXaxFtZlUdu3BEGtuvr4BSngfy"
                />
                <div className="absolute right-1 bottom-1 h-6 w-6 rounded-full border-4 border-white bg-green-500 dark:border-zinc-900"></div>
              </div>
              <div className="text-center md:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <h2 className="text-primary text-3xl font-extrabold">Dawit Gebre</h2>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <BadgeCheck /> Verified Owner
                  </span>
                  <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-bold">
                    Owner
                  </span>
                </div>
                <div className="text-primary/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <span>
                      <CircleUserRound size={16} />
                    </span>
                    Account: <span className="ml-0.5 font-bold text-green-600">Active</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[18px]">
                      <MailCheck size={16} />
                    </span>
                    Email: <span className="ml-0.5 font-bold text-green-600">Verified</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-3 lg:w-auto">
              <Button className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 inline-flex flex-1 items-center justify-center rounded-lg border px-5 py-2.5 font-bold transition-all lg:flex-none">
                <ShieldCheck />
                Unverify
              </Button>
              <Button className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 inline-flex flex-1 items-center justify-center rounded-lg border px-5 py-2.5 font-bold transition-all lg:flex-none">
                <ShieldBan /> Suspend
              </Button>
              <Button className="bg-primary shadow-primary/20 inline-flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 font-bold text-white shadow-lg transition-all hover:brightness-110 lg:flex-none">
                <span className="mr-2">
                  <Mail size={19} />
                </span>
                Send Notification
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-12 gap-8">
          <UserDetailTabs />
          <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="border-primary/10 gap-0 rounded-xl p-6">
                <h4 className="text-primary/40 mb-4 text-xs font-bold tracking-widest uppercase">
                  Risk Indicators
                </h4>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 h-2 flex-1 overflow-hidden rounded-full">
                    <div className="h-full w-[15%] bg-green-500"></div>
                  </div>
                  <span className="text-sm font-black text-green-600">Low Risk (15%)</span>
                </div>
                <p className="text-primary/60 mt-3 text-xs leading-relaxed">
                  System has flagged no suspicious login attempts or fraudulent listing activities
                  in the last 6 months.
                </p>
              </div>
              <div className="border-primary/10 gap-0 rounded-xl p-6">
                <h4 className="text-primary/40 mb-4 flex items-center justify-between text-xs font-bold tracking-widest uppercase">
                  Quick Admin Notes
                  <span className="material-icons text-[14px] text-green-600">save</span>
                </h4>
                <textarea
                  className="bg-primary/5 border-primary/10 text-primary focus:ring-primary focus:border-primary placeholder:text-primary/30 w-full rounded-lg border p-3 text-sm"
                  placeholder="Add internal notes about this user..."
                  rows="6"
                ></textarea>
                <p className="text-primary/40 mt-2 text-[10px] italic">
                  Notes are only visible to administrators.
                </p>
              </div>

              <div className="bg-accent/5 border-accent/20 group relative overflow-hidden rounded-xl border p-6 shadow-sm">
                <div className="relative z-10">
                  <h4 className="text-accent mb-2 text-xs font-bold tracking-widest uppercase">
                    Direct Message
                  </h4>
                  <p className="text-primary/70 mb-4 text-xs leading-relaxed">
                    Start an encrypted chat with Dawit regarding his recent listings.
                  </p>
                  <Button className="bg-accent w-full rounded-lg py-2 text-sm font-bold text-white transition-all hover:brightness-110">
                    Open Chat
                  </Button>
                </div>
                <span className="text-accent/10 absolute -right-4 -bottom-4 rotate-12 text-7xl transition-transform group-hover:scale-110">
                  <ChartBar size={80} />
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default USerDetailPage;
