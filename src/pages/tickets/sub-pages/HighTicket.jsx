import { useMemo } from "react";
import useTickets from "../../../hooks/useTickets";
import { useTicketActions } from "../../../hooks/useTicketActions";
import TicketHeader from "../../../components/tickets/TicketHeader";
import TicketsList from "../../../components/tickets/TicketsList";
import TicketModals from "../../../components/tickets/TicketModals";

export default function HighTicket() {
  const { data: tickets = [], isPending, error } = useTickets();

  const {
    viewingTicket,
    editingTicket,
    handleView,
    handleCloseView,
    handleEdit,
    handleCloseEdit,
    handleSubmit,
    handleDelete,
  } = useTicketActions();

  const highTickets = useMemo(() => {
    return tickets.filter((t) => t.priority === "high");
  }, [tickets]);

  return (
    <>
      <div className="container flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">High Priority tickets</span>
        </div>

        <TicketHeader />

        <TicketsList
          tickets={highTickets}
          isPending={isPending}
          error={error}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* View Modal */}
      <TicketModals
        viewingTicket={viewingTicket}
        editingTicket={editingTicket}
        onCloseView={handleCloseView}
        onCloseEdit={handleCloseEdit}
        onSubmit={handleSubmit}
      />
    </>
  );
}
