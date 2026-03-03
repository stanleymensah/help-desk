import { useState } from "react";
import { HiMiniChevronDown } from "react-icons/hi2";
import { RxMixerHorizontal } from "react-icons/rx";

export default function FilterDropdown({value, onChange}) {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
    { label: "Resolved", value: "resolved" },
    {label: "In Progress", value: "in-progress" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = filterOptions.find((option) => option.value === value)?.label || "Filter by";

  return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 cursor-pointer border border-muted rounded-lg bg-white hover:bg-muted/20 text-xs"
        >
          
          <RxMixerHorizontal size={18} className="md:hidden" />
          <span className="hidden md:inline">{selectedLabel}</span>
          <HiMiniChevronDown
            className={`hidden md:block transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
  
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="inset-0 z-10" onClick={() => setIsOpen(false)}></div>
  
            {/* Dropdown */}
            <div className="absolute top-full mt-1 right-0 bg-white border-mute rounded-lg shadow-lg z-20 min-w-[200px]">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                    value === option.value
                      ? "bg-primary/10 text-primary font-semibold"
                      : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
}
