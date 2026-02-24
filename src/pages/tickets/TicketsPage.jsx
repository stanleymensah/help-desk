import SearchBar from "../../components/common/SearchBar";
import TicketHeader from "../../components/tickets/TicketHeader";
import TicketsList from "../../components/tickets/TicketsList";
import TicketModals from "../../components/tickets/TicketModals";
import useTickets from "../../hooks/useTickets";
import { useTicketFilters } from "../../hooks/useTicketFilters";
import { useTicketActions } from "../../hooks/useTicketActions";

export default function TicketsPage() {
  const { data: tickets = [], isPending, error } = useTickets();
  
  const { searchTerm, setSearchTerm, filteredTickets } = useTicketFilters(tickets);
  
  const {
    editingTicket,
    viewingTicket,
    handleView,
    handleCloseView,
    handleEdit,
    handleCloseEdit,
    handleSubmit,
    handleDelete,
  } = useTicketActions();

  return (
    <div className="container flex gap-3 flex-col">
      {/* Search Bar */}
      <div className="flex justify-center text-xs">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ticket by title, email, description..."
        />
      </div>

      {/* Header */}
      <TicketHeader />

      {/* Tickets List */}
      <TicketsList
        tickets={filteredTickets}
        isPending={isPending}
        error={error}
        searchTerm={searchTerm}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <TicketModals
        viewingTicket={viewingTicket}
        editingTicket={editingTicket}
        onCloseView={handleCloseView}
        onCloseEdit={handleCloseEdit}
        onSubmit={handleSubmit}
      />
    </div>
  );
}