import TicketCard from "../../components/tickets/TicketCard";
import useTickets from "../../hooks/useTickets";
import TicketSkeleton from "../../components/tickets/TicketSkeleton";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import TicketHeader from "../../components/tickets/TicketHeader";
import useDeleteTicket from "../../hooks/useDeleteTicket";
import EditTicketForm from "../../components/tickets/EditTicketForm";
import Modal from "../../components/common/Modal";
import { useUpdateTicket } from "../../hooks/useUpdateTicket";
import { useState } from "react";

export default function TicketsPage() {
  const { data: tickets = [], isPending, error } = useTickets();
  const updateTicket = useUpdateTicket();
  const [editingTicket, setEditingTicket] = useState(null);

  const { mutate: deleteTicket } = useDeleteTicket();

  const handleEdit = (ticket) => {
    console.log("Edit clicked!", ticket);
    setEditingTicket(ticket);
  };

  const handleCloseModal = () => {
    setEditingTicket(null);
  };

  const handleSubmit = (formData) => {
    console.log("Form submitted!", formData); // ← Add this
    console.log("Editing ticket ID:", editingTicket.id); // ← Add this
    updateTicket.mutate(
      { id: editingTicket.id, updates: formData },
      {
        onSuccess: () => {
          console.log("Update successful!"); // ← Add this
          handleCloseModal();
        },
        onError: (error) => {
          console.error("Update failed:", error); // ← Add this
        },
      },
    );
  };

  const handleDelete = (id) => {
    deleteTicket(id);
  };

  return (
    <>
      <div className="container flex flex-col gap-2">
        {/* HEADER FOR TICKETS */}
        <TicketHeader />

        <div className="flex flex-col gap-3 text-xs">
          {isPending && <TicketSkeleton count={5} />}

          {!isPending && error && <ErrorBoundary message={error.message} />}

          {!isPending && !error && tickets.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No tickets found.
            </div>
          )}

          {!isPending &&
            !error &&
            tickets.length > 0 &&
            tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
        </div>

        <Modal
          isOpen={!!editingTicket}
          onClose={handleCloseModal}
          title="Edit Ticket"
        >
          {editingTicket && (
            <EditTicketForm
              ticket={editingTicket}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          )}
        </Modal>
      </div>
    </>
  );
}
