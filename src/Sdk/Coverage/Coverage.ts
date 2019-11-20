import { Api } from 'Api';
import { Coverage } from 'types';

import { Options } from '../types';
import { coverageUrl } from '../routing';
import { getItemId } from '../utils';

import { CoverageListResponse } from './types';

export default class Coverages {
    private readonly accessToken: string;
    private readonly url: string;

    constructor({ accessToken, baseUrl }: Required<Options>) {
        this.accessToken = accessToken;
        this.url = `${baseUrl}/${coverageUrl}`;
    }

    async list(): Promise<CoverageListResponse> {
        const response = await Api.get<CoverageListResponse>(this.url, {
            accessToken: this.accessToken,
        });
        return response.payload;
    }

    async get(itemOrItemId: string | Coverage): Promise<Coverage> {
        const response = await Api.get<{ coverage: Coverage }>(this.getUrlWithId(itemOrItemId), {
            accessToken: this.accessToken,
        });
        return response.payload.coverage;
    }

    async create(): Promise<Coverage> {
        throw new Error('Not implemented!');
    }

    async update(): Promise<Coverage> {
        throw new Error('Not implemented!');
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
