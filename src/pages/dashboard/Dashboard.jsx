import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PiTicket } from "react-icons/pi";
import { LuRepeat } from "react-icons/lu";
import { AiOutlineStop } from "react-icons/ai";
import { IoLayersOutline } from "react-icons/io5";
import { HiMiniChevronUp } from "react-icons/hi2";
import { HiMiniChevronDown } from "react-icons/hi2";
import { HiMiniEquals } from "react-icons/hi2";
import TicketsByStatusChart from "./TicketsByStatusChart";
import TicketsByPriorityChart from "./TicketsByPriorityChart";
import TicketStatCard from "./TicketStatCard";
import useTickets from "../../hooks/useTickets";

export default function Dashboard() {
  const { data: tickets = [], isPending, error } = useTickets();

  // Memoize calculations so they only run when tickets change
  const stats = useMemo(() => {
    const allTickets = tickets.length;
    const openTickets = tickets.filter((t) => t.status === "open").length;
    const inProgressTickets = tickets.filter(
      (t) => t.status === "in-progress",
    ).length;
    const resolvedTickets = tickets.filter((t) => t.status === "resolved").length;
    const lowPriority = tickets.filter((t) => t.priority === "low").length;
    const midPriority = tickets.filter((t) => t.priority === "medium").length;
    const highPriority = tickets.filter((t) => t.priority === "high").length;

    return {
      allTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      lowPriority,
      midPriority,
      highPriority,
    };
  }, [tickets]);

  const ticketStats = [
    {
      title: "All Tickets",
      number: stats.allTickets,
      icon: <IoLayersOutline />,
      color: { bg: "bg-blue-100", text: "text-blue-600" },
    },
    {
      title: "Open Tickets",
      number: stats.openTickets,
      icon: <PiTicket />,
      color: { bg: "bg-orange-100", text: "text-orange-600" },
    },
    {
      title: "In Progress",
      number: stats.inProgressTickets,
      icon: <LuRepeat />,
      color: { bg: "bg-purple-100", text: "text-purple-600" },
    },
    {
      title: "Resolved Tickets",
      number: stats.resolvedTickets,
      icon: <AiOutlineStop />,
      color: { bg: "bg-green-100", text: "text-green-600" },
    },
    {
      title: "Low Priority",
      number: stats.lowPriority,
      icon: <HiMiniChevronDown />,
      color: { bg: "bg-teal-100", text: "text-teal-600" },
    },
    {
      title: "Mid Priority",
      number: stats.midPriority,
      icon: <HiMiniEquals />,
      color: { bg: "bg-yellow-100", text: "text-yellow-600" },
    },
    {
      title: "High Priority",
      number: stats.highPriority,
      icon: <HiMiniChevronUp />,
      color: { bg: "bg-red-100", text: "text-red-600" },
    },
  ];

  const ticketStatusesData = [
    { status: "Open", count: stats.openTickets },
    { status: "In Progress", count: stats.inProgressTickets },
    { status: "Resolved", count: stats.resolvedTickets },
  ];

  const ticketsPrioritiesData = [
    { name: "Low", value: stats.lowPriority },
    { name: "Medium", value: stats.midPriority },
    { name: "High", value: stats.highPriority },
  ];

  return (
    <>
      <div className="container text-xs flex flex-col gap-6">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Dashboard</span>
          <span>
            Welcome back! Here's what is going on with your ticketing so far.
          </span>
        </div>

        {isPending && <span>Loading...</span>}

        {error && <span>Error: {error.message}</span>}

        {/* Ticket Essentials */}
        {!isPending && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              {/* Ticket Stat Card */}
              {ticketStats.map((stat) => (
                <TicketStatCard
                  key={stat.title}
                  title={stat.title}
                  number={stat.number}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>

            <div className="min-h-30 rounded-lg w-full flex flex-col md:flex-row gap-2">
              <div className="border border-gray-300 rounded-lg p-2  md:w-1/2">
                <TicketsByStatusChart data={ticketStatusesData} />
              </div>
              <div className="border bg-transparent border-gray-300 rounded-lg p-2 md:w-1/2">
                <TicketsByPriorityChart data={ticketsPrioritiesData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}