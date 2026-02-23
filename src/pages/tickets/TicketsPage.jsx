import TicketCard from "../../components/tickets/TicketCard";
import useTickets from "../../hooks/useTickets";
import TicketSkeleton from "../../components/tickets/TicketSkeleton";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import TicketHeader from "../../components/tickets/TicketHeader";

export default function TicketsPage() {
  const { data: tickets, isLoading, error } = useTickets();

  return (
    <>
      <div className="container flex flex-col gap-2">
        {/* HEADER FOR TICKETS */}
        <TicketHeader />

        <div className="flex flex-col gap-3 text-xs">
          {isLoading && <TicketSkeleton count={5} />}

          {!isLoading && error && <ErrorBoundary message={error.message} />}

          {!isLoading && !error && tickets.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No tickets found.
            </div>
          )}

          {!isLoading &&
            !error &&
            tickets.length > 0 &&
            tickets.map((ticket) => <TicketCard ticket={ticket} />)}
        </div>
      </div>
    </>
  );
}
