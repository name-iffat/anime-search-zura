import { useAnimeSearch } from '../hooks/useAnimeSearch';
import SearchInput from '../components/SearchInput';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-electric-blue text-center mb-8">
                Anime Search
            </h1>

            <SearchInput value={query} onChange={handleSearchChange} />

            {(isLoading || isFetching) && <LoadingSpinner />}

            {error && (
                <div className="text-center my-12 p-6 bg-red-50 border border-anime-red rounded-lg max-w-lg mx-auto">
                    <p className="text-anime-red font-medium mb-4">
                        Error loading anime: {(error as Error).message}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-electric-blue text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {!isLoading && !error && results.length === 0 && (
                <div className="text-center text-gray-600 my-12 text-lg">
                    {isEmptySearch ? 'Showing popular anime...' : 'No results found. Try a different search!'}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map((anime, index) => (
                    <AnimeCard
                        key={`${anime.mal_id}-${page}-${index}`}
                        anime={anime}
                    />
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
    );
}