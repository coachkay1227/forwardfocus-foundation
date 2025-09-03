import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const ALL_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

interface StateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: string;
  onStateChange: (state: string) => void;
}

const StateModal = ({ isOpen, onClose, currentState, onStateChange }: StateModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState(currentState);

  const filteredStates = ALL_STATES.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    onStateChange(selectedState);
    onClose();
  };

  const handleClose = () => {
    setSelectedState(currentState); // Reset to original state
    setSearchQuery("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[600px]" aria-describedby="state-modal-description">
        <DialogHeader>
          <DialogTitle>Choose your state</DialogTitle>
          <DialogDescription id="state-modal-description">
            Select your state to see relevant resources and information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search states"
            />
          </div>

          {/* State list */}
          <div className="max-h-[300px] overflow-y-auto">
            <RadioGroup value={selectedState} onValueChange={setSelectedState}>
              <div className="grid grid-cols-2 gap-2">
                {filteredStates.map((state) => (
                  <div key={state} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={state}
                      id={state}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={state}
                      className="flex-1 cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-muted peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
                    >
                      {state}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedState}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StateModal;