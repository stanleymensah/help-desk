import { useMemo } from "react";

export function useTicketStats(tickets) {
  return useMemo(() => {
    const allTickets = tickets.length;
    const openTickets = tickets.filter((t) => t.status === "open").length;
    const inProgressTickets = tickets.filter((t) => t.status === "in-progress").length;
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
}