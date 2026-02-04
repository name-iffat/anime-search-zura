export interface Anime {
    mal_id: number;
    title: string;
    images: {
        webp: {
            image_url: string;
            large_image_url: string;
        }
    };
    score: number;
    synopsis: string;
}
