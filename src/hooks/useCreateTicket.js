import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "../services/ticketService";

export default function useCreateTicket() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: (newTicket) => {
      // Update the tickets cache so the list refreshes automatically
      queryClient.setQueryData(["tickets"], (old = []) => [newTicket, ...old]);
    },
  });

  return mutation; // returns { mutate, isLoading, error, etc. }
}
