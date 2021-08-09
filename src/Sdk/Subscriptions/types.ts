import {Contact, ContactType, UnsubscribeReason, UploadcareImage} from '../../types';

interface Person {
    first_name?: Contact['first_name'];
    last_name?: Contact['last_name'];
    gender?: Contact['gender'];
    function_name?: Contact['function_name'];
    organisations?: string[];
}

interface Organisation {
    company_name: Contact['company_name'];
}

export interface NewsroomSubscribeRequest<Type extends ContactType> {
    email_address: string;
    locale?: string;
    url?: string;
    visitor_uid?: string;
    session_uid?: string;
    comment?: string;
    contact?: (Type extends ContactType.PERSON ? Person : Organisation) & {
        contact_type: Contact['contact_type'];
        avatar_image?: UploadcareImage | null;
        languages?: string[];
        emails?: Contact['emails'];
        phone_numbers?: Contact['phone_numbers'];
        urls?: Contact['urls'];
        social_accounts?: Contact['social'][];
        tags?: Contact['tags'];
        periodicity?: Contact['periodicity'];
        medium_types?: Contact['medium_types'];
        salutation?: Contact['salutation'];
        address?: {
            street?: Contact['address']['street'];
            number?: Contact['address']['number'];
            box?: Contact['address']['box'];
            zip?: Contact['address']['zip'];
            city?: Contact['address']['city'];
            region?: Contact['address']['region'];
            country?: Contact['address']['country'];
        };
    };
}

export interface NewsroomUnsubscribeRequest {
    email_address: string;
    locale?: string;
    url?: string;
    visitor_uid?: string;
    session_uid?: string;
    comment?: string;
    reason?: UnsubscribeReason;
}

export interface UpdateNewsroomUnsubscribeDetailsRequest {
    locale?: string;
    url?: string;
    visitor_uid?: string;
    session_uid?: string;
    comment?: string;
    reason?: UnsubscribeReason;
}
