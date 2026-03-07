import { Button } from "@/components/ui/button";

const poiList = [
  { icon: "school", label: "ICS Addis", distance: "1.2km" },
  { icon: "local_mall", label: "Edna Mall", distance: "800m" },
];

export default function MapSection() {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-bold text-charcoal mb-4">Neighborhood</h3>
      <p className="text-soft-brown text-sm mb-6">
        Bole Atlas is one of Addis Ababa&apos;s most sought-after residential areas,
        known for its safety and proximity to amenities.
      </p>

      <div className="h-80 rounded-2xl overflow-hidden relative border border-soft-brown/10 shadow-sm">
        {/* Map Background */}
        <img
          className="w-full h-full object-cover opacity-80 grayscale-[0.3]"
          data-alt="Styled map view of Bole neighborhood"
          data-location="Addis Ababa, Ethiopia"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_bXjvZKiQElDksus0Yup_am4UKB-n3zO0epc5LvZaxqO_dPZi7-OMQbVcMEIrzuzJdc2_kFfAQd4_JGsbn7q00VZoE8ytal_OMOz_nH_Jl_rszR6doXXHVyBTiNtCCqYhGHTdaR4YvwKLUIAEkxXUXAzck-dlBkkSIeD3_D4D8xnxZeIvHU2PG6c724y-D12LhcCfuR4ug2mRQ4XtdYRMleRPtk-xSK0zQeAi-j4aVzV31-yUNGifUrbWAxL1yd9xsL2T6Db16W4"
          alt="Bole neighborhood map"
        />

        {/* Center Home Marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary text-white p-3 rounded-full shadow-xl ring-8 ring-primary/20">
            <span className="material-symbols-outlined">home</span>
          </div>
        </div>

        {/* POI Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          {poiList.map((poi) => (
            <div
              key={poi.label}
              className="bg-white/90 backdrop-blur p-2 rounded-lg text-[10px] font-bold shadow flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm text-soft-brown">
                {poi.icon}
              </span>
              {poi.label} ({poi.distance})
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}