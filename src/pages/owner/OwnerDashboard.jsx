import StatsCard from "@/features/owners/components/StatsCard";
import PropertyCard from "@/features/owners/components/PropertyCard";

export default function OwnerDashboard() {
  return (
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatsCard title="Total Views" value="1,240" change="+12%" />
        <StatsCard title="Active Inquiries" value="18" change="+5%" />
        <StatsCard title="Scheduled Visits" value="5" change="-2%" />
        <StatsCard title="Monthly Earnings" value="ETB 62.5k" change="+8%" />
      </div>

      {/* Listings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Active Listings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <PropertyCard
            title="Bole Family Villa"
            location="Addis Ababa, Bole"
            image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          />

          <PropertyCard
            title="Old Airport Residency"
            location="Addis Ababa, Old Airport"
            image="https://images.unsplash.com/photo-1572120360610-d971b9b78825"
          />
        </div>
      </div>
    </div>
  );
}