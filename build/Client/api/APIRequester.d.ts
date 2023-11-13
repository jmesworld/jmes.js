/// <reference types="node" />
export declare type APIParams = Record<string, string | number | null | undefined>;
export interface Pagination {
    next_key: string | null;
    total: number;
}
export interface PaginationOptions {
    'pagination.limit': string;
    'pagination.offset': string;
    'pagination.key': string;
    'pagination.count_total': 'true' | 'false';
    'pagination.reverse': 'true' | 'false';
}
export declare class APIRequester {
    private axios;
    private readonly baseURL;
    constructor(baseURL: string);
    private computeEndpoint;
    getRaw<T>(endpoint: string, params?: URLSearchParams | APIParams): Promise<T>;
    get<T>(endpoint: string, params?: URLSearchParams | APIParams): Promise<T>;
    postRaw<T>(endpoint: string, data?: any): Promise<T>;
    post<T>(endpoint: string, data?: any): Promise<T>;
}
