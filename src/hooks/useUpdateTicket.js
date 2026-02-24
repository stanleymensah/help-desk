import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTicket } from '../services/ticketService';

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTicket,
    onSuccess: () => {
      // Invalidate and refetch tickets
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
}