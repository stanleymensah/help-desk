import React from "react";

// Define color mappings
const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

const STATUS_COLORS = {
  open: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-orange-100 text-orange-600",
  assigned: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-700",
  reopened: "bg-purple-100 text-purple-700",
};

const MESSAGE_COLORS = {
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

const Badge = ({ type, value }) => {
  let classes = "bg-muted text-muted-foreground";
  const normalizedValue = value?.toLowerCase();

  if (type === "priority") {
    classes = PRIORITY_COLORS[normalizedValue] || classes;
  } else if (type === "status") {
    classes = STATUS_COLORS[normalizedValue] || classes;
  } else if (type === "message") {
    classes = MESSAGE_COLORS[normalizedValue] || classes;
  }

  return (
    <span className={`${classes} inline-flex items-center rounded-sm p-1`}>
      {value}
    </span>
  );
};

export default Badge;