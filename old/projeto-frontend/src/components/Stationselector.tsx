import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface StationSelectorProps {
  selectedStation: string;
  onStationChange: (value: string) => void;
  className?: string;
  showFullWidth?: boolean;
}

const StationSelector: React.FC<StationSelectorProps> = ({
  selectedStation,
  onStationChange,
  className,
  showFullWidth = false,
}) => {
  return (
    <div className="flex flex-row p-2 rounded-2xl shadow-xl border-gray-500 shadow-zinc-500/50">
    <ToggleGroup
      type="single"
      value={selectedStation}
      onValueChange={(value) => {
        if (value) onStationChange(value);
      }}
      className={className}
    >
      <ToggleGroupItem
        className={showFullWidth ? "flex-1" : ""}
        value="estacao1"
        aria-label="Estação 1"
      >
        Estação 1
      </ToggleGroupItem>
      <ToggleGroupItem
        className={showFullWidth ? "flex-1" : ""}
        value="estacao2"
        aria-label="Estação 2"
      >
        Estação 2
      </ToggleGroupItem>
      <ToggleGroupItem
        className={showFullWidth ? "flex-1" : ""}
        value="estacao3"
        aria-label="Estação 3"
      >
        Estação 3
      </ToggleGroupItem>
    </ToggleGroup>
    </div>
  );
};

export default StationSelector;
