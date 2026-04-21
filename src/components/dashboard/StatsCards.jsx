import {
  Goal,
  Inbox,
  RefreshCw,
  Tickets,
  UserRoundCheck
} from "lucide-react";
import TicketStatCard from "../../pages/dashboard/TicketStatCard";

const STAT_CONFIG = [
  {
    key: "allTickets",
    title: "All",
    icon: <Tickets size={40} strokeWidth={1}/>,
    color: { bg: "bg-yellow-100", text: "text-yellow-600" },
  },
  {
    key: "assignedTickets",
    title: "Assigned",
    icon: <UserRoundCheck size={40} strokeWidth={1}/>,
    color: { bg: "bg-blue-100", text: "text-blue-600" },
  },
  {
    key: "inProgressTickets",
    title: "In Progress",
    icon: <RefreshCw size={40} strokeWidth={1}/>,
    color: { bg: "bg-orange-100", text: "text-orange-600" },
  },
  {
    key: "resolvedTickets",
    title: "Resolved",
    icon: <Goal size={40} strokeWidth={1}/>,
    color: { bg: "bg-green-100", text: "text-green-600" },
  },
];

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 lg:flex lg:flex-wrap">
      {STAT_CONFIG.map((config) => (
        <TicketStatCard
          key={config.key}
          title={config.title}
          number={stats[config.key]}
          icon={config.icon}
        />
      ))}
    </div>
  );
}