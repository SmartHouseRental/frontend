import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function BasicInfoSection() {
  return (
    <section className="bg-muted/40 border rounded-xl p-8 space-y-6">

      <h3 className="text-xl font-bold">Basic Information</h3>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <Label>Property Title</Label>
          <Input placeholder="Spacious 4-Bedroom Villa in Bole" />
        </div>

        <div className="space-y-2">
          <Label>Monthly Rent (ETB)</Label>
          <Input type="number" placeholder="45000" />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label>Description</Label>
          <Textarea
            rows={4}
            placeholder="Describe the home, neighborhood and environment..."
          />
        </div>

      </div>

    </section>
  )
}