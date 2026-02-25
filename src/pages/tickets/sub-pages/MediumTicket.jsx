import { useMemo } from "react";
import { useTicketActions } from "../../../hooks/useTicketActions";
import TicketModals from "../../../components/tickets/TicketModals";
import useTickets from "../../../hooks/useTickets";
import TicketsList from "../../../components/tickets/TicketsList";
import TicketHeader from "../../../components/tickets/TicketHeader";

export default function MediumTicket() {
  const { data: tickets = [], isPending, error } = useTickets();
  const {
    handleDelete,
    handleView,
    handleEdit,
    handleCloseView,
    handleCloseEdit,
    viewingTicket,
    editingTicket,
    handleSubmit,
  } = useTicketActions();

  const mediumTickets = useMemo(() => {
    return tickets.filter((t) => t.priority === "medium");
  }, [tickets]);

  return (
    <>
      <div className="container flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Medium Priority tickets</span>
        </div>

        <TicketHeader />

        <TicketsList
          tickets={mediumTickets}
          isPending={isPending}
          error={error}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* View Modal */}
        <TicketModals
          viewingTicket={viewingTicket}
          editingTicket={editingTicket}
          onCloseView={handleCloseView}
          onCloseEdit={handleCloseEdit}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
