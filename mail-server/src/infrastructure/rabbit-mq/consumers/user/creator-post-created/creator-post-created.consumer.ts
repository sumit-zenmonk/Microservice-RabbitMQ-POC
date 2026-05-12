import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EmailService } from 'src/infrastructure/email/mail.service';
import { RabbitMQService } from 'src/infrastructure/rabbit-mq/rabbit-mq.service';
import { ExchangeNameEnum, ExchangeTypeEnum, QueueEnum, RoutingKeyEnum } from 'src/infrastructure/rabbit-mq/type-enum/rabbit-mq.enum';
import { UserRepository } from 'src/infrastructure/repository/user.repo';

@Injectable()
export class CreatorPostCreatedConsumer implements OnModuleInit {
    private readonly logger = new Logger(CreatorPostCreatedConsumer.name);

    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly emailService: EmailService,
        private readonly userRepo: UserRepository,
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
                this.logger.log(`Processing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creationProcessing creator post creation: ${data}`,);

                // await this.emailService.sendUserWelcome(data);
            },
        );
    }
}