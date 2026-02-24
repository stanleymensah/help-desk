import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTicket as deleteTicketService } from "../services/ticketService";

export default function useDeleteTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteTicketService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });
}
