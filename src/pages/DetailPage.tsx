// src/pages/DetailPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useAnimeDetail } from '../hooks/useAnimeDetail';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useAnimeDetail(id);

    const anime = data?.data;

    if (isLoading) return <div className="py-20"><LoadingSpinner /></div>;

    if (error || !anime) {
        return (
            <div className="py-20 text-center">
                <p className="text-anime-red text-xl mb-4">Failed to load anime details</p>
                <Link to="/" className="text-electric-blue hover:underline">
                    Back to search
                </Link>
            </div>
        );
    }

    const scorePercentage = anime.score ? Math.round(anime.score * 10) : 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                to="/"
                className="inline-flex items-center text-electric-blue hover:text-blue-700 mb-6"
            >
                ← Back to search
            </Link>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Hero */}
                <div className="relative h-96 md:h-[500px]">
                    <img
                        src={anime.images.jpg.large_image_url}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-4xl md:text-5xl font-bold">{anime.title}</h1>
                        {anime.title_english && (
                            <p className="text-xl mt-2 opacity-90">{anime.title_english}</p>
                        )}
                    </div>
                </div>

                {/* Main content */}
                <div className="p-6 md:p-10">
                    {/* Quick stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Score</p>
                            <div className="mt-2 w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-electric-blue to-eco-green flex items-center justify-center text-#28A745 text-2xl font-bold relative">
                                {anime.score?.toFixed(1) || 'N/A'}
                                <svg className="absolute inset-0" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                                    <circle
                                        cx="50" cy="50" r="48" fill="none" stroke="#28A745" strokeWidth="4"
                                        strokeDasharray={`${scorePercentage} 100`} strokeLinecap="round"
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">Episodes</p>
                            <p className="text-3xl font-bold mt-2">{anime.episodes || '?'}</p>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="text-xl font-medium mt-2">{anime.status}</p>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="text-xl font-medium mt-2">{anime.year || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Synopsis */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {anime.synopsis || 'No synopsis available.'}
                        </p>
                    </div>

                    {/* Genres & Studios */}
                    {(anime.genres?.length || anime.studios?.length) && (
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            {anime.genres && anime.genres.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {anime.genres.map(g => (
                                            <span key={g.mal_id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                {g.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {anime.studios && anime.studios.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Studios</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {anime.studios.map(s => (
                                            <span key={s.mal_id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {/* Broadcast & Airing */}
                    {anime.broadcast?.string && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">Broadcast</h2>
                            <p className="text-gray-700">
                                {anime.broadcast.string} {anime.season && `(${anime.season} ${anime.year})`}
                            </p>
                        </div>
                    )}

                    {/* Producers, Licensors, Studios */}
                    <div className="grid md:grid-cols-3 gap-8 mb-10">
                        {anime.producers?.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Producers</h3>
                                <div className="flex flex-wrap gap-2">
                                    {anime.producers.map(p => (
                                        <span key={p.mal_id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {anime.licensors?.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Licensors</h3>
                                <div className="flex flex-wrap gap-2">
                                    {anime.licensors.map(l => (
                                        <span key={l.mal_id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                            {l.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Relations */}
                    {anime.relations?.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">Relations</h2>
                            <div className="space-y-4">
                                {anime.relations.map((rel, idx) => (
                                    <div key={idx}>
                                        <h4 className="font-semibold text-lg">{rel.relation}</h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {rel.entry.map(e => (
                                                <Link
                                                    key={e.mal_id}
                                                    to={`/anime/${e.mal_id}`}
                                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                                >
                                                    {e.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Themes – Openings & Endings */}
                    {(anime.theme?.openings?.length || anime.theme?.endings?.length) && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">Themes</h2>
                            {anime.theme?.openings?.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2">Openings</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                        {anime.theme.openings.map((op, i) => (
                                            <li key={i}>{op}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {anime.theme?.endings?.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Endings</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                        {anime.theme.endings.map((ed, i) => (
                                            <li key={i}>{ed}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* External & Streaming Links */}
                    {(anime.external?.length || anime.streaming?.length) && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">Links</h2>
                            <div className="flex flex-wrap gap-3">
                                {anime.external?.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-electric-blue/10 text-electric-blue rounded-full hover:bg-electric-blue/20 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                {anime.streaming?.map((stream, i) => (
                                    <a
                                        key={i}
                                        href={stream.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-eco-green/10 text-eco-green rounded-full hover:bg-eco-green/20 transition-colors"
                                    >
                                        Watch on {stream.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Background  */}
                    {anime.background && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">Background</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {anime.background}
                            </p>
                        </div>
                    )}

                    {anime.trailer?.embed_url && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    src={anime.trailer.embed_url}
                                    title="Anime Trailer"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}