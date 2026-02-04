import axios, { type AxiosInstance, type AxiosError } from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

export const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

//handle error log
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 429) {
            console.log('Too many requests hit limit - 429');
        }
        return Promise.reject(error);
    }
);

//helper build cmm params
export const getAnimeSearchParams = (params: {
    q?: string;
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    min_score?: number;
    sort_by?: string;
    order_by?: string;
}) => {
    return {
        params: {
            ...params,
            limit: params.limit || 25,
        },
    };
};