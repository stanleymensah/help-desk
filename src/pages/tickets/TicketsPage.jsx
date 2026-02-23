import TicketCard from "../../components/tickets/TicketCard";
import useTickets from "../../hooks/useTickets";
import TicketSkeleton from "../../components/tickets/TicketSkeleton";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import TicketHeader from "../../components/tickets/TicketHeader";
import useDeleteTicket from "../../hooks/useDeleteTicket";

export default function TicketsPage() {
  const { data: tickets, isPending, error } = useTickets();

  const { mutate: deleteTicket } = useDeleteTicket();

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
              />
            ))}
        </div>
      </div>
    </>
  );
}
