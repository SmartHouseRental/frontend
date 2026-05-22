import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ReportModal from '@/features/reports/components/ReportModal';
import ReportOwnerButton from '@/features/reports/components/ReportOwnerButton';
import ProfileSectionToggle from '@/features/users/components/ProfileSectionToggle';
import OwnerListingRow from '@/features/users/components/OwnerListingRow';
import OwnerReviewCard from '@/features/users/components/OwnerReviewCard';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useOwnerProfile } from '@/features/users/hooks/useOwnerProfile';
import { getUserApiErrorMessage } from '@/features/users/utils/apiErrors';
import {
  canRenterReportOwner,
  isReportableHostProfile,
} from '@/features/reports/utils/reportAccess';
import {
  Calendar,
  MapPin,
  Loader2,
  AlertCircle,
} from 'lucide-react';

function ProfileSkeleton() {
  return (
    <div className="min-h-screen pb-20 animate-pulse">
      <div className="bg-primary/80 h-64" />
      <div className="mx-auto -mt-16 max-w-4xl px-6 space-y-6">
        <div className="h-16 rounded-3xl bg-muted" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-40 rounded-3xl bg-muted" />
          <div className="h-40 rounded-3xl bg-muted" />
        </div>
        <div className="h-16 rounded-3xl bg-muted" />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser } = useAuth();
  const [reportModal, setReportModal] = useState(null);
  const [listingsOpen, setListingsOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const profileFromState = location.state?.profileUser;
  const {
    data: ownerProfile,
    isLoading,
    isError,
    error,
    refetch,
  } = useOwnerProfile(routeId);

  const profileId = routeId;
  const owner = ownerProfile?.owner;
  const listings = ownerProfile?.listings ?? [];
  const reviews = ownerProfile?.reviews ?? [];

  const displayName =
    owner?.name || profileFromState?.name || (routeId ? 'Host' : 'User');

  const isHostProfile = isReportableHostProfile({
    routeId,
    matchedUser: null,
    profileFromState: profileFromState || (owner ? { role: 'owner' } : null),
  });

  /** Profile is public; report still requires renter login at submit time */
  const showOwnerReport =
    isHostProfile && canRenterReportOwner(authUser, profileId);

  const openReportModal = ({ targetType, targetId, subjectName }) => {
    setReportModal({ targetType, targetId, subjectName });
  };

  if (!routeId) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-muted-foreground">
          Open an owner profile from a property listing or chat conversation.
        </p>
        <Button onClick={() => navigate('/explore')}>Browse properties</Button>
      </div>
    );
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="bg-destructive/10 rounded-full p-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-xl font-bold">Could not load profile</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          {getUserApiErrorMessage(error, 'Failed to load owner profile.')}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <AlertCircle className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">Owner profile not found.</p>
      </div>
    );
  }

  const avatarSrc = owner?.avatar || profileFromState?.avatar;
  const locationLabel = owner?.location || 'Addis Ababa, ET';
  const joinedLabel = owner?.joinedDate
    ? new Date(owner.joinedDate).toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    : null;
  const ratingAverage = owner?.rating?.average ?? 0;
  const reviewCount = owner?.rating?.reviewCount ?? reviews.length;
  const idVerified = owner?.verification?.idVerified;
  const phoneVerified = owner?.verification?.phoneVerified;
  const propertiesManaged = owner?.propertiesManaged ?? listings.length;

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-primary px-6 pt-16 pb-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-white md:flex-row">
          <Avatar className="size-32 border-4 border-white/20 shadow-2xl">
            {avatarSrc ? <AvatarImage src={avatarSrc} alt={displayName} /> : null}
            <AvatarFallback className="text-primary bg-white text-4xl font-bold">
              {displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <div className="mb-2 flex flex-col items-center gap-3 md:flex-row md:flex-wrap">
              <h1 className="text-4xl font-extrabold">{displayName}</h1>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-widest uppercase">
                {owner?.role?.toLowerCase() || profileFromState?.role || 'owner'}
              </span>
              {showOwnerReport && (
                <ReportOwnerButton
                  ownerId={profileId}
                  ownerName={displayName}
                  onOpenReport={openReportModal}
                  variant="header"
                />
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80 md:justify-start">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                {locationLabel}
              </div>
              {joinedLabel && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  Joined {joinedLabel}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-16 max-w-4xl px-6 space-y-6">
        {/* House Listings — above ratings & verification */}
        <ProfileSectionToggle
          title="House Listings"
          subtitle={`Properties listed by ${displayName.split(' ')[0]}`}
          count={listings.length}
          isOpen={listingsOpen}
          onToggle={() => setListingsOpen((open) => !open)}
        >
          {listings.length === 0 ? (
            <p className="pt-4 text-sm italic text-muted-foreground">
              No active listings at the moment.
            </p>
          ) : (
            <div className="space-y-3 pt-4">
              {listings.map((listing) => (
                <OwnerListingRow key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </ProfileSectionToggle>

        {/* Ratings & Verification */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden rounded-3xl border-none shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-muted-foreground mb-4 text-xs font-bold tracking-wider uppercase">
                Verification
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">ID Verified</span>
                  <span
                    className={`font-bold ${idVerified ? 'text-green-600' : 'text-muted-foreground'}`}
                  >
                    {idVerified ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Phone Verified</span>
                  <span
                    className={`font-bold ${phoneVerified ? 'text-green-600' : 'text-muted-foreground'}`}
                  >
                    {phoneVerified ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Properties Managed</span>
                  <span className="font-bold">{propertiesManaged}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="from-primary to-primary/80 overflow-hidden rounded-3xl border-none bg-gradient-to-br text-white shadow-xl">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
                {reviewCount > 0 ? Number(ratingAverage).toFixed(1) : '0'}
              </div>
              <h3 className="mb-1 font-bold">Average Rating</h3>
              <p className="text-xs text-white/70">
                Based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Reviews — below ratings */}
        <ProfileSectionToggle
          title="User Reviews"
          subtitle="Feedback from renters"
          count={reviews.length}
          isOpen={reviewsOpen}
          onToggle={() => setReviewsOpen((open) => !open)}
        >
          {reviews.length === 0 ? (
            <p className="pt-4 text-sm italic text-muted-foreground">No reviews yet.</p>
          ) : (
            <div className="space-y-4 pt-4">
              {reviews.map((review) => (
                <OwnerReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </ProfileSectionToggle>
      </div>

      <div className="ethiopian-pattern pointer-events-none fixed inset-0 -z-10" />

      {reportModal && (
        <ReportModal
          isOpen
          onClose={() => setReportModal(null)}
          targetType={reportModal.targetType}
          targetId={reportModal.targetId}
          subjectName={reportModal.subjectName}
        />
      )}
    </div>
  );
}
