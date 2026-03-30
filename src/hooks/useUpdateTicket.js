import { useCallback, useState } from "react";
import { useTickets as useTicketContext } from "../context/TicketContext";

export function useUpdateTicket() {
  const { updateTicket } = useTicketContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (payload, options = {}) => {
      setIsPending(true);
      setError(null);

      try {
        const updated = await updateTicket(payload);
        options.onSuccess?.(updated);
        return updated;
      } catch (err) {
        setError(err);
        options.onError?.(err);
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [updateTicket],
  );

  return { mutate, isPending, error };
}