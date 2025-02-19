import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Newsroom, PrivacyRequest } from '../../types';

import type {
    DeletePrivacyRequestCreateRequest,
    ExportPrivacyRequestCreateRequest,
    CorrectPrivacyRequestCreateRequest,
    OtherPrivacyRequestCreateRequest,
} from './types';

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async create(
        newsroomId: Newsroom['uuid'],
        payload:
            | DeletePrivacyRequestCreateRequest
            | ExportPrivacyRequestCreateRequest
            | CorrectPrivacyRequestCreateRequest
            | OtherPrivacyRequestCreateRequest,
    ): Promise<PrivacyRequest> {
        const url = routing.newsroomPrivacyRequestsUrl.replace(':newsroom_id', String(newsroomId));
        const { privacy_request } = await this.apiClient.post<{ privacy_request: PrivacyRequest }>(
            url,
            {
                payload,
            },
        );
        return privacy_request;
    }

    public async confirm(
        newsroomId: Newsroom['uuid'],
        privacyRequestId: PrivacyRequest['id'],
    ): Promise<PrivacyRequest> {
        const url = routing.newsroomPrivacyRequestsUrl.replace(':newsroom_id', String(newsroomId));
        const { privacy_request } = await this.apiClient.post<{ privacy_request: PrivacyRequest }>(
            `${url}/${privacyRequestId}/confirm`,
        );
        return privacy_request;
    }
}
