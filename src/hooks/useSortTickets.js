import { useMemo } from "react";

export default function useSortTickets(tickets, sortBy) {
  return useMemo(() => {
    if (!tickets || tickets.length === 0) return [];

    const sorted = [...tickets];

    switch (sortBy) {
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );

      default:
        return sorted;
    }
  }, [tickets, sortBy]);
}
