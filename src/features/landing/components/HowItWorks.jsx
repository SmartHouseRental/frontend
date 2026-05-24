import { Card, CardContent } from "@/components/ui/card"
import { Search, CalendarCheck, KeyRound } from "lucide-react"
import { useTranslation } from 'react-i18next';

const steps = [
  { icon: Search, titleKey: 'landing.howItWorks.step1.title', descKey: 'landing.howItWorks.step1.desc' },
  { icon: CalendarCheck, titleKey: 'landing.howItWorks.step2.title', descKey: 'landing.howItWorks.step2.desc' },
  { icon: KeyRound, titleKey: 'landing.howItWorks.step3.title', descKey: 'landing.howItWorks.step3.desc' },
]

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="bg-muted/30 py-20 px-6 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 ethiopian-pattern" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl font-extrabold mb-16">
          {t('landing.howItWorks.title')}
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
                    {t(step.titleKey)}
                  </h3>

                  <p className="text-muted-foreground">
                    {t(step.descKey)}
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