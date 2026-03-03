import { useMemo } from "react";

export default function useFilterTickets(tickets, filterBy) {
  return useMemo(() => {
    if (!tickets || tickets.length === 0) return [];
    const filtered = [...tickets];

    switch (filterBy) {
      case "open":
        return filtered.filter((ticket) => ticket.status === "open");
      case "in-progress":
        return filtered.filter((ticket) => ticket.status === "in-progress");
      case "resolved":
        return filtered.filter((ticket) => ticket.status === "resolved");
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
