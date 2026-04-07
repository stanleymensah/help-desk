import { useState } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DateRangeFilter({ startDate, endDate, onStartChange, onEndChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasDateRange = startDate || endDate;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center gap-2 px-4 py-1.5 border rounded-md text-xs transition ${
            hasDateRange
              ? "border-primary bg-primary/10 text-primary"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          <CalendarIcon size={15} />
          <span className="hidden md:inline">
            {hasDateRange ? "Date Filtered" : "Filter by Date"}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={6} className="w-auto p-4 min-w-[280px]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold">Filter by Date Range</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-1">
          <Calendar
            mode="range"
            selected={{ from: startDate ?? undefined, to: endDate ?? undefined }}
            onSelect={(range) => {
              onStartChange(range?.from ?? null);
              onEndChange(range?.to ?? null);
            }}
            numberOfMonths={1}
            // captionLayout="dropdown"
            className="rounded-md w-full border border-gray-200"
          />

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                onClear();
                setIsOpen(false);
              }}
              className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-xs"
            >
              Clear
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}