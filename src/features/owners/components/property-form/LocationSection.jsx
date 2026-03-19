import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LocationSection() {
  return (
    <section className="bg-card border rounded-xl p-8 space-y-6">

      <h3 className="text-xl font-bold">Location Details</h3>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="space-y-2">
          <Label>City</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="addis">Addis Ababa</SelectItem>
              <SelectItem value="bishoftu">Bishoftu</SelectItem>
              <SelectItem value="hawassa">Hawassa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sub City</Label>
          <Input placeholder="Bole" />
        </div>

        <div className="space-y-2">
          <Label>Street Address</Label>
          <Input placeholder="Near Medhanialem Church" />
        </div>

      </div>

      <div className="h-[300px] rounded-xl overflow-hidden border bg-muted flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Map Integration (Flutter map / Google Maps here)
        </p>
      </div>

    </section>
  )
}