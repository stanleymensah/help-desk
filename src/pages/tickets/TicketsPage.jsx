import SearchBar from "../../components/common/SearchBar";
import TicketHeader from "../../components/tickets/TicketHeader";
import TicketsList from "../../components/tickets/TicketsList";
import TicketModals from "../../components/tickets/TicketModals";
import Pagination from "../../components/common/Pagination";
import FilterDropdown from "../../components/common/FilterDropdown";  
import useTickets from "../../hooks/useTickets";
import DateRangeFilter from "../../components/common/DateRangeFilter";
import { useTicketFilters } from "../../hooks/useTicketFilters";
import { useTicketActions } from "../../hooks/useTicketActions";
import usePagination from "../../hooks/usePagination";
import useFilterTickets from "../../hooks/useFilterTickets";
import { useState } from "react";
import {useDateFilter} from "../../hooks/useDateFilter";

export default function TicketsPage() {
  const { data: tickets = [], isPending, error } = useTickets();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { searchTerm, setSearchTerm, filteredTickets } =
    useTicketFilters(tickets);
  const [filterBy, setFilterBy] = useState("all");
  const statusPriorityFiltered = useFilterTickets(filteredTickets, filterBy);
  const dateFiltered = useDateFilter(
    statusPriorityFiltered,
    endDate,
    startDate,
  );

  const {
    currentPage,  
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(dateFiltered, 10);

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

  const handleClearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="container flex flex-col gap-3">
      <div className="flex justify-center gap-2 text-xs">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ticket by title, email, description..."
        />
        <FilterDropdown value={filterBy} onChange={setFilterBy} />

        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          onClear={handleClearDateRange}
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
