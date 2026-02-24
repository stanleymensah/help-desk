import { useState } from "react";
import useDeleteTicket from "../../../hooks/useDeleteTicket";
import useTickets from "../../../hooks/useTickets";
import TicketHeader from "../../../components/tickets/TicketHeader";
import TicketSkeleton from "../../../components/tickets/TicketSkeleton";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import TicketCard from "../../../components/tickets/TicketCard";
import TicketDetailsModal from "../../../components/tickets/TicketDetailModal";

export default function ResolvedTickets() {
  const { data: tickets = [], isPending, error } = useTickets();
  const { mutate: deleteTicket } = useDeleteTicket();

  const [viewingTicket, setViewingTicket] = useState(null);

  // Delete
  const handleDelete = (id) => {
    deleteTicket(id);
  };

  // View
  const handleView = (ticket) => {
    setViewingTicket(ticket);
  };

  const handleCloseView = () => {
    setViewingTicket(null);
  };

  const resolvedTickets = tickets.filter((t) => t.status === "resolved");

  return (
    <>
      <div className="container flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Resolved tickets</span>
        </div>

        <TicketHeader />

        <div className="flex flex-col gap-3 text-xs">
          {isPending && <TicketSkeleton />}

          {!isPending && error && <ErrorBoundary message={error.message} />}

          {!isPending && !error && resolvedTickets.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No tickets found.
            </div>
          )}

          {!isPending &&
            !error &&
            resolvedTickets.length > 0 &&
            resolvedTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onDelete={handleDelete}
                onView={handleView} // <-- added
              />
            ))}
        </div>
      </div>

      {/* View Modal */}
      <TicketDetailsModal
        ticket={viewingTicket}
        isOpen={!!viewingTicket}
        onClose={handleCloseView}
      />
    </>
  );
}