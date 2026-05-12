import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EmailService } from 'src/infrastructure/email/mail.service';
import { RabbitMQService } from 'src/infrastructure/rabbit-mq/rabbit-mq.service';
import { ExchangeNameEnum, ExchangeTypeEnum, QueueEnum, RoutingKeyEnum } from 'src/infrastructure/rabbit-mq/type-enum/rabbit-mq.enum';
import { UserRepository } from 'src/infrastructure/repository/user.repo';

@Injectable()
export class UserRegisteredConsumer implements OnModuleInit {
    private readonly logger = new Logger(UserRegisteredConsumer.name);

    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly emailService: EmailService,
        private readonly userRepo: UserRepository,
    ) { }

    async onModuleInit() {
        await this.rabbitMQService.setupExchangeQueueAndBind(
            QueueEnum.MAIL_USER_QUEUE,
            ExchangeNameEnum.USER_EXCHANGE,
            RoutingKeyEnum.USER_REGISTERED,
            ExchangeTypeEnum.TOPIC,
        );

        await this.rabbitMQService.consumeMessages(
            QueueEnum.MAIL_USER_QUEUE,
            async (data) => {
                this.logger.log(`Processing registered user: ${data.email} \n ${JSON.stringify(data)}`,);

                await this.userRepo.register(data);
                // await this.emailService.sendUserWelcome(data);
            },
        );
    }
}