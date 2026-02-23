import React from "react";

// Define color mappings
const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-green-100 text-green-600",
};

const STATUS_COLORS = {
  open: "bg-blue-100 text-blue-600",
  "in-progress": "bg-orange-100 text-orange-600",
  resolved: "bg-green-100 text-green-400",
};

const Badge = ({ type, value }) => {
  let classes = "bg-gray-100 text-gray-600"; // default

  if (type === "priority") {
    classes = PRIORITY_COLORS[value?.toLowerCase()] || classes;
  } else if (type === "status") {
    classes = STATUS_COLORS[value?.toLowerCase()] || classes;
  }

  return (
    <span className={`${classes} py-1.5 px-2 rounded-full`}>
      {value}
    </span>
  );
};

export default Badge;