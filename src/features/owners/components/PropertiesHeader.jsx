import { Button } from "@/components/ui/button";
import { HomePlus } from "lucide-react";
import { Link } from "react-router-dom"

export default function PropertiesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h2 className="text-4xl font-black mb-2">My Properties</h2>
        <p className="text-muted-foreground font-medium">
          Manage your family-oriented long-stay homes across Ethiopia.
        </p>
      </div>

      <Button
            asChild
            className="flex items-center gap-2 px-6 py-3 text-white bg-accent hover:bg-accent/90 rounded-xl shadow-lg"
            >
            <Link to="/owner/properties/new">
                <HomePlus size={18} />
                Add New Property
            </Link>
            </Button>
    </div>
  );
}