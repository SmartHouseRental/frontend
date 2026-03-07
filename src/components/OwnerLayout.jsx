import OwnerSidebar from "@/features/owners/components/OwnerSidebar";
import OwnerHeader from "@/features/owners/components/OwnerHeader";
import { Outlet } from "react-router";

export default function OwnerLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col">
        <OwnerHeader />
        <main className="flex-1 p-6 bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}