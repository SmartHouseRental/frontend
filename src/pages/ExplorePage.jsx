import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterSidebar } from "@/features/explore/components/FilterSidebar";
import { PropertyGrid } from "@/features/explore/components/PropertyGrid";
import { SortBar } from "@/features/explore/components/SortBar";
import PropertyMap from "@/components/map/PropertyMap";
import { properties } from "@/lib/dummyData";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialView = searchParams.get("view") === "map" ? "map" : "grid";
  const [viewMode, setViewMode] = useState(initialView); // grid or map

  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "map" || view === "grid") {
      setViewMode(view);
    }
  }, [searchParams]);

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    setSearchParams(prev => {
      prev.set("view", mode);
      return prev;
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row gap-8">
      <div className={`${viewMode === 'map' ? 'hidden md:block' : ''}`}>
        <FilterSidebar />
      </div>

      <section className="flex-1 flex flex-col gap-6 min-w-0">
        <SortBar viewMode={viewMode} setViewMode={handleSetViewMode} />
        
        {viewMode === "grid" ? (
          <>
            <PropertyGrid />
            
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">1 - 5</span> of{" "}
                <span className="font-bold text-foreground">{properties.length}</span>
              </p>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors">‹</button>
                <button className="w-10 h-10 rounded-xl bg-primary text-white font-bold">1</button>
                <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors">2</button>
                <span className="px-2 text-muted-foreground">…</span>
                <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors">›</button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 h-[calc(100vh-280px)] min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border">
            <PropertyMap properties={properties} mode="full" />
          </div>
        )}
      </section>
    </main>
  );
}