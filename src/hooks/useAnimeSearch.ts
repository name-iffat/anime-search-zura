import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, getAnimeSearchParams } from '../api/animeApi';
import type { JikanAnimeListResponse } from '../types/anime';
import { debounce } from '../utils/debounce';
import { useSearchParams } from 'react-router-dom';

const DEBOUNCE_DELAY = 400;

export const useAnimeSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get('q') || '';
    const urlPage = Number(searchParams.get('page')) || 1;
    const [query, setQuery] = useState(urlQuery);
    const [page, setPage] = useState(urlPage);
    const [debouncedQuery, setDebouncedQuery] = useState(urlQuery);

    const debouncedSetQuery = useMemo(
        () => debounce((value: string) => {
            setDebouncedQuery(value);
            setPage(1);
            setSearchParams({ q: value, page: '1' });
        }, DEBOUNCE_DELAY),
        [setSearchParams]
    );

    const handleSearchChange = (value: string) => {
        setQuery(value);
        debouncedSetQuery(value);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setSearchParams({ q: debouncedQuery, page: newPage.toString() });
    }

    const isEmptySearch = debouncedQuery.trim() === '';

    const { data, isLoading, error, refetch } = useQuery<JikanAnimeListResponse>({
        queryKey: ['animeSearch', debouncedQuery, page],
        queryFn: async () => {
            const params = isEmptySearch
                ? { page: 1, limit: 25, order_by: 'score', sort: 'desc' }
                : { q: debouncedQuery, page, limit: 25 };
            const response = await api.get('/anime', getAnimeSearchParams(params));
            return response.data;
        },
        placeholderData: (previousData) => previousData,
    });

    useEffect(() => {
        setQuery(urlQuery);
        setPage(urlPage);
        setDebouncedQuery(urlQuery);
    }, [urlQuery, urlPage]);

    return {
        query,
        handleSearchChange,
        page,
        handlePageChange,
        results: data?.data ?? [],
        isLoading,
        error,
        isEmptySearch,
        refetch,
        totalPages: data?.pagination.last_visible_page ?? 1,
    };
};