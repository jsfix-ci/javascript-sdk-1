import { Category } from './Category';
import { Entity } from './Entity';
import { CultureRef } from './Culture';
import { NewsroomRef } from './Newsroom';
import { UserRef } from './User';
import { OEmbedInfo } from './common';

export interface StoryRef {
    uuid: string;
    /**
     * @deprecated Please use `uuid` as an identifier instead.
     * @see uuid
     */
    id: number;
    title: string;
    slug: string;
    publication_status: Story.PublicationStatus;
    lifecycle_status: Story.LifecycleStatus;
    visibility: Story.Visibility;

    thumbnail_url: string;

    created_at: string;
    updated_at: string;
    published_at: string | null;
    scheduled_at: string | null;

    culture: CultureRef;
    author: UserRef | null;
    newsroom: NewsroomRef;
    oembed: OEmbedInfo;

    links: {
        edit: string;
        newsroom_view: string;
        report: string;
    };
}

export interface Story extends Entity<number> {
    uuid: string;
    /**
     * @deprecated Please use `uuid` as an identifier instead.
     * @see uuid
     */
    id: number;
    title: string;
    subtitle: string;
    intro: string;
    summary: string;
    slug: string;
    format_version: Story.FormatVersion;
    culture: CultureRef;
    author: UserRef | null;

    links: {
        // backend app urls
        analytics: string;
        api: string;
        create_campaign: string;
        duplicate: string | null;
        edit: string | null;
        newsroom_preview: string;
        newsroom_view: string | null;
        preview: string;
        publication_api: string;
        reports_api: string;
        // newsroom urls
        sharing: string;
        short: string | null;
        translate: string | null;
    };

    newsroom: NewsroomRef;
    categories: Category[];
    translations: StoryRef[];
    oembed: OEmbedInfo;

    coverage_number: number;
    language: string;
    last_coverage_at: string | null;

    thumbnail_url: string;
    created_at: string;
    updated_at: string;
    published_at: string | null;
    scheduled_at: string | null;

    lifecycle_status: Story.LifecycleStatus;
    is_archived: boolean;
    is_finalized: boolean;
    is_published: boolean;
    is_draft: boolean;
    is_embargo: boolean;
    is_private: boolean;
    is_scheduled: boolean;
    is_sharable: boolean;
    is_analytics_available: boolean;

    publication_status: Story.PublicationStatus;
    visibility: Story.Visibility;
}

export namespace Story {
    export enum FormatVersion {
        HTML = 1,
        SLATEJS = 3,
    }

    export enum LifecycleStatus {
        UNINITIALIZED = 'uninitialized',
        DRAFT = 'draft',
        SCHEDULED = 'scheduled',
        EMBARGO = 'embargo',
        PUBLISHED = 'published',
    }

    export enum PublicationStatus {
        NEW = 'new',
        DRAFT = 'draft',
        PUBLISHED = 'published',
    }

    export enum Visibility {
        PUBLIC = 'public',
        EMBARGO = 'embargo',
        PRIVATE = 'private',
        CONFIDENTIAL = 'confidential',
    }

    export interface ExtraFields {
        /**
         * Depending on `format_version` this field can contain:
         * - HTML content for v1 stories (deprecated)
         * - JSON-encoded structured content for v3 stories (see Prezly Content Format).
         */
        content: string;
        /**
         * Uploadcare image JSON.
         */
        thumbnail_image: string | null;
        /**
         * Uploadcare image JSON.
         */
        header_image: string | null;
        /**
         * Uploadcare image JSON.
         */
        preview_image: string | null;
        /**
         * Uploadcare image JSON.
         */
        social_image: string | null;
        social_text: string;
        tag_names: string[];

        referenced_entities: {
            stories: Record<string, OEmbedInfo>;
        };
    }
}

export interface ExtendedStory extends Story, Story.ExtraFields {}
