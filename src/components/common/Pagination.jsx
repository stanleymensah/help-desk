import { useMemo } from "react";
export default function Pagination({
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

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4 mb-8 text-sm">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        disabled={!hasPrevPage}
        className={`px-3 py-1 rounded cursor-pointer ${
          hasPrevPage
            ? "text-primary hover:text-primary-dark"
            : "text-gray-200 cursor-not-allowed"
        }`}
      >
        <span className="me-1">&lsaquo;</span> Back
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 rounded ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!hasNextPage}
        className={`px-3 py-1 cursor-pointer rounded ${
          hasNextPage
            ? "text-primary hover:text-primary-dark"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next <span className="ms-1">&rsaquo;</span>
      </button>

      {/* Page Info */}
      <span className="text-xs text-gray-600 ml-4">
        Page <strong>{currentPage}</strong> of {totalPages}
      </span>
    </div>
  );
}
