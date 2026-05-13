import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EmailService } from 'src/infrastructure/email/mail.service';
import { RabbitMQService } from 'src/infrastructure/rabbit-mq/rabbit-mq.service';
import { ExchangeNameEnum, ExchangeTypeEnum, QueueEnum, RoutingKeyEnum } from 'src/infrastructure/rabbit-mq/type-enum/rabbit-mq.enum';
import { FollowRepository } from 'src/infrastructure/repository/follow.repo';
import { MailBoxRepository } from 'src/infrastructure/repository/mailbox.repo';
import { CreateMailEntryPayload } from 'src/infrastructure/email/template/creator-post-to-follower/creator_post_to_follower.type';

@Injectable()
export class CreatorPostCreatedConsumer implements OnModuleInit {
    private readonly logger = new Logger(CreatorPostCreatedConsumer.name);

    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly emailService: EmailService,
        private readonly followRepo: FollowRepository,
        private readonly mailBoxRepo: MailBoxRepository,
    ) { }

    async onModuleInit() {
        await this.rabbitMQService.setupExchangeQueueAndBind(
            QueueEnum.MAIL_POST_CREATED_QUEUE,
            ExchangeNameEnum.CREATOR_EXCHANGE,
            RoutingKeyEnum.CREATOR_POST_CREATED,
            ExchangeTypeEnum.TOPIC,
        );

        await this.rabbitMQService.consumeMessages(
            QueueEnum.MAIL_POST_CREATED_QUEUE,
            async (data) => {
                this.logger.log(`Processing creator post creation: ${data.uuid}`);

                const followers = await this.followRepo.findByFollowingUuid(data.user_uuid);
                for (const follower of followers) {
                    // not sending bulk entry
                    //await this.emailService.sendCreatorPostNotification(follower.follower, data);

                    // making db entry to later send one by one in background
                    const mailbox_entry_detail: CreateMailEntryPayload = {
                        email: follower.follower.email,
                        body: {
                            type: 'CREATOR_POST_CREATED',
                            receiver_name: follower.follower.name,
                            creator: {
                                uuid: data.user_uuid,
                                name: data.user_name,
                            },
                            post: {
                                uuid: data.uuid,
                                title: data.title,
                                excerpt: data.content?.slice(0, 150),
                            },
                        },
                    }
                    await this.mailBoxRepo.createMailntry(mailbox_entry_detail);
                }
            },
        );
    }
}