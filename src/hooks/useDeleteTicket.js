import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTicket as deleteTicketService } from "../services/ticketService";
import { toast } from "react-toastify";

export default function useDeleteTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteTicketService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete ticket");
    },
  });
}
