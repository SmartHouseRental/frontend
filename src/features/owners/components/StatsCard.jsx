import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({ title, value, change }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5 space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">{value}</h2>
          <span
            className={`text-sm ${
              change.includes("+")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}