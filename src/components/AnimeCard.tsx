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
            className="block card hover:scale-[1.02] transition-transform duration-200"
            aria-label={`View details for ${anime.title}`}
        >
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                {anime.score && (
                    <div className="absolute top-2 right-2 bg-electric-blue text-white text-sm font-bold px-2 py-1 rounded-full">
                        {anime.score.toFixed(1)}
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">{anime.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{shortSynopsis || 'No synopsis available'}</p>
            </div>
        </Link>
    );
}