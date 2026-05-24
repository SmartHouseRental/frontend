import { House, Calendar, Star, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getUserStatusMeta, getVerificationStateMeta } from '@/features/admin/mappers';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function OverviewTab({ user }) {
  if (!user) return null;

  const statusMeta = getUserStatusMeta(user.status);
  const verificationMeta = getVerificationStateMeta(user.verificationState);
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email;

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <House />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">Role</span>
          </div>
          <h3 className="text-primary text-3xl font-black capitalize">{user.role || '—'}</h3>
          <p className="text-primary/60 text-sm font-medium">Platform role</p>
        </Card>
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <Calendar />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">Account</span>
          </div>
          <h3 className="text-primary text-2xl font-black">{statusMeta.label}</h3>
          <p className="text-primary/60 text-sm font-medium">Member since {formatDate(user.createdAt)}</p>
        </Card>
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-lg bg-yellow-400/10 p-2 text-yellow-600">
              <Star />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">Verification</span>
          </div>
          <h3 className="text-primary text-2xl font-black">{verificationMeta.label}</h3>
          <p className="text-primary/60 text-sm font-medium">
            Email {user.emailVerified ? 'verified' : 'not verified'}
          </p>
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
              Full Name
            </label>
            <p className="text-primary font-bold">{fullName}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Email Address
            </label>
            <p className="text-primary font-bold">{user.email || '—'}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Phone Number
            </label>
            <p className="text-primary font-bold">{user.phone || '—'}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              User ID
            </label>
            <p className="text-primary font-mono text-sm font-bold">{user.id}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Registration Date
            </label>
            <p className="text-primary font-bold">{formatDate(user.createdAt)}</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Last Updated
            </label>
            <p className="text-primary font-bold">{formatDate(user.updatedAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OverviewTab;
