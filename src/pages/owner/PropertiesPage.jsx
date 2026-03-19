import PropertiesHeader from "../components/properties/PropertiesHeader";
import PropertiesFilters from "../components/properties/PropertiesFilters";
import PropertyCard from "../components/properties/PropertyCard";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertiesPage() {
  const properties = [
    {
      id: 1,
      title: "Cozy 4-Bedroom Villa in Bole",
      location: "Bole, Addis Ababa",
      description:
        "Experience the true feeling of home in this spacious family villa with modern amenities.",
      status: "Available",
      updated: "2 days ago",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDcDXd96v8RU6uWLS41pohtDNmQyTc0Gwkn1a07wLa3AfBO7pb5ZMVxKoMv-4fNCAPAQ0s8SEBMROY-uDPxmYRSijLagtZ8TzBVRJf55r8SxoCEtYwEqpPKNc8xmFx7oMklvAtftl6ksckwpe8BOjXs8mFt8zyfUXY3ysHlwcFH0xCZU8oV7a6Sdo-49dOR_kC4FduIt0NoWPfkE2bkIWSsNGquaPSlsQQDbhUTlUFOFTVHWpOCU_71zdBmjhu4nQRU7Jd_tmRNj-w",
    },
    {
      id: 2,
      title: "Lakeside Family Retreat",
      location: "Bahir Dar",
      description:
        "Quiet and serene environment perfect for long-term stays near the lake.",
      status: "Occupied",
      updated: "1 week ago",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDW602esSWb1xtNWJc7e0JzfCzXhTSp3KLrAqJaRntbYn33wXnrLWdnhlF5hD4Eq_NDc-weKiGVozgwuIsy6jZOabpq4BYbpgoG2DIq5ARVk0ek3FQ-0kIgNQriUai5ke9PqofPk3tuknPb1sMT6OkDjFbktrWR2xWv9f9wJ6-Ig9kL9nNQnkhxRH3r9CTM2e7y2Z0__SoWJUduHCf1U1GgpRoiVmcY2SmO1o_ZlaRSscjZSkSnzM-gU2S9yw2dvdUtvYPDSmp_PSs",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <PropertiesHeader />

      <PropertiesFilters />

      <div className="space-y-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-between border-t pt-8">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Showing {properties.length} of {properties.length} Properties
        </p>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft size={16} />
          </Button>

          <Button size="icon">1</Button>

          <Button variant="outline" size="icon">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}