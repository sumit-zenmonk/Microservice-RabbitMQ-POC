export enum ExchangeTypeEnum {
    DIRECT = 'direct',
    FANOUT = 'fanout',
    TOPIC = 'topic',
    HEADERS = 'headers',
}

export enum XMatchHeaderEnum {
    ALL = 'all',
    ANY = 'any'
}

export enum ExchangeNameEnum {
    USER_EXCHANGE = 'user.exchange',
    CREATOR_EXCHANGE = 'creater.post',
}

export enum RoutingKeyEnum {
    USER_REGISTERED = 'user.registered',
    CREATOR_POST_CREATED = 'creator.post.created',
    FOLLOW_CREATED = 'follow.created',
    FOLLOW_DELETED = 'follow.deleted',
}

export enum QueueEnum {
    MAIN_USER_QUEUE = 'main.user.queue',
    MAIL_POST_CREATED_QUEUE = 'mail.post.created.queue',
}