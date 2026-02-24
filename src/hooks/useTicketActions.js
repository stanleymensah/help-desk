import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateTicket } from "./useUpdateTicket";
import useDeleteTicket from "./useDeleteTicket";
import { ErrorToast } from "../components/ui/CustomToast";

export function useTicketActions() {
  const updateTicket = useUpdateTicket();
  const { mutate: deleteTicket } = useDeleteTicket();

  const [editingTicket, setEditingTicket] = useState(null);
  const [viewingTicket, setViewingTicket] = useState(null);

  // View handlers
  const handleView = (ticket) => {
    setViewingTicket(ticket);
  };

  const handleCloseView = () => {
    setViewingTicket(null);
  };

  // Edit handlers
  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleCloseEdit = () => {
    setEditingTicket(null);
  };

  const handleSubmit = (formData) => {
    updateTicket.mutate(
      { id: editingTicket.id, updates: formData },
      {
        onSuccess: () => {
          handleCloseEdit();
          toast.success("Ticket updated successfully!");
        },
        onError: (error) => {
          toast.error("Failed to update ticket", error);
        },
      }
    );
  };

  // Delete handler
  const handleDelete = (id) => {
    deleteTicket(id);
    toast(<ErrorToast title="Ticket Deleted!" />);
  };

  return {
    // State
    editingTicket,
    viewingTicket,
    // Handlers
    handleView,
    handleCloseView,
    handleEdit,
    handleCloseEdit,
    handleSubmit,
    handleDelete,
  };
}