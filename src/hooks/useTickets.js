import { useMemo } from "react";
import { useTickets as useTicketContext } from "../context/TicketContext";

export default function useTickets() {
  const { tickets, isLoading } = useTicketContext();

  return useMemo(
    () => ({
      data: tickets,
      isPending: isLoading,
      error: null,
    }),
    [tickets, isLoading],
  );
}
