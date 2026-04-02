import TicketsByStatusChart from "../../pages/dashboard/TicketsByStatusChart";
import TicketsByPriorityChart from "../../pages/dashboard/TicketsByPriorityChart";

export default function ChartsSection({ stats }) {
  const statusData = [
    { status: "Open", count: stats.openTickets },
    { status: "Assigned", count: stats.assignedTickets },
    { status: "In Progress", count: stats.inProgressTickets },
    { status: "Resolved", count: stats.resolvedTickets },
    { status: "Closed", count: stats.closedTickets },
    { status: "Reopened", count: stats.reopenedTickets },
  ];

  const priorityData = [
    { name: "Low", value: stats.lowPriority },
    { name: "Medium", value: stats.midPriority },
    { name: "High", value: stats.highPriority },
  ];

  return (
    <div className="min-h-80 rounded-lg w-full flex flex-col md:flex-row gap-2">
      <div className="border border-gray-300 rounded-sm p-2 md:w-1/2">
        <TicketsByStatusChart data={statusData} />
      </div>
      <div className="border bg-transparent border-gray-300 rounded-sm p-2 md:w-1/2">
        <TicketsByPriorityChart data={priorityData} />
      </div>
    </div>
  );
}