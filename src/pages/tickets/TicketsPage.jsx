import SearchBar from "../../components/common/SearchBar";
import TicketHeader from "../../components/tickets/TicketHeader";
import TicketsList from "../../components/tickets/TicketsList";
import TicketModals from "../../components/tickets/TicketModals";
import Pagination from "../../components/common/Pagination";
import FilterDropdown from "../../components/common/FilterDropdown";
import SortDropdown from "../../components/common/SortDropdown";
import useTickets from "../../hooks/useTickets";
import { useTicketFilters } from "../../hooks/useTicketFilters";
import { useTicketActions } from "../../hooks/useTicketActions";
import usePagination from "../../hooks/usePagination";
import useFilterTickets from "../../hooks/useFilterTickets";
import useSortTickets from "../../hooks/useSortTickets";
import { useState } from "react";

export default function TicketsPage() {
  const { data: tickets = [], isPending, error } = useTickets();
  const [sortBy, setSortBy] = useState("default");

  const [filterBy, setFilterBy] = useState("all");
  const { searchTerm, setSearchTerm, filteredTickets } =
    useTicketFilters(tickets);
  const statusPriorityFiltered = useFilterTickets(filteredTickets, filterBy);
  const sortedTickets = useSortTickets(statusPriorityFiltered, sortBy);

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(sortedTickets, 10);

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
    <div className="container flex flex-col gap-3">
      <div className="flex justify-center gap-2 text-xs">
        <FilterDropdown value={filterBy} onChange={setFilterBy} />

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ticket by title, email, description..."
        />

        <SortDropdown value={sortBy} onChange={setSortBy} />
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
