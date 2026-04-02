import {
  ChevronDown,
  ChevronUp,
  Layers,
  Minus,
  RefreshCw,
  Ticket,
  CircleCheckBig,
} from "lucide-react";
import TicketStatCard from "../../pages/dashboard/TicketStatCard";

const STAT_CONFIG = [
  {
    key: "openTickets",
    title: "Open",
    icon: <Ticket />,
    color: { bg: "bg-yellow-100", text: "text-yellow-600" },
  },
  {
    key: "assignedTickets",
    title: "Assigned",
    icon: <Layers />,
    color: { bg: "bg-blue-100", text: "text-blue-600" },
  },
  {
    key: "inProgressTickets",
    title: "In Progress",
    icon: <RefreshCw />,
    color: { bg: "bg-orange-100", text: "text-orange-600" },
  },
  {
    key: "resolvedTickets",
    title: "Resolved",
    icon: <CircleCheckBig />,
    color: { bg: "bg-green-100", text: "text-green-600" },
  },
  {
    key: "closedTickets",
    title: "Closed",
    icon: <CircleCheckBig />,
    color: { bg: "bg-gray-100", text: "text-gray-600" },
  },
  {
    key: "reopenedTickets",
    title: "Reopened",
    icon: <RefreshCw />,
    color: { bg: "bg-purple-100", text: "text-purple-600" },
  },
  {
    key: "lowPriority",
    title: "Low Priority",
    icon: <ChevronDown />,
    color: { bg: "bg-teal-100", text: "text-teal-600" },
  },
  {
    key: "midPriority",
    title: "Mid Priority",
    icon: <Minus />,
    color: { bg: "bg-yellow-100", text: "text-yellow-600" },
  },
  {
    key: "highPriority",
    title: "High Priority",
    icon: <ChevronUp />,
    color: { bg: "bg-red-100", text: "text-red-600" },
  },
];

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-1 md:grid-cols-4 lg:flex lg:flex-wrap">
      {STAT_CONFIG.map((config) => (
        <TicketStatCard
          key={config.key}
          title={config.title}
          number={stats[config.key]}
          icon={config.icon}
          color={config.color}
        />
      ))}
    </div>
  );
}