import { Link } from 'react-router-dom';
import type { AnimePreview } from '../types/anime';

interface AnimeCardProps {
    anime: AnimePreview;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
    const shortSynopsis = anime.synopsis?.slice(0, 120) + (anime.synopsis?.length > 120 ? '...' : '');

    return (
        <Link
            to={`/anime/${anime.mal_id}`}
            className="group block bg-[var(--bg-card)] rounded-xl overflow-hidden shadow-md hover:shadow-glow-blue transition-smooth ring-offset-2 focus:outline-none focus:ring-2 focus:ring-electric-blue relative h-full flex flex-col"
            aria-label={`View details for ${anime.title}`}
        >
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    loading="lazy"
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
    );
}