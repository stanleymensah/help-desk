import SearchBar from "../../components/common/SearchBar";
import TicketHeader from "../../components/tickets/TicketHeader";
import TicketsList from "../../components/tickets/TicketsList";
import TicketModals from "../../components/tickets/TicketModals";
import Pagination from "../../components/common/Pagination";
import useTickets from "../../hooks/useTickets";
import { useTicketFilters } from "../../hooks/useTicketFilters";
import { useTicketActions } from "../../hooks/useTicketActions";
import usePagination from "../../hooks/usePagination";

export default function TicketsPage() {
  const { data: tickets = [], isPending, error } = useTickets();

  const { searchTerm, setSearchTerm, filteredTickets } =
    useTicketFilters(tickets);

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(filteredTickets, 10);

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
      
      <div className="flex justify-center text-xs">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ticket by title, email, description..."
        />
      </div>

      <TicketHeader />

      <TicketsList
        tickets={currentItems}
        isPending={isPending}
        error={error}
        searchTerm={searchTerm}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        onNext={nextPage}
        onPrev={prevPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
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
