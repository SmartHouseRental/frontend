import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MessageCircle } from "lucide-react"

export default function BookingCard() {
  return (
    <div className="sticky top-28">

      <Card className="p-6 shadow-xl">

        <CardContent className="p-0">

          <div className="flex justify-between mb-6">

            <div>
              <span className="text-3xl font-extrabold text-primary">
                45,000 ETB
              </span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="text-primary w-4 h-4"/>
              4.9
            </div>

          </div>

          <Button className="w-full mb-3">
            Schedule a Visit
          </Button>

          <Button variant="outline" className="w-full gap-2">
            <MessageCircle size={16}/>
            Chat with Owner
          </Button>

        </CardContent>

      </Card>

    </div>
  )
}