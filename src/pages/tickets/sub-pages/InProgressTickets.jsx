import useTickets from "../../../hooks/useTickets";
import { useTicketActions } from "../../../hooks/useTicketActions";
import TicketHeader from "../../../components/tickets/TicketHeader";
import TicketsList from "../../../components/tickets/TicketsList";
import TicketModals from "../../../components/tickets/TicketModals";
import { useMemo } from "react";

export default function InProgressTickets() {
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

  // Filter for in-progress tickets
  const inProgressTickets = useMemo(
    () => tickets.filter((t) => t.status === "in-progress"),
    [tickets]
  );

  return (
    <>
      <div className="container flex flex-col gap-2">
        {/* Page Title */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold">In-Progress Tickets</span>
        </div>

        <TicketHeader />

        <TicketsList
          tickets={inProgressTickets}
          isPending={isPending}
          error={error}
          searchTerm=""
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

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