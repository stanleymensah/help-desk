import { useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

export default function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
  ];

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel =
    sortOptions.find((opt) => opt.value === value)?.label || "Sort by";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex rounded-full items-center gap-2 p-2 md:px-4 md:py-2 cursor-pointer border border-muted md:rounded-lg bg-white hover:bg-muted/20 text-xs"
      >
        
        <ArrowUpDown size={18} className="md:hidden" />
        <span className="hidden md:inline">{selectedLabel}</span>
        <ChevronDown
          className={`hidden md:block transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

          {/* Dropdown */}
          <div className="absolute top-full mt-1 right-0 bg-white border-mute rounded-lg shadow-lg z-20 min-w-[200px]">
            {sortOptions.map((option) => (
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
