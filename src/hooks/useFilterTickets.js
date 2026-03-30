import { useMemo } from "react";

export default function useFilterTickets(
  tickets,
  filters = { status: "all", priority: "all", assignee: "all" },
) {
  return useMemo(() => {
    if (!tickets || tickets.length === 0) return [];
    const { status = "all", priority = "all", assignee = "all" } = filters;

    return tickets.filter((ticket) => {
      const matchesStatus = status === "all" || ticket.status === status;
      const matchesPriority =
        priority === "all" || ticket.priority === priority;
      const matchesAssignee =
        assignee === "all" || (ticket.assignedTo ?? "") === assignee;

      return matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [tickets, filters]);
}
