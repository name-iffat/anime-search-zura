interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg glass-panel font-bold text-sm disabled:opacity-30 hover:text-electric-blue transition-smooth"
            >
                Prev
            </button>

            {getPages()[0] > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="w-10 h-10 rounded-lg glass-panel font-bold text-sm hover:text-electric-blue transition-smooth"
                    >
                        1
                    </button>
                    {getPages()[0] > 2 && <span className="text-[var(--text-secondary)]">...</span>}
                </>
            )}

            {getPages().map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-smooth ${currentPage === page
                            ? 'bg-electric-blue text-white shadow-glow-blue'
                            : 'glass-panel hover:text-electric-blue'
                        }`}
                >
                    {page}
                </button>
            ))}

            {getPages()[getPages().length - 1] < totalPages && (
                <>
                    {getPages()[getPages().length - 1] < totalPages - 1 && <span className="text-[var(--text-secondary)]">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="w-10 h-10 rounded-lg glass-panel font-bold text-sm hover:text-electric-blue transition-smooth"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg glass-panel font-bold text-sm disabled:opacity-30 hover:text-electric-blue transition-smooth"
            >
                Next
            </button>
        </div>
    );
}
