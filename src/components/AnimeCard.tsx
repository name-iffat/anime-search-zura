import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { AnimePreview } from '../types/anime';
import { useAppContext } from '../context/AppContext';
import ProgressiveImage from './ProgressiveImage';

interface AnimeCardProps {
    anime: AnimePreview;
}

function AnimeCard({ anime }: AnimeCardProps) {
    const shortSynopsis = anime.synopsis?.slice(0, 120) + (anime.synopsis?.length > 120 ? '...' : '');
    const { toggleFavourite, isFavourite } = useAppContext();
    const favourited = isFavourite(anime.mal_id);

    return (
        <div className="relative group h-full">
            <Link
                to={`/anime/${anime.mal_id}`}
                className="block bg-[var(--bg-card)] rounded-xl overflow-hidden shadow-md hover:shadow-glow-blue transition-smooth ring-offset-2 focus:outline-none focus:ring-2 focus:ring-electric-blue h-full flex flex-col active:scale-[0.98] active:brightness-95 transition-all duration-150"
                aria-label={`View details for ${anime.title}`}
            >
                <div className="relative aspect-[3/4] overflow-hidden">
                    <ProgressiveImage
                        src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-smooth" />
                    {anime.score && (
                        <div className="absolute top-2 right-2 glass-panel text-electric-blue font-bold px-2 py-1 rounded-full text-xs shadow-sm">
                            ★ {anime.score.toFixed(1)}
                        </div>
                    )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-electric-blue transition-colors">
                        {anime.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-3 mb-4 flex-1">
                        {shortSynopsis || 'No synopsis available'}
                    </p>
                    <div className="flex items-center text-xs font-medium text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        View Details →
                    </div>
                </div>
            </Link>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavourite(anime);
                }}
                className={`absolute top-3 left-3 p-2 rounded-full bg-gray-900/60 backdrop-blur-sm z-10 transition-all duration-300 ${favourited ? 'text-red-500 scale-110' : 'text-white/80 hover:text-red-400 hover:scale-110'
                    }`}
                aria-label={favourited ? 'Remove from favourites' : 'Add to favourites'}
            >
                {favourited ? '❤️' : '♡'}
            </button>
        </div>
    );
}

// Memoize to prevent re-renders when anime data hasn't changed
export default memo(AnimeCard, (prevProps, nextProps) => {
    return prevProps.anime.mal_id === nextProps.anime.mal_id;
});