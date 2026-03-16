import { PiTicket } from "react-icons/pi";
import { LuRepeat } from "react-icons/lu";
import { AiOutlineStop } from "react-icons/ai";
import { IoLayersOutline } from "react-icons/io5";
import { HiMiniChevronUp, HiMiniChevronDown, HiMiniEquals } from "react-icons/hi2";
import TicketStatCard from "../../pages/dashboard/TicketStatCard";

const STAT_CONFIG = [
  {
    key: "allTickets",
    title: "All Tickets",
    icon: <IoLayersOutline />,
    color: { bg: "bg-blue-100", text: "text-blue-600" },
  },
  {
    key: "openTickets",
    title: "Open Tickets",
    icon: <PiTicket />,
    color: { bg: "bg-orange-100", text: "text-orange-600" },
  },
  {
    key: "inProgressTickets",
    title: "In Progress",
    icon: <LuRepeat />,
    color: { bg: "bg-purple-100", text: "text-purple-600" },
  },
  {
    key: "resolvedTickets",
    title: "Resolved Tickets",
    icon: <AiOutlineStop />,
    color: { bg: "bg-green-100", text: "text-green-600" },
  },
  {
    key: "lowPriority",
    title: "Low Priority",
    icon: <HiMiniChevronDown />,
    color: { bg: "bg-teal-100", text: "text-teal-600" },
  },
  {
    key: "midPriority",
    title: "Mid Priority",
    icon: <HiMiniEquals />,
    color: { bg: "bg-yellow-100", text: "text-yellow-600" },
  },
  {
    key: "highPriority",
    title: "High Priority",
    icon: <HiMiniChevronUp />,
    color: { bg: "bg-red-100", text: "text-red-600" },
  },
];

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-1 md:flex md:overflow-hidden">
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