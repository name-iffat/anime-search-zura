import { useParams, Link } from 'react-router-dom';
import { useAnimeDetail } from '../hooks/useAnimeDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import DarkModeToggle from '../components/DarkModeToggle';

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
        <div className="min-h-screen transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <div className="container mx-auto px-4 py-8 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center text-[var(--text-secondary)] hover:text-electric-blue font-bold transition-colors group"
                    >
                        <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Back to search
                    </Link>
                    <DarkModeToggle />
                </div>

                <div className="bg-[var(--bg-card)] rounded-xl shadow-lg run-ring overflow-hidden border border-[var(--border-color)]">
                    {/* Hero */}
                    <div className="relative h-96 md:h-[500px] group">
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                            <img
                                src={anime.images.jpg.large_image_url}
                                alt={anime.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                            <h1 className="text-4xl md:text-5xl font-black mb-2 leading-tight">{anime.title}</h1>
                            {anime.title_english && (
                                <p className="text-xl opacity-90 font-medium text-blue-200">{anime.title_english}</p>
                            )}
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="p-6 md:p-10 space-y-10">
                        {/* Quick stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)]">
                            <div className="text-center">
                                <p className="text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider">Score</p>
                                <div className="mt-3 w-20 h-20 mx-auto rounded-full bg-[var(--bg-card)] shadow-md flex items-center justify-center relative">
                                    <span className={`text-2xl font-black ${anime.score && anime.score >= 8 ? 'text-electric-blue' : 'text-[var(--text-primary)]'}`}>
                                        {anime.score?.toFixed(1) || 'N/A'}
                                    </span>
                                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-[var(--border-color)]" strokeWidth="8" />
                                        {anime.score && (
                                            <circle
                                                cx="50" cy="50" r="45"
                                                fill="none"
                                                stroke={anime.score >= 8 ? 'var(--color-electric-blue)' : '#28a745'}
                                                strokeWidth="8"
                                                strokeDasharray={`${scorePercentage * 2.82} 282`}
                                                strokeLinecap="round"
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        )}
                                    </svg>
                                </div>
                            </div>

                            <div className="text-center flex flex-col justify-center">
                                <p className="text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider">Episodes</p>
                                <p className="text-3xl font-black text-[var(--text-primary)] mt-2">{anime.episodes || '?'}</p>
                            </div>

                            <div className="text-center flex flex-col justify-center">
                                <p className="text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider">Status</p>
                                <p className={`text-xl font-bold mt-2 ${anime.status === 'Currently Airing' ? 'text-eco-green animate-pulse' : 'text-[var(--text-primary)]'}`}>
                                    {anime.status}
                                </p>
                            </div>

                            <div className="text-center flex flex-col justify-center">
                                <p className="text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider">Year</p>
                                <p className="text-xl font-bold text-[var(--text-primary)] mt-2">{anime.year || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-2 h-8 bg-electric-blue rounded-full" />
                                Synopsis
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed text-lg lg:max-w-4xl">
                                {anime.synopsis || 'No synopsis available.'}
                            </p>
                        </div>

                        {/* Genres & Studios */}
                        {(anime.genres?.length || anime.studios?.length) && (
                            <div className="grid md:grid-cols-2 gap-8">
                                {anime.genres && anime.genres.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Genres</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {anime.genres.map(g => (
                                                <span key={g.mal_id} className="px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full text-sm font-medium hover:bg-electric-blue hover:text-white transition-colors cursor-default shadow-sm hover:shadow-glow-blue border border-[var(--border-color)]">
                                                    {g.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {anime.studios && anime.studios.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Studios</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {anime.studios.map(s => (
                                                <span key={s.mal_id} className="px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full text-sm font-medium hover:bg-eco-green hover:text-white transition-colors cursor-default shadow-sm border border-[var(--border-color)]">
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
                                <p className="text-[var(--text-secondary)]">
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
                                            <span key={p.mal_id} className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full text-sm text-[var(--text-secondary)]">
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
                                            <span key={l.mal_id} className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full text-sm text-[var(--text-secondary)]">
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
                                                        className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full text-sm text-[var(--text-secondary)] hover:text-electric-blue hover:border-electric-blue transition-colors"
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
                                        <ul className="list-disc pl-6 space-y-1 text-[var(--text-secondary)] marker:text-[var(--text-primary)]">
                                            {anime.theme.openings.map((op, i) => (
                                                <li key={i}>{op}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {anime.theme?.endings?.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Endings</h3>
                                        <ul className="list-disc pl-6 space-y-1 text-[var(--text-secondary)] marker:text-[var(--text-primary)]">
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
                                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
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
        </div>
    );
}