import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AnimePreview } from '../types/anime';

interface AppContextType {
    favourites: AnimePreview[];
    toggleFavourite: (anime: AnimePreview) => void;
    isFavourite: (id: number) => boolean;
    infiniteScroll: boolean;
    setInfiniteScroll: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [favourites, setFavourites] = useState<AnimePreview[]>(() => {
        const saved = localStorage.getItem('favourites');
        return saved ? JSON.parse(saved) : [];
    });

    const [infiniteScroll, setInfiniteScroll] = useState<boolean>(() => {
        const saved = localStorage.getItem('infiniteScroll');
        return saved === 'true'; // Default to false if not set (classic pagination)
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    useEffect(() => {
        localStorage.setItem('infiniteScroll', infiniteScroll.toString());
    }, [infiniteScroll]);

    const toggleFavourite = (anime: AnimePreview) => {
        setFavourites(prev => {
            const exists = prev.some(a => a.mal_id === anime.mal_id);
            if (exists) {
                return prev.filter(a => a.mal_id !== anime.mal_id);
            }
            return [...prev, anime];
        });
    };

    const isFavourite = (id: number) => favourites.some(a => a.mal_id === id);

    return (
        <AppContext.Provider value={{ favourites, toggleFavourite, isFavourite, infiniteScroll, setInfiniteScroll }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
};