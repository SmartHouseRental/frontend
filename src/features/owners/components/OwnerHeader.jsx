import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function OwnerHeader() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-card border-b border-border">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome home, Dawit
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage your properties and family guests in Addis Ababa
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-muted-foreground" />
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">Dawit Tadesse</p>
            <p className="text-muted-foreground text-xs">Premium Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}