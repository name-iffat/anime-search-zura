import { useQuery } from '@tanstack/react-query';
import { api } from '../api/animeApi';
import type { JikanSingleAnimeFullResponse } from '../types/anime';

export const useAnimeDetail = (id: string | undefined) => {
    return useQuery<JikanSingleAnimeFullResponse, Error>({
        queryKey: ['animeDetail', id],
        queryFn: async () => {
            if (!id) throw new Error('No anime ID provided');
            const response = await api.get(`/anime/${id}/full`);
            return response.data;
        },
        enabled: !!id, // don't fetch if no ID
        staleTime: 1000 * 60 * 5, // 5 min cache
    });
};