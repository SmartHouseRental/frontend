import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

function resolveOwner(property) {
  const raw = property?.owner;
  if (raw && typeof raw === 'object') {
    return {
      id: raw.id,
      first_name: raw.first_name,
      last_name: raw.last_name,
      email: raw.email,
      image: raw.image,
    };
  }
  if (typeof raw === 'string' && raw.length > 0) {
    return { id: raw };
  }
  if (typeof property?.ownerId === 'string' && property.ownerId.length > 0) {
    return { id: property.ownerId };
  }
  return {};
}

export default function OwnerCard({ property }) {
  const navigate = useNavigate();
  const owner = resolveOwner(property);
  const ownerId = owner.id;

  const ownerName = owner.first_name
    ? `${owner.first_name}${owner.last_name ? ` ${owner.last_name}` : ''}`
    : 'Host';

  const avatarSrc =
    owner.image ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(ownerName)}`;

  const openProfile = () => {
    if (!ownerId) return;
    navigate(`/profile/${ownerId}`, {
      state: { profileUser: { name: ownerName, role: 'owner' } },
    });
  };

  return (
    <section className="bg-card mb-12 flex items-start gap-6 rounded-2xl border p-6">
      <div
        className={`group relative ${ownerId ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={openProfile}
        onKeyDown={(e) => e.key === 'Enter' && openProfile()}
        role={ownerId ? 'button' : undefined}
        tabIndex={ownerId ? 0 : undefined}
      >
        <div className="border-primary/10 group-hover:border-primary h-20 w-20 overflow-hidden rounded-full border-4 transition-colors">
          <img
            src={avatarSrc}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            alt={ownerName}
          />
        </div>

        <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-green-500 p-1 text-white">
          <CheckCircle className="h-3 w-3" />
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <h3
            className={`text-xl font-bold transition-colors ${ownerId ? 'hover:text-primary cursor-pointer' : ''}`}
            onClick={openProfile}
          >
            Meet your host, {ownerName}
          </h3>
          <Badge variant="secondary">Verified Owner</Badge>
        </div>

        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {owner.email
            ? `Hosted by ${ownerName} on our platform. I believe in providing a home that offers peace and privacy. Always available to help you settle in.`
            : 'A verified property owner on our platform. Always available to help you settle in.'}
        </p>

        <div className="flex items-center gap-6 text-sm font-semibold">
          <div className="flex items-center gap-1">
            <Star className="text-primary h-4 w-4" />
            {property?.isVerified ? '5.0 (Verified)' : 'New Host'}
          </div>

          <div className="flex items-center gap-1">
            <CheckCircle className="text-primary h-4 w-4" />
            Verified Owner
          </div>
        </div>
      </div>
    </section>
  );
}
