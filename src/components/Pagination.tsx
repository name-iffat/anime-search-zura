interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <nav className="flex justify-center items-center gap-2 mt-8 flex-wrap" aria-label="Pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirstPage}
                className={`
          px-5 py-2.5 rounded-lg font-medium transition-all duration-200
          ${isFirstPage
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-electric-blue text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-800'}
        `}
                aria-label="Previous page"
                aria-disabled={isFirstPage}
            >
                Previous
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200 min-w-[40px]
            ${p === currentPage
                            ? 'bg-electric-blue text-gray-700 ring-2 ring-electric-blue/50'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 active:bg-gray-200'}
          `}
                    aria-current={p === currentPage ? 'page' : undefined}
                    aria-label={`Go to page ${p}`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLastPage}
                className={`
          px-5 py-2.5 rounded-lg font-medium transition-all duration-200
          ${isLastPage
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-electric-blue text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-800'}
        `}
                aria-label="Next page"
                aria-disabled={isLastPage}
            >
                Next
            </button>
        </nav>
    );
}