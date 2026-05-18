import { useState } from 'react';
import { AlertTriangle, FileCheck, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';

const stateConfig = {
  pending_documents: {
    message: 'You need to upload verification documents before you can list properties.',
    bg: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: FileCheck,
    iconColor: 'text-blue-500',
    link: '/owner/profile',
    linkLabel: 'Upload Documents',
    tab: 'verification',
  },
  rejected: {
    message:
      'Your verification documents were rejected. Please re-upload with corrected information.',
    bg: 'bg-rose-50 border-rose-200 text-rose-800',
    icon: AlertTriangle,
    iconColor: 'text-rose-500',
    link: '/owner/profile',
    linkLabel: 'Re-Upload',
    tab: 'verification',
  },
};

function VerificationBanner({ verificationState = 'pending_documents' }) {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  if (verificationState === 'verified' || dismissed) return null;

  const goToTab = (linkTo) => {
    navigate(linkTo);
  };

  const config = stateConfig[verificationState];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${config.bg} animate-in fade-in-0 slide-in-from-top-2 duration-300`}
    >
      <Icon size={18} className={`shrink-0 ${config.iconColor}`} />
      <p className="flex-1 text-sm font-medium">{config.message}</p>
      {config.link && (
        <Button
          onClick={() => goToTab(`${config.link}/${config.tab && `?tab=${config.tab}`}`)}
          size="sm"
          variant="outline"
          className="h-7 gap-1 border-current/20 text-xs"
        >
          {config.linkLabel} <ArrowRight size={12} />
        </Button>
      )}
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded-full p-1 transition-colors hover:bg-black/5"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default VerificationBanner;
