import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, getAnimeSearchParams } from '../api/animeApi';
import type { JikanAnimeListResponse } from '../types/anime';
import { debounce } from '../utils/debounce';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


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

    const { data, isLoading, isFetching, error, refetch } = useQuery<JikanAnimeListResponse, Error>({
        queryKey: ['animeSearch', debouncedQuery, page],
        queryFn: async () => {
            const params = isEmptySearch
                ? { page, limit: 25, order_by: 'score', sort: 'desc' }
                : { q: debouncedQuery, page, limit: 25 };
            const response = await api.get('/anime', getAnimeSearchParams(params));
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                return failureCount < 3;
            }
            return true;
        },
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    });
    useEffect(() => {
        if (debouncedQuery !== previousDebouncedQuery.current) {
            setPage(1);
            setSearchParams({ q: debouncedQuery, page: '1' });
            previousDebouncedQuery.current = debouncedQuery;
        }
    }, [debouncedQuery, setSearchParams]);

    const previousDebouncedQuery = useRef(debouncedQuery);

    return {
        query,
        handleSearchChange,
        page,
        handlePageChange,
        results: data?.data ?? [],
        isLoading,
        isFetching,
        error,
        isEmptySearch,
        refetch,
        totalPages: data?.pagination.last_visible_page ?? 1,
    };
};