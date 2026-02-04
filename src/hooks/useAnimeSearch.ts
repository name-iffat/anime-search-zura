import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, getAnimeSearchParams } from '../api/animeApi';
import type { JikanAnimeListResponse } from '../types/anime';
import { debounce } from '../utils/debounce';

const DEBOUNCE_DELAY = 400;

export const useAnimeSearch = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebounceQuery] = useState('');

    const debounceSetQuery = useMemo(
        () => debounce((value: string) => setDebounceQuery(value), DEBOUNCE_DELAY),
        []
    );

    const handleSearchChange = (value: string) => {
        setQuery(value);
        debounceSetQuery(value);
    };

    const isEmptySearch = debouncedQuery.trim() === '';

    const { data, isLoading, error, refetch } = useQuery<JikanAnimeListResponse>({
        queryKey: ['animeSearch', debouncedQuery],
        queryFn: async () => {
            const params = isEmptySearch
                ? { page: 1, limit: 25, order_by: 'score', sort: 'desc' }
                : { q: debouncedQuery, page: 1, limit: 25 };
            const response = await api.get('/anime', getAnimeSearchParams(params));
            return response.data;
        },
        placeholderData: (previousData) => previousData,
    });

    return {
        query,
        handleSearchChange,
        results: data?.data ?? [],
        isLoading,
        error,
        isEmptySearch,
        refetch,
        totalPages: data?.pagination.last_visible_page ?? 1,
    };
};