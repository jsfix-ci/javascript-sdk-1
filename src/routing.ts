export const routing = {
    accounts: '/v2/accounts',
    billing: 'v2/billing',
    campaignsUrl: '/v2/campaigns',
    campaignRecipientsUrl: '/v2/campaigns/:campaign_id/recipients',
    contactsExportsUrl: '/v2/contacts/exports',
    coverageUrl: '/v2/coverage',
    jobsUrl: '/v2/jobs',
    licenseUrl: '/v2/licenses',
    licenseUnsubscribeUrl: '/v2/unsubscribe',
    newsroomsUrl: '/v2/newsrooms',
    newsroomCategoriesUrl: '/v2/newsrooms/:newsroom_id/categories',
    newsroomContactsUrl: '/v2/newsrooms/:newsroom_id/contacts',
    newsroomLanguagesUrl: '/v2/newsrooms/:newsroom_id/languages',
    /** @deprecated Please use newsroomSubscribeUrl instead */
    newsroomSubscriptionsUrl: '/v2/newsrooms/:newsroom_id/subscriptions',
    newsroomSubscribeUrl: '/v2/newsrooms/:newsroom_id/subscribe',
    newsroomUnsubscribeUrl: '/v2/newsrooms/:newsroom_id/unsubscribe',
    newsroomThemesUrl: '/v2/newsrooms/:newsroom_id/themes',
    newsroomWebhooksUrl: '/v2/newsrooms/:newsroom_id/webhooks',
    newsroomPrivacyRequestsUrl: '/v2/newsrooms/:newsroom_id/privacy-requests',
    newsroomDomainsUrl: '/v2/newsrooms/:newsroom_id/domains',
    newsroomGalleriesUrl: '/v2/newsrooms/:newsroom_id/galleries',
    notificationSubscriptionsUrl: '/v2/notification-subscriptions',
    senderAddressesUrl: '/v2/sender-addresses',
    signup: '/v2/signup',
    storiesUrl: '/v2/stories',
    storiesSearchUrl: '/v2/stories/search',
    storyCoverageUrl: '/v1/stories/:story_id/reports/coverage',
    snippetsUrl: '/v2/snippets',
};
