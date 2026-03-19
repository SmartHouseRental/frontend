import PropertyStepper from "@/features/owners/components/property-form/PropertyStepper"
import BasicInfoSection from "@/features/owners/components/property-form/BasicInfoSection"
import LocationSection from "@/features/owners/components/property-form/LocationSection"
import AmenitiesSection from "@/features/owners/components/property-form/AmenitiesSection"
import MediaSection from "@/features/owners/components/property-form/MediaSection"

import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"

export default function AddPropertyPage() {
  return (
    <div className="max-w-5xl mx-auto pb-32 space-y-8">

      <PropertyStepper />

      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Add New Property
        </h2>
        <p className="text-muted-foreground text-lg">
          Tell us about your home. We'll help you find the perfect family.
        </p>
      </div>

      <BasicInfoSection />
      <LocationSection />
      <AmenitiesSection />
      <MediaSection />

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 shadow z-50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm italic text-muted-foreground">
            "A house is made of bricks, a home is made of memories."
          </p>

          <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              Save as Draft
            </Button>

            <Button className="flex gap-2 flex-1 sm:flex-none">
              Publish Property
              <Rocket size={16} />
            </Button>
          </div>

        </div>
      </div>

    </div>
  )
}