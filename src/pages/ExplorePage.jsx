import { FilterSidebar } from "@/features/explore/components/FilterSidebar";
import { PropertyGrid } from "@/features/explore/components/PropertyGrid";
import { SortBar } from "@/features/explore/components/SortBar";

export default function Explore() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex gap-8">
      <FilterSidebar />

      <section className="flex-1 flex flex-col gap-6">
        <SortBar />
        <PropertyGrid />

        {/* Pagination (now inside page, not separate component) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">1 - 12</span> of{" "}
            <span className="font-bold text-foreground">248</span>
          </p>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl border">‹</button>
            <button className="w-10 h-10 rounded-xl bg-primary text-white">1</button>
            <button className="w-10 h-10 rounded-xl border">2</button>
            <button className="w-10 h-10 rounded-xl border">3</button>
            <span className="px-2 text-muted-foreground">…</span>
            <button className="w-10 h-10 rounded-xl border">21</button>
            <button className="w-10 h-10 rounded-xl border">›</button>
          </div>
        </div>
      </section>
    </main>
  );
}