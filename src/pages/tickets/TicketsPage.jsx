import SearchBar from "../../components/common/SearchBar";
import TicketsList from "../../components/tickets/TicketsList";
import TicketModals from "../../components/tickets/TicketModals";
import PaginationComp from "../../components/common/Pagination";
import FilterDropdown from "../../components/common/FilterDropdown";
import { useTickets } from "@/context/TicketContext";
import DateRangeFilter from "../../components/common/DateRangeFilter";
import { useTicketFilters } from "../../hooks/useTicketFilters";
import { useTicketActions } from "../../hooks/useTicketActions";
import usePagination from "../../hooks/usePagination";
import useFilterTickets from "../../hooks/useFilterTickets";
import { useEffect, useState } from "react";
import { useDateFilter } from "../../hooks/useDateFilter";
import useSortTickets from "../../hooks/useSortTickets";
import { Button } from "@/components/ui/button";

const FILTER_STORAGE_KEY = "tickets:filters";

const DEFAULT_FILTERS = {
  status: "all",
  priority: "all",
  assignee: "all",
};

const getInitialFilters = () => {
  try {
    const storedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
    if (!storedFilters) return DEFAULT_FILTERS;

    const parsedFilters = JSON.parse(storedFilters);
    if (
      typeof parsedFilters === "object" &&
      parsedFilters !== null &&
      "status" in parsedFilters &&
      "priority" in parsedFilters &&
      "assignee" in parsedFilters
    ) {
      return {
        ...DEFAULT_FILTERS,
        ...parsedFilters,
      };
    }

    return DEFAULT_FILTERS;
  } catch {
    return DEFAULT_FILTERS;
  }
};

export default function TicketsPage() {
  const { tickets, isLoading, users } = useTickets();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { searchTerm, setSearchTerm, filteredTickets } =
    useTicketFilters(tickets);
  const [filterBy, setFilterBy] = useState(getInitialFilters);
  const statusPriorityFiltered = useFilterTickets(filteredTickets, filterBy);
  const dateFiltered = useDateFilter(
    statusPriorityFiltered,
    endDate,
    startDate,
  );
  const sortedTickets = useSortTickets(dateFiltered, "oldest");
  const hasActiveFilters =
    filterBy.status !== "all" ||
    filterBy.priority !== "all" ||
    filterBy.assignee !== "all";

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(sortedTickets, 8);

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

  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filterBy));
  }, [filterBy]);

  const handleClearFilters = () => {
    setFilterBy(DEFAULT_FILTERS);
    localStorage.removeItem(FILTER_STORAGE_KEY);
  };

  return (
    <div className="container flex flex-col gap-3 justify-center items-center">
      <div className="flex w-full justify-between text-xs items-center lg:w-[1000px]">
        <div className="flex items-center">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, email, description, assignee..."
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <FilterDropdown
            value={filterBy}
            onChange={setFilterBy}
            users={users}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
          >
            Clear Filters
          </Button>

          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
            onClear={handleClearDateRange}
          />
        </div>
      </div>

      <div className="w-full md:max-w-[1000px] md:mx-auto leading-tight">
        <TicketsList
          tickets={currentItems}
          isPending={isLoading}
          // error={error}
          searchTerm={searchTerm}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <PaginationComp
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>

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
