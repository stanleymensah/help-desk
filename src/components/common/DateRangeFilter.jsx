import { useState } from "react";
import { HiCalendar, HiX } from "react-icons/hi";

export default function DateRangeFilter({ startDate, endDate, onStartChange, onEndChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasDateRange = startDate || endDate;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs transition ${
          hasDateRange 
            ? "border-primary bg-primary/10 text-primary" 
            : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        <HiCalendar size={18} />
        <span className="hidden md:inline">
          {hasDateRange ? "Date Filtered" : "Filter by Date"}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full mt-1 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-4 min-w-[280px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold">Filter by Date Range</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiX size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {/* Start Date */}
              <div>
                <label className="block text-xs font-semibold mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => onStartChange(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-xs font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => onEndChange(e.target.value ? new Date(e.target.value) : null)}
                  min={startDate ? startDate.toISOString().split('T')[0] : ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {/* Actions */}
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
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-3 py-2 bg-primary text-white hover:bg-primary/90 rounded text-xs"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}