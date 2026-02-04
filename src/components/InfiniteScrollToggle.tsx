import { useAppContext } from '../context/AppContext';

export default function InfiniteScrollToggle() {
    const { infiniteScroll, setInfiniteScroll } = useAppContext();

    return (
        <button
            onClick={() => setInfiniteScroll(!infiniteScroll)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-smooth group ${infiniteScroll
                    ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                    : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-electric-blue hover:text-electric-blue'
                }`}
            title={infiniteScroll ? 'Infinite Scroll Enabled' : 'Pagination Enabled'}
        >
            <div className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${infiniteScroll ? 'bg-electric-blue' : 'bg-gray-400'}`}>
                <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-sm ${infiniteScroll ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">
                {infiniteScroll ? 'Infinite' : 'Classic'}
            </span>
            <span className="text-lg" role="img" aria-label="scroll mode icon">
                {infiniteScroll ? '♾️' : '📖'}
            </span>
        </button>
    );
}
