import { useMemo } from "react";
import { useTicketActions } from "../../../hooks/useTicketActions";
import useTickets from "../../../hooks/useTickets";
import TicketHeader from "../../../components/tickets/TicketHeader";
import TicketsList from "../../../components/tickets/TicketsList";
import TicketModals from "../../../components/tickets/TicketModals";

export default function LowTicket() {
  const { data: tickets = [], isPending, error } = useTickets();

  const {
    handleDelete,
    handleSubmit,
    handleView,
    handleCloseView,
    viewingTicket,
    editingTicket,
    handleEdit,
    handleCloseEdit,
  } = useTicketActions();

  const lowTickets = useMemo(() => {
    return tickets.filter((t) => t.priority === "low");
  }, [tickets]);

  return (
    <>
      <div className="container flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Low Priority tickets</span>
        </div>

        <TicketHeader />

        <TicketsList
          tickets={lowTickets}
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
        onCloseEdit={handleCloseEdit}
        onCloseView={handleCloseView}
        onSubmit={handleSubmit}
      />
    </>
  );
}
