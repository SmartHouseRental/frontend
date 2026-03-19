import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MediaSection() {
  return (
    <section className="bg-card border rounded-xl p-8 space-y-6">

      <h3 className="text-xl font-bold">Photos & Videos</h3>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="md:col-span-2 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center">
          <Upload size={36} className="text-muted-foreground" />

          <div>
            <p className="font-semibold">Drag photos here</p>
            <p className="text-xs text-muted-foreground">
              JPEG or PNG up to 10MB
            </p>
          </div>

          <Button variant="secondary">Upload Files</Button>
        </div>

      </div>

    </section>
  )
}