import { Heart, Star } from "lucide-react";

export function PropertyCard(props) {
  return (
    <div className="group rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition">
      <div className="relative h-64">
        {props.badge && (
          <span className="absolute top-4 left-4 bg-white/90 text-primary text-xs px-3 py-1 rounded-full">
            {props.badge}
          </span>
        )}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Heart className="text-white group-hover:text-red-500" />
        </button>
        <img
          src={props.image}
          alt={props.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold">{props.title}</h3>
            <p className="text-sm text-muted-foreground">{props.location}</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">{props.price}</span>
            <span className="text-xs text-muted-foreground">/ month</span>
          </div>
        </div>

        <div className="flex items-center gap-4 py-3 border-y my-3 text-xs">
          <span>{props.beds} Beds</span>
          <span>{props.baths} Baths</span>
          <span>{props.size}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(parseFloat(props.rating))
                    ? "text-primary h-4 w-4"
                    : "text-muted h-4 w-4"
                }
              />
            ))}
            <span className="text-xs ml-1">({props.rating})</span>
          </div>
          <span className="text-xs font-bold text-green-600">{props.status}</span>
        </div>
      </div>
    </div>
  );
}