import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimeSearch } from '../hooks/useAnimeSearch';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import SortDropdown from '../components/SortDropdown';
import FilterPanel from '../components/FilterPanel';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import DarkModeToggle from '../components/DarkModeToggle';
import InfiniteScrollToggle from '../components/InfiniteScrollToggle';
import zuraLogo from '../assets/Zura-Logo-3.png';

export default function ListingPage() {
    const {
        query,
        handleSearchChange,
        page,
        handlePageChange,
        orderBy,
        sort,
        handleSortChange,
        filterType,
        filterStatus,
        filterRating,
        handleFilterChange,
        results,
        isLoading,
        isFetching,
        isFetchingNextPage,
        error,
        isEmptySearch,
        fetchNextPage,
        hasNextPage,
        totalPages,
    } = useAnimeSearch();
    const { favourites, infiniteScroll } = useAppContext();
    const [showFilters, setShowFilters] = useState(false);

    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0.1,
        skip: !infiniteScroll || !hasNextPage || isFetching,
    });

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    const hasActiveFilters = filterType || filterStatus || filterRating;

    return (
        <div className="min-h-screen pb-20 transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 md:mb-16 relative">
                    <div className="flex items-center gap-4">
                        <img src={zuraLogo} alt="Zura Logo" className="h-20 w-auto object-contain" />
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
                            Anime Search
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <InfiniteScrollToggle />
                        <Link
                            to="/favourites"
                            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-red-500/10 transition-smooth group"
                        >
                            <span className="text-red-500 group-hover:scale-125 transition-transform">❤️</span>
                            <span className="font-bold hidden sm:inline">Favourites</span>
                            {favourites.length > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {favourites.length}
                                </span>
                            )}
                        </Link>
                        <DarkModeToggle />
                    </div>
                </header>

                <div className="space-y-6 mb-12">
                    <div className="relative max-w-2xl mx-auto">
                        <SearchInput value={query} onChange={handleSearchChange} />
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full hidden lg:flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-smooth ${showFilters || hasActiveFilters ? 'text-electric-blue bg-electric-blue/10' : 'text-[var(--text-secondary)] hover:text-electric-blue'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filters
                            {hasActiveFilters && <span className="w-2 h-2 bg-electric-blue rounded-full" />}
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="lg:hidden w-full max-w-2xl">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-smooth border-2 ${showFilters || hasActiveFilters ? 'text-electric-blue border-electric-blue bg-electric-blue/10' : 'text-[var(--text-secondary)] border-[var(--border-color)]'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                {showFilters ? 'Hide Filters' : 'Show Filters'}
                                {hasActiveFilters && <span className="w-2 h-2 bg-electric-blue rounded-full ml-1" />}
                            </button>
                        </div>

                        {showFilters && (
                            <div className="w-full max-w-4xl animate-fade-in-up">
                                <FilterPanel
                                    type={filterType}
                                    status={filterStatus}
                                    rating={filterRating}
                                    onFilterChange={handleFilterChange}
                                />
                            </div>
                        )}

                        <SortDropdown orderBy={orderBy} sort={sort} onSortChange={handleSortChange} />
                    </div>
                </div>

                {(isLoading && results.length === 0) && (
                    <div className="my-20">
                        <LoadingSpinner />
                    </div>
                )}

                {error && (
                    <div className="text-center my-12 p-8 glass-panel rounded-2xl max-w-lg mx-auto shadow-lg border-l-4 border-anime-red">
                        <p className="text-anime-red font-bold text-xl mb-4">
                            System Overload!
                        </p>
                        <p className="text-[var(--text-secondary)] mb-6">{(error as Error).message}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-anime-red text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-smooth"
                        >
                            Retry Connection
                        </button>
                    </div>
                )}

                {!isLoading && !error && results.length === 0 && (
                    <div className="text-center text-[var(--text-secondary)] my-20 text-xl font-medium">
                        {isEmptySearch ? '⚡ Powering up... Try searching for something!' : 'No signals found. Adjust frequencies?'}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 transition-all duration-500">
                    {results.map((anime, index) => (
                        <div key={`${anime.mal_id}-${index}`} className="animate-fade-in-up h-full" style={{ animationDelay: `${(index % 24) * 30}ms` }}>
                            <AnimeCard anime={anime} />
                        </div>
                    ))}
                </div>

                {infiniteScroll ? (
                    <div ref={loadMoreRef} className="mt-12 flex flex-col items-center justify-center gap-4">
                        {isFetchingNextPage && <LoadingSpinner />}
                        {!isFetchingNextPage && hasNextPage && (
                            <button
                                onClick={() => fetchNextPage()}
                                className="px-8 py-3 bg-[var(--bg-card)] border-2 border-electric-blue text-electric-blue font-bold rounded-full hover:bg-electric-blue hover:text-white transition-smooth shadow-sm"
                            >
                                Load More Anime
                            </button>
                        )}
                        {!hasNextPage && results.length > 0 && (
                            <p className="text-[var(--text-secondary)] font-medium bg-[var(--bg-card)] px-6 py-2 rounded-full border border-[var(--border-color)]">
                                ⚡ You've reached the end of the signal!
                            </p>
                        )}
                    </div>
                ) : (
                    totalPages > 1 && (
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )
                )}
            </div>
        </div>
    );
}