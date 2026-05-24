import { useNavigate } from 'react-router';
import { Flag } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { canRenterReportOwner } from '../utils/reportAccess';

/**
 * Report trigger for owner profiles (renters + guests only).
 */
export default function ReportOwnerButton({
  ownerId,
  ownerName,
  onOpenReport,
  variant = 'default',
  className = '',
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!canRenterReportOwner(user, ownerId)) {
    return null;
  }

  const isRenter = user?.role?.toLowerCase() === 'renter';

  const handleClick = () => {
    if (!user || !isRenter) {
      navigate('/login', { state: { from: { pathname: `/profile/${ownerId}` } } });
      return;
    }
    onOpenReport?.({ targetType: 'user', targetId: ownerId, subjectName: ownerName });
  };

  const variantClasses = {
    header:
      'text-sm font-medium text-white/95 underline-offset-4 hover:underline hover:text-white',
    card:
      'w-full justify-center rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10',
    default:
      'text-sm font-medium text-muted-foreground hover:text-destructive',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 transition-colors ${variantClasses[variant] || variantClasses.default} ${className}`}
    >
      <Flag size={variant === 'card' ? 16 : 14} />
      Report owner
    </button>
  );
}
