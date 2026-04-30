import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function OwnerCard({ property }) {
  const navigate = useNavigate();
  const ownerId = 'o1';
  return (
    <section className="bg-card mb-12 flex items-start gap-6 rounded-2xl border p-6">
      <div
        className="group relative cursor-pointer"
        onClick={() => navigate(`/profile/${ownerId}`)}
      >
        <div className="border-primary/10 group-hover:border-primary h-20 w-20 overflow-hidden rounded-full border-4 transition-colors">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKUNmYZa3cAR7cPzEVNfndCK3IeIUhYwur4TxVkgtxBdXiI_KQfY0cpVGsNOR3yTwuEht6DGWuvb4oK1xo3d44cEIy3DaSWGLi0Lbwg0GYeopxXvDwGgj5StQQcdfUYqL-ZhwQZgKTWx6z5rgr07URND9CIEsrVtj1a-HzLQbQMf-rfkKvlxXkQxfCYFYItW7p-X_uhvrn0lznQBbrTwWr8FHcG79TWdQ"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-green-500 p-1 text-white">
          <CheckCircle className="h-3 w-3" />
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <h3
            className="hover:text-primary cursor-pointer text-xl font-bold transition-colors"
            onClick={() => navigate(`/profile/${ownerId}`)}
          >
            Meet your host, {property?.ownerName || 'Dawit'}
          </h3>
          <Badge variant="secondary">Verified Owner</Badge>
        </div>

        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          "I've lived in the area for 20 years and love hosting families. I believe in providing a
          home that offers peace and privacy. I'm always available to help you settle in."
        </p>

        <div className="flex items-center gap-6 text-sm font-semibold">
          <div className="flex items-center gap-1">
            <Star className="text-primary h-4 w-4" />
            4.9 (42 Reviews)
          </div>

          <div className="flex items-center gap-1">
            <CheckCircle className="text-primary h-4 w-4" />5 years hosting
          </div>
        </div>
      </div>
    </section>
  );
}
