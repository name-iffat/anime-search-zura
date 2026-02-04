import { useAnimeSearch } from '../hooks/useAnimeSearch';
import SearchInput from '../components/SearchInput';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import DarkModeToggle from '../components/DarkModeToggle';
import zuraLogo from '../assets/Zura-Logo-3.png';

export default function ListingPage() {
    const {
        query,
        handleSearchChange,
        page,
        handlePageChange,
        results,
        isLoading,
        isFetching,
        error,
        isEmptySearch,
        totalPages,
    } = useAnimeSearch();

    return (
        <div className="min-h-screen pb-20 transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <header className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 md:mb-16 relative">
                    <div className="flex items-center gap-4">
                        <img src={zuraLogo} alt="Zura Logo" className="h-20 w-auto object-contain" />
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
                            Anime Search
                        </h1>
                    </div>
                    <div className="absolute right-0 top-0 md:relative md:top-auto">
                        <DarkModeToggle />
                    </div>
                </header>

                <SearchInput value={query} onChange={handleSearchChange} />

                {(isLoading || isFetching) && (
                    <div className="my-20">
                        <LoadingSpinner />
                    </div>
                )}

                {error && (
                    <div className="text-center my-12 p-8 glass-panel rounded-2xl max-w-lg mx-auto shadow-lg border-l-4 border-anime-red">
                        <p className="text-anime-red font-bold text-xl mb-4">
                            System Overload!
                        </p>
                        <p className="text-gray-600 mb-6">{(error as Error).message}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-anime-red text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-smooth"
                        >
                            Retry Connection
                        </button>
                    </div>
                )}

                {!isLoading && !error && results.length === 0 && (
                    <div className="text-center text-gray-500 my-20 text-xl font-medium">
                        {isEmptySearch ? '⚡ Powering up... Try searching for something!' : 'No signals found. Adjust frequencies?'}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {results.map((anime, index) => (
                        <div key={`${anime.mal_id}-${page}-${index}`} className="animate-fade-in-up h-full" style={{ animationDelay: `${index * 50}ms` }}>
                            <AnimeCard anime={anime} />
                        </div>
                    ))}
                </div>

                {totalPages > 1 && !isLoading && !error && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}