import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

export function useTicketFilters(tickets) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredTickets = useMemo(() => {
    if (!debouncedSearch.trim()) return tickets;

    const search = debouncedSearch.toLowerCase();
    return tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(search) ||
        ticket.email?.toLowerCase().includes(search) ||
        ticket.description.toLowerCase().includes(search) ||
        ticket.assignedTo?.toLowerCase().includes(search)
    );
  }, [tickets, debouncedSearch]);

  return {
    searchTerm,
    setSearchTerm,
    filteredTickets,
  };
}