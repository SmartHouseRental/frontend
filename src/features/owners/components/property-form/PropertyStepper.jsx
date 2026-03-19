export default function PropertyStepper() {
  const steps = ["Basic Info", "Location", "Amenities", "Media"]

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center relative">

        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10"></div>
        <div className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 w-1/4"></div>

        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
              ${i === 0
                ? "bg-primary text-white"
                : "border border-border text-muted-foreground bg-background"
              }`}
            >
              {i + 1}
            </div>

            <span
              className={`text-xs font-semibold
              ${i === 0 ? "text-primary" : "text-muted-foreground"}
              `}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}