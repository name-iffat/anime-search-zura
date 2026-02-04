import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, getAnimeSearchParams } from '../api/animeApi';
import type { JikanAnimeListResponse, AnimePreview } from '../types/anime';
import { debounce } from '../utils/debounce';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const DEBOUNCE_DELAY = 400;

export const useAnimeSearch = () => {
    const { infiniteScroll } = useAppContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const urlQuery = searchParams.get('q') || '';
    const urlPage = Number(searchParams.get('page')) || 1;
    const urlOrderBy = searchParams.get('order_by') || '';
    const urlSort = (searchParams.get('sort') as 'asc' | 'desc') || 'desc';
    const urlType = searchParams.get('type') || '';
    const urlStatus = searchParams.get('status') || '';
    const urlRating = searchParams.get('rating') || '';

    const [query, setQuery] = useState(urlQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(urlQuery);
    const [page, setPage] = useState(urlPage);
    const [orderBy, setOrderBy] = useState(urlOrderBy);
    const [sort, setSort] = useState<'asc' | 'desc'>(urlSort);
    const [filterType, setFilterType] = useState(urlType);
    const [filterStatus, setFilterStatus] = useState(urlStatus);
    const [filterRating, setFilterRating] = useState(urlRating);

    const [accumulatedResults, setAccumulatedResults] = useState<AnimePreview[]>([]);

    const updateUrl = (q: string, p: number, o: string, s: string, t: string, st: string, r: string) => {
        const params: any = { q, page: p.toString() };
        if (o) params.order_by = o;
        if (s) params.sort = s;
        if (t) params.type = t;
        if (st) params.status = st;
        if (r) params.rating = r;
        setSearchParams(params);
    };

    const debouncedSetQuery = useMemo(
        () => debounce((value: string) => {
            setDebouncedQuery(value);
            setPage(1);
            setAccumulatedResults([]); // Clear on search
            updateUrl(value, 1, orderBy, sort, filterType, filterStatus, filterRating);
        }, DEBOUNCE_DELAY),
        [setSearchParams, orderBy, sort, filterType, filterStatus, filterRating]
    );

    const handleSearchChange = (value: string) => {
        setQuery(value);
        debouncedSetQuery(value);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        if (!infiniteScroll) {
            setAccumulatedResults([]); // Reset if pagination
        }
        updateUrl(debouncedQuery, newPage, orderBy, sort, filterType, filterStatus, filterRating);
    };

    const handleSortChange = (newOrderBy: string, newSort: 'asc' | 'desc') => {
        setOrderBy(newOrderBy);
        setSort(newSort);
        setPage(1);
        setAccumulatedResults([]);
        updateUrl(debouncedQuery, 1, newOrderBy, newSort, filterType, filterStatus, filterRating);
    };

    const handleFilterChange = (type: string, status: string, rating: string) => {
        setFilterType(type);
        setFilterStatus(status);
        setFilterRating(rating);
        setPage(1);
        setAccumulatedResults([]);
        updateUrl(debouncedQuery, 1, orderBy, sort, type, status, rating);
    };

    const isEmptySearch = debouncedQuery.trim() === '';

    const { data, isLoading, isFetching, error, refetch } = useQuery<JikanAnimeListResponse, Error>({
        queryKey: ['animeSearch', debouncedQuery, page, orderBy, sort, filterType, filterStatus, filterRating],
        queryFn: async () => {
            const params: any = {
                page,
                limit: 24,
                sfw: true,
            };

            if (!isEmptySearch) {
                params.q = debouncedQuery;
            }

            if (orderBy) {
                params.order_by = orderBy;
                params.sort = sort;
            } else if (isEmptySearch) {
                params.order_by = 'score';
                params.sort = 'desc';
            }

            if (filterType) params.type = filterType;
            if (filterStatus) params.status = filterStatus;
            if (filterRating) params.rating = filterRating;

            const response = await api.get('/anime', getAnimeSearchParams(params));
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
        gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache (formerly cacheTime)
        refetchOnWindowFocus: false, // Prevent unnecessary refetch
        refetchOnMount: false, // Use cache when available
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                return failureCount < 3;
            }
            return true;
        },
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    });

    // Handle accumulation for infinite scroll
    useEffect(() => {
        if (data?.data) {
            if (infiniteScroll) {
                if (page === 1) {
                    setAccumulatedResults(data.data);
                } else {
                    // Prevent duplicates
                    setAccumulatedResults(prev => {
                        const existingIds = new Set(prev.map(a => a.mal_id));
                        const newOnes = data.data.filter(a => !existingIds.has(a.mal_id));
                        return [...prev, ...newOnes];
                    });
                }
            } else {
                setAccumulatedResults(data.data);
            }
        }
    }, [data, infiniteScroll, page]);

    // Handle URL sync if page/search/etc changes from outside (e.g. back button)
    useEffect(() => {
        if (urlQuery !== debouncedQuery) {
            setQuery(urlQuery);
            setDebouncedQuery(urlQuery);
            setPage(urlPage);
            setAccumulatedResults([]);
        }
        if (urlPage !== page) {
            setPage(urlPage);
        }
    }, [urlQuery, urlPage, urlOrderBy, urlSort, urlType, urlStatus, urlRating]);

    const results = infiniteScroll ? accumulatedResults : (data?.data ?? []);
    const hasNextPage = data?.pagination.has_next_page ?? false;
    const totalPages = data?.pagination.last_visible_page ?? 1;

    const fetchNextPage = () => {
        if (hasNextPage && !isFetching) {
            handlePageChange(page + 1);
        }
    };

    return {
        query,
        handleSearchChange,
        page,
        handlePageChange,
        orderBy,
        sort,
        handleSortChange,
        filterType,
        filterStatus,
        filterRating,
        handleFilterChange,
        results,
        isLoading,
        isFetching,
        isFetchingNextPage: isFetching && infiniteScroll && page > 1,
        error,
        isEmptySearch,
        refetch,
        fetchNextPage,
        hasNextPage,
        totalPages,
    };
};