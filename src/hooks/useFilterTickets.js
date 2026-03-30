import { useMemo } from "react";

export default function useFilterTickets(tickets, filterBy) {
  return useMemo(() => {
    if (!tickets || tickets.length === 0) return [];
    const filtered = [...tickets];

    if (filterBy?.startsWith("assignee:")) {
      const assignee = filterBy.replace("assignee:", "").trim();
      return filtered.filter((ticket) => (ticket.assignedTo ?? "") === assignee);
    }

    switch (filterBy) {
      case "open":
        return filtered.filter((ticket) => ticket.status === "open");
      case "assigned":
        return filtered.filter((ticket) => ticket.status === "assigned");
      case "in-progress":
        return filtered.filter((ticket) => ticket.status === "in-progress");
      case "resolved":
        return filtered.filter((ticket) => ticket.status === "resolved");
      case "closed":
        return filtered.filter((ticket) => ticket.status === "closed");
      case "reopened":
        return filtered.filter((ticket) => ticket.status === "reopened");
      case "high":
        return filtered.filter((ticket) => ticket.priority === "high");
      case "medium":
        return filtered.filter((ticket) => ticket.priority === "medium");
      case "low":
        return filtered.filter((ticket) => ticket.priority === "low");
      default:
        return filtered;
    }
  }, [tickets, filterBy]);
}
