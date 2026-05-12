import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { MailModule } from '../email/mail.module';
import { UserRegisteredConsumer } from './consumers/user/user-registered/user-registered.consumer';
import { UserRepository } from '../repository/user.repo';
import { CreatorPostCreatedConsumer } from './consumers/user/creator-post-created/creator-post-created.consumer';

@Module({
    imports: [MailModule],
    providers: [RabbitMQService, UserRepository, UserRegisteredConsumer, CreatorPostCreatedConsumer,],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }