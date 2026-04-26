export default function PropertyPanel() {
  return (
    <aside className="hidden xl:flex w-72 flex-col border-l border-border bg-card">
      
      <div className="p-6 flex flex-col gap-6">
        
        {/* Property */}
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">
            The Property
          </h4>

          <div className="rounded-xl bg-muted h-40 mb-3" />

          <h3 className="font-bold">Bole Modern Apartment</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Addis Ababa, Bole
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-muted p-2 rounded-lg">
              <span className="text-xs text-muted-foreground">
                Rent
              </span>
              <p className="font-bold">45,000 ETB</p>
            </div>

            <div className="bg-muted p-2 rounded-lg">
              <span className="text-xs text-muted-foreground">
                Rooms
              </span>
              <p className="font-bold">3</p>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-xl mb-2">
            Schedule Visit
          </button>

          <button className="w-full border border-primary text-primary py-3 rounded-xl">
            Review Agreement
          </button>
        </div>

        {/* Location */}
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">
            Location
          </h4>

          <div className="h-32 bg-muted rounded-xl mb-2" />

          <p className="text-xs text-muted-foreground text-center">
            Near Bole Medhanialem
          </p>
        </div>
      </div>
    </aside>
  );
}