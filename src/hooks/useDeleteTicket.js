import { useCallback, useState } from "react";
import { useTickets as useTicketContext } from "../context/TicketContext";

export default function useDeleteTicket() {
  const { deleteTicket } = useTicketContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (id, options = {}) => {
      setIsPending(true);
      setError(null);

      try {
        const result = await deleteTicket(id);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err);
        options.onError?.(err);
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [deleteTicket],
  );

  return { mutate, isPending, error };
}
