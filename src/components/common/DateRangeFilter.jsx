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
          className="flex items-center gap-2 px-4 py-1.5 border rounded-md text-xs transition bg-transparent border-black text-black hover:bg-transparent dark:bg-transparent dark:border-[#e6e6e6] dark:text-white dark:hover:bg-transparent"
        >
          <CalendarIcon size={15} />
          <span className="hidden md:inline">
            {hasDateRange ? "Date Filtered" : "Filter by Date"}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={6} className="w-auto p-4 min-w-70">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-foreground">Filter by Date Range</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
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
            className="rounded-md w-full border border-border"
          />

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                onClear();
                setIsOpen(false);
              }}
              className="flex-1 px-3 py-2 bg-transparent border border-border text-foreground hover:bg-muted rounded text-xs"
            >
              Clear
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}