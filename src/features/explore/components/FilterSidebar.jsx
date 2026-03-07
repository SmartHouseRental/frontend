import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterSidebar() {
  return (
    <aside className="w-72 hidden xl:block sticky top-24 self-start h-[calc(100vh-120px)] overflow-y-auto pr-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Filters</h2>
          <button className="text-sm text-primary hover:underline">Clear All</button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">Sub-city Area</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Sub-cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bole">
                Bole (Bole Bulbula, Atlas)
              </SelectItem>

              <SelectItem value="oldairport">
                Old Airport
              </SelectItem>

              <SelectItem value="kazanchis">
                Kazanchis
              </SelectItem>

              <SelectItem value="cmc">
                CMC & Summit
              </SelectItem>
</SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">Monthly Budget</label>
          <Slider defaultValue={[20]} max={100} step={1} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">Bedrooms</label>
          <div className="flex gap-2">
            {["1", "2", "3", "4+"].map((bed) => (
              <Button key={bed} variant="outline" className="flex-1">
                {bed}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">Furnishing</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Checkbox defaultChecked />
              Fully Furnished
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              Unfurnished
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">Availability</label>
          <RadioGroup defaultValue="ready">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="ready" />
              Move-in Ready
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="30" />
              Next 30 Days
            </div>
          </RadioGroup>
        </div>

        <Button className="w-full">Show Results</Button>
      </div>
    </aside>
  );
}