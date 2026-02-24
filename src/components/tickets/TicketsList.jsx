import TicketCard from "./TicketCard";
import TicketSkeleton from "./TicketSkeleton";
import ErrorBoundary from "../common/ErrorBoundary";

export default function TicketsList({
  tickets,
  isPending,
  error,
  searchTerm,
  onView,
  onEdit,
  onDelete,
}) {
  if (isPending) {
    return <TicketSkeleton count={5} />;
  }

  if (error) {
    return <ErrorBoundary message={error.message} />;
  }

  if (tickets.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        {searchTerm
          ? `No tickets found for "${searchTerm}"`
          : "No tickets found."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 text-xs">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}