import { useAnimeSearch } from '../hooks/useAnimeSearch';
import SearchInput from '../components/SearchInput';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner'; // create simple one next

export default function ListingPage() {
    const { query, handleSearchChange, results, isLoading, error, isEmptySearch } = useAnimeSearch();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-electric-blue text-center mb-8">
                Anime Search
            </h1>

            <SearchInput value={query} onChange={handleSearchChange} />

            {isLoading && (
                <div className="flex justify-center my-12">
                    <LoadingSpinner />
                </div>
            )}

            {error && (
                <div className="text-center text-anime-red my-8">
                    Error loading anime: {(error as Error).message}
                </div>
            )}

            {!isLoading && !error && results.length === 0 && (
                <div className="text-center text-gray-600 my-12 text-lg">
                    {isEmptySearch ? 'Loading popular anime...' : 'No results found. Try a different search!'}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map((anime) => (
                    <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>
        </div>
    );
}