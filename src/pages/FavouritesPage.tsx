import { useAppContext } from '../context/AppContext';
import AnimeCard from '../components/AnimeCard';
import { Link } from 'react-router-dom';
import zuraLogo from '../assets/Zura-Logo-3.png';
import DarkModeToggle from '../components/DarkModeToggle';

export default function FavouritesPage() {
    const { favourites } = useAppContext();

    return (
        <div className="min-h-screen pb-20 transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 md:mb-16 relative">
                    <Link to="/" className="flex items-center gap-4 group">
                        <img src={zuraLogo} alt="Zura Logo" className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105" />
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--text-primary)]">
                            Anime Search
                        </h1>
                    </Link>

                    <div className="flex items-center gap-4">
                        <DarkModeToggle />
                    </div>
                </header>

                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="text-red-500 text-4xl">❤️</span> My Favourites
                        <span className="text-lg font-medium px-3 py-1 bg-red-500/10 text-red-500 rounded-full">
                            {favourites.length}
                        </span>
                    </h2>
                    <Link to="/" className="text-electric-blue hover:underline font-bold flex items-center gap-2">
                        <span>←</span> Back to Search
                    </Link>
                </div>

                {favourites.length === 0 ? (
                    <div className="text-center py-20 glass-panel rounded-2xl max-w-lg mx-auto shadow-lg">
                        <p className="text-4xl mb-6">📉</p>
                        <h3 className="text-xl font-bold mb-4">No favourites yet</h3>
                        <p className="text-[var(--text-secondary)] mb-8 px-6">
                            Start adding some life to your collection! Click the heart icon on any anime card to save it here.
                        </p>
                        <Link
                            to="/"
                            className="inline-block px-8 py-3 bg-electric-blue text-white font-bold rounded-full hover:shadow-glow-blue hover:scale-105 transition-smooth"
                        >
                            Explore Anime
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                        {favourites.map((anime, index) => (
                            <div key={anime.mal_id} className="animate-fade-in-up h-full" style={{ animationDelay: `${index * 50}ms` }}>
                                <AnimeCard anime={anime} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
