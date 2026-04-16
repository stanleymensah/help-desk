import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

// eslint-disable-next-line no-unused-vars
export default function FilterDropdown({ value, onChange, users = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Open", value: "open" },
    { label: "Assigned", value: "assigned" },
    { label: "In Progress", value: "in-progress" },
    { label: "Resolved", value: "resolved" },
    { label: "Closed", value: "closed" },
    { label: "Reopened", value: "reopened" },
  ];

  const priorityOptions = [
    { label: "All Priority", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  // const assigneeOptions = [
  //   { label: "All Users", value: "all" },
  //   ...users.map((user) => ({
  //     label: user,
  //     value: user,
  //   })),
  // ];

  const handleSelect = (key, optionValue) => {
    onChange({
      ...value,
      [key]: optionValue,
    });
  };

  const selectedLabel =
    value.status === "all" && value.priority === "all" && value.assignee === "all"
      ? "Filter by"
      : "Filtered";

  const sectionTitleClass = "px-3 py-1 text-[11px] font-semibold text-muted-foreground";
  const optionClass = (isActive) =>
    `w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
      isActive ? "bg-primary/10 text-primary font-semibold" : ""
    }`;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex rounded-full items-center gap-2 p-2 md:px-4 md:py-1.5 cursor-pointer border border-gray-300 md:rounded-md bg-white hover:bg-muted/20 text-xs"
      >
        <SlidersHorizontal size={18} className="md:hidden" />
        <span className="hidden md:inline">{selectedLabel}</span>
        <ChevronDown
          className={`hidden md:block transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={15}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

          <div className="absolute top-full mt-1 right-0 bg-white border-mute rounded-lg shadow-lg z-20 w-[480px] max-w-[90vw] p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="md:border-r md:border-gray-100 md:pr-2">
                <div className={sectionTitleClass}>Status</div>
                {statusOptions.map((option) => (
                  <button
                    key={`status-${option.value}`}
                    onClick={() => handleSelect("status", option.value)}
                    className={optionClass(value.status === option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="">
                <div className={sectionTitleClass}>Priority</div>
                {priorityOptions.map((option) => (
                  <button
                    key={`priority-${option.value}`}
                    onClick={() => handleSelect("priority", option.value)}
                    className={optionClass(value.priority === option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* <div className="max-h-64 overflow-y-auto">
                <div className={sectionTitleClass}>User</div>
                {assigneeOptions.map((option) => (
                  <button
                    key={`assignee-${option.value}`}
                    onClick={() => handleSelect("assignee", option.value)}
                    className={optionClass(value.assignee === option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
