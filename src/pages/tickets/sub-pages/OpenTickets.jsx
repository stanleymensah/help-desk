import useDeleteTicket from "../../../hooks/useDeleteTicket";
import useTickets from "../../../hooks/useTickets";
import TicketHeader from "../../../components/tickets/TicketHeader";
import TicketSkeleton from "../../../components/tickets/TicketSkeleton";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import TicketCard from "../../../components/tickets/TicketCard";

export default function OpenTickets() {
  const { data: tickets = [], isPending, error } = useTickets();

  const { mutate: deleteTicket } = useDeleteTicket();

  const handleDelete = (id) => {
    deleteTicket(id);
  };

  const openTickets = tickets.filter((t) => t.status === "open");

  return (
    <>
      <div className="container flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Open tickets</span>
        </div>
        <TicketHeader />

        <div className="flex flex-col gap-3 text-xs">
          {isPending && <TicketSkeleton />}
          {!isPending && error && <ErrorBoundary message={error.message} />}
          {!isPending && !error && openTickets.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No tickets found.
            </div>
          )}

          {!isPending &&
            !error &&
            openTickets.length > 0 &&
            openTickets.map((ticket) => (
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
