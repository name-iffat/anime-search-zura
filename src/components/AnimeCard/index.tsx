import React from 'react';

const AnimeCard: React.FC<{ anime: any }> = ({ anime }) => {
    return (
        <div className="anime-card">
            {anime.title}
        </div>
    );
};

export default AnimeCard;
