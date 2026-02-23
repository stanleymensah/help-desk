import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "../services/ticketService";

export default function useTickets() {
  return useQuery({
    queryKey: "tickets",
    queryFn: fetchTickets,
  });
}
