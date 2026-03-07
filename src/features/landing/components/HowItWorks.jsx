import { Card, CardContent } from "@/components/ui/card"
import { Search, CalendarCheck, KeyRound } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "1. Search & Filter",
    desc: "Browse curated family-ready homes.",
  },
  {
    icon: CalendarCheck,
    title: "2. Schedule a Visit",
    desc: "Book a physical or virtual tour.",
  },
  {
    icon: KeyRound,
    title: "3. Move In Securely",
    desc: "Seamless contracts and secure handovers.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-muted/30 py-20 px-6 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 ethiopian-pattern" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl font-extrabold mb-16">
          The Journey to Your New Home
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <Card
                key={index}
                className="p-6 bg-card hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center text-center">
                  <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}