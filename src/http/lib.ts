import type { ParsedQuery } from 'query-string';
import queryString from 'query-string';
import * as nodeUrl from 'url';

import type { DeferredJobResponse } from './types';

const URL = typeof window === 'undefined' ? nodeUrl.URL : window.URL;

function parseUrlParams(query: string): ParsedQuery {
    return queryString.parse(query, { arrayFormat: 'bracket' });
}

function stringifyUrlParams(params: ParsedQuery): string {
    return queryString.stringify(params, { arrayFormat: 'bracket' });
}

export function createUrlWithQuery(url = '', query?: object): URL {
    const urlWithQuery = new URL(url);

    if (typeof query === 'object' && query !== null) {
        urlWithQuery.search = stringifyUrlParams({
            ...parseUrlParams(urlWithQuery.search),
            ...query,
        });
    }

    return urlWithQuery;
}

function isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object';
}

export function isDeferredJobResponse(value: unknown): value is DeferredJobResponse {
    return (
        isObject(value) &&
        typeof value.status === 'string' &&
        isObject(value.progress) &&
        typeof value.progress.id === 'string' &&
        Array.isArray(value.progress.links) &&
        value.progress.links.every((link: unknown) => typeof link === 'string')
    );
}
