import { useCallback, useState } from "react";
import { useTickets as useTicketContext } from "../context/TicketContext";

export default function useCreateTicket() {
  const { createTicket } = useTicketContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (newTicket, options = {}) => {
      setIsPending(true);
      setError(null);

      try {
        const created = await createTicket(newTicket);
        options.onSuccess?.(created);
        return created;
      } catch (err) {
        setError(err);
        options.onError?.(err);
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [createTicket],
  );

  return { mutate, isPending, error };
}
