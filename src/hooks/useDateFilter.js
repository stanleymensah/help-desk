import { useMemo } from "react";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";

export function useDateFilter(tickets, startDate, endDate) {
  return useMemo(() => {
    if (!startDate || !endDate) return tickets;

    return tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.createdAt);

      return isWithinInterval(ticketDate, {
        start: startOfDay(startDate),
        end: endOfDay(endDate),
      });
    });
  }, [tickets, startDate, endDate]);
}
