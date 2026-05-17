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
import UserDetailTabs from '@/features/user-managment/components/UserDetailTab';

import { useNavigate, useParams } from 'react-router';

import { useUser } from '@/features/user-managment/hooks/useUser';
import { useUpdateUserStatus } from '@/features/user-managment/hooks/useUpdateUserStatus';
import { useUpdateUserVerification } from '@/features/user-managment/hooks/useUpdateUserVerification';
import { Loader } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

function UserDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, isLoading } = useUser(id);
  const { mutate: updateStatus } = useUpdateUserStatus();
  const { mutate: updateVerification } = useUpdateUserVerification();

  if (isLoading) {
    return (
      <div className="p-8 pt-4 flex justify-center items-center h-64">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 pt-4 text-center">
        <h2 className="text-xl">User not found</h2>
        <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown';
  const avatarFallback = fullName.substring(0, 2).toUpperCase() || 'U';
  const isOwner = user.role === 'owner';
  const avatarUrl = user.avatar || user.image;

  const handleToggleStatus = () => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    updateStatus({ id: user.id, status: newStatus });
  };

  const handleToggleVerification = () => {
    const newState = user.verificationState === 'verified' ? 'rejected' : 'verified';
    updateVerification({ id: user.id, verificationState: newState });
  };

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
                {avatarUrl ? (
                  <img
                    className="border-primary/10 h-32 w-32 rounded-full border-4 object-cover"
                    data-alt="User profile portrait"
                    src={getImageUrl(avatarUrl)}
                  />
                ) : (
                  <div className="border-primary/10 h-32 w-32 rounded-full border-4 flex items-center justify-center bg-primary/10 text-primary text-3xl font-bold">
                    {avatarFallback}
                  </div>
                )}
                <div className={`absolute right-1 bottom-1 h-6 w-6 rounded-full border-4 border-white dark:border-zinc-900 ${user.status === 'active' ? 'bg-green-500' : 'bg-rose-500'}`}></div>
              </div>
              <div className="text-center md:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <h2 className="text-primary text-3xl font-extrabold">{fullName}</h2>
                  {user.verificationState === 'verified' && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <BadgeCheck className="mr-1" size={14} /> Verified User
                    </span>
                  )}
                  <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-bold capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="text-primary/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <span>
                      <CircleUserRound size={16} />
                    </span>
                    Status: <span className={`ml-0.5 font-bold ${user.status === 'active' ? 'text-green-600' : 'text-rose-600'} capitalize`}>{user.status}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[18px]">
                      <MailCheck size={16} />
                    </span>
                    Email: <span className="ml-0.5 font-bold capitalize">{user.email}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-3 lg:w-auto">
              {isOwner && (
                <Button
                  onClick={handleToggleVerification}
                  className={`${user.verificationState === 'verified' ? 'bg-amber-100/50 text-amber-700 hover:bg-amber-100 border-amber-200' : 'bg-emerald-100/50 text-emerald-700 hover:bg-emerald-100 border-emerald-200'} inline-flex flex-1 items-center justify-center rounded-lg border px-5 py-2.5 font-bold transition-all lg:flex-none`}
                >
                  {user.verificationState === 'verified' ? <><ShieldBan className="mr-2" size={18} /> Unverify</> : <><ShieldCheck className="mr-2" size={18} /> Verify Owner</>}
                </Button>
              )}
              <Button
                onClick={handleToggleStatus}
                className={`${user.status === 'active' ? 'bg-rose-100/50 text-rose-700 hover:bg-rose-100 border-rose-200' : 'bg-emerald-100/50 text-emerald-700 hover:bg-emerald-100 border-emerald-200'} inline-flex flex-1 items-center justify-center rounded-lg border px-5 py-2.5 font-bold transition-all lg:flex-none`}
              >
                {user.status === 'active' ? <><ShieldBan className="mr-2" size={18} /> Suspend</> : <><ShieldCheck className="mr-2" size={18} /> Reactivate</>}
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
