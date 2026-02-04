export interface JikanImage {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export interface JikanImages {
    jpg: JikanImage;
    webp: JikanImage;
}

export interface MalEntity {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}
export interface AnimePreview {
    mal_id: number;
    url: string;
    images: JikanImages;
    title: string;
    title_english?: string;
    title_japanese?: string;
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: {
        from: string | null;
        to: string | null;
        prop: {
            from: { day: number | null; month: number | null; year: number | null };
            to: { day: number | null; month: number | null; year: number | null };
            string: string;
        };
    };
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number;
    favorites: number;
    synopsis: string;
    season?: string;
    year?: number | null;
    genres?: MalEntity[];
}

export interface JikanPagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
        count: number;
        total: number;
        per_page: number;
    };
}

export interface JikanAnimeListResponse {
    data: AnimePreview[];
    pagination: JikanPagination;
}

export interface AnimeFull extends AnimePreview {
    trailer: {
        youtube_id: string | null;
        url: string | null;
        embed_url: string | null;
    };
    approved: boolean;
    titles: Array<{ type: string; title: string }>;
    title_synonyms: string[];
    duration: string;
    rating: string;
    members: number;
    background?: string;
    broadcast: {
        day: string | null;
        time: string | null;
        timezone: string | null;
        string: string | null;
    };
    producers: MalEntity[];
    licensors: MalEntity[];
    studios: MalEntity[];
    explicit_genres: MalEntity[];
    themes: MalEntity[];
    demographics: MalEntity[];
    relations: Array<{
        relation: string;
        entry: MalEntity[];
    }>;
    theme: {
        openings: string[];
        endings: string[];
    };
    external: Array<{ name: string; url: string }>;
    streaming: Array<{ name: string; url: string }>;
}

export interface JikanSingleAnimeFullResponse {
    data: AnimeFull;
}