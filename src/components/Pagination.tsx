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
        <nav className="flex justify-center items-center gap-2 mt-12 flex-wrap" aria-label="Pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirstPage}
                className={`
          flex items-center justify-center px-6 py-3 rounded-full font-bold transition-smooth
          ${isFirstPage
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-electric-blue hover:text-white shadow-md hover:shadow-glow-blue'}
        `}
                aria-label="Previous page"
                aria-disabled={isFirstPage}
            >
                Previous
            </button>

            <div className="flex gap-2 bg-white/50 backdrop-blur-sm p-1 rounded-full mx-2 hidden sm:flex">
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`
            w-10 h-10 rounded-full font-bold transition-smooth flex items-center justify-center text-sm
            ${p === currentPage
                                ? 'bg-electric-blue text-white shadow-glow-blue scale-110'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-electric-blue'}
          `}
                        aria-current={p === currentPage ? 'page' : undefined}
                        aria-label={`Go to page ${p}`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Mobile View*/}
            <span className="sm:hidden font-bold text-gray-600 mx-4">
                {currentPage} / {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLastPage}
                className={`
          flex items-center justify-center px-6 py-3 rounded-full font-bold transition-smooth
          ${isLastPage
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-electric-blue hover:text-white shadow-md hover:shadow-glow-blue'}
        `}
                aria-label="Next page"
                aria-disabled={isLastPage}
            >
                Next
            </button>
        </nav>
    );
}