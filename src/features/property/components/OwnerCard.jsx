import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function OwnerCard({ property }) {
  const navigate = useNavigate();
  const ownerId = "o1";
  return (
    <section className="bg-card p-6 rounded-2xl border mb-12 flex items-start gap-6">

      <div className="relative group cursor-pointer" onClick={() => navigate(`/profile/${ownerId}`)}>
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary transition-colors">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKUNmYZa3cAR7cPzEVNfndCK3IeIUhYwur4TxVkgtxBdXiI_KQfY0cpVGsNOR3yTwuEht6DGWuvb4oK1xo3d44cEIy3DaSWGLi0Lbwg0GYeopxXvDwGgj5StQQcdfUYqL-ZhwQZgKTWx6z5rgr07URND9CIEsrVtj1a-HzLQbQMf-rfkKvlxXkQxfCYFYItW7p-X_uhvrn0lznQBbrTwWr8FHcG79TWdQ"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-white">
          <CheckCircle className="w-3 h-3" />
        </div>
      </div>

      <div className="flex-1">

        <div className="flex items-center justify-between mb-2">
          <h3 
            className="text-xl font-bold hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate(`/profile/${ownerId}`)}
          >
            Meet your host, {property?.ownerName || "Dawit"}
          </h3>
          <Badge variant="secondary">Verified Owner</Badge>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          "I've lived in the area for 20 years and love hosting families. I believe in providing a home
          that offers peace and privacy. I'm always available to help you settle in."
        </p>

        <div className="flex items-center gap-6 text-sm font-semibold">

          <div className="flex items-center gap-1">
            <Star className="text-primary w-4 h-4" />
            4.9 (42 Reviews)
          </div>

          <div className="flex items-center gap-1">
            <CheckCircle className="text-primary w-4 h-4" />
            5 years hosting
          </div>

        </div>

      </div>

    </section>
  )
}