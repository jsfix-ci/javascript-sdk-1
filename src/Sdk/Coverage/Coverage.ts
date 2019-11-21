import { Api } from '../../Api';
import { Coverage } from '../../types';

import { coverageUrl } from '../routing';
import { getItemId } from '../utils';

import {
    CoverageCreateRequest,
    CoverageListResponse,
    CoverageSearchOptions,
    CoverageUpdateRequest,
} from './types';

interface Options {
    accessToken: string;
    baseUrl: string;
}

export default class CoverageSdk {
    private readonly accessToken: string;
    private readonly url: string;

    constructor({ accessToken, baseUrl }: Options) {
        this.accessToken = accessToken;
        this.url = `${baseUrl}/${coverageUrl}`;
    }

    async list(options: CoverageSearchOptions = {}): Promise<CoverageListResponse> {
        const { jsonQuery, page, pageSize, sortOrder } = options;
        const response = await Api.get<CoverageListResponse>(this.url, {
            accessToken: this.accessToken,
            query: {
                page,
                pageSize,
                query: jsonQuery,
                sort: sortOrder,
            },
        });
        return response.payload;
    }

    async get(itemOrItemId: string | Coverage): Promise<Coverage> {
        const response = await Api.get<{ coverage: Coverage }>(this.getUrlWithId(itemOrItemId), {
            accessToken: this.accessToken,
        });
        return response.payload.coverage;
    }

    async getByExternalReferenceId(externalReferenceId: string): Promise<Coverage | null> {
        const jsonQuery = JSON.stringify({ external_reference_id: { $in: [externalReferenceId] } });
        const { coverage } = await this.list({ jsonQuery });
        return coverage[0] || null;
    }

    async create(payload: CoverageCreateRequest): Promise<Coverage> {
        const response = await Api.post<{ coverage: Coverage }>(this.url, {
            accessToken: this.accessToken,
            payload,
        });
        return response.payload.coverage;
    }

    async update(
        itemOrItemId: string | Coverage,
        payload: CoverageUpdateRequest,
    ): Promise<Coverage> {
        const response = await Api.patch<{ coverage: Coverage }>(this.getUrlWithId(itemOrItemId), {
            accessToken: this.accessToken,
            payload,
        });
        return response.payload.coverage;
    }

    async delete(itemOrItemId: string | Coverage): Promise<void> {
        await Api.delete<{ coverage: Coverage }>(this.getUrlWithId(itemOrItemId), {
            accessToken: this.accessToken,
        });
    }

    private getUrlWithId(itemOrItemId: string | Coverage): string {
        const itemId: string = getItemId<string, Coverage>(itemOrItemId);
        return `${this.url}/${itemId}`;
    }
}
