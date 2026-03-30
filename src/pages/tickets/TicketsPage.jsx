import SearchBar from "../../components/common/SearchBar";
import TicketsList from "../../components/tickets/TicketsList";
import TicketModals from "../../components/tickets/TicketModals";
import Pagination from "../../components/common/Pagination";
import FilterDropdown from "../../components/common/FilterDropdown";
import { useTickets } from "@/context/TicketContext";
import DateRangeFilter from "../../components/common/DateRangeFilter";
import { useTicketFilters } from "../../hooks/useTicketFilters";
import { useTicketActions } from "../../hooks/useTicketActions";
import usePagination from "../../hooks/usePagination";
import useFilterTickets from "../../hooks/useFilterTickets";
import { useState } from "react";
import { useDateFilter } from "../../hooks/useDateFilter";

export default function TicketsPage() {
  const { tickets, isLoading, users } = useTickets();
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
  } = usePagination(dateFiltered, 7);

  const {
    editingTicket,
    viewingTicket,
    deletingTicket,
    confirmDiscardEditOpen,
    handleView,
    handleCloseView,
    handleEdit,
    handleRequestCloseEdit,
    handleKeepEditing,
    handleDiscardChanges,
    handleEditDirtyChange,
    handleSubmit,
    handleDelete,
    handleCancelDelete,
    handleConfirmDelete,
  } = useTicketActions();

  const handleClearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="container flex flex-col gap-3 justify-center items-center">
      <div className="flex w-full justify-between text-xs items-center lg:w-[1000px] ">
        <div className="flex items-center">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, email, description, assignee..."
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <FilterDropdown value={filterBy} onChange={setFilterBy} users={users} />

          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
            onClear={handleClearDateRange}
          />
        </div>
      </div>

      <TicketsList
        tickets={currentItems}
        isPending={isLoading}
        // error={error}
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
        deletingTicket={deletingTicket}
        confirmDiscardEditOpen={confirmDiscardEditOpen}
        onCloseView={handleCloseView}
        onRequestCloseEdit={handleRequestCloseEdit}
        onKeepEditing={handleKeepEditing}
        onDiscardChanges={handleDiscardChanges}
        onCancelDelete={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
        onEditDirtyChange={handleEditDirtyChange}
        onEditSubmit={handleSubmit}
      />
    </div>
  );
}
