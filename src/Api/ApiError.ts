import { HeadersMap } from '../types';

import { ApiErrorPayload, ApiResponse } from './types';

export default class ApiError<P = ApiErrorPayload> extends Error implements ApiResponse<P> {
    payload: P;
    status: number;
    statusText: string;
    headers: HeadersMap;

    constructor({
        payload,
        status = 0,
        statusText = 'Unspecified error',
        headers = {},
    }: {
        payload: P;
        status: number;
        statusText: string;
        headers: HeadersMap;
    }) {
        super(`API Error (${status}): ${statusText}`);
        this.payload = payload;
        this.status = status;
        this.statusText = statusText;
        this.headers = headers;
    }
}
