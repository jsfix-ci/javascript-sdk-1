import { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';

import { SnippetCreateRequest, SnippetUpdateRequest } from './types';
import { Snippet } from '../../types';

type SnippetId = Snippet['uuid'] | Snippet['id'];

export default class Snippets {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async list(): Promise<Snippet[]> {
        const url = routing.snippetsUrl;
        const { snippets } = await this.apiClient.get<{ snippets: Snippet[] }>(url);
        return snippets;
    }

    public async get(snippetId: SnippetId): Promise<Snippet> {
        const url = routing.snippetsUrl;
        const { snippet } = await this.apiClient.get<{ snippet: Snippet }>(`${url}/${snippetId}`);
        return snippet;
    }

    public async create(payload: SnippetCreateRequest): Promise<Snippet> {
        const url = routing.snippetsUrl;
        const { snippet } = await this.apiClient.post<{ snippet: Snippet }>(url, {
            payload,
        });
        return snippet;
    }

    public async update(snippetId: SnippetId, payload: SnippetUpdateRequest): Promise<Snippet> {
        const url = routing.snippetsUrl;
        const { snippet } = await this.apiClient.patch<{ snippet: Snippet }>(
            `${url}/${snippetId}`,
            {
                payload,
            },
        );
        return snippet;
    }

    public async remove(snippetId: SnippetId): Promise<void> {
        const url = routing.snippetsUrl;
        return this.apiClient.delete(`${url}/${snippetId}`);
    }
}
