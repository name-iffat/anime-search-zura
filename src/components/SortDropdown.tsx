import { memo } from 'react';

interface SortDropdownProps {
    orderBy: string;
    sort: 'asc' | 'desc';
    onSortChange: (orderBy: string, sort: 'asc' | 'desc') => void;
}

const sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Score', value: 'score' },
    { label: 'Title', value: 'title' },
    { label: 'Start Date', value: 'start_date' },
];

function SortDropdown({ orderBy, sort, onSortChange }: SortDropdownProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">Sort By:</span>
            <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => {
                    const isActive = orderBy === option.value || (option.value === 'score' && !orderBy);
                    return (
                        <button
                            key={option.value}
                            onClick={() => {
                                if (isActive) {
                                    onSortChange(option.value, sort === 'asc' ? 'desc' : 'asc');
                                } else {
                                    onSortChange(option.value, 'desc');
                                }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-smooth border ${isActive
                                ? 'bg-electric-blue text-white border-electric-blue shadow-glow-blue'
                                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-electric-blue hover:text-electric-blue'
                                }`}
                        >
                            {option.label}
                            {isActive && (
                                <span className="text-[10px] transform transition-transform duration-300">
                                    {sort === 'asc' ? '▲' : '▼'}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// Memoize to prevent re-renders when props haven't changed
export default memo(SortDropdown);
