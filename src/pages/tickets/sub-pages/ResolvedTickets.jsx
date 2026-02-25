import { useMemo } from "react";
import useTickets from "../../../hooks/useTickets";
import { useTicketActions } from "../../../hooks/useTicketActions";
import TicketHeader from "../../../components/tickets/TicketHeader";
import TicketsList from "../../../components/tickets/TicketsList";
import TicketModals from "../../../components/tickets/TicketModals";

export default function ResolvedTickets() {
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

  const resolvedTickets = useMemo(
    () => tickets.filter((t) => t.status === "resolved"),
    [tickets]
  );

  return (
    <>
      <div className="container flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Resolved Tickets</span>
        </div>

        <TicketHeader />

        <TicketsList
          tickets={resolvedTickets}
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