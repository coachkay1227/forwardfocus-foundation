import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SERVICE_TYPES = [
  "Housing",
  "Employment",
  "Legal",
  "Financial",
  "Health",
  "Education",
  "Family",
] as const;

export const COUNTIES = [
  "All Ohio",
  "Franklin",
  "Cuyahoga",
  "Hamilton",
  "Montgomery",
  "Lucas",
] as const;

export type QuickFilter = "all" | "emergency" | "ongoing" | "new" | "partner";

interface Props {
  county: string;
  setCounty: Dispatch<SetStateAction<string>>;
  types: string[];
  setTypes: Dispatch<SetStateAction<string[]>>;
  quick: QuickFilter;
  setQuick: Dispatch<SetStateAction<QuickFilter>>;
}

const SearchFilters = ({ county, setCounty, types, setTypes, quick, setQuick }: Props) => {
  const toggleType = (t: string) => {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  return (
    <div className="mt-4 grid gap-4">
      {/* Quick chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "All" },
          { key: "emergency", label: "Emergency" },
          { key: "ongoing", label: "Ongoing Support" },
          { key: "new", label: "New Resources" },
          { key: "partner", label: "Partner Recommended" },
        ].map((c) => (
          <Button
            key={c.key}
            variant={quick === (c.key as QuickFilter) ? "secondary" : "outline"}
            size="sm"
            onClick={() => setQuick(c.key as QuickFilter)}
          >
            {c.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* County */}
        <div>
          <Label className="mb-2 block">Location</Label>
          <Select value={county} onValueChange={setCounty}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-popover">
              {COUNTIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Service types */}
        <div>
          <Label className="mb-2 block">Service Types</Label>
          <div className="flex flex-wrap gap-3">
            {SERVICE_TYPES.map((t) => (
              <label key={t} className="inline-flex items-center gap-2 text-sm">
                <Checkbox checked={types.includes(t)} onCheckedChange={() => toggleType(t)} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
