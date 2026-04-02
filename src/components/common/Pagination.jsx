import { useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComp({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  hasNextPage,
  hasPrevPage,
}) {
  // Generate page numbers to display
  const pages = useMemo(() => {
    const pages = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageClick = (page) => (event) => {
    event.preventDefault();
    onPageChange(page);
  };

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (hasPrevPage) onPrev();
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (hasNextPage) onNext();
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevClick}
              className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
              aria-disabled={!hasPrevPage}
            />
          </PaginationItem>

          {pages[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink href="#" onClick={handlePageClick(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              {pages[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={handlePageClick(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {pages[pages.length - 1] < totalPages && (
            <>
              {pages[pages.length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href="#" onClick={handlePageClick(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNextClick}
              className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
              aria-disabled={!hasNextPage}
            />
          </PaginationItem>
        </PaginationContent>
        <div className="flex items-center text-center text-xs text-muted-foreground">
          <pre>
            Page <strong>{currentPage}</strong> of {totalPages}
          </pre>
        </div>
      </Pagination>
    </div>
  );
}
