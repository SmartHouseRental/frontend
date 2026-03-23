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

import { Button } from '@/components/ui/button';
import UserDetailTabs from '@/features/users/components/UserDetailTab';

import { useNavigate } from 'react-router';

function UserDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 pt-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-primary/10 rounded-lg p-2 transition-colors"
        >
          <MoveLeft className="text-primary" />
        </button>
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

        <div className="">
          <UserDetailTabs />
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
