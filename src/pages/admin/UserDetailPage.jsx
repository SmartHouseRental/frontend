import { Card } from '@/components/ui/card';
import {
  MailCheck,
  ChartBar,
  Mail,
  CircleUserRound,
  House,
  Star,
  MoveLeft,
  Info,
  ShieldBan,
  Calendar,
  ShieldCheck,
  BadgeCheck,
} from 'lucide-react';
import { useState } from 'react';
import Overview from './Overview';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import { Check } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tabs = {
  overview: {
    barStyle: 'bottom-0 left-0 w-15',
  },
  verfication: {
    label: 'Verfication and Documents',
    barStyle: 'bottom-0 left-23 w-44',
  },
  properties: {
    barStyle: 'bottom-0 left-74.5 w-17.5',
  },
  reports: {
    barStyle: 'bottom-0 left-99.5 w-13.5',
  },
};

function USerDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-8 pt-4">
      <div className="flex items-center gap-4">
        <Button className="hover:bg-primary/10 rounded-lg p-2 transition-colors">
          <MoveLeft className="text-primary" />
        </Button>
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
          <div className="col-span-12 space-y-8 lg:col-span-8 xl:col-span-9">
            <div className="border-primary/10 border-b">
              <div className="scrollbar-hide relative flex gap-8 overflow-x-auto">
                {Object.entries(tabs).map(([key, value]) => (
                  <button
                    onClick={() => setActiveTab(key)}
                    key={key}
                    className={cn(
                      'text-primary/80 hover:text-primary border-b-2 border-transparent pb-4 text-sm font-medium whitespace-nowrap transition-all',
                      key === activeTab && 'text-primary',
                    )}
                  >
                    {value['label'] || key.charAt(0).toUpperCase().concat(key.slice(1))}
                  </button>
                ))}

                <div
                  className={cn(
                    'bg-primary absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out',
                    tabs[activeTab].barStyle,
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="border-primary/10 gap-0 rounded-xl p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="bg-accent/10 text-accent rounded-lg p-2">
                      <House />
                    </span>
                    <span className="text-primary/40 text-[10px] font-bold uppercase">
                      Total Assets
                    </span>
                  </div>
                  <h3 className="text-primary text-3xl font-black">8</h3>
                  <p className="text-primary/60 text-sm font-medium">Active Listings</p>
                </Card>
                <Card className="border-primary/10 gap-0 rounded-xl p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="bg-accent/10 text-accent rounded-lg p-2">
                      <Calendar />
                    </span>
                    <span className="text-primary/40 text-[10px] font-bold uppercase">
                      Engagement
                    </span>
                  </div>
                  <h3 className="text-primary text-3xl font-black">45</h3>
                  <p className="text-primary/60 text-sm font-medium">Total Appointments</p>
                </Card>
                <Card className="border-primary/10 gap-0 rounded-xl p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-lg bg-yellow-400/10 p-2 text-yellow-600">
                      <Star />
                    </span>
                    <span className="text-primary/40 text-[10px] font-bold uppercase">
                      Reputation
                    </span>
                  </div>
                  <h3 className="text-primary text-3xl font-black">4.8</h3>
                  <p className="text-primary/60 text-sm font-medium">Average Rating</p>
                </Card>
              </div>

              <Card className="border-primary/10 gap-0 overflow-hidden py-0">
                <div className="bg-primary/5 border-primary/10 border-b px-6 py-4">
                  <h3 className="text-primary flex items-center gap-2 font-bold">
                    <Info className="text-[18px]" />
                    Personal Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-x-12 gap-y-8 p-8 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
                      Email Address
                    </label>
                    <p className="text-primary font-bold">dawit.gebre@example.et</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
                      Phone Number
                    </label>
                    <p className="text-primary font-bold">+251 911 234 567</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
                      Registration Date
                    </label>
                    <p className="text-primary font-bold">October 14, 2023</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
                      Preferred Language
                    </label>
                    <p className="text-primary font-bold">Amharic (Primary), English</p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
                      Residential Address
                    </label>
                    <p className="text-primary font-bold">
                      Bole Sub City, House #452, Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Verify Tab*/}
          </div>
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
