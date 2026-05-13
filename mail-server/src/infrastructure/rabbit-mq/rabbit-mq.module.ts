import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { MailModule } from '../email/mail.module';
import { UserRegisteredConsumer } from './consumers/user/user-registered/user-registered.consumer';
import { UserRepository } from '../repository/user.repo';
import { CreatorPostCreatedConsumer } from './consumers/post/creator-post-created/creator-post-created.consumer';
import { FollowRepository } from '../repository/follow.repo';
import { FollowCreatedConsumer } from './consumers/follow/follow-created/follow-created.consumer';
import { FollowDeletedConsumer } from './consumers/follow/follow-deleted/follow-deleted.consumer';

@Module({
    imports: [MailModule],
    providers: [RabbitMQService, UserRepository, FollowRepository, UserRegisteredConsumer, CreatorPostCreatedConsumer, FollowCreatedConsumer, FollowDeletedConsumer,],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }