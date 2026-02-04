import { memo } from 'react';

interface FilterPanelProps {
    type: string;
    status: string;
    rating: string;
    onFilterChange: (type: string, status: string, rating: string) => void;
}

const typeOptions = [
    { label: 'All Types', value: '' },
    { label: 'TV', value: 'tv' },
    { label: 'Movie', value: 'movie' },
    { label: 'OVA', value: 'ova' },
    { label: 'Special', value: 'special' },
    { label: 'ONA', value: 'ona' },
    { label: 'Music', value: 'music' },
];

const statusOptions = [
    { label: 'All Status', value: '' },
    { label: 'Airing', value: 'airing' },
    { label: 'Complete', value: 'complete' },
    { label: 'Upcoming', value: 'upcoming' },
];

const ratingOptions = [
    { label: 'All Ratings', value: '' },
    { label: 'G (General)', value: 'g' },
    { label: 'PG (Children)', value: 'pg' },
    { label: 'PG-13 (Teens)', value: 'pg13' },
    { label: 'R (17+ Restricted)', value: 'r17' },
    { label: 'R+ (Mild Nudity)', value: 'r' },
    { label: 'Rx (Hentai)', value: 'rx' },
];

function FilterPanel({ type, status, rating, onFilterChange }: FilterPanelProps) {
    return (
        <div className="glass-panel p-6 rounded-2xl border border-[var(--border-color)] shadow-lg animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Type Filter */}
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-3">Type</label>
                    <select
                        value={type}
                        onChange={(e) => onFilterChange(e.target.value, status, rating)}
                        className="w-full bg-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-xl px-4 py-2.5 font-bold text-sm focus:border-electric-blue focus:outline-none transition-smooth"
                    >
                        {typeOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-3">Status</label>
                    <select
                        value={status}
                        onChange={(e) => onFilterChange(type, e.target.value, rating)}
                        className="w-full bg-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-xl px-4 py-2.5 font-bold text-sm focus:border-electric-blue focus:outline-none transition-smooth"
                    >
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                {/* Rating Filter */}
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-3">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => onFilterChange(type, status, e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-xl px-4 py-2.5 font-bold text-sm focus:border-electric-blue focus:outline-none transition-smooth"
                    >
                        {ratingOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => onFilterChange('', '', '')}
                    className="text-xs font-bold text-anime-red hover:underline uppercase tracking-wider"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
}

// Memoize to prevent re-renders when props haven't changed
export default memo(FilterPanel);
