import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateTicket } from "./useUpdateTicket";
import useDeleteTicket from "./useDeleteTicket";

export function useTicketActions() {
  const updateTicket = useUpdateTicket();
  const { mutate: deleteTicket } = useDeleteTicket();

  const [editingTicket, setEditingTicket] = useState(null);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [deletingTicket, setDeletingTicket] = useState(null);
  const [isEditDirty, setIsEditDirty] = useState(false);
  const [confirmDiscardEditOpen, setConfirmDiscardEditOpen] = useState(false);

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
    setIsEditDirty(false);
    setConfirmDiscardEditOpen(false);
  };

  const handleCloseEdit = () => {
    setEditingTicket(null);
    setIsEditDirty(false);
    setConfirmDiscardEditOpen(false);
  };

  const handleRequestCloseEdit = () => {
    if (isEditDirty) {
      setConfirmDiscardEditOpen(true);
      return;
    }

    handleCloseEdit();
  };

  const handleKeepEditing = () => {
    setConfirmDiscardEditOpen(false);
  };

  const handleDiscardChanges = () => {
    setConfirmDiscardEditOpen(false);
    handleCloseEdit();
  };

  const handleEditDirtyChange = (dirtyState) => {
    setIsEditDirty(dirtyState);
  };

  const handleSubmit = (formData) => {
    const nextAssignedTo = formData.assignedTo?.trim() ?? "";
    const updates =
      editingTicket?.status === "open" && nextAssignedTo
        ? { ...formData, assignedTo: nextAssignedTo, status: "assigned" }
        : { ...formData, assignedTo: nextAssignedTo };

    updateTicket.mutate(
      { id: editingTicket.id, updates },
      {
        onSuccess: () => {
          handleCloseEdit();
          toast.success("Ticket updated successfully!");
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to update ticket");
        },
      },
    );
  };

  // Delete handler
  const handleDelete = (ticket) => {
    setDeletingTicket(ticket);
  };

  const handleCancelDelete = () => {
    setDeletingTicket(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingTicket) return;

    deleteTicket(deletingTicket.id, {
      onSuccess: () => {
        toast.success("Ticket deleted successfully!");
        setDeletingTicket(null);
      },
      onError: () => {
        toast.error("Failed to delete ticket");
      },
    });
  };

  return {
    editingTicket,
    viewingTicket,
    deletingTicket,
    confirmDiscardEditOpen,
    handleView,
    handleCloseView,
    handleEdit,
    handleCloseEdit,
    handleRequestCloseEdit,
    handleKeepEditing,
    handleDiscardChanges,
    handleEditDirtyChange,
    handleSubmit,
    handleDelete,
    handleCancelDelete,
    handleConfirmDelete,
  };
}
