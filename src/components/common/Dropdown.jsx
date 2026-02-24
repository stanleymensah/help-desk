import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMiniChevronDown } from "react-icons/hi2";

const Dropdown = ({ name, items, icon, }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if current page matches this dropdown's section
  const isActive = items.some(item =>
  location.pathname === item.path ||
  location.pathname.startsWith(item.path + "/")
);

  return (
    <div className="text-xs">
      <div
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`navItem px-4 py-2.5 flex items-center justify-between gap-2  rounded cursor-pointer transition-colors ${
          isActive || isOpen
            ? "bg-primary text-white"
            : "text-primary hover:bg-primary/10"
        }`}
      >
        <span className="flex items-center gap-2">
          {icon}
          {name}
        </span>
        <HiMiniChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="bg-transparent overflow-hidden text-[0.7rem]">
          <ul>
            {items.map((item, index) => {
              const isItemActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-2  border-b last:border-b-0 border-gray-100 ${
                      isItemActive
                        ? "text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
